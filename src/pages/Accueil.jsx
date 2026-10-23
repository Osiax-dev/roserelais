import { useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
const ressources = [
  {
    numero: '01',
    categorie: 'CANCER DU SEIN',
    titre: 'Mieux comprendre son corps',
    description:
      'Découvrir les signes qui méritent une attention médicale et les démarches à connaître.',
    couleur: 'rose',
    lien: '#sein',
  },
  {
    numero: '02',
    categorie: 'CANCER DU COL DE L’UTÉRUS',
    titre: 'La prévention, pas à pas',
    description:
      'Comprendre le rôle du dépistage et de la vaccination contre le HPV.',
    couleur: 'violet',
    lien: '#col-uterus',
  },
  {
    numero: '03',
    categorie: 'ORIENTATION SANITAIRE',
    titre: 'Savoir vers qui se tourner',
    description:
      'Préparer ses questions et rechercher des structures de santé à proximité.',
    couleur: 'prune',
    lien: '#orientation',
  },
]

function Logo({ footer = false }) {
  return (
    <a
      className={`brand ${footer ? 'brand-footer' : ''}`}
      href="#accueil"
      aria-label="RoseRelais, accueil"
    >
      <img
  src="/images/RoseRelais_logo_R2.png"
  alt="Logo RoseRelais"
  width={44}
  height={44}
  className="object-contain"
/>
      <span className="brand-copy">
        <strong>RoseRelais</strong>
        <small>Informer. Orienter. Accompagner.</small>
      </span>
    </a>
  )
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Accueil() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell" id="accueil">
      <div className="announcement">
        <span className="announcement-dot" />
        La prévention commence par une information fiable.
      </div>

      <header className="site-header">
        <div className="header-inner">
          <Logo />

          <button
            className="mobile-menu-button"
            type="button"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>

          <nav
            id="main-navigation"
            className={`main-navigation ${menuOpen ? 'navigation-open' : ''}`}
            aria-label="Navigation principale"
          >
            <a href="#prevention" onClick={closeMenu}>Prévention</a>
            <a href="#orientation" onClick={closeMenu}>Orientation</a>
            <a href="#apprendre" onClick={closeMenu}>Apprendre</a>
            <a
              className="nav-cta"
              href="#ressources"
              onClick={closeMenu}
            >
              Explorer les ressources <ArrowIcon />
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero editorial-section">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" />
              VOTRE SANTÉ, VOTRE PRIORITÉ
            </p>

            <h1>
              S’informer,
              <br />
              c’est déjà
              <br />
              <span className="heading-accent">prendre soin.</span>
            </h1>

            <p className="hero-description">
              Une information claire, des repères utiles et une meilleure
              orientation pour parler de la santé des femmes sans tabou.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#prevention">
                Découvrir la prévention <ArrowIcon />
              </a>
              <a className="text-link" href="#orientation">
                Trouver son chemin <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="hero-note">
              <span className="note-icon" aria-hidden="true">✳</span>
              <p>
                <strong>Comprendre sans culpabiliser.</strong>
                <br />
                Avancer à son rythme, avec des informations fiables.
              </p>
            </div>
          </div>

          <div className="hero-art" aria-label="Illustration éditoriale de la prévention">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />

            <div className="art-label art-label-top">
              <span>PRENDRE SOIN DE SOI</span>
              <span className="label-star">✳</span>
            </div>

            <div className="hero-photo-frame">
              <img
                src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80"
                alt="Portrait d’une femme souriante"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            <div className="art-sticker">
              <span>La connaissance</span>
              <strong>est une force.</strong>
              <span className="sticker-star">✳</span>
            </div>

            <div className="art-caption">
              <span className="caption-number">01 / 03</span>
              <span>LA PRÉVENTION AU QUOTIDIEN</span>
            </div>

            <div className="art-flower" aria-hidden="true">✿</div>
          </div>

          <div className="hero-side-note" aria-hidden="true">
            ROSE RELAIS · ENSEMBLE, INFORMÉES
          </div>
        </section>

        <section className="values-strip" aria-label="Nos engagements">
          <div className="value-item">
            <span className="value-symbol">✳</span>
            <div>
              <strong>Des mots simples</strong>
              <span>Pour mieux comprendre</span>
            </div>
          </div>
          <div className="value-item">
            <span className="value-symbol">♡</span>
            <div>
              <strong>Sans jugement</strong>
              <span>Un espace bienveillant</span>
            </div>
          </div>
          <div className="value-item">
            <span className="value-symbol">↗</span>
            <div>
              <strong>Des repères utiles</strong>
              <span>Pour mieux s’orienter</span>
            </div>
          </div>
        </section>

        <section className="prevention-section section-pad" id="prevention">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-line" />
                S’INFORMER À SON RYTHME
              </p>
              <h2>
                Parce que mieux comprendre
                <br />
                <em>change la perspective.</em>
              </h2>
            </div>
            <p className="section-intro">
              La santé ne devrait pas être un sujet compliqué ou inaccessible.
              Commençons par les informations essentielles.
            </p>
          </div>

          <div className="resource-grid" id="ressources">
            {ressources.map((item) => (
              <article
                className={`resource-card card-${item.couleur}`}
                key={item.numero}
              >
                <div className="card-topline">
                  <span>{item.categorie}</span>
                  <span className="card-number">{item.numero}</span>
                </div>

                <div className="card-illustration" aria-hidden="true">
                  {item.numero === '01' && (
                    <svg viewBox="0 0 180 120" fill="none">
                      <circle cx="90" cy="60" r="43" />
                      <circle cx="90" cy="60" r="30" />
                      <path d="M90 22v76M52 60h76" />
                      <path d="M72 43c10-12 26-12 36 0" />
                    </svg>
                  )}
                  {item.numero === '02' && (
                    <svg viewBox="0 0 180 120" fill="none">
                      <path d="M90 15c-20 0-37 17-37 37 0 23 37 53 37 53s37-30 37-53c0-20-17-37-37-37Z" />
                      <path d="M73 51h34M90 34v34" />
                      <circle cx="90" cy="52" r="20" />
                    </svg>
                  )}
                  {item.numero === '03' && (
                    <svg viewBox="0 0 180 120" fill="none">
                      <path d="M30 95 76 49l26 26 48-52" />
                      <path d="M115 23h35v35" />
                      <circle cx="30" cy="95" r="7" />
                      <circle cx="76" cy="49" r="7" />
                      <circle cx="102" cy="75" r="7" />
                    </svg>
                  )}
                </div>

                <h3>{item.titre}</h3>
                <p>{item.description}</p>
                <Link
  className="card-link"
  to={
    item.numero === '01'
      ? '/prevention/sein'
      : item.numero === '02'
        ? '/prevention/col-uterus'
        : '/orientation'
  }
>
  En savoir plus <ArrowIcon />
</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="orientation-section section-pad" id="orientation">
          <div className="orientation-panel">
            <div className="orientation-decoration" aria-hidden="true">RR</div>
            <div className="orientation-content">
              <p className="eyebrow eyebrow-light">
                <span className="eyebrow-line" />
                LE BON REPÈRE, AU BON MOMENT
              </p>
              <h2>
                Vous n’avez pas
                <br />
                à tout savoir
                <em> toute seule.</em>
              </h2>
              <p>
                Préparer une consultation, identifier les questions à poser
                et comprendre les possibilités d’accompagnement : chaque
                étape compte.
              </p>
              <a className="button button-light" href="#apprendre">
                Découvrir les repères <ArrowIcon />
              </a>
            </div>
            <div className="orientation-aside">
              <span className="aside-star">✳</span>
              <p>
                Une plateforme d’information et d’orientation, en complément
                d’un avis professionnel de santé.
              </p>
            </div>
          </div>
        </section>

        <section className="learning-section section-pad" id="apprendre">
          <div className="learning-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" />
              APPRENDRE AUTREMENT
            </p>
            <h2>
              La prévention,
              <br />
              <em>pas à pas.</em>
            </h2>
            <p className="learning-description">
              Comprendre les messages essentiels ne devrait pas être compliqué.
              Explorez ces repères illustrés, avancez à votre rythme et retenez
              l’essentiel pour mieux échanger avec un professionnel de santé.
            </p>
<Link className="button button-primary" to="/quiz">
  Commencer le quiz <ArrowIcon />
</Link>          </div>

          <div className="learning-cards" aria-label="Trois façons d’apprendre">
            <article className="learning-card learning-card-rose">
              <div className="learning-card-visual visual-understand" aria-hidden="true">
                <svg viewBox="0 0 120 100" fill="none">
                  <path d="M60 15c-15 0-27 12-27 27 0 11 6 18 14 25 5 4 7 8 7 13h12c0-5 2-9 7-13 8-7 14-14 14-25 0-15-12-27-27-27Z" />
                  <path d="M49 85h22M51 92h18M60 28v25M48 40h24" />
                  <path d="M19 24l7 7M101 24l-7 7M60 5v5" />
                </svg>
                <span className="visual-tag">01 · COMPRENDRE</span>
              </div>
              <div className="learning-card-copy">
                <h3>Les bons repères</h3>
                <p>Des explications simples pour mieux comprendre la prévention du cancer du sein et du col de l’utérus.</p>
              </div>
            </article>

            <article className="learning-card learning-card-violet">
              <div className="learning-card-visual visual-notice" aria-hidden="true">
                <svg viewBox="0 0 120 100" fill="none">
                  <path d="M60 12 98 80H22L60 12Z" />
                  <path d="M60 38v20M60 68h.1" />
                  <circle cx="91" cy="22" r="12" />
                  <path d="m86 22 4 4 7-8" />
                </svg>
                <span className="visual-tag">02 · REPÉRER</span>
              </div>
              <div className="learning-card-copy">
                <h3>Écouter son corps</h3>
                <p>Connaître les changements à ne pas négliger et savoir quand demander un avis médical.</p>
              </div>
            </article>

            <article className="learning-card learning-card-plum">
              <div className="learning-card-visual visual-quiz" aria-hidden="true">
                <div className="quiz-sheet">
                  <span></span><span></span><span></span>
                  <b>?</b>
                </div>
                <span className="visual-tag">03 · MÉMORISER</span>
              </div>
              <div className="learning-card-copy">
                <h3>Apprendre en s’amusant</h3>
                <p>Des mini-quiz à venir pour réviser les messages de prévention et retenir l’essentiel.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="disclaimer">
          <span className="disclaimer-icon" aria-hidden="true">i</span>
          <p>
            <strong>Une information ne remplace pas une consultation.</strong>
            RoseRelais a vocation à informer et orienter. Seul un professionnel
            de santé peut évaluer une situation personnelle et proposer une
            prise en charge adaptée.
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <Logo footer />
          <p>
            Des informations plus accessibles.
            <br />
            Des femmes mieux accompagnées.
          </p>
          <a className="footer-top-link" href="#accueil">
            Retour en haut ↑
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} RoseRelais</span>
          <span>Informer · Orienter · Accompagner</span>
          <span>Conçu avec bienveillance au Bénin</span>
        </div>
      </footer>
    </div>
  )
}

export default Accueil

