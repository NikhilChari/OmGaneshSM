import EventCategoriesSection from '@/components/events/EventCategoriesSection'
import EventsCtaSection from '@/components/events/EventsCtaSection'
import EventsHero from '@/components/events/EventsHero'
import PastEventsSection from '@/components/events/PastEventsSection'
import UpcomingEventsSection from '@/components/events/UpcomingEventsSection'

function Events() {
  return (
    <>
      <EventsHero />
      <UpcomingEventsSection />
      <EventCategoriesSection />
      <PastEventsSection />
      <EventsCtaSection />
    </>
  )
}

export default Events