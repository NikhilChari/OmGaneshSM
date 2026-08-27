import { Route, Routes } from 'react-router-dom'

import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Events from '@/pages/Events'
import Gallery from '@/pages/Gallery'
import GalleryAlbum from '@/pages/GalleryAlbum'
import Home from '@/pages/Home'
import Membership from '@/pages/Membership'
import News from '@/pages/News'
import NewsDetail from '@/pages/NewsDetail'

import AdminLogin from '@/pages/AdminLogin'
import AdminGallery from '@/pages/AdminGallery'
import AdminTeam from '@/pages/AdminTeam'
import AdminNews from '@/pages/AdminNews'
import AdminEvents from '@/pages/AdminEvents'

import MainLayout from '@/layouts/MainLayout'

import ProtectedRoute from '@/components/admin/ProtectedRoute'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/events"
          element={<Events />}
        />

        <Route
          path="/gallery"
          element={<Gallery />}
        />

        <Route
          path="/gallery/:slug"
          element={<GalleryAlbum />}
        />

        <Route
          path="/membership"
          element={<Membership />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/news"
          element={<News />}
        />

        <Route
          path="/news/:slug"
          element={<NewsDetail />}
        />
      </Route>

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/admin/gallery"
          element={<AdminGallery />}
        />

        <Route
          path="/admin/team"
          element={<AdminTeam />}
        />

        <Route
          path="/admin/news"
          element={<AdminNews />}
        />

        <Route
          path="/admin/events"
          element={<AdminEvents />}
        />
      </Route>
    </Routes>
  )
}

export default AppRoutes