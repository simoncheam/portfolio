import { Card, CardContent } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

const testimonials = [
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
      className='py-16 bg-secondary/30'>
      <h2 className='text-3xl sm:text-4xl font-bold mb-12 text-center'>Testimonials</h2>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className='bg-background flex'>
              <CardContent className='p-6 flex flex-col w-full'>
                <div className='flex flex-col flex-grow min-h-[200px]'>
                  <p className='font-semibold text-lg leading-tight mb-4'>{testimonial.highlight}</p>
                  <blockquote className='text-sm text-muted-foreground flex-grow'>"{testimonial.quote}"</blockquote>
                </div>
                <div className='flex items-center h-16 pt-6 mt-6 border-t border-border'>
                  <Avatar className='mr-4 h-12 w-12'>
                    <AvatarImage
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col justify-center overflow-hidden'>
                    <h3 className='font-medium leading-tight mb-1 truncate'>{testimonial.name}</h3>
                    <p className='text-sm text-muted-foreground truncate'>{testimonial.position}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
