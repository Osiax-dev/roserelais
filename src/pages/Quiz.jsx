import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import ChatAssistant from '../components/ChatAssistant'

/* ------------------------------------------------------------------ */
/*  CONTENUS                                                           */
/* ------------------------------------------------------------------ */

const THEMES = [
  { value: 'sein', label: 'Cancer du sein', texte: 'Signes, idées reçues, repères', symbole: '♡' },
  { value: 'col_uterus', label: 'Cancer du col de l’utérus', texte: 'HPV, lésions, dépistage', symbole: '◎' },
  { value: 'prevention', label: 'Prévention et dépistage', texte: 'Agir avant les symptômes', symbole: '▦' },
  { value: 'hpv', label: 'Vaccination contre le HPV', texte: 'Protection et calendrier', symbole: '✚' },
  { value: 'orientation', label: 'Orientation sanitaire', texte: 'Quand et vers qui se tourner', symbole: '⌖' },
  { value: 'general', label: 'Connaissances générales', texte: 'Les notions essentielles', symbole: '✦' },
]

const NIVEAUX = [
  { value: 'facile', label: 'Facile', description: 'Découvrir les notions de base' },
  { value: 'moyen', label: 'Moyen', description: 'Appliquer ses connaissances' },
  { value: 'difficile', label: 'Difficile', description: 'Approfondir les notions' },
]

/* ------------------------------------------------------------------ */
/*  ILLUSTRATION SVG                                                   */
/* ------------------------------------------------------------------ */

const P = '#96365f'
const PD = '#702344'
const PM = '#d68aa9'
const PL = '#f8d3e2'
const PB = '#fde9f1'

