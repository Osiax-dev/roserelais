import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import ChatAssistant from '../components/ChatAssistant'

/* ------------------------------------------------------------------ */
/*  CONTENUS                                                           */
/* ------------------------------------------------------------------ */

const etapes = [
  { titre: 'Infection', texte: 'Le HPV se transmet surtout par contact intime. Dans la grande majorité des cas, le corps l’élimine seul.' },
  { titre: 'Persistance', texte: 'Chez certaines femmes, un type de HPV à haut risque reste présent pendant des années.' },
  { titre: 'Lésions', texte: 'Des cellules anormales peuvent apparaître sur le col. Elles sont dites précancéreuses et ne se voient pas à l’œil nu.' },
  { titre: 'Cancer', texte: 'Sans dépistage ni prise en charge, ces lésions peuvent évoluer, en général sur de nombreuses années.' },
]

const risques = [
  { symbole: '◎', titre: 'Infection persistante à HPV', texte: 'C’est le facteur central : certains types de HPV à haut risque, lorsqu’ils persistent, favorisent l’apparition de lésions.' },
  { symbole: '✚', titre: 'Défenses immunitaires affaiblies', texte: 'Une infection par le VIH ou un autre problème immunitaire peut rendre l’élimination du virus plus difficile. Un suivi régulier est alors particulièrement utile.' },
  { symbole: '○', titre: 'Tabac', texte: 'Fumer est associé à un risque plus élevé de lésions du col chez les femmes infectées par le HPV.' },
  { symbole: '▦', titre: 'Absence de dépistage', texte: 'Sans dépistage, les lésions précancéreuses passent inaperçues : elles n’ont en général aucun symptôme.' },
]

const depistages = [
  { titre: 'Test HPV', texte: 'Il recherche la présence du virus sur un prélèvement du col. Il est recommandé par l’OMS lorsqu’il est disponible.' },
  { titre: 'Frottis (test de Papanicolaou)', texte: 'Il examine au laboratoire des cellules prélevées sur le col, pour repérer des anomalies.' },
  { titre: 'Inspection visuelle (IVA)', texte: 'Le professionnel observe le col après application d’une solution. C’est une méthode simple, utilisée dans de nombreux centres de santé.' },
]

const deroule = [
  'Vous êtes accueillie et on vous explique l’examen. Vous pouvez poser toutes vos questions.',
  'Vous êtes installée confortablement, et le professionnel effectue un prélèvement ou une observation du col. L’examen est court.',
  'Selon la méthode, le résultat est donné sur place ou après analyse. Gardez bien votre rendez-vous de retour.',
  'En cas d’anomalie, ce n’est pas un cancer en soi : le professionnel vous explique la suite, qui peut être un simple traitement de la lésion.',
]

const signes = [
  { numero: '01', titre: 'Saignements inhabituels', description: 'Après les rapports sexuels, entre les règles ou après la ménopause.' },
  { numero: '02', titre: 'Pertes vaginales inhabituelles', description: 'Abondantes, de mauvaise odeur, teintées de sang ou qui durent sans explication.' },
  { numero: '03', titre: 'Douleurs pendant les rapports', description: 'Une gêne ou une douleur nouvelle et persistante mérite un avis médical.' },
  { numero: '04', titre: 'Douleurs dans le bas-ventre', description: 'Surtout lorsqu’elles persistent. Ce signe est souvent tardif et peut avoir bien d’autres causes.' },
]

const faq = [
  { question: 'Le vaccin contre le HPV est-il utile si je suis déjà adulte ?', reponse: 'La vaccination est surtout recommandée avant les premiers contacts avec le virus, c’est pourquoi elle vise les jeunes filles. Si vous êtes plus âgée, un professionnel de santé peut vous dire si elle est adaptée à votre situation. Dans tous les cas, le dépistage reste important.' },
  { question: 'Si je suis vaccinée, dois-je quand même me faire dépister ?', reponse: 'Oui. Le vaccin protège contre les types de HPV les plus fréquemment responsables de cancers, mais pas contre tous. Le dépistage régulier reste donc recommandé.' },
  { question: 'Avoir le HPV, est-ce avoir un cancer ?', reponse: 'Non. Le HPV est très fréquent et le plus souvent éliminé par le corps. Seule une infection qui persiste, avec des lésions non repérées, peut évoluer vers un cancer.' },
  { question: 'Faut-il attendre d’avoir des symptômes pour se faire dépister ?', reponse: 'Non, au contraire. Le dépistage sert à repérer des lésions avant l’apparition de symptômes. Des signes comme des saignements inhabituels doivent par ailleurs être évalués sans attendre.' },
  { question: 'Le dépistage fait-il mal ?', reponse: 'L’examen est généralement bref. Il peut provoquer une gêne passagère, mais il ne devrait pas être douloureux. Dites-le au professionnel si vous avez mal ou si vous êtes anxieuse.' },
  { question: 'Un résultat anormal veut-il dire cancer ?', reponse: 'Non. Un résultat anormal signifie le plus souvent qu’il faut un examen complémentaire. Lorsque des lésions précancéreuses sont trouvées tôt, elles peuvent être traitées.' },
]

