import GalleryArchiveSection from '@/components/gallery/GalleryArchiveSection'
import GalleryCategoriesSection from '@/components/gallery/GalleryCategoriesSection'
import GalleryCtaSection from '@/components/gallery/GalleryCtaSection'
import GalleryHero from '@/components/gallery/GalleryHero'
import FeaturedGallerySection from '@/components/gallery/FeaturedGallerySection'

function Gallery() {
  return (
    <>
      <GalleryHero />
      <GalleryCategoriesSection />
      <FeaturedGallerySection />
      <GalleryArchiveSection />
      <GalleryCtaSection />
    </>
  )
}

export default Gallery