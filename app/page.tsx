import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { CountdownSection } from "@/components/countdown-section"
import { ResolutionsSection } from "@/components/resolutions-section"
import { CelebrationSection } from "@/components/celebration-section"
import { AiSurpriseSection } from "@/components/ai-surprise-section"
import { AiCoachSection } from "@/components/ai-coach-section"
import { VisionLetterSection } from "@/components/vision-letter-section"
import { JoinSection } from "@/components/join-section"
import { Footer } from "@/components/footer"
import { FireworksCanvas } from "@/components/fireworks-canvas"
import { Analytics } from "@vercel/analytics/next"

export default function Home() {
  return (
    <main className="bg-black text-white overflow-x-hidden">
      <Analytics/>
      <FireworksCanvas />
      <Navigation />
      <HeroSection />
      <CountdownSection />
      <ResolutionsSection />
      <CelebrationSection />
      <AiSurpriseSection />
      <AiCoachSection />
      <VisionLetterSection />
      <JoinSection />
      <Footer />
    </main>
  )
}