const ressources = [
  {
    categorie: 'SOURCE MÉDICALE',
    titre: 'Organisation mondiale de la Santé',
    description: 'Fiche complète sur le cancer du col de l’utérus : prévention, dépistage et prise en charge.',
    url: 'https://www.who.int/fr/news-room/fact-sheets/detail/cervical-cancer',
    action: 'Lire la fiche de l’OMS',
    image: 'https://www.afro.who.int/sites/default/files/styles/social_1200x630/public/2025-02/1000808414_0.jpg.jpeg?itok=duO_AWxB',
    fit: 'cover',
    credit: 'Photo : OMS Bénin, Octobre Rose 2024',
    sigle: 'OMS',
  },
  {
    categorie: 'RESSOURCE AU BÉNIN',
    titre: 'Programme national de lutte contre les maladies non transmissibles',
    description: 'Informations officielles et possibilité d’échanger avec des experts par le chat du programme.',
    url: 'https://pnlmnt.bj/',
    action: 'Visiter le site du PNLMNT',
    image: 'https://pnlmnt.bj/storage/app/resources/resize/1280_720_crop/img_2d795096ade338c9f40c7c8253e7ca61.jpeg',
    fit: 'cover',
    credit: 'Photo : PNLMNT, Octobre Rose 2026 à Cotonou',
    sigle: 'PNLMNT',
  },
  {
    categorie: 'VACCINATION',
    titre: 'Le Bénin vaccine contre le HPV',
    description: 'Présentation de la vaccination contre le virus du papillome humain au Bénin par l’OMS Afrique.',
    url: 'https://www.afro.who.int/node/22584',
    action: 'Lire l’article',
    image: 'https://www.afro.who.int/sites/default/files/styles/social_1200x630/public/2025-02/1000808414_0.jpg.jpeg?itok=duO_AWxB',
    fit: 'cover',
    credit: 'Illustration : OMS Afrique',
    sigle: 'OMS',
  },
  {
    categorie: 'CAMPAGNE NATIONALE',
    titre: 'Une semaine pour protéger près d’un million de filles',
    description: 'Compte rendu de la campagne de vaccination de décembre 2025 : filles de 9 à 14 ans, dose unique.',
    url: 'https://www.gavi.org/fr/vaccineswork/benin-une-semaine-pour-proteger-pres-un-million-filles-contre-cancer-col-uterus',
    action: 'Lire l’article de Gavi',
    image: 'https://pnlmnt.bj/storage/app/resources/resize/1280_720_crop/img_2d795096ade338c9f40c7c8253e7ca61.jpeg',
    fit: 'cover',
    credit: 'Photo : campagne de sensibilisation PNLMNT',
    sigle: 'GAVI',
  },
  {
    categorie: 'DÉPISTAGE',
    titre: 'Campagne de dépistage des cancers de la femme',
    description: 'Communiqué du Gouvernement sur la campagne lancée le 31 mars 2026, qui associe dépistage du col et du sein.',
    url: 'https://www.gouv.bj/article/3479/sante-sexuelle-reproductive-gouvernement-lance-jours-planification-depistage-gratuits-cancers-femme/',
    action: 'Lire le communiqué',
    image: 'https://www.gouv.bj/upload/images/banners//963750137864001775052766.jpg',
    fit: 'cover',
    credit: 'Photo : Gouvernement du Bénin',
    sigle: 'GOUV.BJ',
  },
  {
    categorie: 'RESSOURCE AU BÉNIN',
    titre: 'Ministère de la Santé',
    description: 'Site officiel du ministère pour s’informer sur les services et les campagnes de santé.',
    url: 'https://sante.gouv.bj/',
    action: 'Visiter le site du ministère',
    image: 'https://sante.gouv.bj/logo.png',
    fit: 'contain',
    sigle: 'MS',
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

function Virus({ x, y, r = 30, fill = PM }) {
  const pointes = Array.from({ length: 12 }, (_, i) => i * 30)
  return (
    <g transform={`translate(${x} ${y})`}>
      {pointes.map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <line x1="0" y1={-r} x2="0" y2={-r - 9} stroke={fill} strokeWidth="3" strokeLinecap="round" />
          <circle cx="0" cy={-r - 11} r="3.6" fill={fill} />
        </g>
      ))}
      <circle r={r} fill={fill} />
      <circle r={r * 0.55} fill="#fff" opacity=".35" />
    </g>
  )
}

