import { AboutHero } from '@/features/about/components/AboutHero'
import { StorySection } from '@/features/about/components/StorySection'
import { MissionVisionSection } from '@/features/about/components/MissionVisionSection'
import { ValuesSection } from '@/features/about/components/ValuesSection'
import { TimelineSection } from '@/features/about/components/TimelineSection'
import { TeamSection } from '@/features/about/components/TeamSection'
import { WhyChooseUsSection } from '@/features/about/components/WhyChooseUsSection'
import { AchievementsSection } from '@/features/about/components/AchievementsSection'

export function AboutPage() {
  return (
    <>
      <AboutHero />
      <StorySection />
      <MissionVisionSection />
      <ValuesSection />
      <TimelineSection />
      <TeamSection />
      <WhyChooseUsSection />
      <AchievementsSection />
    </>
  )
}
