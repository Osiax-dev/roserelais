
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Accueil from './pages/Accueil.jsx'
import CancerSein from './pages/CancerSein.jsx'
import CancerColUterus from './pages/CancerColUterus.jsx'
import Orientation from './pages/Orientation.jsx'
import Quiz from './pages/Quiz.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/prevention/sein" element={<CancerSein />} />
        <Route path="/prevention/col-uterus" element={<CancerColUterus />} />
        <Route path="/orientation" element={<Orientation />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
