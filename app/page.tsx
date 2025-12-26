import Hero from '@/components/hero';
import About from '@/components/about';
import Projects from '@/components/projects';
import Experience from '@/components/experience';
import Contact from '@/components/contact';
import Testimonials from '@/components/testimonials';
import { Certifications } from '@/components/certifications';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center space-y-24 md:space-y-32 pt-24 pb-32'>
      <Hero />
      <About />
      <Certifications />
      <Projects />
      <Testimonials />
      <Experience />
      <Contact />
    </main>
  );
}