function Shield({ x = 0, y = 0, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M100 0 L190 34 C190 120 160 178 100 210 C40 178 10 120 10 34 Z" fill={P} />
      <path d="M100 18 L174 45 C174 118 150 164 100 192 C50 164 26 118 26 45 Z" fill={PL} />
      <path d="M62 102 L92 132 L142 72" fill="none" stroke={PD} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  )
}

function HeroIllustration() {
  return (
    <Frame label="Un bouclier de protection avec une coche, entouré de virus HPV, d’une seringue et d’un calendrier de rendez-vous" viewBox="0 0 480 420">
      <circle cx="240" cy="210" r="155" fill={PL} />
      <circle cx="240" cy="210" r="108" fill="#fff" opacity=".6" />
      <Shield x={140} y={100} s={1} />
      <Virus x={80} y={96} r={24} />
      <Virus x={410} y={150} r={18} fill={P} />
      <Virus x={92} y={330} r={16} fill={P} />
      {/* seringue */}
      <g transform="translate(330 262) rotate(-35)">
        <rect x="0" y="0" width="84" height="22" rx="6" fill="#fff" stroke={P} strokeWidth="3" />
        <rect x="6" y="5" width="46" height="12" rx="3" fill={PM} />
        <rect x="84" y="8" width="26" height="6" fill={PD} />
        <line x1="110" y1="11" x2="140" y2="11" stroke={PD} strokeWidth="3" strokeLinecap="round" />
        <rect x="-12" y="-5" width="10" height="32" rx="3" fill={P} />
      </g>
      {/* calendrier */}
      <g transform="translate(46 188) scale(.82)">
        <rect width="112" height="96" rx="16" fill="#fff" stroke="#f0d3df" />
        <rect width="112" height="26" rx="16" fill={P} />
        <rect y="14" width="112" height="12" fill={P} />
        {[0, 1, 2].map((r) =>
          [0, 1, 2, 3].map((c) => (
            <rect key={`${r}${c}`} x={14 + c * 22} y={38 + r * 18} width="14" height="10" rx="3" fill={r === 1 && c === 1 ? P : PL} />
          ))
        )}
      </g>
      <circle cx="430" cy="52" r="6" fill={P} opacity=".5" />
      <circle cx="40" cy="48" r="5" fill={PM} opacity=".7" />
    </Frame>
  )
}

function EvolutionIllustration() {
  const noeuds = [
    { x: 60, c: PL, t: 'Infection' },
    { x: 160, c: PM, t: 'Persistance' },
    { x: 260, c: P, t: 'Lésions' },
    { x: 340, c: PD, t: 'Cancer' },
  ]
  return (
    <Frame label="Schéma en quatre étapes : infection par le HPV, persistance, lésions précancéreuses, cancer. Le dépistage permet d’agir avant la dernière étape" viewBox="0 0 400 300">
      <path d="M50 150 H350" stroke={PM} strokeWidth="5" strokeLinecap="round" strokeDasharray="2 12" />
      {noeuds.map((n, i) => (
        <g key={n.t}>
          <circle cx={n.x} cy="150" r={20 + i * 4} fill={n.c} stroke="#fff" strokeWidth="4" />
          <text x={n.x} y="156" textAnchor="middle" fontSize="16" fontWeight="800" fill={i === 0 ? PD : '#fff'}>{i + 1}</text>
          <text x={n.x} y={208} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={PD}>{n.t}</text>
        </g>
      ))}
      <g transform="translate(70 52)">
        <rect width="190" height="46" rx="14" fill="#fff" stroke="#f0d3df" />
        <path d="M22 24 l8 8 l16 -18" fill="none" stroke={P} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="60" y="21" fontSize="12" fontWeight="800" fill={PD}>Vaccin et dépistage</text>
        <text x="60" y="36" fontSize="11" fill={PD}>agissent avant l’étape 4</text>
      </g>
      <text x="200" y="262" textAnchor="middle" fontSize="12" fill={PD}>Le passage de l’infection au cancer prend en général des années</text>
    </Frame>
  )
}

