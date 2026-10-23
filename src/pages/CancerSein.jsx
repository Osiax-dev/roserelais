import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import ChatAssistant from '../components/ChatAssistant'

/* ------------------------------------------------------------------ */
/*  DONNÉES                                                            */
/*  Visuels des organisations : images officielles liées en direct.    */
/*  Si une image ne charge pas, un badge avec le sigle s'affiche.      */
/*  Idéal : télécharger ces images dans public/ressources/ et pointer  */
/*  vers /ressources/... pour ne pas dépendre des sites externes.      */
/* ------------------------------------------------------------------ */

const ressources = [
  {
    categorie: 'SOURCE MÉDICALE',
    titre: 'Organisation mondiale de la Santé',
    description:
      'Comprendre les symptômes, la détection précoce et les principes de prise en charge du cancer du sein.',
    url: 'https://www.who.int/fr/news-room/fact-sheets/detail/breast-cancer',
    action: 'Lire la fiche de l’OMS',
    image:
      'https://www.afro.who.int/sites/default/files/styles/social_1200x630/public/2025-02/1000808414_0.jpg.jpeg?itok=duO_AWxB',
    fit: 'cover',
    credit: 'Photo : OMS Bénin, Octobre Rose 2024',
    sigle: 'OMS',
  },
  {
    categorie: 'RESSOURCE AU BÉNIN',
    titre: 'Programme national de lutte contre les maladies non transmissibles',
    description:
      'Suivre les informations nationales relatives aux protocoles et aux campagnes de dépistage.',
    url: 'https://pnlmnt.bj/',
    action: 'Visiter le site du PNLMNT',
    image:
      'https://pnlmnt.bj/storage/app/resources/resize/1280_720_crop/img_2d795096ade338c9f40c7c8253e7ca61.jpeg',
    fit: 'cover',
    credit: 'Photo : PNLMNT, Octobre Rose 2026 à Cotonou',
    sigle: 'PNLMNT',
  },
  {
    categorie: 'INFORMATION OFFICIELLE',
    titre: 'Ministère de la Santé du Bénin',
    description:
      'Consulter les actualités et les informations sanitaires publiées par les autorités béninoises.',
    url: 'https://sante.gouv.bj/',
    action: 'Consulter le ministère',
    image: 'https://sante.gouv.bj/logo.png',
    fit: 'contain',
    sigle: 'MS',
  },
  {
    categorie: 'CAMPAGNE NATIONALE',
    titre: 'Dépistage des cancers féminins au Bénin',
    description:
      'Lire le compte rendu gouvernemental de la campagne nationale lancée en mars 2026.',
    url: 'https://www.gouv.bj/article/3479/sante-sexuelle-reproductive-gouvernement-lance-jours-planification-depistage-gratuits-cancers-femme/',
    action: 'Lire le compte rendu',
    image: 'https://www.gouv.bj/upload/images/banners//963750137864001775052766.jpg',
    fit: 'cover',
    credit: 'Photo : Gouvernement du Bénin',
    sigle: 'GOUV.BJ',
  },
]

const signes = [
  {
    numero: '01',
    titre: 'Une boule ou un épaississement',
    description:
      'Une masse nouvelle dans le sein ou sous l’aisselle, même si elle ne fait pas mal.',
    art: 'boule',
  },
  {
    numero: '02',
    titre: 'Un changement de forme',
    description:
      'Une modification inhabituelle de la taille, de la forme ou de l’apparence d’un sein.',
    art: 'forme',
  },
  {
    numero: '03',
    titre: 'Une modification de la peau',
    description:
      'Une rougeur persistante, un creux, un épaississement ou un aspect ressemblant à la peau d’orange.',
    art: 'peau',
  },
  {
    numero: '04',
    titre: 'Un changement du mamelon',
    description:
      'Une rétraction nouvelle du mamelon, une modification inhabituelle ou un écoulement, surtout s’il est sanglant.',
    art: 'mamelon',
  },
]

const faq = [
  {
    question: 'Une boule dans le sein signifie-t-elle toujours un cancer ?',
    reponse:
      'Non. De nombreuses masses mammaires sont bénignes. Toutefois, une nouvelle boule ou un changement inhabituel doit être évalué par un professionnel de santé.',
  },
  {
    question: 'Le cancer du sein fait-il toujours mal ?',
    reponse:
      'Non. Une anomalie peut être indolore. Il ne faut donc pas attendre l’apparition d’une douleur pour consulter.',
  },
  {
    question: 'Le cancer du sein concerne-t-il uniquement les femmes âgées ?',
    reponse:
      'Non. Le risque augmente notamment avec l’âge, mais un cancer du sein peut également survenir chez une personne plus jeune. Tout changement inhabituel mérite une évaluation.',
  },
  {
    question: 'L’autopalpation suffit-elle pour dépister un cancer ?',
    reponse:
      'Non. Connaître l’apparence habituelle de ses seins peut aider à remarquer un changement, mais l’autopalpation ne remplace pas une consultation ni les examens recommandés selon la situation.',
  },
  {
    question: 'À quel âge faut-il commencer le dépistage ?',
    reponse:
      'Il n’existe pas un âge unique adapté à toutes les situations. Les recommandations dépendent notamment de l’âge, des antécédents personnels et familiaux et des protocoles sanitaires applicables. Demandez conseil à un professionnel de santé.',
  },
  {
    question: 'Peut-on réduire son risque de cancer du sein ?',
    reponse:
      'Certains facteurs de risque ne peuvent pas être modifiés. Une activité physique régulière, la limitation de la consommation d’alcool et le maintien d’habitudes favorables à la santé peuvent contribuer à réduire certains risques, sans garantir une prévention absolue.',
  },
]

/* Couleurs de texte (gris assombris pour une meilleure lisibilité) */
const TEXT = '#4b3a45'
const TEXT_STRONG = '#40303a'
const TEXT_MUTED = '#5a4853'

const styles = {
  section: { padding: '76px 24px' },
  container: { width: '100%', maxWidth: 1120, margin: '0 auto' },
  heading: {
    fontSize: 'clamp(1.8rem, 3.5vw, 2.7rem)',
    lineHeight: 1.2,
    letterSpacing: '-0.035em',
    color: '#30212b',
    marginTop: 10,
    marginBottom: 20,
  },
  paragraph: { color: TEXT, lineHeight: 1.9 },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 235px), 1fr))',
    gap: 20,
    marginTop: 30,
  },
  card: {
    padding: 25,
    background: '#ffffff',
    border: '1px solid #f0dfe7',
    borderRadius: 20,
    boxShadow: '0 8px 30px rgba(91, 36, 64, 0.045)',
  },
}

/* ------------------------------------------------------------------ */
/*  ILLUSTRATIONS SVG ORIGINALES                                       */
/* ------------------------------------------------------------------ */

