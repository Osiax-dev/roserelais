
import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

const questions = [
  {
    categorie: 'Cancer du sein',
    question: 'Tu remarques une nouvelle boule dans ton sein. Que dois-tu faire ?',
    options: [
      'Consulter un professionnel de santé',
      'Attendre plusieurs mois sans rien faire',
      'Prendre des médicaments sans avis médical',
      'Masser fortement la boule',
    ],
    correct: 0,
    explication:
      'Une nouvelle boule ne signifie pas forcément un cancer, mais elle doit être évaluée par un professionnel de santé. Il ne faut pas attendre qu’elle devienne douloureuse.',
  },
  {
    categorie: 'Cancer du sein',
    question: 'Quel changement au niveau du sein doit attirer ton attention ?',
    options: [
      'Une variation habituelle et passagère',
      'Une modification inhabituelle de la peau ou du mamelon',
      'Le fait que les deux seins ne soient pas parfaitement identiques',
      'La présence de poils autour du mamelon',
    ],
    correct: 1,
    explication:
      'Une rétraction du mamelon, une peau qui se creuse ou ressemble à une peau d’orange, ou un écoulement inhabituel peuvent nécessiter une consultation. Tous ces signes ne sont pas forcément dus à un cancer.',
  },
  {
    categorie: 'Cancer du sein',
    question: 'Le cancer du sein concerne-t-il uniquement les femmes ?',
    options: [
      'Oui, sans aucune exception',
      'Uniquement les femmes de plus de 60 ans',
      'Non, les hommes peuvent aussi en être atteints',
      'Uniquement les femmes ayant eu des enfants',
    ],
    correct: 2,
    explication:
      'Le cancer du sein touche principalement les femmes, mais il peut également survenir chez les hommes. Une masse inhabituelle doit être évaluée quel que soit le sexe.',
  },
  {
    categorie: 'Cancer du col de l’utérus',
    question: 'Quel agent infectieux est responsable de la grande majorité des cancers du col de l’utérus ?',
    options: [
      'Le virus de la grippe',
      'Le papillomavirus humain (HPV)',
      'Le parasite du paludisme',
      'Une bactérie responsable du choléra',
    ],
    correct: 1,
    explication:
      'Une infection persistante par certains types de papillomavirus humain (HPV) est à l’origine de la grande majorité des cancers du col de l’utérus.',
  },
  {
    categorie: 'Prévention',
    question: 'À quoi sert le dépistage du cancer du col de l’utérus ?',
    options: [
      'À déterminer le groupe sanguin',
      'À confirmer tous les cancers du corps',
      'À remplacer toutes les consultations médicales',
      'À repérer des infections à HPV ou des anomalies précancéreuses selon le test utilisé',
    ],
    correct: 3,
    explication:
      'Selon la méthode utilisée, le dépistage recherche le HPV à haut risque ou des anomalies du col. Un résultat anormal nécessite une évaluation et, parfois, des examens complémentaires.',
  },
  {
    categorie: 'Vaccination HPV',
    question: 'Le vaccin contre le HPV remplace-t-il le dépistage du cancer du col de l’utérus ?',
    options: [
      'Oui, dans tous les cas',
      'Non, le dépistage reste important selon les recommandations',
      'Oui, mais seulement après 30 ans',
      'Non, car le vaccin ne protège contre aucune infection',
    ],
    correct: 1,
    explication:
      'La vaccination protège contre plusieurs types de HPV responsables de cancers, mais elle ne protège pas contre tous les types à risque. Le dépistage reste donc nécessaire selon les recommandations sanitaires.',
  },
  {
    categorie: 'Prévention',
    question: 'Une personne sans douleur ni symptôme peut-elle avoir besoin d’un dépistage ?',
    options: [
      'Oui, certains cancers ou lésions précancéreuses peuvent rester silencieux',
      'Non, l’absence de douleur exclut tout risque',
      'Seulement si un proche est malade',
      'Uniquement après l’apparition d’une boule',
    ],
    correct: 0,
    explication:
      'Certaines lésions précancéreuses et certains cancers débutants ne provoquent pas de symptômes. Le dépistage s’adresse aux personnes qui remplissent les critères recommandés, même lorsqu’elles se sentent bien.',
  },
  {
    categorie: 'Idées reçues',
    question: 'Une personne ayant un cancer peut-elle être guérie ?',
    options: [
      'Jamais, quel que soit le cancer',
      'Uniquement grâce aux plantes',
      'Oui, selon le type de cancer, son stade et les traitements',
      'Seulement si elle n’a jamais eu de symptômes',
    ],
    correct: 2,
    explication:
      'De nombreux cancers peuvent être guéris, notamment lorsqu’ils sont détectés tôt et traités de façon adaptée. Les résultats varient selon le type de cancer et la situation médicale.',
  },
  {
    categorie: 'Agir au Bénin',
    question: 'Tu souhaites faire un dépistage au Bénin. Quelle est la bonne démarche ?',
    options: [
      'Acheter un test sur internet et interpréter seul le résultat',
      'Demander conseil à un centre de santé ou à un professionnel qualifié',
      'Attendre obligatoirement une campagne nationale',
      'Prendre un traitement préventif sans consultation',
    ],
    correct: 1,
    explication:
      'Un centre de santé ou un professionnel qualifié peut expliquer les méthodes disponibles, les critères d’éligibilité et les possibilités de prise en charge. Des campagnes de dépistage sont également organisées au Bénin.',
  },
  {
    categorie: 'Orientation sanitaire',
    question: 'Tu constates un saignement vaginal inhabituel, notamment après un rapport sexuel ou après la ménopause. Que faire ?',
    options: [
      'Ignorer le signe s’il n’y a pas de douleur',
      'Attendre plusieurs mois avant d’en parler',
      'Utiliser un traitement trouvé sur les réseaux sociaux',
      'Consulter un professionnel de santé pour en rechercher la cause',
    ],
    correct: 3,
    explication:
      'Un saignement inhabituel peut avoir plusieurs causes, pas uniquement un cancer. Il mérite une évaluation médicale. En cas de saignement abondant, de malaise ou de douleur intense, cherche une aide médicale urgente.',
  },
]

