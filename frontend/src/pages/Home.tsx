import HeroSection from '@/components/home/HeroSection'
import WelcomeSection from '@/components/home/WelcomeSection'
import IntroductionSection from '@/components/home/IntroductionSection'
import UpcomingEventsSection from '@/components/home/UpcomingEventsSection'
import LatestNewsSection from '@/components/home/LatestNewsSection'
import GalleryPreviewSection from '@/components/home/GalleryPreviewSection'
import MissionVisionSection from '@/components/home/MissionVisionSection'
// import NewsletterSection from '@/components/home/NewsletterSection'
import ConnectSection from '@/components/home/ConnectSection'
function Home() {
  return (
    <>
      <HeroSection />
      <WelcomeSection />
      <IntroductionSection />
      <UpcomingEventsSection />
      <LatestNewsSection />
      <GalleryPreviewSection />
      <MissionVisionSection />
      {/* <NewsletterSection /> */}
      <ConnectSection />
    </>
  )
}

export default Home
