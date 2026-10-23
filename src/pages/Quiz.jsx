
import { useState } from 'react'
import { Link } from 'react-router-dom'

const THEMES = [
  { value: 'sein', label: 'Cancer du sein' },
  { value: 'col_uterus', label: 'Cancer du col de l’utérus' },
  { value: 'prevention', label: 'Prévention et dépistage' },
  { value: 'hpv', label: 'Vaccination contre le HPV' },
  { value: 'orientation', label: 'Orientation sanitaire' },
  { value: 'general', label: 'Connaissances générales' },
]

const NIVEAUX = [
  { value: 'facile', label: 'Facile', description: 'Découvrir les notions de base' },
  { value: 'moyen', label: 'Moyen', description: 'Appliquer ses connaissances' },
  { value: 'difficile', label: 'Difficile', description: 'Approfondir les notions' },
]

const css = {
  page: {
    minHeight: '100vh',
    padding: '32px 18px 60px',
    background: '#fff8fb',
    color: '#30212c',
  },
  container: { maxWidth: 780, margin: '0 auto' },
  back: {
    display: 'inline-block',
    marginBottom: 24,
    color: '#91365f',
    textDecoration: 'none',
    fontWeight: 700,
  },
  card: {
    background: '#fff',
    border: '1px solid #f0dce7',
    borderRadius: 22,
    padding: 'clamp(20px, 5vw, 38px)',
    boxShadow: '0 12px 36px rgba(100, 37, 75, 0.07)',
  },
  label: {
    display: 'block',
    marginBottom: 8,
    fontWeight: 700,
    fontSize: 14,
  },
  field: {
    width: '100%',
    boxSizing: 'border-box',
    padding: 13,
    borderRadius: 10,
    border: '1px solid #dfc7d5',
    background: '#fff',
    color: '#30212c',
    fontSize: 15,
  },
  primary: {
    padding: '13px 19px',
    borderRadius: 11,
    border: 0,
    background: '#91365f',
    color: '#fff',
    fontWeight: 700,
    cursor: 'pointer',
    fontSize: 15,
  },
  secondary: {
    padding: '12px 17px',
    borderRadius: 11,
    border: '1px solid #e4c9d8',
    background: '#fff',
    color: '#813054',
    fontWeight: 700,
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
  },
  muted: { color: '#6c5b66', lineHeight: 1.7 },
}

