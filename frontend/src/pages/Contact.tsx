import ContactCtaSection from '@/components/contact/ContactCtaSection'
import ContactFormSection from '@/components/contact/ContactFormSection'
import ContactHero from '@/components/contact/ContactHero'
import ContactInfoSection from '@/components/contact/ContactInfoSection'
import ContactLocationSection from '@/components/contact/ContactLocationSection'
import ContactSocialSection from '@/components/contact/ContactSocialSection'

function Contact() {
  return (
    <>
      <ContactHero />
      <ContactInfoSection />
      <ContactFormSection />
      <ContactLocationSection />
      <ContactSocialSection />
      <ContactCtaSection />
    </>
  )
}

export default Contact