function QuizIllustration() {
  return (
    <svg
      viewBox="0 0 480 380"
      role="img"
      aria-label="Une bulle de question, une coche de bonne réponse et des cartes de quiz"
      style={{ display: 'block', width: '100%', height: 'auto' }}
    >
      <rect width="100%" height="100%" rx="28" fill={PB} />
      <circle cx="240" cy="190" r="140" fill={PL} />
      <circle cx="240" cy="190" r="98" fill="#fff" opacity=".6" />

      {/* carte principale */}
      <g transform="translate(130 80)">
        <rect width="220" height="200" rx="22" fill="#fff" stroke="#f0d3df" strokeWidth="2" />
        <rect x="24" y="26" width="110" height="12" rx="6" fill={PL} />
        {[70, 108, 146].map((y, i) => (
          <g key={y}>
            <rect x="24" y={y} width="172" height="26" rx="10" fill={i === 1 ? PL : '#fff'} stroke={i === 1 ? P : '#f0d3df'} strokeWidth="2" />
            <circle cx="42" cy={y + 13} r="6" fill={i === 1 ? P : PM} />
            <rect x="58" y={y + 8} width={90 - i * 12} height="10" rx="5" fill={i === 1 ? PD : PL} />
          </g>
        ))}
      </g>

      {/* bulle point d'interrogation */}
      <g transform="translate(68 52)">
        <circle r="38" cx="38" cy="38" fill={P} />
        <path d="M30 70 L22 92 L50 76 Z" fill={P} />
        <text x="38" y="54" textAnchor="middle" fontSize="46" fontWeight="800" fill="#fff">?</text>
      </g>

      {/* coche */}
      <g transform="translate(358 218)">
        <circle cx="44" cy="44" r="44" fill="#fff" stroke={P} strokeWidth="6" />
        <path d="M24 46 L40 62 L68 28" fill="none" stroke={P} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <circle cx="430" cy="64" r="8" fill={P} opacity=".5" />
      <circle cx="52" cy="318" r="7" fill={PM} opacity=".7" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

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
  const [sources, setSources] = useState([])

  const zoneQuiz = useRef(null)
  const question = questions[index]
  const themeActif = THEMES.find((t) => t.value === theme)
  const niveauActif = NIVEAUX.find((n) => n.value === niveau)

  function remonter() {
    zoneQuiz.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

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
    setSources([])

    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme, niveau }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Impossible de préparer le quiz.')
      }

      if (!Array.isArray(data.questions) || data.questions.length !== 10) {
        throw new Error('Le quiz reçu est incomplet. Essayez de nouveau.')
      }

      setQuestions(data.questions)
      setSources(Array.isArray(data.sources) ? data.sources : [])
      setTimeout(remonter, 50)
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
      remonter()
      return
    }

    setIndex((ancien) => ancien + 1)
    setSelection(null)
    setValidee(false)
    remonter()
  }

  function recommencer() {
    setQuestions([])
    setIndex(0)
    setSelection(null)
    setValidee(false)
    setScore(0)
    setTermine(false)
    setErreur('')
    setSources([])
    remonter()
  }

  const messageResultat =
    score >= 8
      ? 'Très bien ! Continuez à approfondir vos connaissances.'
      : score >= 5
        ? 'Bon début ! Relisez les explications pour progresser.'
        : 'Continuez à apprendre : chaque réponse expliquée est une occasion de progresser.'

  return (
    <div className="site-shell quiz-page">
      <style>{`
        .quiz-page {
          --rose-primary: #96365f;
          --rose-accent: #a43b68;
          --rose-dark: #702344;
          --rose-medium: #d68aa9;
          --rose-soft: #fff4f8;
          --rose-pale: #fff7fa;
          --rose-border: #f0dfe7;
          --text: #4b3a45;
          --text-strong: #30212b;
          --text-muted: #5a4853;
          --ok: #29834c;
          --ok-bg: #eaf7ee;
          --ko: #c73c48;
          --ko-bg: #fff0f0;
          color: var(--text-strong);
          background: #fff;
          overflow: hidden;
        }

        .quiz-page * { box-sizing: border-box; }
        .quiz-page figure { margin: 0; }

        .quiz-page p { font-size: 17px; line-height: 1.85; color: var(--text); }

        .quiz-page .qz-container { width: 100%; max-width: 1120px; margin: 0 auto; }

        .quiz-page .qz-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0 0 12px;
          color: var(--rose-accent);
          font-size: 14px;
          font-weight: 800;
          letter-spacing: .13em;
          line-height: 1.6;
        }
        .quiz-page .qz-eyebrow::before {
          content: '';
          width: 26px;
          height: 2px;
          border-radius: 4px;
          background: #c35b87;
        }

        .quiz-page .qz-heading {
          margin: 10px 0 20px;
          color: var(--text-strong);
          font-size: clamp(1.8rem, 3.5vw, 2.7rem);
          line-height: 1.2;
          letter-spacing: -.035em;
        }

        /* HERO */
        .quiz-page .qz-hero {
          padding: 70px 24px;
          background:
            radial-gradient(ellipse at 82% 20%, rgba(231, 174, 199, .22), transparent 34%),
            linear-gradient(135deg, #fff3f7 0%, #fffafd 55%, #f6eff8 100%);
        }
        .quiz-page .qz-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr);
          gap: 54px;
          align-items: center;
          max-width: 1160px;
        }
        .quiz-page .qz-hero h1 {
          margin: 12px 0 24px;
          max-width: 650px;
          color: #392331;
          font-size: clamp(2.3rem, 5vw, 4rem);
          line-height: 1.08;
          letter-spacing: -.045em;
        }
        .quiz-page .qz-hero-art {
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 24px 65px rgba(80, 30, 55, .15);
        }

        .quiz-page .qz-note {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          max-width: 570px;
          margin-top: 26px;
          padding: 14px 16px;
          border-radius: 14px;
          background: rgba(255, 255, 255, .78);
          border: 1px solid #f1dce6;
        }
        .quiz-page .qz-note span { color: var(--rose-primary); font-size: 20px; }
        .quiz-page .qz-note p { margin: 0; font-size: 15px; line-height: 1.7; color: var(--text-muted); }

        /* SECTIONS */
        .quiz-page .qz-section { padding: 70px 24px; scroll-margin-top: 24px; }
        .quiz-page .qz-section-alt { background: var(--rose-pale); }

        .quiz-page .qz-card {
          padding: clamp(22px, 4vw, 38px);
          background: #fff;
          border: 1px solid var(--rose-border);
          border-radius: 22px;
          box-shadow: 0 12px 36px rgba(91, 36, 64, .06);
        }

        .quiz-page .qz-label {
          display: block;
          margin: 0 0 14px;
          color: var(--text-strong);
          font-size: 18px;
          font-weight: 750;
        }

        /* CHOIX THEME / NIVEAU */
        .quiz-page .qz-choices {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr));
          gap: 14px;
        }
        .quiz-page .qz-choice {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
          padding: 18px;
          text-align: left;
          font: inherit;
          color: var(--text-strong);
          background: #fff;
          border: 2px solid #ead9e3;
          border-radius: 16px;
          cursor: pointer;
          transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease, background .2s ease;
        }
        .quiz-page .qz-choice:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(91, 36, 64, .09);
        }
        .quiz-page .qz-choice[aria-pressed='true'] {
          border-color: var(--rose-accent);
          background: var(--rose-soft);
        }
        .quiz-page .qz-choice:disabled { opacity: .6; cursor: default; }
        .quiz-page .qz-choice strong { font-size: 18px; line-height: 1.4; }
        .quiz-page .qz-choice small { font-size: 16px; line-height: 1.5; color: var(--text-muted); }

        .quiz-page .qz-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          border-radius: 14px;
          background: #fce8f0;
          color: var(--rose-primary);
          font-size: 22px;
          font-weight: 800;
        }

        /* BOUTONS */
        .quiz-page .qz-button {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          gap: 9px;
          min-height: 50px;
          padding: 12px 24px;
          font: inherit;
          font-size: 17px;
          font-weight: 750;
          color: #843454;
          background: #fff;
          border: 1px solid #ead4df;
          border-radius: 12px;
          cursor: pointer;
          text-decoration: none;
          transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
        }
        .quiz-page .qz-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(91, 36, 64, .10);
        }
        .quiz-page .qz-button:disabled { opacity: .55; cursor: not-allowed; }
        .quiz-page .qz-button-primary { background: var(--rose-primary); border-color: var(--rose-primary); color: #fff; }
        .quiz-page .qz-button-primary:hover:not(:disabled) { background: #762646; }

        .quiz-page .qz-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }

        .quiz-page .qz-recap {
          margin-top: 28px;
          padding: 14px 18px;
          border-radius: 14px;
          background: var(--rose-soft);
          border: 1px solid var(--rose-border);
        }
        .quiz-page .qz-recap p { margin: 0; font-size: 17px; line-height: 1.7; }

        .quiz-page .qz-error {
          margin-top: 22px;
          padding: 14px 18px;
          border-radius: 12px;
          background: var(--ko-bg);
          border: 1px solid #f2c4c8;
          color: #a02a36;
          font-size: 17px;
          line-height: 1.6;
        }

        /* PROGRESSION */
        .quiz-page .qz-progress-top {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 10px;
          font-size: 16px;
          font-weight: 700;
          color: var(--text-muted);
        }
        .quiz-page .qz-bar { height: 10px; border-radius: 99px; background: #f3e5ed; overflow: hidden; }
        .quiz-page .qz-bar-fill { height: 100%; border-radius: 99px; background: var(--rose-accent); transition: width .3s ease; }

        .quiz-page .qz-question {
          margin: 28px 0 0;
          font-size: clamp(1.3rem, 2.6vw, 1.7rem);
          line-height: 1.5;
          letter-spacing: -.01em;
        }

        /* REPONSES */
        .quiz-page .qz-options { display: grid; gap: 12px; margin-top: 22px; }
        .quiz-page .qz-option {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          width: 100%;
          padding: 16px 18px;
          text-align: left;
          font: inherit;
          font-size: 17px;
          line-height: 1.6;
          color: var(--text-strong);
          background: #fff;
          border: 2px solid #ead9e3;
          border-radius: 14px;
          cursor: pointer;
          transition: border-color .2s ease, background .2s ease, transform .2s ease;
        }
        .quiz-page .qz-option:hover:not(:disabled) { transform: translateY(-2px); border-color: var(--rose-medium); }
        .quiz-page .qz-option:disabled { cursor: default; }
        .quiz-page .qz-option.is-selected { background: #f8eaf2; border-color: var(--rose-accent); }
        .quiz-page .qz-option.is-correct { background: var(--ok-bg); border-color: var(--ok); }
        .quiz-page .qz-option.is-wrong { background: var(--ko-bg); border-color: var(--ko); }
        .quiz-page .qz-letter {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 34px;
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: #fce8f0;
          color: var(--rose-primary);
          font-size: 16px;
          font-weight: 800;
        }

        .quiz-page .qz-feedback {
          margin-top: 22px;
          padding: 20px 22px;
          border-radius: 16px;
          background: var(--rose-soft);
          border: 1px solid var(--rose-border);
          border-left: 5px solid var(--rose-accent);
        }
        .quiz-page .qz-feedback.is-good { border-left-color: var(--ok); background: var(--ok-bg); }
        .quiz-page .qz-feedback strong { font-size: 18px; color: var(--text-strong); }
        .quiz-page .qz-feedback p { margin: 8px 0 0; }

        /* RESULTAT */
        .quiz-page .qz-result { text-align: center; padding: 10px 0; }
        .quiz-page .qz-score {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 170px;
          height: 170px;
          margin: 18px 0 8px;
          border-radius: 50%;
          background: var(--rose-soft);
          border: 8px solid var(--rose-medium);
          color: var(--rose-primary);
          font-size: 54px;
          font-weight: 850;
          line-height: 1;
        }
        .quiz-page .qz-score small { margin-top: 6px; font-size: 17px; font-weight: 700; color: var(--text-muted); }
        .quiz-page .qz-result .qz-actions { justify-content: center; }

        /* SOURCES */
        .quiz-page .qz-sources { display: grid; gap: 12px; margin: 20px 0 0; padding: 0; list-style: none; }
        .quiz-page .qz-sources li {
          padding: 16px 18px;
          border-radius: 14px;
          background: #fff;
          border: 1px solid var(--rose-border);
        }
        .quiz-page .qz-link { color: var(--rose-accent); font-size: 17px; font-weight: 700; text-decoration: none; }
        .quiz-page .qz-link:hover { color: var(--rose-dark); text-decoration: underline; }

        .quiz-page .qz-legal { margin: 28px auto 0; max-width: 760px; text-align: center; font-size: 15px; line-height: 1.8; color: var(--text-muted); }

        /* FOOTER */
        .quiz-page .qz-footer {
          padding: 38px 24px;
          text-align: center;
          background: var(--rose-soft);
          border-top: 1px solid #f0dce4;
        }
        .quiz-page .qz-footer-brand {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: var(--rose-dark);
          text-decoration: none;
        }
        .quiz-page .qz-footer-brand strong { font-size: 19px; }
        .quiz-page .qz-footer p { margin: 8px 0 0; font-size: 16px; color: #6a4a5c; line-height: 1.7; }
        .quiz-page .qz-footer .qz-footer-legal { max-width: 760px; margin: 16px auto 0; font-size: 15px; color: var(--text-muted); line-height: 1.8; }

        .quiz-page button:focus-visible,
        .quiz-page a:focus-visible {
          outline: 3px solid #d98bad;
          outline-offset: 4px;
          border-radius: 8px;
        }

        @media (max-width: 860px) {
          .quiz-page .qz-hero-grid { grid-template-columns: minmax(0, 1fr); gap: 30px; }
        }

        @media (max-width: 760px) {
          .quiz-page .qz-hero { padding: 44px 20px 48px; }
          .quiz-page .qz-section { padding: 48px 20px; }
          .quiz-page .qz-actions .qz-button { width: 100%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .quiz-page *, .quiz-page *::before, .quiz-page *::after {
            transition: none !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" to="/" aria-label="RoseRelais, accueil">
<img
  src="/images/RoseRelais_logo_R2.png"
  alt="Logo RoseRelais"
  width={44}
  height={44}
  className="object-contain"
/>            <span className="brand-copy">
              <strong>RoseRelais</strong>
              <small>Informer. Orienter. Accompagner.</small>
            </span>
          </Link>

          <nav className="main-navigation" aria-label="Navigation principale">
            <Link to="/">Accueil</Link>
            <Link to="/prevention/sein">Cancer du sein</Link>
            <Link to="/orientation">Orientation</Link>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="qz-hero">
          <div className="qz-container qz-hero-grid">
            <div>
              <p className="qz-eyebrow">APPRENDRE EN S’AMUSANT</p>
              <h1>Testez vos connaissances en santé de la femme</h1>
              <p style={{ maxWidth: 600, fontSize: 18 }}>
                Choisissez un thème et un niveau : dix questions pour apprendre,
                avec une explication après chaque réponse.
              </p>

              <div className="qz-actions">
                <a className="qz-button qz-button-primary" href="#quiz">
                  Commencer le quiz <span aria-hidden="true">↓</span>
                </a>
              </div>

              <div className="qz-note">
                <span aria-hidden="true">♡</span>
                <p>
                  Quiz éducatif : il ne permet pas de diagnostiquer une maladie
                  et ne remplace pas un avis médical.
                </p>
              </div>
            </div>

            <figure className="qz-hero-art">
              <QuizIllustration />
            </figure>
          </div>
        </section>

        {/* QUIZ */}
        <section id="quiz" className="qz-section" ref={zoneQuiz}>
          <div className="qz-container" style={{ maxWidth: 860 }}>
            {/* CONFIGURATION */}
            {!questions.length && (
              <div className="qz-card">
                <p className="qz-eyebrow">VOTRE QUIZ</p>
                <h2 className="qz-heading" style={{ marginTop: 0 }}>
                  Choisissez votre série
                </h2>

                <form onSubmit={commencerQuiz}>
                  <span className="qz-label" id="label-theme">1. Le thème</span>
                  <div className="qz-choices" role="group" aria-labelledby="label-theme">
                    {THEMES.map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        className="qz-choice"
                        aria-pressed={theme === item.value}
                        onClick={() => setTheme(item.value)}
                        disabled={chargement}
                      >
                        <span className="qz-icon" aria-hidden="true">{item.symbole}</span>
                        <strong>{item.label}</strong>
                        <small>{item.texte}</small>
                      </button>
                    ))}
                  </div>

                  <span className="qz-label" id="label-niveau" style={{ marginTop: 34 }}>
                    2. Le niveau
                  </span>
                  <div className="qz-choices" role="group" aria-labelledby="label-niveau">
                    {NIVEAUX.map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        className="qz-choice"
                        aria-pressed={niveau === item.value}
                        onClick={() => setNiveau(item.value)}
                        disabled={chargement}
                      >
                        <strong>{item.label}</strong>
                        <small>{item.description}</small>
                      </button>
                    ))}
                  </div>

                  <div className="qz-recap">
                    <p>
                      <strong>Votre choix :</strong> {themeActif?.label} · niveau{' '}
                      {niveauActif?.label.toLowerCase()}
                    </p>
                  </div>

                  {erreur && (
                    <p role="alert" className="qz-error">
                      {erreur}
                    </p>
                  )}

                  <div className="qz-actions">
                    <button
                      type="submit"
                      className="qz-button qz-button-primary"
                      disabled={chargement}
                    >
                      {chargement ? 'Préparation en cours…' : 'Lancer mes 10 questions'}
                    </button>
                  </div>

                  {chargement && (
                    <p role="status" style={{ marginTop: 16, color: 'var(--text-muted)' }}>
                      Votre quiz se prépare. Cela peut prendre quelques secondes.
                    </p>
                  )}
                </form>
              </div>
            )}

            {/* QUESTION */}
            {question && !termine && (
              <div className="qz-card">
                <div className="qz-progress-top">
                  <span>Question {index + 1} sur {questions.length}</span>
                  <span>{themeActif?.label}</span>
                </div>
                <div
                  className="qz-bar"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={questions.length}
                  aria-valuenow={index + 1}
                >
                  <div
                    className="qz-bar-fill"
                    style={{ width: `${((index + 1) / questions.length) * 100}%` }}
                  />
                </div>

                <h2 className="qz-question">{question.question}</h2>

                <div className="qz-options">
                  {question.options.map((option, optionIndex) => {
                    const choisie = selection === optionIndex
                    const correcte = question.correctIndex === optionIndex

                    let etat = ''
                    if (validee && correcte) etat = ' is-correct'
                    else if (validee && choisie && !correcte) etat = ' is-wrong'
                    else if (choisie) etat = ' is-selected'

                    return (
                      <button
                        key={`${index}-${optionIndex}`}
                        type="button"
                        className={`qz-option${etat}`}
                        onClick={() => !validee && setSelection(optionIndex)}
                        disabled={validee}
                        aria-pressed={choisie}
                      >
                        <span className="qz-letter" aria-hidden="true">
                          {String.fromCharCode(65 + optionIndex)}
                        </span>
                        <span>{option}</span>
                      </button>
                    )
                  })}
                </div>

                {validee && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`qz-feedback${selection === question.correctIndex ? ' is-good' : ''}`}
                  >
                    <strong>
                      {selection === question.correctIndex ? 'Bonne réponse !' : 'À retenir :'}
                    </strong>
                    <p>{question.explication}</p>
                    <p>
                      <strong>Fait de référence :</strong> {question.faitSource}
                    </p>
                  </div>
                )}

                <div className="qz-actions">
                  {!validee ? (
                    <button
                      type="button"
                      className="qz-button qz-button-primary"
                      onClick={validerReponse}
                      disabled={selection === null}
                    >
                      Valider ma réponse
                    </button>
                  ) : (
                    <button type="button" className="qz-button qz-button-primary" onClick={suivante}>
                      {index === questions.length - 1 ? 'Voir mon résultat' : 'Question suivante →'}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* RESULTAT */}
            {termine && (
              <div className="qz-card qz-result">
                <p className="qz-eyebrow" style={{ justifyContent: 'center' }}>VOTRE RÉSULTAT</p>
                <h2 className="qz-heading" style={{ marginTop: 0 }}>Quiz terminé</h2>

                <div className="qz-score" aria-label={`Score : ${score} sur 10`}>
                  {score}
                  <small>sur 10</small>
                </div>

                <p style={{ maxWidth: 560, margin: '12px auto 0' }}>{messageResultat}</p>

                <div className="qz-actions">
                  <button type="button" className="qz-button qz-button-primary" onClick={recommencer}>
                    Choisir un autre quiz
                  </button>
                  <button type="button" className="qz-button" onClick={() => commencerQuiz()}>
                    Rejouer avec de nouvelles questions
                  </button>
                </div>
              </div>
            )}

            <p className="qz-legal">
              Ce quiz est éducatif. Il ne permet pas de diagnostiquer un cancer
              et ne remplace pas un avis médical.
            </p>
          </div>
        </section>

        {/* SOURCES */}
        {sources.length > 0 && (
          <section className="qz-section qz-section-alt">
            <div className="qz-container" style={{ maxWidth: 860 }}>
              <p className="qz-eyebrow">ALLER PLUS LOIN</p>
              <h2 className="qz-heading">Sources de référence</h2>
              <ul className="qz-sources">
                {sources.map((source) => (
                  <li key={source.url}>
                    <a
                      className="qz-link"
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {source.nom} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* NAVIGATION */}
        <section className="qz-section">
          <div className="qz-container" style={{ maxWidth: 860 }}>
            <p className="qz-eyebrow">CONTINUER À S’INFORMER</p>
            <h2 className="qz-heading">Découvrez les autres ressources RoseRelais</h2>
            <div className="qz-choices">
              <Link to="/prevention/sein" className="qz-choice" style={{ textDecoration: 'none' }}>
                <span className="qz-icon" aria-hidden="true">♡</span>
                <strong>Cancer du sein</strong>
                <small>Reconnaître les signes et comprendre le dépistage.</small>
              </Link>
              <Link to="/orientation" className="qz-choice" style={{ textDecoration: 'none' }}>
                <span className="qz-icon" aria-hidden="true">⌖</span>
                <strong>Orientation sanitaire</strong>
                <small>Préparer sa démarche de santé.</small>
              </Link>
            </div>
            <p style={{ marginTop: 28 }}>
              <Link className="qz-link" to="/">← Retour à l’accueil de RoseRelais</Link>
            </p>
          </div>
        </section>
      </main>

      <footer className="qz-footer">
        <Link to="/" className="qz-footer-brand">
<img
  src="/images/RoseRelais_logo_R2.png"
  alt="Logo RoseRelais"
  width={44}
  height={44}
  className="object-contain"
/>          <strong>RoseRelais</strong>
        </Link>
        <p>Informer. Orienter. Accompagner.</p>
        <p className="qz-footer-legal">
          Les contenus de ce site sont fournis à des fins éducatives. Ils ne
          remplacent pas une consultation, un diagnostic ou un traitement
          médical.
        </p>
      </footer>

      <ChatAssistant />
    </div>
  )
}