const styles = {
  page: {
    minHeight: '100vh',
    background: '#fff8fb',
    padding: '36px 18px 60px',
    color: '#30212c',
  },
  container: {
    maxWidth: '760px',
    margin: '0 auto',
  },
  back: {
    display: 'inline-block',
    color: '#8b315d',
    textDecoration: 'none',
    marginBottom: '28px',
    fontWeight: 600,
  },
  panel: {
    background: '#ffffff',
    border: '1px solid #f0dce7',
    borderRadius: '22px',
    padding: 'clamp(20px, 5vw, 38px)',
    boxShadow: '0 12px 36px rgba(100, 37, 75, 0.07)',
  },
  eyebrow: {
    color: '#a13f70',
    fontWeight: 700,
    fontSize: '12px',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 'clamp(28px, 5vw, 39px)',
    lineHeight: 1.15,
    margin: '12px 0',
  },
  muted: {
    color: '#6c5b66',
    lineHeight: 1.7,
  },
  progressTrack: {
    height: '8px',
    borderRadius: '99px',
    background: '#f3e5ed',
    overflow: 'hidden',
    margin: '22px 0 28px',
  },
  options: {
    display: 'grid',
    gap: '12px',
    marginTop: '22px',
  },
  option: {
    width: '100%',
    textAlign: 'left',
    padding: '16px',
    borderRadius: '13px',
    border: '1px solid #ead9e3',
    background: '#ffffff',
    color: '#30212c',
    cursor: 'pointer',
    fontSize: '15px',
    lineHeight: 1.5,
  },
  primary: {
    border: 'none',
    borderRadius: '12px',
    padding: '14px 20px',
    background: '#91365f',
    color: '#ffffff',
    fontWeight: 700,
    fontSize: '15px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
  },
  secondary: {
    border: '1px solid #e4c9d8',
    borderRadius: '12px',
    padding: '13px 18px',
    background: '#ffffff',
    color: '#813054',
    fontWeight: 700,
    fontSize: '15px',
    cursor: 'pointer',
  },
  explanation: {
    marginTop: '22px',
    padding: '18px',
    borderRadius: '14px',
    background: '#f8f0f5',
    lineHeight: 1.7,
  },
}

