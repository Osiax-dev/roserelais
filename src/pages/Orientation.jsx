
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import structures from '../data/structures.js'

const PHOTO_CAMPAGNE =
  'https://pnlmnt.bj/storage/app/media/2026/octobre%20rose/depistage%20sensibilisation/marche/marche-22-3jT.jpeg'

const PHOTOS = [
  {
    src: PHOTO_CAMPAGNE,
    alt: 'Campagne de sensibilisation Octobre Rose au Bénin',
  },
  {
    src: 'https://pnlmnt.bj/storage/app/media/2026/octobre%20rose/depistage%20sensibilisation/marche/marche-6-Jts.jpeg',
    alt: 'Mobilisation pour la prévention des cancers féminins au Bénin',
  },
  {
    src: 'https://pnlmnt.bj/storage/app/media/2026/octobre%20rose/depistage%20sensibilisation/marche/marche-3-fSF.jpeg',
    alt: 'Photographie de la campagne officielle Octobre Rose',
  },
]

const ROSE = '#96365f'
const ROSE_DARK = '#702344'
const TEXT = '#4b3a45'

function Eyebrow({ children }) {
  return (
    <p className="orientation-eyebrow">
      <span />
      {children}
    </p>
  )
}

function Photo({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return (
      <div className={`orientation-photo-fallback ${className}`}>
        <span aria-hidden="true">♡</span>
        <p>RoseRelais — prévention et accompagnement</p>
      </div>
    )
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  )
}