const P = '#96365f' // rose principal
const PD = '#702344' // rose foncé
const PM = '#d68aa9' // rose moyen
const PL = '#f8d3e2' // rose clair
const PB = '#fde9f1' // fond

function Frame({ label, viewBox = '0 0 400 300', children }) {
  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={label}
      style={{ display: 'block', width: '100%', height: 'auto' }}
    >
      <rect width="100%" height="100%" rx="28" fill={PB} />
      {children}
    </svg>
  )
}

function Ribbon({ x = 0, y = 0, s = 1, fill = P }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M240 235 L190 320 L222 312 L245 335 L258 240 Z" fill={PD} />
      <path d="M240 235 L290 320 L258 312 L235 335 L222 240 Z" fill={fill} />
      <path
        d="M240 110 C200 70 150 110 185 160 L240 235 L295 160 C330 110 280 70 240 110 Z"
        fill={fill}
      />
      <path
        d="M240 135 C222 112 196 128 210 154 L240 200 L270 154 C284 128 258 112 240 135 Z"
        fill={PL}
      />
    </g>
  )
}

function HeroIllustration() {
  return (
    <Frame label="Ruban rose de sensibilisation entouré d’un rendez-vous médical, d’une loupe et d’un cœur" viewBox="0 0 480 420">
      <circle cx="240" cy="205" r="150" fill={PL} />
      <circle cx="240" cy="205" r="105" fill="#fff" opacity=".6" />
      <Ribbon x={0} y={-20} s={1} />
      {/* carte rendez-vous */}
      <g transform="translate(34 70)">
        <rect width="112" height="96" rx="16" fill="#fff" stroke="#f0d3df" />
        <rect width="112" height="26" rx="16" fill={P} />
        <rect y="14" width="112" height="12" fill={P} />
        <circle cx="30" cy="8" r="4" fill="#fff" />
        <circle cx="82" cy="8" r="4" fill="#fff" />
        {[0, 1, 2].map((r) =>
          [0, 1, 2, 3].map((c) => (
            <rect key={`${r}${c}`} x={14 + c * 22} y={38 + r * 18} width="14" height="10" rx="3" fill={r === 1 && c === 2 ? P : PL} />
          ))
        )}
      </g>
      {/* loupe */}
      <g transform="translate(330 90)">
        <circle cx="40" cy="40" r="34" fill="#fff" stroke={P} strokeWidth="9" />
        <line x1="66" y1="66" x2="98" y2="98" stroke={PD} strokeWidth="12" strokeLinecap="round" />
        <path d="M24 40 h12 l6 -12 l8 24 l6 -12 h8" fill="none" stroke={PM} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* cœur */}
      <g transform="translate(350 290)">
        <path d="M40 66 C0 40 0 6 24 4 C36 3 40 14 40 18 C40 14 44 3 56 4 C80 6 80 40 40 66Z" fill={PM} />
      </g>
      {/* étincelles */}
      <circle cx="70" cy="300" r="9" fill={PM} opacity=".7" />
      <circle cx="104" cy="338" r="5" fill={P} opacity=".6" />
      <circle cx="430" cy="60" r="6" fill={P} opacity=".5" />
    </Frame>
  )
}

function CellsIllustration() {
  const normal = [
    [70, 110], [110, 100], [90, 145], [135, 140], [60, 160], [115, 180],
  ]
  const anormal = [
    [265, 95], [300, 88], [335, 100], [255, 130], [290, 128], [325, 135],
    [360, 130], [270, 168], [305, 172], [340, 170], [285, 205], [320, 208],
    [350, 190], [250, 190],
  ]
  return (
    <Frame label="Schéma : cellules normales à gauche, multiplication anormale de cellules à droite">
      <text x="50" y="50" fontSize="14" fontWeight="700" fill={TEXT_STRONG}>Cellules normales</text>
      <text x="235" y="50" fontSize="14" fontWeight="700" fill={PD}>Multiplication anormale</text>
      {normal.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="19" fill="#fff" stroke={PM} strokeWidth="3" />
          <circle cx={x} cy={y} r="7" fill={PM} />
        </g>
      ))}
      <path d="M170 150 h46 m-10 -10 l10 10 l-10 10" fill="none" stroke={P} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      {anormal.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i % 3 === 0 ? 17 : 14} fill={i % 2 ? PL : '#fff'} stroke={P} strokeWidth="3" />
          <circle cx={x + 1} cy={y} r={i % 3 === 0 ? 8 : 6} fill={P} />
        </g>
      ))}
      <text x="50" y="262" fontSize="12.5" fill={TEXT}>Les cellules se renouvellent normalement.</text>
      <text x="50" y="282" fontSize="12.5" fill={TEXT}>Dans le cancer, certaines se multiplient sans contrôle.</text>
    </Frame>
  )
}

/* Petites illustrations pour les 4 signes */
function SigneArt({ type }) {
  const common = { viewBox: '0 0 160 110', role: 'img', style: { display: 'block', width: '100%', height: 'auto' } }
  const bg = <rect width="160" height="110" rx="16" fill={PB} />
  if (type === 'boule')
    return (
      <svg {...common} aria-label="Illustration : une boule repérée sous la peau">
        {bg}
        <path d="M30 78 C50 40 110 40 130 78" fill="none" stroke={PM} strokeWidth="4" strokeLinecap="round" />
        <circle cx="92" cy="62" r="9" fill={P} />
        <circle cx="92" cy="62" r="22" fill="none" stroke={P} strokeWidth="3" strokeDasharray="5 5" />
        <circle cx="122" cy="30" r="14" fill="#fff" stroke={PD} strokeWidth="4" />
        <line x1="132" y1="40" x2="145" y2="53" stroke={PD} strokeWidth="5" strokeLinecap="round" />
      </svg>
    )
  if (type === 'forme')
    return (
      <svg {...common} aria-label="Illustration : comparaison de deux formes différentes">
        {bg}
        <path d="M22 80 C32 36 62 36 72 80" fill="none" stroke={PM} strokeWidth="5" strokeLinecap="round" />
        <path d="M88 80 C94 52 112 34 142 52 C134 60 136 70 140 80" fill="none" stroke={P} strokeWidth="5" strokeLinecap="round" />
        <path d="M88 80 C98 36 128 36 138 80" fill="none" stroke={PM} strokeWidth="3" strokeDasharray="5 5" />
        <text x="47" y="98" fontSize="10" textAnchor="middle" fill={TEXT}>Habituel</text>
        <text x="113" y="98" fontSize="10" textAnchor="middle" fill={TEXT}>Changement</text>
      </svg>
    )
  if (type === 'peau')
    return (
      <svg {...common} aria-label="Illustration : aspect de peau d’orange">
        {bg}
        <rect x="26" y="20" width="108" height="70" rx="14" fill={PL} />
        {[0, 1, 2, 3, 4].map((r) =>
          [0, 1, 2, 3, 4, 5].map((c) => (
            <circle key={`${r}${c}`} cx={42 + c * 15 + (r % 2) * 7} cy={32 + r * 13} r="3" fill={P} opacity=".75" />
          ))
        )}
      </svg>
    )
  return (
    <svg {...common} aria-label="Illustration : modification du mamelon">
      {bg}
      <circle cx="80" cy="55" r="36" fill={PL} stroke={PM} strokeWidth="3" />
      <circle cx="80" cy="55" r="17" fill="#fff" stroke={P} strokeWidth="3" />
      <circle cx="80" cy="55" r="6" fill={P} />
      <path d="M118 28 C126 40 126 46 118 50 C110 46 110 40 118 28Z" fill={PD} />
    </svg>
  )
}

