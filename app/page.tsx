import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { BeforeAfter } from "@/components/before-after"
import { Metrics } from "@/components/metrics"
import { HowItWorks } from "@/components/how-it-works"
import { Integrations } from "@/components/integrations"
import { Pricing } from "@/components/pricing"
import { Testimonials } from "@/components/testimonials"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Metrics />
      {/* <BeforeAfter /> */}
      <HowItWorks />
      <Integrations />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
