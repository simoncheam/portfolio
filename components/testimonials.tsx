import Image from 'next/image';
import { Quote } from 'lucide-react';
import { SectionHeader } from './section-header';

interface Testimonial {
  name: string;
  position: string;
  image: string;
  highlight: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Roman Tsihanovich',
    position: 'Engineering Manager @ Shift4',
    image: '/images/roman.jpeg',
    highlight: 'Brought agentic engineering and AI tooling to the team...',
    quote:
      'I managed Simon at Shift4, where he led our frontend migration from Ember to React using a micro frontend architecture and brought agentic engineering and AI tooling to the team. He works autonomously, delivers reliably, communicates clearly, and takes initiative.',
  },
  {
    name: 'Nick Brunner',
    position: 'Product @ Salesforce | Agentic Commerce',
    image: '/images/nicholas.jpeg',
    highlight: 'Took the initiative to champion Agentic Engineering principles...',
    quote:
      'Simon is a pleasure to work with: thoughtful, empathetic and an excellent communicator. He is an extremely capable full stack engineer — Simon took the initiative to champion Agentic Engineering principles and practices at Shift4. He was a key contributor in advancing agentic coding.',
  },
  {
    name: 'Peter Correa',
    position: 'Senior Software Engineer @ Shift4',
    image: '/images/peter.jpeg',
    highlight: 'A natural bridge between teams...',
    quote:
      'He moves easily between technical depth and design sensibility, which made him a natural bridge between teams. Colleagues from different disciplines consistently sought out his input, not just for his technical skill but for how thoughtfully he weighed their perspectives before offering his own.',
  },
  {
    name: 'Michael Kelly',
    position: 'VP of Software Engineering',
    image: '/images/michael.jpeg',
    highlight: 'An asset to any company looking to build new products and grow...',
    quote:
      "Simon's effective communication, collaborative team skills, and aptitude to learn new technologies would be an asset to any company looking to build new products and grow.",
  },
  {
    name: 'Dan Villa',
    position: 'Owner @ Jemini | Fractional CTO',
    image: '/images/dan.jpeg',
    highlight: 'Pivotal in delivering successful outcomes for two key clients...',
    quote:
      'Simon quickly learns new technologies and uses them to achieve great results. His work was pivotal in delivering successful outcomes for two key clients, significantly boosting our success.',
  },
  {
    name: 'Chris Gamlin',
    position: 'Software Developer at LinkLive',
    image: '/images/chris.jpeg',
    highlight: 'A standout professional in software development...',
    quote:
      "Simon's comprehensive blend of technical expertise, dedication, and people skills positions him as a standout professional in software development.",
  },
];

const Testimonials = () => {
  return (
    <section
      id='testimonials'
      className='relative py-24 -mx-4 px-4 bg-secondary/20 border-y border-border'>
      <div className='max-w-6xl mx-auto'>
        {/* Section Header */}
        <div className='mb-16'>
          <SectionHeader
            eyebrow='Testimonials'
            title='Trusted by Industry Leaders'
            description="Here's what managers, teammates, and clients say about working with me."
          />
        </div>

        {/* Testimonial Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className='group relative bg-card p-8 rounded-2xl border border-border shadow-sm transition-[border-color,box-shadow] hover:shadow-xl hover:border-primary/20'>
              {/* Quote Icon */}
              <Quote className='absolute top-6 right-8 w-10 h-10 text-primary/5 group-hover:text-primary/10 transition-colors' />

              {/* Content */}
              <div className='space-y-6 flex flex-col h-full'>
                {/* Highlight */}
                <p className='font-bold text-lg leading-tight text-foreground'>&ldquo;{t.highlight}&rdquo;</p>

                {/* Full Quote */}
                <blockquote className='text-sm text-muted-foreground leading-relaxed italic flex-grow'>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className='pt-6 border-t border-border/50 flex items-center gap-4'>
                  <div className='w-12 h-12 rounded-full overflow-hidden border border-border'>
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={48}
                      height={48}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div>
                    <h3 className='font-bold text-sm text-foreground'>{t.name}</h3>
                    <p className='text-xs text-muted-foreground'>{t.position}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
