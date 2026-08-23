import MembershipApplicationSection from '@/components/membership/MembershipApplicationSection'
import MembershipBenefitsSection from '@/components/membership/MembershipBenefitsSection'
import MembershipHero from '@/components/membership/MembershipHero'
import MembershipIntroSection from '@/components/membership/MembershipIntroSection'
import MembershipProcessSection from '@/components/membership/MembershipProcessSection'
import MembershipResponsibilitiesSection from '@/components/membership/MembershipResponsibilitiesSection'

function Membership() {
  return (
    <>
      <MembershipHero />
      <MembershipIntroSection />
      <MembershipBenefitsSection />
      <MembershipResponsibilitiesSection />
      <MembershipProcessSection />
      <MembershipApplicationSection />
    </>
  )
}

export default Membership