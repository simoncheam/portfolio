import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { CloudIcon as Aws } from 'lucide-react';

const certifications = [
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
    <section className='py-16 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
      <h2 className='text-3xl sm:text-4xl font-bold mb-8 text-center'>AWS Certifications</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {certifications.map((cert, index) => (
          <a
            key={index}
            href={cert.url}
            target='_blank'
            rel='noopener noreferrer'
            className='group'>
            <Card className='h-full transition-all duration-300 hover:shadow-lg hover:border-primary'>
              <CardContent className='p-6 flex items-start space-x-4'>
                <div className='flex-shrink-0'>
                  <Aws className='h-10 w-10 text-[#FF9900] group-hover:text-[#FF9900]/80 transition-colors' />
                </div>
                <div className='flex-grow'>
                  <h3 className='font-semibold text-lg mb-2 group-hover:text-primary transition-colors'>{cert.name}</h3>
                  <div className='flex items-center space-x-2 mb-2'>
                    <Badge variant='secondary'>{cert.code}</Badge>
                    <span className='text-sm text-muted-foreground'>{cert.date}</span>
                  </div>
                  <p className='text-sm text-muted-foreground'>Click to view credential</p>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}