function Quiz() {
  const [index, setIndex] = useState(0)
  const [selection, setSelection] = useState(null)
  const [validated, setValidated] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [finished, setFinished] = useState(false)

  const question = questions[index]
  const progress = finished ? 100 : ((index + 1) / questions.length) * 100

  function validerReponse() {
    if (selection === null || validated) return

    const bonneReponse = selection === question.correct

    if (bonneReponse) {
      setScore((ancienScore) => ancienScore + 1)
    }

    setAnswers((anciennesReponses) => [
      ...anciennesReponses,
      {
        question: question.question,
        choisi: selection,
        correct: question.correct,
        reussi: bonneReponse,
      },
    ])

    setValidated(true)
  }

  function questionSuivante() {
    if (index === questions.length - 1) {
      setFinished(true)
      return
    }

    setIndex((ancienIndex) => ancienIndex + 1)
    setSelection(null)
    setValidated(false)
  }

  function recommencer() {
    setIndex(0)
    setSelection(null)
    setValidated(false)
    setScore(0)
    setAnswers([])
    setFinished(false)
  }

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <Link to="/" style={styles.back}>
          ← Retour à l’accueil
        </Link>

        <section style={styles.panel}>
          <p style={styles.eyebrow}>RoseRelais · Espace éducatif</p>

          {!finished ? (
            <>
              <h1 style={styles.title}>Le quiz prévention</h1>

              <p style={styles.muted}>
                Teste tes connaissances sur le cancer du sein, le cancer du
                col de l’utérus et les bons réflexes de prévention.
              </p>

              <div
                style={styles.progressTrack}
                role="progressbar"
                aria-label="Progression du quiz"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: '#a13f70',
                    borderRadius: '99px',
                    transition: 'width 200ms ease',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <span style={styles.eyebrow}>{question.categorie}</span>
                <span style={styles.muted}>
                  Question {index + 1} sur {questions.length}
                </span>
              </div>

              <h2
                style={{
                  fontSize: 'clamp(20px, 4vw, 27px)',
                  lineHeight: 1.45,
                  marginTop: '22px',
                }}
              >
                {question.question}
              </h2>

              <div style={styles.options}>
                {question.options.map((option, optionIndex) => {
                  const isSelected = selection === optionIndex
                  const isCorrect = optionIndex === question.correct
                  let background = '#ffffff'
                  let borderColor = '#ead9e3'

                  if (validated && isCorrect) {
                    background = '#eaf7ee'
                    borderColor = '#29834c'
                  } else if (
                    validated &&
                    isSelected &&
                    !isCorrect
                  ) {
                    background = '#fff0f0'
                    borderColor = '#c73c48'
                  } else if (isSelected) {
                    background = '#f8eaf2'
                    borderColor = '#a13f70'
                  }

                  return (
                    <button
                      key={option}
                      type="button"
                      style={{
                        ...styles.option,
                        background,
                        borderColor,
                        borderWidth: isSelected || (validated && isCorrect) ? '2px' : '1px',
                      }}
                      onClick={() => {
                        if (!validated) setSelection(optionIndex)
                      }}
                      disabled={validated}
                      aria-pressed={isSelected}
                    >
                      <span style={{ fontWeight: 700, marginRight: '10px' }}>
                        {String.fromCharCode(65 + optionIndex)}.
                      </span>
                      {option}
                    </button>
                  )
                })}
              </div>

              {validated && (
                <div
                  style={styles.explanation}
                  role="status"
                  aria-live="polite"
                >
                  <strong>
                    {selection === question.correct
                      ? 'Bien joué ! Bonne réponse.'
                      : 'Pas tout à fait. Voici la bonne information.'}
                  </strong>
                  <p style={{ marginBottom: 0 }}>
                    {question.explication}
                  </p>
                </div>
              )}

              <div style={{ marginTop: '24px' }}>
                {!validated ? (
                  <button
                    type="button"
                    style={{
                      ...styles.primary,
                      opacity: selection === null ? 0.55 : 1,
                      cursor: selection === null ? 'not-allowed' : 'pointer',
                    }}
                    onClick={validerReponse}
                    disabled={selection === null}
                  >
                    Valider ma réponse
                  </button>
                ) : (
                  <button
                    type="button"
                    style={styles.primary}
                    onClick={questionSuivante}
                  >
                    {index === questions.length - 1
                      ? 'Voir mon résultat'
                      : 'Question suivante →'}
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <p style={styles.eyebrow}>Quiz terminé</p>
              <h1 style={styles.title}>Ton bilan de connaissances</h1>

              <p
                style={{
                  fontSize: '48px',
                  fontWeight: 800,
                  color: '#91365f',
                  margin: '20px 0 4px',
                }}
              >
                {score}/{questions.length}
              </p>

              <p style={styles.muted}>
                Tu as obtenu {Math.round((score / questions.length) * 100)} %
                de bonnes réponses.
              </p>

              <p style={styles.muted}>
                {score === questions.length
                  ? 'Excellent ! Continue à partager des informations fiables autour de toi.'
                  : score >= 7
                    ? 'Bon travail ! Relis les explications des questions pour consolider tes connaissances.'
                    : 'C’est un bon début. Prends le temps de lire les explications : chaque question est une occasion d’apprendre.'}
              </p>

              <div style={styles.explanation}>
                <strong>À retenir</strong>
                <p style={{ marginBottom: 0 }}>
                  Un quiz ne permet pas de savoir si une personne a un cancer.
                  En cas de signe inhabituel ou de question sur le dépistage,
                  adresse-toi à un professionnel de santé.
                </p>
              </div>

              <h2 style={{ fontSize: '20px', marginTop: '28px' }}>
                Revoir tes réponses
              </h2>

              <div style={{ display: 'grid', gap: '14px', marginTop: '16px' }}>
                {answers.map((answer, answerIndex) => (
                  <div
                    key={`${answerIndex}-${answer.question}`}
                    style={{
                      border: '1px solid #ead9e3',
                      borderRadius: '12px',
                      padding: '15px',
                    }}
                  >
                    <strong>
                      {answerIndex + 1}. {answer.question}
                    </strong>
                    <p style={{ marginBottom: 0, ...styles.muted }}>
                      {answer.reussi
                        ? 'Bonne réponse'
                        : `Réponse attendue : ${questions[answerIndex].options[answer.correct]}`}
                    </p>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap',
                  marginTop: '26px',
                }}
              >
                <button
                  type="button"
                  style={styles.primary}
                  onClick={recommencer}
                >
                  Recommencer le quiz
                </button>

                <Link to="/orientation" style={styles.secondary}>
                  Découvrir l’orientation sanitaire
                </Link>
              </div>
            </>
          )}
        </section>

        <p
          style={{
            ...styles.muted,
            fontSize: '12px',
            textAlign: 'center',
            marginTop: '20px',
          }}
        >
          RoseRelais informe et oriente. Les informations de ce quiz ne
          remplacent pas un avis médical.
        </p>
      </div>
    </main>
  )
}

export default Quiz
