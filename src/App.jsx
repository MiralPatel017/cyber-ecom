import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  )
}

export default App
