import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import TechMarquee from '@/components/sections/TechMarquee'
import Services from '@/components/sections/Services'
import Work from '@/components/sections/Work'
import Stats from '@/components/sections/Stats'
import Stack from '@/components/sections/Stack'
import Testimonial from '@/components/sections/Testimonial'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TechMarquee />
      <Services />
      <Work />
      <Stats />
      <Stack />
      <Testimonial />
      <CTA />
      <Footer />
    </main>
  )
}
