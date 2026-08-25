import { Route, Routes } from 'react-router-dom'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Events from '@/pages/Events'
import Gallery from '@/pages/Gallery'
import Home from '@/pages/Home'
import Membership from '@/pages/Membership'
import NewsDetail from '@/pages/NewsDetail'
import MainLayout from '@/layouts/MainLayout'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news/:slug" element={<NewsDetail />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes