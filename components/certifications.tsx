import { Award, ExternalLink } from 'lucide-react';

interface Certification {
  name: string;
  code: string;
  date: string;
  url: string;
}

const certifications: Certification[] = [
  {
    name: 'AWS Certified Cloud Practitioner',
    code: 'CLF-C02',
    date: 'Sep 2024',
    url: 'https://www.credly.com/badges/ffdf4014-09d3-497f-a02f-9534d85e15da/linked_in_profile',
  },
  {
    name: 'AWS Certified AI Practitioner',
    code: 'AIF-C01',
    date: 'Jan 2025',
    url: 'https://www.credly.com/badges/c9221405-4b64-4b89-bf2b-71d19c559dab/linked_in_profile',
  },
];

export function Certifications() {
  return (
    <section
      id='certifications'
      className='max-w-4xl mx-auto px-4 text-center scroll-mt-24'>
      {/* Section Header */}
      <div className='space-y-2 mb-12'>
        <h2 className='text-3xl font-bold tracking-tight'>Verified Expertise</h2>
        <p className='text-muted-foreground'>Certified in building secure and high-performance cloud architectures.</p>
      </div>

      {/* Certification Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {certifications.map((cert, i) => (
          <a
            key={i}
            href={cert.url}
            target='_blank'
            rel='noopener noreferrer'
            className='group relative block bg-card border border-border p-6 rounded-2xl transition-all hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 overflow-hidden'>
            {/* Background Decoration */}
            <div className='absolute top-[-20px] right-[-20px] opacity-5 transition-transform group-hover:scale-125 duration-700'>
              <Award className='w-32 h-32' />
            </div>

            {/* Content */}
            <div className='flex items-start gap-5 relative z-10'>
              {/* Icon */}
              <div className='flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner'>
                <Award className='w-7 h-7 text-primary group-hover:scale-110 transition-transform' />
              </div>

              {/* Details */}
              <div className='flex-grow text-left'>
                <h3 className='font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors leading-tight'>
                  {cert.name}
                </h3>
                <div className='flex flex-wrap items-center gap-3 mb-4'>
                  <span className='text-[10px] font-mono font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-1 rounded border border-primary/20'>
                    {cert.code}
                  </span>
                  <span className='text-xs text-muted-foreground flex items-center gap-1 font-medium'>
                    Issued {cert.date}
                  </span>
                </div>
                <div className='flex items-center gap-1 text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors'>
                  View Credentials <ExternalLink className='w-3 h-3' />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