function VaccineIllustration() {
  return (
    <Frame label="Une jeune fille de 9 à 14 ans reçoit une dose unique de vaccin contre le HPV" viewBox="0 0 400 300">
      <circle cx="200" cy="150" r="118" fill={PL} />
      <Shield x={118} y={62} s={0.82} />
      <g transform="translate(36 196)">
        <rect width="120" height="62" rx="16" fill="#fff" stroke="#f0d3df" />
        <text x="60" y="27" textAnchor="middle" fontSize="12" fontWeight="800" fill={PD}>Filles</text>
        <text x="60" y="47" textAnchor="middle" fontSize="18" fontWeight="850" fill={P}>9 à 14 ans</text>
      </g>
      <g transform="translate(250 196)">
        <rect width="120" height="62" rx="16" fill="#fff" stroke="#f0d3df" />
        <text x="60" y="27" textAnchor="middle" fontSize="12" fontWeight="800" fill={PD}>Campagne 2025</text>
        <text x="60" y="47" textAnchor="middle" fontSize="18" fontWeight="850" fill={P}>Dose unique</text>
      </g>
      <Virus x={64} y={74} r={17} />
      <Virus x={340} y={62} r={13} fill={P} />
    </Frame>
  )
}

function ScreeningIllustration() {
  return (
    <Frame label="Un dossier médical, une loupe et un tube de prélèvement évoquant le dépistage" viewBox="0 0 400 300">
      <circle cx="200" cy="150" r="118" fill={PL} />
      <g transform="translate(116 52)">
        <rect width="150" height="190" rx="18" fill="#fff" stroke="#f0d3df" strokeWidth="2" />
        <rect x="46" y="-10" width="58" height="26" rx="10" fill={P} />
        {[44, 72, 100].map((y) => (
          <g key={y}>
            <circle cx="30" cy={y} r="8" fill={PM} />
            <rect x="48" y={y - 5} width="74" height="10" rx="5" fill={PL} />
          </g>
        ))}
        <path d="M28 150 l12 12 l24 -26" fill="none" stroke={P} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="78" y="146" width="46" height="10" rx="5" fill={PL} />
      </g>
      <g transform="translate(250 150)">
        <circle cx="34" cy="34" r="30" fill="#fff" stroke={P} strokeWidth="8" />
        <line x1="58" y1="58" x2="88" y2="88" stroke={PD} strokeWidth="11" strokeLinecap="round" />
        <circle cx="34" cy="34" r="9" fill={PM} />
      </g>
      <g transform="translate(60 150) rotate(-18)">
        <rect width="24" height="84" rx="12" fill="#fff" stroke={P} strokeWidth="4" />
        <rect x="4" y="44" width="16" height="36" rx="8" fill={PM} />
      </g>
    </Frame>
  )
}

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
      className="col-section section-pad"
      style={{ ...styles.section, background, scrollMarginTop: 24 }}
    >
      <div style={styles.container}>
        <div className={`col-split${reverse ? ' col-split-reverse' : ''}${art ? '' : ' col-split-single'}`}>
          <div className="col-split-text">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 style={styles.heading}>{title}</h2>
            {children}
          </div>
          {art && (
            <figure className="col-illus">
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

function OrgVisual({ src, sigle, alt, fit = 'contain', credit }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return (
      <div className="col-org-visual col-org-fallback" role="img" aria-label={alt}>
        {sigle}
      </div>
    )
  }
  return (
    <div className={`col-org-visual${fit === 'cover' ? ' col-org-cover' : ''}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
      />
      {credit && <span className="col-org-credit">{credit}</span>}
    </div>
  )
}

function CancerColUterus() {
  return (
    <div className="site-shell col-page">
      <style>{`
        .col-page {
          --rose-primary: #a43b68;
          --rose-dark: #702344;
          --rose-soft: #fff4f8;
          --rose-border: #f0dfe7;
          color: #30212b;
          background: #fff;
          overflow: hidden;
        }

        .col-page * { box-sizing: border-box; }

        /* Typographie isolée de cette page : évite les conflits avec App.css. */
        .col-page { font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #40303a; }
        .col-page main { color: #40303a; }
        .col-page p, .col-page li { color: #4b3a45; font-size: 16px; line-height: 1.8; }
        .col-page h1, .col-page h2, .col-page h3, .col-page h4 { color: #30212b; line-height: 1.3; overflow-wrap: anywhere; }
        .col-page strong { color: #30212b; }
        .col-page a { -webkit-tap-highlight-color: transparent; }
        .col-page .col-card { color: #40303a; background: #fff; }
        .col-page .col-card p { color: #4b3a45 !important; }
        .col-page .col-card h3 { color: #30212b !important; }
        .col-page .col-org-visual { min-height: 130px; }
        .col-page .col-org-visual img { object-position: center; }
        .col-page .col-org-fallback { color: #702344; background: linear-gradient(135deg, #fff0f6, #f8eaf1); }
        .col-page .col-link { color: #702344; text-underline-offset: 3px; }
        .col-page .col-faq summary { color: #30212b; line-height: 1.6; }
        .col-page .col-faq p { color: #4b3a45 !important; }
        .col-page :focus-visible { outline: 3px solid #a43b68; outline-offset: 3px; }

        .col-page figure { margin: 0; }

        .col-page .col-link {
          color: var(--rose-primary);
          font-weight: 700;
          text-decoration: none;
          transition: color .2s ease;
        }
        .col-page .col-link:hover { color: var(--rose-dark); text-decoration: underline; }

        .col-page .col-card { transition: transform .22s ease, box-shadow .22s ease; }
        .col-page .col-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(91, 36, 64, .09);
        }

        .col-page .col-hero {
          background:
            radial-gradient(ellipse at 82% 20%, rgba(231, 174, 199, .22), transparent 34%),
            linear-gradient(135deg, #fff3f7 0%, #fffafd 55%, #f6eff8 100%);
        }

        .col-page .col-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr);
          gap: 54px;
          align-items: center;
        }

        .col-page .col-hero-art {
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 24px 65px rgba(80, 30, 55, .15);
        }

        /* Sections texte + illustration */
        .col-page .col-split {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr);
          gap: 56px;
          align-items: center;
        }
        .col-page .col-split-single { grid-template-columns: minmax(0, 1fr); }
        .col-page .col-split-reverse .col-illus { order: -1; }
        .col-page .col-illus img,
        .col-page .col-illus svg {
          border-radius: 28px;
          box-shadow: 0 18px 48px rgba(80, 30, 55, .10);
        }

        .col-page .col-sign-art svg { border-radius: 14px; }

        .col-page .col-button {
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
        .col-page .col-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(91, 36, 64, .10);
        }
        .col-page .col-button-primary { background: #96365f; border-color: #96365f; color: #fff; }
        .col-page .col-button-primary:hover { background: #762646; color: #fff; }

        .col-page .col-icon {
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
        .col-page .col-org-visual {
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
        .col-page .col-org-visual img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          display: block;
        }
        .col-page .col-org-visual { position: relative; }
        .col-page .col-org-cover { padding: 0; }
        .col-page .col-org-cover img {
          width: 100%;
          height: 100%;
          max-width: none;
          max-height: none;
          object-fit: cover;
        }
        .col-page .col-org-credit {
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
        .col-page .col-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
          gap: 14px;
          margin-top: 26px;
        }
        .col-page .col-org-fallback {
          background: linear-gradient(135deg, #fce8f0, #f6eff8);
          color: #96365f;
          font-size: 26px;
          font-weight: 850;
          letter-spacing: .08em;
        }

        .col-page .col-faq summary { list-style: none; }
        .col-page .col-faq summary::-webkit-details-marker { display: none; }
        .col-page .col-faq summary::after {
          content: '+';
          float: right;
          margin-left: 12px;
          color: #a43b68;
          font-size: 23px;
          line-height: 1;
        }
        .col-page .col-faq[open] summary::after { content: '−'; }

        .col-page .col-faq summary:focus-visible,
        .col-page a:focus-visible {
          outline: 3px solid #d98bad;
          outline-offset: 4px;
          border-radius: 5px;
        }

        @media (max-width: 860px) {
          .col-page .col-split,
          .col-page .col-hero-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 30px;
          }
          .col-page .col-split-reverse .col-illus { order: 0; }
        }

        @media (max-width: 760px) {
          .col-page .col-hero { padding: 44px 18px 48px !important; }
          .col-page .col-section { padding: 48px 18px !important; }
          .col-page .col-buttons { align-items: stretch; flex-direction: column; }
          .col-page .col-button { width: 100%; text-align: center; }
          .col-page .col-org-visual { height: 145px; }
          .col-page p, .col-page li { font-size: 15.5px; line-height: 1.8; }
        }
        @media (max-width: 420px) {
          .col-page .col-hero-grid { gap: 24px; }
          .col-page .col-card { padding: 20px !important; }
          .col-page .col-org-credit { font-size: 10px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .col-page *, .col-page *::before, .col-page *::after {
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
        <section className="col-hero" style={{ padding: '76px 24px' }}>
          <div className="col-hero-grid" style={{ ...styles.container, maxWidth: 1160 }}>
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
                Prévenir le cancer du col de l’utérus
              </h1>

              <p style={{ ...styles.paragraph, fontSize: 'clamp(1rem, 1.6vw, 1.12rem)', maxWidth: 600 }}>
                Ce cancer évolue lentement et peut le plus souvent être évité.
                La vaccination contre le HPV et le dépistage régulier sont les
                deux gestes qui protègent le mieux.
              </p>

              <div className="col-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
                <a className="col-button col-button-primary" href="#vaccination">
                  Comprendre la vaccination <span aria-hidden="true">→</span>
                </a>
                <a className="col-button" href="#depistage">
                  Savoir comment se faire dépister <span aria-hidden="true">↓</span>
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

            <figure className="col-hero-art">
              <HeroIllustration />
            </figure>
          </div>
        </section>

        {/* MESSAGE IMPORTANT */}
        <section className="col-section section-pad">
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
              <div className="col-icon" aria-hidden="true">!</div>
              <div>
                <Eyebrow>À RETENIR</Eyebrow>
                <h2 style={{ ...styles.heading, fontSize: 'clamp(1.45rem, 3vw, 2rem)', marginTop: 0 }}>
                  Souvent, aucun signe au début
                </h2>
                <p style={{ ...styles.paragraph, marginBottom: 0 }}>
                  Les lésions du col n’entraînent en général aucun symptôme tant
                  qu’elles sont précancéreuses. C’est pourquoi on ne doit pas
                  attendre de se sentir mal : le dépistage permet de les repérer
                  et de les traiter avant qu’elles n’évoluent.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HPV */}
        <Split
          eyebrow="COMPRENDRE"
          title="Qu’est-ce que le HPV ?"
          art={<EvolutionIllustration />}
          artCaption="Schéma simplifié, à but pédagogique."
          after={
            <div style={styles.grid}>
              {etapes.map((e, i) => (
                <article
                  key={e.titre}
                  className="col-card"
                  style={{ ...styles.card, borderTop: '3px solid #d68aa9' }}
                >
                  <span style={{ color: '#a43b68', fontSize: 12, fontWeight: 800, letterSpacing: '.12em' }}>
                    ÉTAPE {i + 1}
                  </span>
                  <h3 style={{ fontSize: 18, lineHeight: 1.45, marginTop: 8 }}>{e.titre}</h3>
                  <p style={{ ...styles.paragraph, marginBottom: 0 }}>{e.texte}</p>
                </article>
              ))}
            </div>
          }
        >
          <p style={{ ...styles.paragraph, maxWidth: 640 }}>
            Le papillomavirus humain (HPV) est un virus très fréquent. Il en
            existe de nombreux types : la plupart sont sans danger, mais certains
            types dits à haut risque, notamment les types 16 et 18, sont à
            l’origine de la grande majorité des cancers du col de l’utérus.
          </p>
          <p style={{ ...styles.paragraph, maxWidth: 640 }}>
            Être porteuse du HPV ne signifie donc pas avoir un cancer. Le risque
            vient d’une infection qui dure, sans que les lésions soient repérées.
          </p>
        </Split>

        {/* FACTEURS DE RISQUE */}
        <section className="col-section section-pad" style={{ ...styles.section, background: '#fff7fa' }}>
          <div style={styles.container}>
            <Eyebrow>FACTEURS DE RISQUE</Eyebrow>
            <h2 style={styles.heading}>Ce qui augmente le risque</h2>
            <p style={{ ...styles.paragraph, maxWidth: 780 }}>
              Avoir un ou plusieurs facteurs de risque ne signifie pas que l’on
              aura un cancer, et en l’absence de facteur, un suivi reste utile.
            </p>
            <div style={styles.grid}>
              {risques.map((r) => (
                <article key={r.titre} className="col-card" style={styles.card}>
                  <div className="col-icon" aria-hidden="true">{r.symbole}</div>
                  <h3 style={{ fontSize: 18, lineHeight: 1.45, marginTop: 18 }}>{r.titre}</h3>
                  <p style={{ ...styles.paragraph, marginBottom: 0 }}>{r.texte}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* VACCINATION */}
        <Split
          id="vaccination"
          reverse
          eyebrow="PRÉVENIR"
          title="La vaccination contre le HPV"
          art={<VaccineIllustration />}
          artCaption="Schéma simplifié. Source des informations sur la campagne : Gavi, décembre 2025."
          after={
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
                <strong style={{ color: '#30212b' }}>Votre fille a manqué la campagne ?</strong>{' '}
                Renseignez-vous auprès d’un centre de santé ou du PNLMNT sur les
                possibilités de vaccination, la disponibilité et le coût actuels :
                la gratuité concernait la campagne, pas nécessairement les
                services d’aujourd’hui.
              </p>
            </div>
          }
        >
          <p style={{ ...styles.paragraph, maxWidth: 640 }}>
            Le vaccin protège contre les types de HPV les plus souvent
            responsables du cancer du col. Il est le plus efficace lorsqu’il est
            administré avant tout contact avec le virus, c’est pourquoi il cible
            les jeunes filles.
          </p>
          <p style={{ ...styles.paragraph, maxWidth: 640 }}>
            Au Bénin, une campagne nationale gratuite s’est déroulée du 1er au
            10 décembre 2025 pour les filles de 9 à 14 ans, avec une dose
            unique, principalement dans les écoles. Le vaccin ne remplace pas le
            dépistage plus tard.
          </p>
        </Split>

        {/* DÉPISTAGE */}
        <Split
          id="depistage"
          background="#fff7fa"
          eyebrow="DÉTECTER TÔT"
          title="Le dépistage : agir avant les symptômes"
          art={<ScreeningIllustration />}
          artCaption="Schéma simplifié, à but pédagogique."
          after={
            <>
              <div style={styles.grid}>
                {depistages.map((d) => (
                  <article key={d.titre} className="col-card" style={{ ...styles.card, borderTop: '3px solid #d68aa9' }}>
                    <h3 style={{ fontSize: 18, lineHeight: 1.45, marginTop: 0 }}>{d.titre}</h3>
                    <p style={{ ...styles.paragraph, marginBottom: 0 }}>{d.texte}</p>
                  </article>
                ))}
              </div>

              <h3 style={{ fontSize: 20, marginTop: 40 }}>Comment se passe un dépistage ?</h3>
              <ol style={{ listStyle: 'none', margin: '18px 0 0', padding: 0, display: 'grid', gap: 12 }}>
                {deroule.map((etape, i) => (
                  <li
                    key={etape}
                    style={{
                      display: 'flex',
                      gap: 16,
                      alignItems: 'flex-start',
                      padding: 18,
                      borderRadius: 16,
                      background: '#fff',
                      border: '1px solid #f0dfe7',
                    }}
                  >
                    <span className="col-icon" style={{ width: 40, height: 40, flexBasis: 40, fontSize: 17, borderRadius: 12 }}>
                      {i + 1}
                    </span>
                    <span style={{ ...styles.paragraph, margin: '4px 0 0', lineHeight: 1.7 }}>{etape}</span>
                  </li>
                ))}
              </ol>

              <p style={{ ...styles.paragraph, fontSize: 13, marginTop: 20 }}>
                La méthode disponible, l’âge de début et la fréquence du
                dépistage dépendent des recommandations nationales et de votre
                situation. Demandez conseil à un professionnel de santé.
              </p>
            </>
          }
        >
          <p style={{ ...styles.paragraph, maxWidth: 640 }}>
            Le dépistage consiste à rechercher le virus ou des cellules
            anormales sur le col, chez une femme qui n’a aucun symptôme. S’il
            révèle des lésions précancéreuses, elles peuvent être traitées avant
            de devenir un cancer.
          </p>
        </Split>

        {/* SIGNES */}
        <section id="signes" className="col-section section-pad" style={{ ...styles.section, scrollMarginTop: 24 }}>
          <div style={styles.container}>
            <Eyebrow>QUAND DEMANDER CONSEIL</Eyebrow>
            <h2 style={styles.heading}>Les signes qui doivent faire consulter</h2>
            <p style={{ ...styles.paragraph, maxWidth: 780 }}>
              Ces signes peuvent avoir plusieurs causes et ne signifient pas
              nécessairement un cancer. Mais ils doivent être évalués par un
              professionnel de santé, sans attendre un prochain dépistage.
            </p>
            <div style={styles.grid}>
              {signes.map((s) => (
                <article key={s.numero} className="col-card" style={{ ...styles.card, borderTop: '3px solid #d68aa9' }}>
                  <span style={{ color: '#a43b68', fontSize: 12, fontWeight: 800, letterSpacing: '.12em' }}>
                    SIGNE {s.numero}
                  </span>
                  <h3 style={{ fontSize: 18, lineHeight: 1.45, marginTop: 8 }}>{s.titre}</h3>
                  <p style={{ ...styles.paragraph, marginBottom: 0 }}>{s.description}</p>
                </article>
              ))}
            </div>
            <p style={{ ...styles.paragraph, marginTop: 24 }}>
              En cas de saignement abondant, de forte douleur ou de fièvre
              importante, consultez rapidement ou rendez-vous aux urgences.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="col-section section-pad" style={{ ...styles.section, background: '#fff7fa' }}>
          <div style={{ ...styles.container, maxWidth: 1000 }}>
            <Eyebrow>VOS QUESTIONS</Eyebrow>
            <h2 style={styles.heading}>Questions fréquentes</h2>

            <div style={{ display: 'grid', gap: 12, marginTop: 28 }}>
              {faq.map((item) => (
                <details
                  key={item.question}
                  className="col-faq"
                  style={{
                    border: '1px solid #eadde4',
                    borderRadius: 16,
                    padding: '21px 23px',
                    background: '#fff',
                    boxShadow: '0 5px 20px rgba(91,36,64,.025)',
                  }}
                >
                  <summary style={{ cursor: 'pointer', fontWeight: 750, lineHeight: 1.7, color: '#30212b', paddingRight: 4 }}>
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
          className="col-section section-pad"
          style={{ ...styles.section, background: '#faf6fb', scrollMarginTop: 24 }}
        >
          <div style={styles.container}>
            <Eyebrow>ALLER PLUS LOIN</Eyebrow>
            <h2 style={styles.heading}>Ressources fiables pour s’informer</h2>

            <p style={{ ...styles.paragraph, maxWidth: 800 }}>
              Pour une décision médicale, privilégiez les autorités sanitaires,
              les organismes médicaux reconnus et les professionnels de santé.
            </p>

            <div style={styles.grid}>
              {ressources.map((ressource) => (
                <article
                  key={ressource.titre}
                  className="col-card"
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
                    alt={`Visuel : ${ressource.titre}`}
                  />
                  <span style={{ fontSize: 10, letterSpacing: '.1em', fontWeight: 850, color: '#96365f', lineHeight: 1.7 }}>
                    {ressource.categorie}
                  </span>
                  <h3 style={{ fontSize: 18, lineHeight: 1.5, marginTop: 10 }}>{ressource.titre}</h3>
                  <p style={{ ...styles.paragraph, flex: 1 }}>{ressource.description}</p>
                  <a
                    className="col-link"
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
              Les campagnes de vaccination et de dépistage sont limitées dans le
              temps. Vérifiez les dates, les conditions d’accès, les tarifs et
              les services directement auprès des structures concernées.
            </p>
          </div>
        </section>

        {/* NAVIGATION */}
        <section className="col-section section-pad" style={styles.section}>
          <div style={{ ...styles.container, maxWidth: 1000 }}>
            <Eyebrow>CONTINUER À S’INFORMER</Eyebrow>
            <h2 style={styles.heading}>Découvrez les autres ressources RoseRelais</h2>

            <div style={styles.grid}>
              <Link
                to="/prevention/sein"
                className="col-card"
                style={{ ...styles.card, display: 'block', textDecoration: 'none', color: 'inherit' }}
              >
                <div className="col-icon" aria-hidden="true">♡</div>
                <h3 style={{ fontSize: 19, lineHeight: 1.5, marginTop: 20 }}>Cancer du sein</h3>
                <p style={styles.paragraph}>Reconnaître les signes, comprendre le dépistage et trouver des ressources.</p>
                <span className="col-link">Découvrir la page →</span>
              </Link>

              <Link
                to="/orientation"
                className="col-card"
                style={{ ...styles.card, display: 'block', textDecoration: 'none', color: 'inherit' }}
              >
                <div className="col-icon" aria-hidden="true">⌖</div>
                <h3 style={{ fontSize: 19, lineHeight: 1.5, marginTop: 20 }}>Orientation sanitaire</h3>
                <p style={styles.paragraph}>Accéder aux ressources et préparer sa démarche de santé.</p>
                <span className="col-link">Explorer les ressources →</span>
              </Link>
            </div>

            <p style={{ marginTop: 28 }}>
              <Link className="col-link" to="/">← Retour à l’accueil de RoseRelais</Link>
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
          <img
  src="/images/RoseRelais_logo_R2.png"
  alt="Logo RoseRelais"
  width={44}
  height={44}
  className="object-contain"
/>
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

export default CancerColUterus