export default function Quiz() {
  const [theme, setTheme] = useState('sein')
  const [niveau, setNiveau] = useState('facile')
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [selection, setSelection] = useState(null)
  const [validee, setValidee] = useState(false)
  const [score, setScore] = useState(0)
  const [termine, setTermine] = useState(false)
  const [chargement, setChargement] = useState(false)
  const [erreur, setErreur] = useState('')
  const [avertissement, setAvertissement] = useState('')
  const [sources, setSources] = useState([])

  const question = questions[index]

  async function commencerQuiz(event) {
    event?.preventDefault()
    setChargement(true)
    setErreur('')
    setQuestions([])
    setIndex(0)
    setSelection(null)
    setValidee(false)
    setScore(0)
    setTermine(false)
    setAvertissement('')
    setSources([])

    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme, niveau }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Impossible de générer le quiz.')
      }

      if (!Array.isArray(data.questions) || data.questions.length !== 10) {
        throw new Error('Le quiz reçu est incomplet. Essaie de nouveau.')
      }

      setQuestions(data.questions)
      setAvertissement(data.avertissement || '')
      setSources(Array.isArray(data.sources) ? data.sources : [])
    } catch (error) {
      setErreur(error.message || 'Une erreur est survenue.')
    } finally {
      setChargement(false)
    }
  }

  function validerReponse() {
    if (selection === null || validee || !question) return

    if (selection === question.correctIndex) {
      setScore((ancien) => ancien + 1)
    }

    setValidee(true)
  }

  function suivante() {
    if (index === questions.length - 1) {
      setTermine(true)
      return
    }

    setIndex((ancien) => ancien + 1)
    setSelection(null)
    setValidee(false)
  }

  function recommencer() {
    setQuestions([])
    setIndex(0)
    setSelection(null)
    setValidee(false)
    setScore(0)
    setTermine(false)
    setErreur('')
    setAvertissement('')
    setSources([])
  }

  return (
    <main style={css.page}>
      <div style={css.container}>
        <Link to="/" style={css.back}>← Retour à l’accueil</Link>

        <section style={css.card}>
          <p style={{ color: '#a13f70', fontWeight: 800, letterSpacing: 1.4 }}>
            ROSERELAIS · APPRENDRE
          </p>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 40px)', lineHeight: 1.15 }}>
            Le quiz intelligent
          </h1>
          <p style={css.muted}>
            Choisis un thème et un niveau. L’IA prépare une nouvelle série de
            dix questions éducatives.
          </p>

          {!questions.length && (
            <form onSubmit={commencerQuiz}>
              <div style={{ marginTop: 24 }}>
                <label htmlFor="theme" style={css.label}>Thème du quiz</label>
                <select
                  id="theme"
                  value={theme}
                  onChange={(event) => setTheme(event.target.value)}
                  style={css.field}
                  disabled={chargement}
                >
                  {THEMES.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginTop: 20 }}>
                <label htmlFor="niveau" style={css.label}>Niveau de difficulté</label>
                <select
                  id="niveau"
                  value={niveau}
                  onChange={(event) => setNiveau(event.target.value)}
                  style={css.field}
                  disabled={chargement}
                >
                  {NIVEAUX.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label} — {item.description}
                    </option>
                  ))}
                </select>
              </div>

              {erreur && (
                <p role="alert" style={{ color: '#b42335', marginTop: 18 }}>
                  {erreur}
                </p>
              )}

              <button
                type="submit"
                style={{ ...css.primary, marginTop: 24 }}
                disabled={chargement}
              >
                {chargement ? 'Génération en cours…' : 'Générer mes 10 questions'}
              </button>

              {chargement && (
                <p role="status" style={css.muted}>
                  L’IA prépare le quiz. Cela peut prendre quelques secondes.
                </p>
              )}
            </form>
          )}

          {question && !termine && (
            <>
              <div style={{ marginTop: 26 }}>
                <div
                  style={{
                    height: 8,
                    background: '#f3e5ed',
                    borderRadius: 99,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${((index + 1) / questions.length) * 100}%`,
                      background: '#a13f70',
                    }}
                  />
                </div>
                <p style={css.muted}>Question {index + 1} sur {questions.length}</p>
              </div>

              <h2 style={{ fontSize: 23, lineHeight: 1.5 }}>
                {question.question}
              </h2>

              <div style={{ display: 'grid', gap: 11, marginTop: 20 }}>
                {question.options.map((option, optionIndex) => {
                  const choisie = selection === optionIndex
                  const correcte = question.correctIndex === optionIndex
                  let background = '#fff'
                  let border = '#ead9e3'

                  if (validee && correcte) {
                    background = '#eaf7ee'
                    border = '#29834c'
                  } else if (validee && choisie && !correcte) {
                    background = '#fff0f0'
                    border = '#c73c48'
                  } else if (choisie) {
                    background = '#f8eaf2'
                    border = '#a13f70'
                  }

                  return (
                    <button
                      key={`${index}-${optionIndex}`}
                      type="button"
                      onClick={() => !validee && setSelection(optionIndex)}
                      disabled={validee}
                      aria-pressed={choisie}
                      style={{
                        textAlign: 'left',
                        padding: 15,
                        borderRadius: 12,
                        border: `2px solid ${border}`,
                        background,
                        cursor: validee ? 'default' : 'pointer',
                        color: '#30212c',
                        fontSize: 15,
                        lineHeight: 1.5,
                      }}
                    >
                      <strong>{String.fromCharCode(65 + optionIndex)}. </strong>
                      {option}
                    </button>
                  )
                })}
              </div>

              {validee && (
                <div
                  role="status"
                  aria-live="polite"
                  style={{
                    marginTop: 20,
                    padding: 17,
                    borderRadius: 12,
                    background: '#f8f0f5',
                    lineHeight: 1.7,
                  }}
                >
                  <strong>
                    {selection === question.correctIndex
                      ? 'Bonne réponse !'
                      : 'À retenir :'}
                  </strong>
                  <p>{question.explication}</p>
                  <p><strong>Fait de référence :</strong> {question.faitSource}</p>
                </div>
              )}

              <div style={{ marginTop: 24 }}>
                {!validee ? (
                  <button
                    type="button"
                    style={{
                      ...css.primary,
                      opacity: selection === null ? 0.55 : 1,
                    }}
                    onClick={validerReponse}
                    disabled={selection === null}
                  >
                    Valider ma réponse
                  </button>
                ) : (
                  <button type="button" style={css.primary} onClick={suivante}>
                    {index === questions.length - 1
                      ? 'Voir mon résultat'
                      : 'Question suivante →'}
                  </button>
                )}
              </div>
            </>
          )}

          {termine && (
            <div style={{ marginTop: 20 }}>
              <h2>Ton résultat</h2>
              <p style={{ fontSize: 48, fontWeight: 800, color: '#91365f' }}>
                {score}/10
              </p>
              <p style={css.muted}>
                {score >= 8
                  ? 'Très bien ! Continue à approfondir tes connaissances.'
                  : score >= 5
                    ? 'Bon début ! Relis les explications pour progresser.'
                    : 'Continue à apprendre : chaque réponse expliquée est une occasion de progresser.'}
              </p>
              <button type="button" style={css.primary} onClick={recommencer}>
                Choisir un autre quiz
              </button>
              <button
                type="button"
                style={{ ...css.secondary, marginLeft: 10, marginTop: 10 }}
                onClick={() => commencerQuiz()}
              >
                Rejouer avec de nouvelles questions
              </button>
            </div>
          )}
        </section>

        {avertissement && (
          <p style={{ ...css.muted, fontSize: 12, marginTop: 18 }}>
            {avertissement}
          </p>
        )}

        {sources.length > 0 && (
          <section style={{ ...css.card, marginTop: 18 }}>
            <h2 style={{ fontSize: 18 }}>Sources de référence</h2>
            <ul>
              {sources.map((source) => (
                <li key={source.url} style={{ marginBottom: 8 }}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#91365f' }}
                  >
                    {source.nom}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p style={{ ...css.muted, fontSize: 12, textAlign: 'center', marginTop: 20 }}>
          Ce quiz est éducatif. Il ne permet pas de diagnostiquer un cancer et
          ne remplace pas un avis médical.
        </p>
      </div>
    </main>
  )
}