function RiskIllustration() {
  const ys = Array.from({ length: 66 }, (_, i) => 20 + i * 4)
  const wave = (sign) =>
    ys.map((y, i) => `${i ? 'L' : 'M'}${(200 + sign * 58 * Math.sin(((y - 20) / 260) * Math.PI * 3)).toFixed(1)} ${y}`).join(' ')
  const rungs = Array.from({ length: 14 }, (_, i) => 28 + i * 19)
  return (
    <Frame label="Illustration d’une hélice d’ADN symbolisant les prédispositions héréditaires">
      <path d={wave(1)} fill="none" stroke={P} strokeWidth="7" strokeLinecap="round" />
      <path d={wave(-1)} fill="none" stroke={PM} strokeWidth="7" strokeLinecap="round" />
      {rungs.map((y) => {
        const dx = 58 * Math.sin(((y - 20) / 260) * Math.PI * 3)
        return <line key={y} x1={200 - dx} y1={y} x2={200 + dx} y2={y} stroke={PD} strokeWidth="3" opacity=".55" />
      })}
      <rect x="258" y="40" width="112" height="36" rx="18" fill="#fff" stroke="#f0d3df" />
      <text x="314" y="63" fontSize="13" fontWeight="700" textAnchor="middle" fill={PD}>BRCA1 / BRCA2</text>
      <rect x="30" y="224" width="112" height="36" rx="18" fill="#fff" stroke="#f0d3df" />
      <text x="86" y="247" fontSize="13" fontWeight="700" textAnchor="middle" fill={PD}>Antécédents</text>
    </Frame>
  )
}

function PreventionIllustration() {
  return (
    <Frame label="Illustration d’un cœur avec une ligne de pouls, des feuilles et un soleil évoquant les habitudes de vie saines">
      <circle cx="320" cy="70" r="30" fill="#fbd9b0" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <line key={a} x1="320" y1="70" x2={320 + 46 * Math.cos((a * Math.PI) / 180)} y2={70 + 46 * Math.sin((a * Math.PI) / 180)} stroke="#fbd9b0" strokeWidth="4" strokeLinecap="round" />
      ))}
      <circle cx="320" cy="70" r="28" fill="#f7c98f" />
      <path d="M200 250 C90 170 90 90 150 80 C180 75 200 100 200 110 C200 100 220 75 250 80 C310 90 310 170 200 250Z" fill={P} />
      <polyline points="125,155 165,155 180,125 205,190 225,145 240,155 275,155" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M52 250 C40 210 70 190 96 196 C100 224 84 248 52 250Z" fill="#8fbf9f" />
      <path d="M52 250 C62 232 74 218 90 204" fill="none" stroke="#5e947a" strokeWidth="3" strokeLinecap="round" />
      <path d="M340 250 C350 214 330 196 306 202 C302 226 316 246 340 250Z" fill="#8fbf9f" />
    </Frame>
  )
}

function ScreeningIllustration() {
  const card = (x) => <rect x={x} y="60" width="105" height="160" rx="18" fill="#fff" stroke="#f0d3df" />
  return (
    <Frame label="Trois étapes du dépistage : entretien médical, examen clinique, examens complémentaires">
      {card(24)}
      {card(147)}
      {card(270)}
      {/* 1 entretien : dossier */}
      <rect x="52" y="86" width="50" height="64" rx="8" fill={PL} stroke={P} strokeWidth="3" />
      <rect x="66" y="80" width="22" height="12" rx="4" fill={P} />
      {[104, 116, 128].map((y) => (
        <line key={y} x1="62" y1={y} x2="92" y2={y} stroke={P} strokeWidth="3" strokeLinecap="round" />
      ))}
      {/* 2 examen : stéthoscope */}
      <path d="M180 90 v28 a18 18 0 0 0 36 0 v-28" fill="none" stroke={P} strokeWidth="5" strokeLinecap="round" />
      <path d="M198 136 v14 a14 14 0 0 0 28 0" fill="none" stroke={P} strokeWidth="5" strokeLinecap="round" />
      <circle cx="226" cy="158" r="8" fill="#fff" stroke={PD} strokeWidth="4" />
      {/* 3 imagerie : écran */}
      <rect x="296" y="88" width="54" height="58" rx="8" fill={PD} />
      <ellipse cx="323" cy="118" rx="16" ry="13" fill={PM} opacity=".85" />
      <circle cx="326" cy="115" r="4" fill="#fff" opacity=".9" />
      <rect x="308" y="152" width="30" height="6" rx="3" fill={PM} />
      {['1', '2', '3'].map((n, i) => (
        <g key={n}>
          <circle cx={76 + i * 123} cy="190" r="15" fill={P} />
          <text x={76 + i * 123} y="196" fontSize="15" fontWeight="800" textAnchor="middle" fill="#fff">{n}</text>
        </g>
      ))}
      <path d="M132 140 h10 m-4 -5 l5 5 l-5 5" fill="none" stroke={PM} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M255 140 h10 m-4 -5 l5 5 l-5 5" fill="none" stroke={PM} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  )
}

function SupportIllustration() {
  return (
    <Frame label="Illustration de deux personnes qui se soutiennent, avec un dossier médical et un cœur">
      <path d="M200 60 C160 36 160 6 182 6 C192 6 200 14 200 20 C200 14 208 6 218 6 C240 6 240 36 200 60Z" transform="translate(0 20)" fill={PM} />
      {/* personne 1 */}
      <circle cx="150" cy="150" r="26" fill={PL} stroke={P} strokeWidth="4" />
      <path d="M96 262 C96 204 204 204 204 262Z" fill={P} />
      {/* personne 2 */}
      <circle cx="252" cy="150" r="26" fill="#fff" stroke={PD} strokeWidth="4" />
      <path d="M198 262 C198 204 306 204 306 262Z" fill={PM} />
      {/* dossier */}
      <g transform="translate(300 110)">
        <rect width="70" height="88" rx="10" fill="#fff" stroke="#f0d3df" strokeWidth="2" />
        {[22, 40, 58].map((y) => (
          <g key={y}>
            <path d={`M12 ${y} l5 5 l9 -10`} fill="none" stroke={P} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="34" y1={y} x2="58" y2={y} stroke={PM} strokeWidth="3" strokeLinecap="round" />
          </g>
        ))}
      </g>
    </Frame>
  )
}

/* ------------------------------------------------------------------ */
/*  COMPOSANTS                                                         */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }) {
  return (
    <p
      className="eyebrow"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        color: '#a43b68',
        fontSize: 12,
        fontWeight: 800,
        letterSpacing: '0.13em',
        lineHeight: 1.6,
        marginBottom: 12,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          width: 26,
          height: 2,
          background: '#c35b87',
          borderRadius: 4,
        }}
      />
      {children}
    </p>
  )
}

