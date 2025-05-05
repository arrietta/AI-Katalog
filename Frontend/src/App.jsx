import Navbar from "./components/navbar"
import Home from './pages/Home'
import About from './pages/About'
import Catalog from './pages/Catalog'
import Chat from './pages/Chat'
import ProductPage from './pages/ProductPage'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className='bg-background min-h-screen w-full'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<About />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/assistent" element={<Chat />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>

    </div>
  )
}

export default App