function Orientation() {
  const [ville, setVille] = useState('')
  const [service, setService] = useState('')
  const [recherche, setRecherche] = useState('')

  const villes = useMemo(
    () =>
      [...new Set(structures.map((s) => s.ville).filter(Boolean))].sort(),
    []
  )

  const services = useMemo(
    () =>
      [...new Set(structures.flatMap((s) => s.services || []))].sort(),
    []
  )

  const resultats = useMemo(() => {
    const terme = recherche.trim().toLocaleLowerCase('fr')

    return structures.filter((structure) => {
      const correspondVille =
        !ville || structure.ville === ville

      const correspondService =
        !service || structure.services?.includes(service)

      const texte = [
        structure.nom,
        structure.type,
        structure.ville,
        structure.quartier,
        structure.adresse,
        ...(structure.services || []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLocaleLowerCase('fr')

      return (
        correspondVille &&
        correspondService &&
        (!terme || texte.includes(terme))
      )
    })
  }, [ville, service, recherche])

  return (
    <div className="site-shell orientation-page">
      <style>{`
        .orientation-page {
          --ori-rose: #96365f;
          --ori-dark: #702344;
          --ori-soft: #fff4f8;
          --ori-border: #f0dfe7;
          color: #30212b;
          background: #fff;
          overflow: hidden;
        }

        .orientation-page *,
        .orientation-page *::before,
        .orientation-page *::after {
          box-sizing: border-box;
        }

        .orientation-page img {
          max-width: 100%;
        }

        .orientation-page .orientation-container {
          width: 100%;
          max-width: 1120px;
          margin: 0 auto;
        }

        .orientation-page .orientation-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0 0 14px;
          color: var(--ori-rose);
          font-size: 11px;
          font-weight: 850;
          letter-spacing: .13em;
          line-height: 1.7;
        }

        .orientation-page .orientation-eyebrow span {
          display: inline-block;
          width: 25px;
          height: 2px;
          flex: 0 0 25px;
          background: #d68aa9;
        }

        .orientation-page .orientation-hero {
          padding: 76px 24px;
          background:
            radial-gradient(ellipse at 84% 20%, rgba(231,174,199,.23), transparent 35%),
            linear-gradient(135deg, #fff3f7 0%, #fffafd 58%, #f6eff8 100%);
        }

        .orientation-page .orientation-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr);
          gap: 48px;
          align-items: center;
        }

        .orientation-page .orientation-title {
          margin: 12px 0 22px;
          max-width: 650px;
          color: #392331;
          font-size: clamp(2.35rem, 5vw, 4.2rem);
          line-height: 1.08;
          letter-spacing: -.045em;
        }

        .orientation-page .orientation-lead,
        .orientation-page .orientation-text {
          color: ${TEXT};
          font-size: 15px;
          line-height: 1.9;
        }

        .orientation-page .orientation-hero-photo {
          display: block;
          width: 100%;
          height: 350px;
          object-fit: cover;
          border: 8px solid rgba(255,255,255,.8);
          border-radius: 28px;
          box-shadow: 0 24px 65px rgba(80,30,55,.14);
          background: #fce8f0;
        }

        .orientation-page .orientation-caption {
          margin: 10px 4px 0;
          color: #6a4a5c;
          font-size: 11px;
          line-height: 1.7;
        }

        .orientation-page .orientation-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 26px;
        }

        .orientation-page .orientation-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 46px;
          padding: 12px 18px;
          border: 1px solid #ead4df;
          border-radius: 12px;
          background: #fff;
          color: #843454;
          font-size: 13px;
          font-weight: 750;
          text-decoration: none;
          cursor: pointer;
          transition: transform .2s ease, box-shadow .2s ease;
        }

        .orientation-page .orientation-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(91,36,64,.1);
        }

        .orientation-page .orientation-button-primary {
          border-color: var(--ori-rose);
          background: var(--ori-rose);
          color: #fff;
        }

        .orientation-page .orientation-button-primary:hover {
          background: var(--ori-dark);
          color: #fff;
        }

        .orientation-page .orientation-section {
          padding: 70px 24px;
        }

        .orientation-page .orientation-section-soft {
          background: #fff7fa;
        }

        .orientation-page .orientation-heading {
          margin: 10px 0 18px;
          color: #30212b;
          font-size: clamp(1.8rem, 3.5vw, 2.65rem);
          line-height: 1.2;
          letter-spacing: -.035em;
        }

        .orientation-page .orientation-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
          margin-top: 28px;
        }

        .orientation-page .orientation-card {
          min-width: 0;
          padding: 26px;
          border: 1px solid var(--ori-border);
          border-radius: 20px;
          background: #fff;
          box-shadow: 0 8px 30px rgba(91,36,64,.045);
          transition: transform .22s ease, box-shadow .22s ease;
        }

        .orientation-page .orientation-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 36px rgba(91,36,64,.09);
        }

        .orientation-page .orientation-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: #fce8f0;
          color: var(--ori-rose);
          font-size: 15px;
          font-weight: 850;
        }

        .orientation-page .orientation-card h3 {
          margin: 18px 0 8px;
          color: #392331;
          font-size: 18px;
          line-height: 1.5;
        }

        .orientation-page .orientation-card p {
          color: ${TEXT};
          font-size: 14px;
          line-height: 1.85;
        }

        .orientation-page .orientation-filter-panel {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1fr) auto;
          gap: 14px;
          align-items: end;
          margin-top: 28px;
          padding: 22px;
          border: 1px solid var(--ori-border);
          border-radius: 18px;
          background: #fffafd;
        }

        .orientation-page .orientation-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 0;
          color: #493340;
          font-size: 12px;
          font-weight: 750;
        }

        .orientation-page .orientation-field input,
        .orientation-page .orientation-field select {
          width: 100%;
          min-width: 0;
          min-height: 46px;
          padding: 11px 12px;
          border: 1px solid #e8d6df;
          border-radius: 10px;
          background: #fff;
          color: #392331;
          font: inherit;
          font-weight: 450;
        }

        .orientation-page .orientation-field input:focus,
        .orientation-page .orientation-field select:focus {
          outline: 3px solid #f5dce7;
          border-color: var(--ori-rose);
        }

        .orientation-page .orientation-results {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin: 25px 0 15px;
        }

        .orientation-page .orientation-results-count {
          margin: 0;
          color: #493340;
          font-size: 14px;
          font-weight: 750;
        }

        .orientation-page .orientation-structure {
          overflow: hidden;
          padding: 0;
        }

        .orientation-page .orientation-structure-content {
          padding: 23px;
        }

        .orientation-page .orientation-structure-photo {
          display: block;
          width: 100%;
          height: 185px;
          object-fit: cover;
          background: #fff4f8;
        }

        .orientation-page .orientation-type {
          display: inline-block;
          margin: 0 0 8px;
          padding: 6px 10px;
          border-radius: 999px;
          background: #fce8f0;
          color: #843454;
          font-size: 11px;
          font-weight: 800;
        }

        .orientation-page .orientation-meta {
          margin: 7px 0;
          overflow-wrap: anywhere;
          font-size: 13px;
        }

        .orientation-page .orientation-services {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          padding: 0;
          margin: 14px 0;
          list-style: none;
        }

        .orientation-page .orientation-services li {
          padding: 6px 9px;
          border: 1px solid #f0dfe7;
          border-radius: 8px;
          background: #fffafd;
          color: #59374a;
          font-size: 11px;
          line-height: 1.6;
        }

        .orientation-page .orientation-warning {
          padding: 11px 12px;
          border-radius: 10px;
          background: #fff7e9;
          color: #76521c;
          font-size: 12px;
          line-height: 1.7;
        }

        .orientation-page .orientation-source {
          display: inline-block;
          margin-top: 14px;
          color: var(--ori-rose);
          font-size: 13px;
          font-weight: 750;
          line-height: 1.8;
          text-decoration: none;
        }

        .orientation-page .orientation-source:hover {
          text-decoration: underline;
        }

        .orientation-page .orientation-gallery {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-top: 26px;
        }

        .orientation-page .orientation-gallery img {
          display: block;
          width: 100%;
          height: 210px;
          object-fit: cover;
          border-radius: 16px;
          background: #fce8f0;
        }

        .orientation-page .orientation-photo-fallback {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 170px;
          padding: 20px;
          background: linear-gradient(135deg, #fce8f0, #f6eff8);
          color: var(--ori-rose);
          text-align: center;
        }

        .orientation-page .orientation-photo-fallback span {
          font-size: 36px;
        }

        .orientation-page .orientation-photo-fallback p {
          font-size: 12px;
          line-height: 1.7;
        }

        .orientation-page .orientation-footer {
          padding: 38px 24px;
          border-top: 1px solid #f0dce4;
          background: #fff4f8;
          text-align: center;
        }

        .orientation-page a:focus-visible,
        .orientation-page button:focus-visible {
          outline: 3px solid #d98bad;
          outline-offset: 4px;
        }

        @media (max-width: 900px) {
          .orientation-page .orientation-hero-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 30px;
          }

          .orientation-page .orientation-hero-photo {
            height: 320px;
          }

          .orientation-page .orientation-filter-panel {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 600px) {
          .orientation-page .orientation-hero {
            padding: 46px 20px;
          }

          .orientation-page .orientation-section {
            padding: 50px 20px;
          }

          .orientation-page .orientation-grid,
          .orientation-page .orientation-gallery,
          .orientation-page .orientation-filter-panel {
            grid-template-columns: minmax(0, 1fr);
          }

          .orientation-page .orientation-hero-photo {
            height: 250px;
            border-width: 5px;
            border-radius: 20px;
          }

          .orientation-page .orientation-buttons {
            align-items: stretch;
          }

          .orientation-page .orientation-button {
            width: 100%;
          }

          .orientation-page .orientation-card {
            padding: 21px;
          }

          .orientation-page .orientation-gallery img {
            height: 230px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .orientation-page *,
          .orientation-page *::before,
          .orientation-page *::after {
            transition: none !important;
          }
        }
      `}</style>

      {/* EN-TÊTE */}
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
            <Link to="/prevention/col-uterus">
              Cancer du col de l’utérus
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO AVEC PHOTOGRAPHIE RÉELLE */}
        <section className="orientation-hero">
          <div className="orientation-container orientation-hero-grid">
            <div>
              <Eyebrow>LE BON REPÈRE, AU BON MOMENT</Eyebrow>

              <h1 className="orientation-title">
                Vous n’avez pas à tout savoir toute seule.
              </h1>

              <p className="orientation-lead">
                Trouver une structure de santé, préparer une consultation
                et découvrir les ressources disponibles pour avancer
                avec davantage de sérénité.
              </p>

              <div className="orientation-buttons">
                <a
                  className="orientation-button orientation-button-primary"
                  href="#annuaire"
                >
                  Trouver une structure →
                </a>

                <a className="orientation-button" href="#preparer">
                  Préparer ma consultation
                </a>
              </div>

              <p className="orientation-caption">
                Les informations de l’annuaire doivent être confirmées
                auprès de chaque établissement avant le déplacement.
              </p>
            </div>

            <figure style={{ margin: 0, minWidth: 0 }}>
              <Photo
                src={PHOTO_CAMPAGNE}
                alt="Photographie de la campagne Octobre Rose publiée par le PNLMNT du Bénin"
                className="orientation-hero-photo"
              />
              <figcaption className="orientation-caption">
                Photo : PNLMNT. Campagne Octobre Rose 2026.
                {' '}
                <a
                  className="orientation-source"
                  href="https://pnlmnt.bj/octobre-rose-2026-tout-cotonou-marche"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Voir la publication officielle ↗
                </a>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 1. PRÉPARER SA CONSULTATION */}
        <section id="preparer" className="orientation-section">
          <div className="orientation-container">
            <Eyebrow>AVANT LE RENDEZ-VOUS</Eyebrow>
            <h2 className="orientation-heading">
              1. Préparer sa consultation
            </h2>

            <p className="orientation-text" style={{ maxWidth: 800 }}>
              Préparer quelques informations avant la consultation peut
              faciliter les échanges avec le professionnel de santé.
            </p>

            <div className="orientation-grid">
              <article className="orientation-card">
                <span className="orientation-number">01</span>
                <h3>Noter les changements observés</h3>
                <p>
                  Indiquez leur date d’apparition, leur évolution et les
                  symptômes que vous avez remarqués.
                </p>
              </article>

              <article className="orientation-card">
                <span className="orientation-number">02</span>
                <h3>Préparer ses questions</h3>
                <p>
                  Notez les questions sur les examens, le dépistage,
                  les résultats et les prochaines étapes.
                </p>
              </article>

              <article className="orientation-card">
                <span className="orientation-number">03</span>
                <h3>Rassembler les documents utiles</h3>
                <p>
                  Apportez, si vous en disposez, vos résultats précédents,
                  la liste de vos traitements et les documents médicaux utiles.
                </p>
              </article>

              <article className="orientation-card">
                <span className="orientation-number">04</span>
                <h3>Demander des explications</h3>
                <p>
                  Vous pouvez demander le rôle de chaque examen, les
                  modalités pratiques et les éventuels frais.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* 2. À QUI S'ADRESSER */}
        <section className="orientation-section orientation-section-soft">
          <div className="orientation-container">
            <Eyebrow>SE FAIRE ACCOMPAGNER</Eyebrow>
            <h2 className="orientation-heading">
              2. À qui s’adresser ?
            </h2>

            <p className="orientation-text" style={{ maxWidth: 800 }}>
              Le service adapté dépend de votre besoin. Vérifiez auprès
              de la structure les consultations et examens réellement proposés.
            </p>

            <div className="orientation-grid">
              <article className="orientation-card">
                <span className="orientation-number">♡</span>
                <h3>Centre de santé ou maternité</h3>
                <p>
                  Pour demander conseil sur le dépistage et connaître
                  les possibilités d’orientation.
                </p>
              </article>

              <article className="orientation-card">
                <span className="orientation-number">＋</span>
                <h3>Gynécologie</h3>
                <p>
                  Pour une consultation gynécologique et l’évaluation
                  de la nécessité d’un examen complémentaire.
                </p>
              </article>

              <article className="orientation-card">
                <span className="orientation-number">⌕</span>
                <h3>Imagerie médicale</h3>
                <p>
                  Pour vérifier la disponibilité d’une mammographie
                  ou d’un autre examen d’imagerie prescrit.
                </p>
              </article>

              <article className="orientation-card">
                <span className="orientation-number">↗</span>
                <h3>Service spécialisé</h3>
                <p>
                  Pour être orientée vers un service compétent selon
                  les résultats et l’avis du professionnel de santé.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* 3. ANNUAIRE */}
        <section id="annuaire" className="orientation-section">
          <div className="orientation-container">
            <Eyebrow>ANNUAIRE DES STRUCTURES</Eyebrow>
            <h2 className="orientation-heading">
              3. Trouver une structure de santé
            </h2>

            <p className="orientation-text" style={{ maxWidth: 830 }}>
              Recherchez par ville, service ou nom d’établissement.
              Consultez la source et confirmez les informations pratiques
              avant de vous déplacer.
            </p>

            <div className="orientation-filter-panel">
              <label className="orientation-field">
                Nom ou quartier
                <input
                  type="search"
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                  placeholder="Ex. : Cocotiers, Parakou…"
                />
              </label>

              <label className="orientation-field">
                Ville
                <select
                  value={ville}
                  onChange={(e) => setVille(e.target.value)}
                >
                  <option value="">Toutes les villes</option>
                  {villes.map((nom) => (
                    <option key={nom} value={nom}>
                      {nom}
                    </option>
                  ))}
                </select>
              </label>

              <label className="orientation-field">
                Service recherché
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  <option value="">Tous les services</option>
                  {services.map((nom) => (
                    <option key={nom} value={nom}>
                      {nom}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                className="orientation-button"
                onClick={() => {
                  setRecherche('')
                  setVille('')
                  setService('')
                }}
              >
                Effacer
              </button>
            </div>

            <div className="orientation-results">
              <p className="orientation-results-count" aria-live="polite">
                {resultats.length} structure(s) trouvée(s)
              </p>

              {(ville || service || recherche) && (
                <button
                  type="button"
                  className="orientation-source"
                  onClick={() => {
                    setRecherche('')
                    setVille('')
                    setService('')
                  }}
                >
                  Réinitialiser les filtres
                </button>
              )}
            </div>

            {resultats.length === 0 ? (
              <div className="orientation-card">
                <h3>Aucune structure trouvée</h3>
                <p>
                  Essayez un autre nom, une autre ville ou un autre service.
                  L’annuaire sera enrichi à mesure que les informations
                  seront vérifiées.
                </p>
              </div>
            ) : (
              <div className="orientation-grid">
                {resultats.map((structure) => {
                  const estVerifie = structure.statut === 'verifie'

                  const sourceOfficielle =
                    structure.sourceUrl || ''

                  const imageStructure =
                    structure.image || ''

                  return (
                    <article
                      className="orientation-card orientation-structure"
                      key={structure.id}
                    >
                      <Photo
                        src={imageStructure}
                        alt={
                          imageStructure
                            ? `Photographie de ${structure.nom}`
                            : `Aucune photographie disponible pour ${structure.nom}`
                        }
                        className="orientation-structure-photo"
                      />

                      <div className="orientation-structure-content">
                        <span className="orientation-type">
                          {structure.type || 'Structure de santé'}
                        </span>

                        <h3>{structure.nom}</h3>

                        <p className="orientation-meta">
                          <strong>Ville :</strong>{' '}
                          {structure.ville || 'À confirmer'}
                        </p>

                        {structure.quartier && (
                          <p className="orientation-meta">
                            <strong>Quartier :</strong>{' '}
                            {structure.quartier}
                          </p>
                        )}

                        {structure.adresse && (
                          <p className="orientation-meta">
                            <strong>Adresse :</strong>{' '}
                            {structure.adresse}
                          </p>
                        )}

                        <p className="orientation-meta">
                          <strong>Services documentés :</strong>
                        </p>

                        {structure.services?.length ? (
                          <ul className="orientation-services">
                            {structure.services.map((nom) => (
                              <li key={nom}>{nom}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="orientation-meta">
                            Services à confirmer auprès de l’établissement.
                          </p>
                        )}

                        <p className="orientation-meta">
                          <strong>Horaires :</strong>{' '}
                          {structure.horaires || 'À confirmer'}
                        </p>

                        <p className="orientation-meta">
                          <strong>Dernière vérification :</strong>{' '}
                          {structure.verifieLe || 'Non renseignée'}
                        </p>

                        {!estVerifie && (
                          <p className="orientation-warning">
                            Informations pratiques à confirmer directement
                            auprès de la structure. La présence dans cet
                            annuaire ne garantit pas la disponibilité actuelle
                            des services.
                          </p>
                        )}

                        <div className="orientation-buttons">
                          {structure.telephone && (
                            <a
                              className="orientation-button orientation-button-primary"
                              href={`tel:${structure.telephone}`}
                            >
                              Appeler
                            </a>
                          )}

                          {structure.mapsUrl && (
                            <a
                              className="orientation-button"
                              href={structure.mapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Ouvrir dans Maps ↗
                            </a>
                          )}
                        </div>

                        {sourceOfficielle && (
                          <a
                            className="orientation-source"
                            href={sourceOfficielle}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Consulter la source ↗
                          </a>
                        )}

                        {structure.imageSource && (
                          <p className="orientation-meta">
                            <a
                              className="orientation-source"
                              href={structure.imageSource}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Vérifier la source de la photo ↗
                            </a>
                            {structure.imageCredit && (
                              <span> — {structure.imageCredit}</span>
                            )}
                          </p>
                        )}
                      </div>
                    </article>
                  )
                })}
              </div>
            )}

            <div
              style={{
                marginTop: 28,
                padding: 20,
                border: '1px solid #f0d3df',
                borderRadius: 16,
                background: '#fff7fa',
              }}
            >
              <p className="orientation-text" style={{ margin: 0 }}>
                <strong>Important :</strong> une source officielle peut
                confirmer l’existence d’un établissement sans garantir
                que chaque service, horaire ou numéro soit toujours à jour.
                Contactez la structure avant tout déplacement.
              </p>
            </div>
          </div>
        </section>

        {/* PHOTOGRAPHIES RÉELLES */}
        <section className="orientation-section orientation-section-soft">
          <div className="orientation-container">
            <Eyebrow>PRÉVENTION AU BÉNIN</Eyebrow>
            <h2 className="orientation-heading">
              La sensibilisation en images
            </h2>

            <p className="orientation-text" style={{ maxWidth: 800 }}>
              Retrouvez des photographies publiées par le Programme national
              de lutte contre les maladies non transmissibles (PNLMNT).
              Ces images illustrent des campagnes de sensibilisation ;
              elles ne représentent pas nécessairement les établissements
              figurant dans l’annuaire.
            </p>

            <div className="orientation-gallery">
              {PHOTOS.map((photo) => (
                <figure key={photo.src} style={{ margin: 0, minWidth: 0 }}>
                  <Photo src={photo.src} alt={photo.alt} />
                  <figcaption className="orientation-caption">
                    Photo : PNLMNT — Octobre Rose 2026.
                  </figcaption>
                </figure>
              ))}
            </div>

            <a
              className="orientation-button orientation-button-primary"
              style={{ marginTop: 25 }}
              href="https://pnlmnt.bj/octobre-rose-2026-depistage-sensibilisation"
              target="_blank"
              rel="noopener noreferrer"
            >
              Consulter la publication officielle ↗
            </a>
          </div>
        </section>

        {/* 4. URGENCES */}
        <section className="orientation-section">
          <div className="orientation-container">
            <Eyebrow>PRENDRE SOIN DE SA SANTÉ</Eyebrow>
            <h2 className="orientation-heading">
              4. Quand faut-il agir rapidement ?
            </h2>

            <div className="orientation-card">
              <p className="orientation-text">
                En cas de symptômes sévères, de malaise important ou
                d’aggravation rapide, sollicitez sans délai un service médical
                d’urgence disponible dans votre région.
              </p>

              <p className="orientation-text">
                Une anomalie nouvelle du sein ou des symptômes gynécologiques
                inhabituels nécessitent un avis médical. Ne retardez pas
                une consultation nécessaire en attendant de trouver une
                structure dans cet annuaire.
              </p>
            </div>

            <div className="orientation-buttons">
              <Link
                className="orientation-button orientation-button-primary"
                to="/prevention/sein"
              >
                Prévention du cancer du sein →
              </Link>

              <Link className="orientation-button" to="/prevention/col-uterus">
                Prévention du cancer du col de l’utérus →
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* PIED DE PAGE */}
      <footer className="orientation-footer">
        <Link
          className="brand"
          to="/"
          style={{
            justifyContent: 'center',
            textDecoration: 'none',
            color: ROSE_DARK,
          }}
        >
<img
  src="/images/RoseRelais_logo_R2.png"
  alt="Logo RoseRelais"
  width={44}
  height={44}
  className="object-contain"
/>          <span className="brand-copy">
            <strong>RoseRelais</strong>
            <small>Informer. Orienter. Accompagner.</small>
          </span>
        </Link>

        <p
          style={{
            maxWidth: 760,
            margin: '16px auto 0',
            color: '#6a4a5c',
            fontSize: 12,
            lineHeight: 1.8,
          }}
        >
          Les informations de RoseRelais sont fournies à des fins éducatives
          et d’orientation. Elles ne remplacent pas une consultation médicale.
          Les coordonnées et services doivent être confirmés auprès des
          établissements concernés.
        </p>

        <p style={{ marginTop: 15 }}>
          <Link className="orientation-source" to="/">
            ← Retour à l’accueil
          </Link>
        </p>
      </footer>
    </div>
  )
}

export default Orientation