/* Section texte + illustration côte à côte */
function Split({ id, eyebrow, title, art, reverse, background, children, after, artCaption }) {
  return (
    <section
      id={id}
      className="breast-section section-pad"
      style={{ ...styles.section, background, scrollMarginTop: 24 }}
    >
      <div style={styles.container}>
        <div className={`breast-split${reverse ? ' breast-split-reverse' : ''}${art ? '' : ' breast-split-single'}`}>
          <div className="breast-split-text">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 style={styles.heading}>{title}</h2>
            {children}
          </div>
          {art && (
            <figure className="breast-illus">
              {art}
              {artCaption && (
                <figcaption style={{ fontSize: 12.5, color: TEXT_MUTED, marginTop: 10, lineHeight: 1.7 }}>
                  {artCaption}
                </figcaption>
              )}
            </figure>
          )}
        </div>
        {after}
      </div>
    </section>
  )
}

/* Visuel d'organisation : image locale, avec badge de secours */
function OrgVisual({ src, sigle, alt, fit = 'contain', credit }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return (
      <div className="breast-org-visual breast-org-fallback" role="img" aria-label={alt}>
        {sigle}
      </div>
    )
  }
  return (
    <div className={`breast-org-visual${fit === 'cover' ? ' breast-org-cover' : ''}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
      />
      {credit && <span className="breast-org-credit">{credit}</span>}
    </div>
  )
}

/* Image en ligne (Wikimedia Commons) avec illustration de secours si elle ne charge pas */
const commons = (fichier, largeur = 900) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fichier)}?width=${largeur}`

function WebArt({ src, alt, fallback }) {
  const [failed, setFailed] = useState(false)
  if (failed) return fallback
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      style={{ display: 'block', width: '100%', height: 'auto', background: '#fce8f0' }}
    />
  )
}

function CreditCommons({ texte, fichier }) {
  return (
    <>
      {texte} {' '}
      <a
        className="breast-link"
        href={`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(fichier)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Source : Wikimedia Commons ↗
      </a>
    </>
  )
}

/* Photo de galerie, masquée si l'image ne charge pas */
function GalleryPhoto({ src, alt }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      style={{
        display: 'block',
        width: '100%',
        aspectRatio: '4 / 3',
        objectFit: 'cover',
        borderRadius: 16,
        background: '#fce8f0',
      }}
    />
  )
}

function CancerSein() {
  return (
    <div className="site-shell breast-page">
      <style>{`
        .breast-page {
          --rose-primary: #a43b68;
          --rose-dark: #702344;
          --rose-soft: #fff4f8;
          --rose-border: #f0dfe7;
          color: #30212b;
          background: #fff;
          overflow: hidden;
        }

        .breast-page * { box-sizing: border-box; }

        .breast-page figure { margin: 0; }

        .breast-page .breast-link {
          color: var(--rose-primary);
          font-weight: 700;
          text-decoration: none;
          transition: color .2s ease;
        }
        .breast-page .breast-link:hover { color: var(--rose-dark); text-decoration: underline; }

        .breast-page .breast-card { transition: transform .22s ease, box-shadow .22s ease; }
        .breast-page .breast-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(91, 36, 64, .09);
        }

        .breast-page .breast-hero {
          background:
            radial-gradient(ellipse at 82% 20%, rgba(231, 174, 199, .22), transparent 34%),
            linear-gradient(135deg, #fff3f7 0%, #fffafd 55%, #f6eff8 100%);
        }

        .breast-page .breast-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr);
          gap: 54px;
          align-items: center;
        }

        .breast-page .breast-hero-art {
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 24px 65px rgba(80, 30, 55, .15);
        }

        /* Sections texte + illustration */
        .breast-page .breast-split {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr);
          gap: 56px;
          align-items: center;
        }
        .breast-page .breast-split-single { grid-template-columns: minmax(0, 1fr); }
        .breast-page .breast-split-reverse .breast-illus { order: -1; }
        .breast-page .breast-illus img,
        .breast-page .breast-illus svg {
          border-radius: 28px;
          box-shadow: 0 18px 48px rgba(80, 30, 55, .10);
        }

        .breast-page .breast-sign-art svg { border-radius: 14px; }

        .breast-page .breast-button {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          gap: 9px;
          min-height: 48px;
          padding: 12px 20px;
          border: 1px solid #ead4df;
          border-radius: 12px;
          background: #fff;
          color: #843454;
          font-weight: 750;
          text-decoration: none;
          transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
        }
        .breast-page .breast-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(91, 36, 64, .10);
        }
        .breast-page .breast-button-primary { background: #96365f; border-color: #96365f; color: #fff; }
        .breast-page .breast-button-primary:hover { background: #762646; color: #fff; }

        .breast-page .breast-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          flex: 0 0 52px;
          border-radius: 16px;
          background: #fce8f0;
          color: #96365f;
          font-size: 25px;
          font-weight: 800;
        }

        /* Visuels des organisations */
        .breast-page .breast-org-visual {
          width: 100%;
          height: 130px;
          margin-bottom: 18px;
          border-radius: 14px;
          background: #fff7fa;
          border: 1px solid #f0dfe7;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 14px;
        }
        .breast-page .breast-org-visual img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          display: block;
        }
        .breast-page .breast-org-visual { position: relative; }
        .breast-page .breast-org-cover { padding: 0; }
        .breast-page .breast-org-cover img {
          width: 100%;
          height: 100%;
          max-width: none;
          max-height: none;
          object-fit: cover;
        }
        .breast-page .breast-org-credit {
          position: absolute;
          left: 8px;
          bottom: 8px;
          max-width: calc(100% - 16px);
          padding: 3px 9px;
          border-radius: 999px;
          background: rgba(48, 33, 43, .72);
          color: #fff;
          font-size: 10.5px;
          line-height: 1.5;
        }
        .breast-page .breast-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
          gap: 14px;
          margin-top: 26px;
        }
        .breast-page .breast-org-fallback {
          background: linear-gradient(135deg, #fce8f0, #f6eff8);
          color: #96365f;
          font-size: 26px;
          font-weight: 850;
          letter-spacing: .08em;
        }

        .breast-page .breast-faq summary { list-style: none; }
        .breast-page .breast-faq summary::-webkit-details-marker { display: none; }
        .breast-page .breast-faq summary::after {
          content: '+';
          float: right;
          margin-left: 12px;
          color: #a43b68;
          font-size: 23px;
          line-height: 1;
        }
        .breast-page .breast-faq[open] summary::after { content: '−'; }

        .breast-page .breast-faq summary:focus-visible,
        .breast-page a:focus-visible {
          outline: 3px solid #d98bad;
          outline-offset: 4px;
          border-radius: 5px;
        }

        @media (max-width: 860px) {
          .breast-page .breast-split,
          .breast-page .breast-hero-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 30px;
          }
          .breast-page .breast-split-reverse .breast-illus { order: 0; }
        }

        @media (max-width: 760px) {
          .breast-page .breast-hero { padding-top: 44px !important; padding-bottom: 48px !important; }
          .breast-page .breast-section { padding: 52px 20px !important; }
          .breast-page .breast-buttons { align-items: stretch; }
          .breast-page .breast-button { width: 100%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .breast-page *, .breast-page *::before, .breast-page *::after {
            transition: none !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" to="/" aria-label="RoseRelais, accueil">
            <img src="/logo.svg" alt="" width="44" height="44" />
            <span className="brand-copy">
              <strong>RoseRelais</strong>
              <small>Informer. Orienter. Accompagner.</small>
            </span>
          </Link>

          <nav className="main-navigation" aria-label="Navigation principale">
            <Link to="/">Accueil</Link>
            <Link to="/prevention/col-uterus">Cancer du col de l’utérus</Link>
            <Link to="/orientation">Orientation sanitaire</Link>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="breast-hero" style={{ padding: '76px 24px' }}>
          <div className="breast-hero-grid" style={{ ...styles.container, maxWidth: 1160 }}>
            <div>
              <Eyebrow>PRÉVENTION ET INFORMATION</Eyebrow>

              <h1
                style={{
                  fontSize: 'clamp(2.4rem, 5.3vw, 4.4rem)',
                  lineHeight: 1.08,
                  letterSpacing: '-0.045em',
                  color: '#392331',
                  margin: '12px 0 24px',
                  maxWidth: 650,
                }}
              >
                Mieux comprendre le cancer du sein
              </h1>

              <p style={{ ...styles.paragraph, fontSize: 'clamp(1rem, 1.6vw, 1.12rem)', maxWidth: 600 }}>
                S’informer, reconnaître les changements inhabituels et consulter
                au bon moment : des informations fiables pour mieux prendre soin
                de sa santé.
              </p>

              <div
                className="breast-buttons"
                style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 }}
              >
                <a className="breast-button breast-button-primary" href="#signes">
                  Reconnaître les signes <span aria-hidden="true">→</span>
                </a>
                <a className="breast-button" href="#ressources">
                  Trouver des ressources <span aria-hidden="true">↗</span>
                </a>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  marginTop: 26,
                  maxWidth: 570,
                  padding: '14px 16px',
                  borderRadius: 14,
                  background: 'rgba(255,255,255,.78)',
                  border: '1px solid #f1dce6',
                }}
              >
                <span style={{ color: '#96365f', fontSize: 19 }} aria-hidden="true">♡</span>
                <p style={{ fontSize: 13, lineHeight: 1.75, margin: 0, color: TEXT_MUTED }}>
                  Information éducative : elle ne remplace pas un examen ni un
                  avis médical personnalisé.
                </p>
              </div>
            </div>

            <figure className="breast-hero-art">
              <HeroIllustration />
            </figure>
          </div>
        </section>

        {/* MESSAGE IMPORTANT */}
        <section className="breast-section section-pad">
          <div style={{ ...styles.container, maxWidth: 1000 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto minmax(0, 1fr)',
                gap: 20,
                alignItems: 'start',
                padding: 'clamp(22px, 4vw, 34px)',
                borderRadius: 22,
                background: 'linear-gradient(135deg, #fff3f7, #fffafd)',
                border: '1px solid #f0d3df',
              }}
            >
              <div className="breast-icon" aria-hidden="true">!</div>
              <div>
                <Eyebrow>À RETENIR</Eyebrow>
                <h2 style={{ ...styles.heading, fontSize: 'clamp(1.45rem, 3vw, 2rem)', marginTop: 0 }}>
                  Le message essentiel
                </h2>
                <p style={{ ...styles.paragraph, marginBottom: 0 }}>
                  Une boule dans le sein, une modification de la peau ou un
                  changement du mamelon ne signifie pas nécessairement un cancer.
                  Mais une anomalie nouvelle ou persistante doit être examinée par
                  un professionnel de santé. Une détection et une prise en charge
                  précoces peuvent améliorer les possibilités de traitement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPRENDRE */}
        <Split
          eyebrow="COMPRENDRE LA MALADIE"
          title="Qu’est-ce que le cancer du sein ?"
          art={<CellsIllustration />}
          artCaption="Schéma simplifié, à but pédagogique."
          after={
            <div style={styles.grid}>
              {[
                {
                  symbole: '↗',
                  titre: 'Une maladie qui peut évoluer',
                  texte:
                    'Plusieurs types de cancer du sein existent. Leur évolution et leur traitement varient d’une personne à l’autre.',
                },
                {
                  symbole: '＋',
                  titre: 'Une prise en charge individualisée',
                  texte:
                    'Le diagnostic et les examens permettent à l’équipe médicale de déterminer les soins adaptés à chaque situation.',
                },
                {
                  symbole: '♡',
                  titre: 'Une information accessible',
                  texte:
                    'Parler de la maladie, lutter contre les idées reçues et favoriser l’accès aux soins sont essentiels.',
                },
              ].map((item) => (
                <article key={item.titre} className="breast-card" style={styles.card}>
                  <div className="breast-icon" aria-hidden="true">{item.symbole}</div>
                  <h3 style={{ fontSize: 18, lineHeight: 1.45, marginTop: 22 }}>{item.titre}</h3>
                  <p style={{ ...styles.paragraph, marginBottom: 0 }}>{item.texte}</p>
                </article>
              ))}
            </div>
          }
        >
          <p style={styles.paragraph}>
            Le cancer du sein apparaît lorsque certaines cellules de la
            poitrine se multiplient de manière anormale et forment une tumeur.
            Certaines tumeurs peuvent se développer localement et, dans
            certains cas, se propager à d’autres parties du corps.
          </p>
          <p style={styles.paragraph}>
            Le cancer du sein peut toucher les femmes et, plus rarement, les
            hommes. Il ne se manifeste pas toujours par une douleur : il est
            donc important de connaître les changements inhabituels et de
            demander un avis médical lorsqu’ils apparaissent.
          </p>
        </Split>

        {/* SIGNES */}
        <Split
          id="signes"
          background="#fff7fa"
          eyebrow="ÊTRE ATTENTIF À SON CORPS"
          title="Quels signes faut-il surveiller ?"
          after={
            <>
              <div style={styles.grid}>
                {signes.map((signe) => (
                  <article
                    key={signe.numero}
                    className="breast-card"
                    style={{ ...styles.card, borderTop: '3px solid #d68aa9' }}
                  >
                    <div className="breast-sign-art">
                      <SigneArt type={signe.art} />
                    </div>
                    <span
                      style={{
                        display: 'block',
                        marginTop: 16,
                        color: '#a43b68',
                        fontSize: 12,
                        fontWeight: 800,
                        letterSpacing: '.12em',
                      }}
                    >
                      SIGNE {signe.numero}
                    </span>
                    <h3 style={{ fontSize: 18, lineHeight: 1.45, marginTop: 8 }}>{signe.titre}</h3>
                    <p style={{ ...styles.paragraph, marginBottom: 0 }}>{signe.description}</p>
                  </article>
                ))}
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                  padding: 22,
                  marginTop: 26,
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid #f0dfe7',
                }}
              >
                <span style={{ fontSize: 22, color: '#a43b68' }} aria-hidden="true">♡</span>
                <p style={{ ...styles.paragraph, margin: 0 }}>
                  <strong style={{ color: '#30212b' }}>À retenir :</strong> une anomalie nouvelle, persistante
                  ou inquiétante mérite une consultation, même si elle est indolore
                  et même si aucun autre symptôme n’est présent.
                </p>
              </div>
            </>
          }
        >
          <p style={{ ...styles.paragraph, maxWidth: 780 }}>
            Les signes peuvent varier. Il est utile de connaître l’apparence
            habituelle de ses seins afin de remarquer un changement nouveau.
            Aucun signe isolé ne permet, à lui seul, de confirmer un cancer.
          </p>
        </Split>

        {/* FACTEURS DE RISQUE */}
        <Split
          eyebrow="MIEUX CONNAÎTRE LES RISQUES"
          title="Quels facteurs peuvent augmenter le risque ?"
          art={<RiskIllustration />}
          reverse
          artCaption="Certaines prédispositions sont héréditaires, d’autres liées au mode de vie."
        >
          <p style={styles.paragraph}>
            Le risque de cancer du sein dépend de plusieurs facteurs. En
            connaître certains aide à discuter de sa situation avec un
            professionnel de santé, mais ne permet pas de prédire avec
            certitude qui développera la maladie.
          </p>

          <div
            style={{
              padding: '8px 22px',
              marginTop: 22,
              borderRadius: 18,
              background: '#fff9fb',
              border: '1px solid #f0dfe7',
            }}
          >
            {[
              'L’avancée en âge.',
              'Des antécédents personnels de certaines maladies du sein.',
              'Des antécédents familiaux, notamment chez des proches parents.',
              'Certaines prédispositions génétiques héréditaires, comme des mutations des gènes BRCA1 ou BRCA2.',
              'Certains facteurs hormonaux et certaines expositions médicales.',
              'La consommation d’alcool, le manque d’activité physique et d’autres facteurs liés au mode de vie.',
            ].map((facteur, index) => (
              <div
                key={facteur}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 14,
                  padding: '14px 0',
                  borderBottom: index < 5 ? '1px solid #f0e3e9' : 'none',
                }}
              >
                <span
                  style={{
                    width: 26,
                    height: 26,
                    flex: '0 0 26px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    background: '#f9e4ed',
                    color: '#96365f',
                    fontWeight: 800,
                    fontSize: 13,
                  }}
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <span style={{ ...styles.paragraph, color: TEXT_STRONG, lineHeight: 1.7 }}>{facteur}</span>
              </div>
            ))}
          </div>

          <p style={{ ...styles.paragraph, marginTop: 20 }}>
            Certaines personnes développent un cancer du sein sans facteur
            de risque connu. Ne pas avoir d’antécédents familiaux ne signifie
            donc pas que le risque est nul.
          </p>
        </Split>

        {/* PRÉVENTION */}
        <Split
          background="#faf6fb"
          eyebrow="AGIR POUR SA SANTÉ"
          title="Comment prendre soin de sa santé mammaire ?"
          art={
            <WebArt
              src={commons('Breast self-exam.jpg')}
              alt="Femme vue de dos pratiquant un auto-examen des seins"
              fallback={<PreventionIllustration />}
            />
          }
          artCaption={
            <CreditCommons
              texte="Connaître l’apparence habituelle de ses seins aide à repérer un changement. Photo : National Cancer Institute (domaine public)."
              fichier="Breast self-exam.jpg"
            />
          }
          after={
            <p style={{ ...styles.paragraph, marginTop: 26 }}>
              Il n’existe pas de méthode garantissant à elle seule la prévention
              du cancer du sein. Les habitudes de vie ne remplacent ni une
              consultation ni un dépistage indiqué.
            </p>
          }
        >
          <div style={{ display: 'grid', gap: 14, marginTop: 6 }}>
            {[
              {
                numero: '01',
                titre: 'Connaître les changements',
                texte: 'Être attentive aux changements inhabituels aide à demander conseil sans attendre.',
              },
              {
                numero: '02',
                titre: 'Consulter si nécessaire',
                texte:
                  'En cas de symptôme, un professionnel pourra réaliser un examen clinique et prescrire les examens complémentaires appropriés.',
              },
              {
                numero: '03',
                titre: 'Se renseigner sur le dépistage',
                texte:
                  'Demandez quel dépistage est recommandé selon votre âge, vos antécédents et les possibilités disponibles localement.',
              },
              {
                numero: '04',
                titre: 'Adopter des habitudes favorables',
                texte:
                  'L’activité physique régulière, la limitation de l’alcool et des habitudes de vie favorables à la santé peuvent contribuer à réduire certains risques.',
              },
            ].map((item) => (
              <article key={item.numero} className="breast-card" style={{ ...styles.card, padding: '18px 22px' }}>
                <span style={{ color: '#a3476f', fontSize: 12, fontWeight: 850, letterSpacing: '.12em' }}>
                  ÉTAPE {item.numero}
                </span>
                <h3 style={{ fontSize: 17, lineHeight: 1.45, margin: '6px 0 4px' }}>{item.titre}</h3>
                <p style={{ ...styles.paragraph, margin: 0, lineHeight: 1.75 }}>{item.texte}</p>
              </article>
            ))}
          </div>
        </Split>

        {/* DÉPISTAGE */}
        <Split
          eyebrow="DÉTECTION PRÉCOCE"
          title="Comment se déroule le dépistage ?"
          art={
            <WebArt
              src={commons('Mammography illustration.jpg')}
              alt="Illustration d’une femme qui passe une mammographie, aidée par une technicienne en radiologie"
              fallback={<ScreeningIllustration />}
            />
          }
          reverse
          artCaption={
            <CreditCommons
              texte="Mammographie : illustration d’Al Louang, National Cancer Institute (domaine public)."
              fichier="Mammography illustration.jpg"
            />
          }
        >
          <p style={styles.paragraph}>
            Le dépistage concerne des personnes qui n’ont pas de symptôme.
            Lorsqu’un symptôme existe, il s’agit plutôt d’une démarche
            diagnostique. Cette distinction est importante pour choisir la
            bonne conduite à tenir.
          </p>

          <ol style={{ listStyle: 'none', padding: 0, margin: '22px 0', display: 'grid', gap: 12 }}>
            {[
              ['L’entretien médical', 'Le professionnel s’informe sur les symptômes, les antécédents et les facteurs de risque.'],
              ['L’examen clinique', 'Selon la situation, un examen des seins et des aisselles peut être réalisé.'],
              ['Les examens complémentaires', 'Une mammographie, une échographie ou une biopsie peuvent être proposées selon les constatations médicales.'],
            ].map(([titre, texte], i) => (
              <li key={titre} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 34,
                    height: 34,
                    flex: '0 0 34px',
                    borderRadius: 11,
                    background: '#96365f',
                    color: '#fff',
                    fontWeight: 800,
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ ...styles.paragraph, lineHeight: 1.75 }}>
                  <strong style={{ color: '#30212b' }}>{titre}.</strong> {texte}
                </span>
              </li>
            ))}
          </ol>

          <p style={styles.paragraph}>
            La mammographie est une méthode de dépistage reconnue. L’âge de
            début, la fréquence et les modalités doivent suivre les
            recommandations applicables et tenir compte de la situation
            individuelle. Au Bénin, le PNLMNT publie des informations sur
            l’élaboration des protocoles nationaux de dépistage.
          </p>

          <a
            className="breast-button breast-button-primary"
            href="https://pnlmnt.bj/protocoles-nationaux-depistage-cancers-sein-col-luterus-colorectal"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: 8 }}
          >
            Consulter l’actualité du PNLMNT ↗
          </a>
        </Split>

        {/* OCTOBRE ROSE AU BÉNIN : photos et contenus officiels */}
        <section className="breast-section section-pad" style={{ ...styles.section, paddingTop: 20 }}>
          <div style={{ ...styles.container, maxWidth: 1000 }}>
            <Eyebrow>EN IMAGES</Eyebrow>
            <h2 style={styles.heading}>Octobre Rose 2026 à Cotonou</h2>
            <p style={styles.paragraph}>
              Le 16 octobre 2026, la marche « Tout Cotonou Marche en Rose » a
              mobilisé la population à l’initiative du PNLMNT et de ses
              partenaires pour encourager la prévention et le dépistage des
              cancers féminins.
            </p>

            <div className="breast-gallery">
              {[
                'marche-22-3jT',
                'marche-6-Jts',
                'marche-3-fSF',
                'marche-2-rch',
              ].map((nom) => (
                <GalleryPhoto
                  key={nom}
                  src={`https://pnlmnt.bj/storage/app/media/2026/octobre%20rose/depistage%20sensibilisation/marche/${nom}.jpeg`}
                  alt="Marche Tout Cotonou Marche en Rose, Octobre Rose 2026"
                />
              ))}
            </div>

            <p style={{ ...styles.paragraph, fontSize: 13, marginTop: 12 }}>
              Photos : PNLMNT. {' '}
              <a
                className="breast-link"
                href="https://pnlmnt.bj/octobre-rose-2026-tout-cotonou-marche"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lire l’article complet ↗
              </a>
            </p>

            <h3 style={{ fontSize: 19, margin: '34px 0 6px' }}>En vidéo : Octobre Rose en Afrique</h3>
            <p style={{ ...styles.paragraph, fontSize: 14, margin: '0 0 12px' }}>
              Reportage de FRANCE 24 (Journal de l’Afrique) avec un
              gynécologue-obstétricien sur la sensibilisation, le dépistage et
              l’information. Ce n’est pas une vidéo du Bénin.
            </p>
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9',
                borderRadius: 18,
                overflow: 'hidden',
                background: '#30212b',
                boxShadow: '0 18px 48px rgba(80, 30, 55, .12)',
              }}
            >
              <iframe
                src="https://www.youtube-nocookie.com/embed/aC3XzbAKgzM"
                title="Octobre Rose : sensibiliser, dépister et informer sur le cancer du sein, FRANCE 24"
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
              />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 18 }}>
              <a className="breast-button" href="https://pnlmnt.bj/photos" target="_blank" rel="noopener noreferrer">
                Galerie photos du PNLMNT ↗
              </a>
              <a className="breast-button" href="https://pnlmnt.bj/videos" target="_blank" rel="noopener noreferrer">
                Vidéothèque du PNLMNT ↗
              </a>
              <a className="breast-button" href="https://knowyourlemons.org/sharable-images" target="_blank" rel="noopener noreferrer">
                Infographie « 12 signes » (Know Your Lemons, en anglais) ↗
              </a>
            </div>
          </div>
        </section>

        {/* PARCOURS DE SOINS */}
        <Split
          background="#fff7fa"
          eyebrow="ÊTRE ACCOMPAGNÉE"
          title="Que faire après un résultat suspect ?"
          art={<SupportIllustration />}
          artCaption="Vous n’êtes pas seule : posez vos questions et faites-vous accompagner."
        >
          <p style={styles.paragraph}>
            Un résultat suspect ne signifie pas automatiquement qu’un cancer
            est présent. Des examens complémentaires peuvent être nécessaires
            pour comprendre l’origine de l’anomalie.
          </p>

          <ol style={{ listStyle: 'none', padding: 0, margin: '22px 0', display: 'grid', gap: 12 }}>
            {[
              'Demandez au professionnel de santé de vous expliquer le résultat.',
              'Suivez les indications concernant les examens complémentaires ou le rendez-vous spécialisé.',
              'Conservez vos résultats et les documents médicaux utiles.',
              'En cas de diagnostic confirmé, demandez des explications sur les options de traitement et les services d’accompagnement.',
            ].map((etape, index) => (
              <li
                key={etape}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                  padding: 16,
                  borderRadius: 16,
                  border: '1px solid #f0dfe7',
                  background: '#fff',
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 34,
                    height: 34,
                    flex: '0 0 34px',
                    borderRadius: '50%',
                    background: '#f9e4ed',
                    color: '#96365f',
                    fontWeight: 800,
                  }}
                >
                  {index + 1}
                </span>
                <span style={{ ...styles.paragraph, margin: '4px 0 0', lineHeight: 1.7 }}>{etape}</span>
              </li>
            ))}
          </ol>

          <p style={styles.paragraph}>
            Vous avez le droit de poser des questions, de demander des
            explications et d’être accompagnée par une personne de confiance
            si vous le souhaitez.
          </p>
        </Split>

        {/* FAQ */}
        <section className="breast-section section-pad" style={styles.section}>
          <div style={{ ...styles.container, maxWidth: 1000 }}>
            <Eyebrow>VOS QUESTIONS</Eyebrow>
            <h2 style={styles.heading}>Questions fréquentes sur le cancer du sein</h2>

            <div style={{ display: 'grid', gap: 12, marginTop: 28 }}>
              {faq.map((item) => (
                <details
                  key={item.question}
                  className="breast-faq"
                  style={{
                    border: '1px solid #eadde4',
                    borderRadius: 16,
                    padding: '21px 23px',
                    background: '#fff',
                    boxShadow: '0 5px 20px rgba(91,36,64,.025)',
                  }}
                >
                  <summary
                    style={{
                      cursor: 'pointer',
                      fontWeight: 750,
                      lineHeight: 1.7,
                      color: '#30212b',
                      paddingRight: 4,
                    }}
                  >
                    {item.question}
                  </summary>
                  <p style={{ ...styles.paragraph, marginBottom: 0, paddingTop: 12 }}>{item.reponse}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* RESSOURCES */}
        <section
          id="ressources"
          className="breast-section section-pad"
          style={{ ...styles.section, background: '#faf6fb', scrollMarginTop: 24 }}
        >
          <div style={styles.container}>
            <Eyebrow>ALLER PLUS LOIN</Eyebrow>
            <h2 style={styles.heading}>Ressources fiables pour s’informer au Bénin</h2>

            <p style={{ ...styles.paragraph, maxWidth: 800 }}>
              RoseRelais facilite l’accès à l’information. Pour une décision
              médicale, privilégiez les autorités sanitaires, les organismes
              médicaux reconnus et les professionnels de santé.
            </p>

            <div style={styles.grid}>
              {ressources.map((ressource) => (
                <article
                  key={ressource.titre}
                  className="breast-card"
                  style={{
                    ...styles.card,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    minWidth: 0,
                  }}
                >
                  <OrgVisual
                    src={ressource.image}
                    sigle={ressource.sigle}
                    fit={ressource.fit}
                    credit={ressource.credit}
                    alt={`Visuel : ${ressource.titre}`}
                  />

                  <span
                    style={{
                      fontSize: 10,
                      letterSpacing: '.1em',
                      fontWeight: 850,
                      color: '#96365f',
                      lineHeight: 1.7,
                    }}
                  >
                    {ressource.categorie}
                  </span>

                  <h3 style={{ fontSize: 18, lineHeight: 1.5, marginTop: 10 }}>{ressource.titre}</h3>

                  <p style={{ ...styles.paragraph, flex: 1 }}>{ressource.description}</p>

                  <a
                    className="breast-link"
                    href={ressource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ lineHeight: 1.8, marginTop: 10 }}
                  >
                    {ressource.action} ↗
                  </a>
                </article>
              ))}
            </div>

            <p style={{ ...styles.paragraph, fontSize: 13, marginTop: 26 }}>
              Les campagnes de dépistage peuvent être limitées dans le temps.
              Vérifiez les dates, les conditions d’accès, les tarifs et les
              services directement auprès des structures concernées. Une
              campagne passée ne garantit pas qu’un service soit disponible
              aujourd’hui.
            </p>
          </div>
        </section>

        {/* NAVIGATION */}
        <section className="breast-section section-pad" style={styles.section}>
          <div style={{ ...styles.container, maxWidth: 1000 }}>
            <Eyebrow>CONTINUER À S’INFORMER</Eyebrow>
            <h2 style={styles.heading}>Découvrez les autres ressources RoseRelais</h2>

            <div style={styles.grid}>
              <Link
                to="/prevention/col-uterus"
                className="breast-card"
                style={{ ...styles.card, display: 'block', textDecoration: 'none', color: 'inherit' }}
              >
                <div className="breast-icon" aria-hidden="true">♡</div>
                <h3 style={{ fontSize: 19, lineHeight: 1.5, marginTop: 20 }}>Cancer du col de l’utérus</h3>
                <p style={styles.paragraph}>Comprendre le HPV, la vaccination et le dépistage.</p>
                <span className="breast-link">Découvrir la page →</span>
              </Link>

              <Link
                to="/orientation"
                className="breast-card"
                style={{ ...styles.card, display: 'block', textDecoration: 'none', color: 'inherit' }}
              >
                <div className="breast-icon" aria-hidden="true">⌖</div>
                <h3 style={{ fontSize: 19, lineHeight: 1.5, marginTop: 20 }}>Orientation sanitaire</h3>
                <p style={styles.paragraph}>Accéder aux ressources et préparer sa démarche de santé.</p>
                <span className="breast-link">Explorer les ressources →</span>
              </Link>
            </div>

            <p style={{ marginTop: 28 }}>
              <Link className="breast-link" to="/">← Retour à l’accueil de RoseRelais</Link>
            </p>
          </div>
        </section>
      </main>

      <footer
        style={{
          padding: '38px 24px',
          textAlign: 'center',
          background: '#fff4f8',
          borderTop: '1px solid #f0dce4',
        }}
      >
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            color: '#702344',
            textDecoration: 'none',
          }}
        >
          <img src="/logo.svg" alt="" width="34" height="34" />
          <strong style={{ fontSize: 18 }}>RoseRelais</strong>
        </Link>

        <p style={{ margin: '8px 0 0', color: '#6a4a5c', fontSize: 13 }}>
          Informer. Orienter. Accompagner.
        </p>

        <p
          style={{
            fontSize: 12,
            color: TEXT_MUTED,
            lineHeight: 1.8,
            maxWidth: 760,
            margin: '16px auto 0',
          }}
        >
          Les contenus de ce site sont fournis à des fins éducatives. Ils ne
          remplacent pas une consultation, un diagnostic ou un traitement
          médical.
        </p>
      </footer>

      <ChatAssistant />
    </div>
  )
}

export default CancerSein