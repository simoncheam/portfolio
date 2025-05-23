import Hero from '@/components/hero';
import About from '@/components/about';
import Projects from '@/components/projects';
import Experience from '@/components/experience';
import Contact from '@/components/contact';
import Testimonials from '@/components/testimonials';
import { Certifications } from '@/components/certifications';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between py-16 px-4 sm:px-8 md:px-16'>
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
