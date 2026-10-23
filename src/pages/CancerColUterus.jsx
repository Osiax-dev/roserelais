import { Link } from 'react-router-dom'
import '../App.css'

function CancerColUterus() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" to="/">
            <img src="/logo.svg" alt="" width="44" height="44" />
            <span className="brand-copy">
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

      <main className="section-pad">
        <p className="eyebrow">
          <span className="eyebrow-line" />
          PRÉVENTION ET INFORMATION
        </p>
        <h1>Prévenir le cancer du col de l’utérus</h1>
        <p className="hero-description">
          La vaccination contre le papillomavirus humain (HPV) et le dépistage
          peuvent contribuer à prévenir ce cancer. Un professionnel de santé
          peut vous expliquer les possibilités adaptées à votre situation.
        </p>

        <section>
          <h2>Qu’est-ce que le HPV ?</h2>
          <p>
            Le papillomavirus humain est un virus fréquent. Certaines infections
            persistantes par des types de HPV à haut risque peuvent provoquer des
            lésions qui, sans prise en charge, peuvent évoluer vers un cancer du
            col de l’utérus.
          </p>
        </section>

        <section>
          <h2>La vaccination</h2>
          <p>
            Les vaccins contre le HPV protègent contre les types de virus les plus
            souvent responsables de certains cancers. Renseignez-vous auprès d’un
            professionnel de santé sur l’âge recommandé et la disponibilité du vaccin.
          </p>
        </section>

        <section>
          <h2>Le dépistage</h2>
          <p>
            Le dépistage peut détecter des infections ou des lésions précancéreuses
            avant qu’un cancer ne se développe. Le test approprié et la fréquence
            dépendent des recommandations sanitaires et de votre situation.
          </p>
        </section>

        <section>
          <h2>Quand demander conseil ?</h2>
          <p>
            Des saignements inhabituels, notamment après les rapports sexuels ou
            en dehors des règles, ou des pertes vaginales inhabituelles doivent
            être évalués par un professionnel de santé. Ces signes peuvent avoir
            plusieurs causes et ne signifient pas nécessairement un cancer.
          </p>
        </section>

        <p>
          <Link className="button button-primary" to="/orientation">
            Découvrir l’orientation santé →
          </Link>
        </p>
        <p><Link to="/">← Retour à l’accueil</Link></p>
      </main>
    </div>
  )
}

export default CancerColUterus
