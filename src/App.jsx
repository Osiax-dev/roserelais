import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Accueil from './pages/Accueil.jsx'
import CancerSein from './pages/CancerSein.jsx'
import CancerColUterus from './pages/CancerColUterus.jsx'
import Orientation from './pages/Orientation.jsx'
import ChatAssistant from './components/ChatAssistant.jsx'

function PageIntrouvable() {
  return (
    <main className="section-pad">
      <h1>Page introuvable</h1>
      <p>Cette page n’existe pas ou son adresse est incorrecte.</p>
      <a className="button button-primary" href="/">
        Retour à l’accueil
      </a>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />

        <Route
          path="/prevention/sein"
          element={<CancerSein />}
        />

        <Route
          path="/prevention/col-uterus"
          element={<CancerColUterus />}
        />

        <Route
          path="/orientation"
          element={<Orientation />}
        />

        <Route
          path="/assistant"
          element={<ChatAssistant />}
        />

        <Route path="*" element={<PageIntrouvable />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App