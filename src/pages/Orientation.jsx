import { Link } from 'react-router-dom'
import '../App.css'

function Orientation() {
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
            <Link to="/prevention/col-uterus">Cancer du col de l’utérus</Link>
          </nav>
        </div>
      </header>

      <main className="section-pad">
        <p className="eyebrow">
          <span className="eyebrow-line" />
          LE BON REPÈRE, AU BON MOMENT
        </p>
        <h1>Vous n’avez pas à tout savoir toute seule.</h1>
        <p className="hero-description">
          Préparer une consultation, identifier les questions à poser et comprendre
          les possibilités d’accompagnement : chaque étape compte.
        </p>

        <section>
          <h2>1. Préparer sa consultation</h2>
          <p>
            Notez les changements observés, leur date d’apparition, leur évolution
            et les questions que vous souhaitez poser. Mentionnez vos traitements
            et vos antécédents pertinents au professionnel de santé.
          </p>
        </section>

        <section>
          <h2>2. À qui s’adresser ?</h2>
          <p>
            Selon votre besoin, vous pouvez commencer par un centre de santé,
            un médecin généraliste, une sage-femme ou un service spécialisé.
            Demandez conseil pour identifier le service le plus adapté.
          </p>
        </section>

        <section>
          <h2>3. Rechercher une structure de santé</h2>
          <p>
            Vérifiez l’adresse, les horaires, les services proposés et les éventuels
            frais avant de vous déplacer. En cas de doute, contactez directement
            la structure pour confirmer les informations.
          </p>
          <p>
            RoseRelais ne confirme pas encore en temps réel la disponibilité des
            services de santé. Cette fonctionnalité pourra être ajoutée par la suite.
          </p>
        </section>

        <section>
          <h2>4. Quand faut-il agir rapidement ?</h2>
          <p>
            En cas de symptômes sévères ou d’aggravation rapide, sollicitez sans
            délai un service médical d’urgence disponible dans votre région.
          </p>
        </section>

        <div>
          <Link className="button button-primary" to="/prevention/sein">
            Prévention du cancer du sein →
          </Link>
        </div>
        <p><Link to="/prevention/col-uterus">Prévention du cancer du col de l’utérus →</Link></p>
        <p><Link to="/">← Retour à l’accueil</Link></p>
      </main>
    </div>
  )
}

export default Orientation
