import { TechStack } from './tech-stack';

const About = () => {
  const highlights = [
    {
      emoji: '🏛️',
      text: 'Sold over $10 million of products and services in less than 7 months during the pandemic (working remotely)',
    },
    {
      emoji: '🌴',
      text: 'Created and developed a fitness product company while living in the jungles of Costa Rica',
    },
    {
      emoji: '⚙️',
      text: 'Served as integrated product team lead for development and repair of gas turbine hardware from initial concept to production',
    },
    {
      emoji: '👨‍💼',
      text: 'Over 6+ years of product design and project engineering experience',
    },
    {
      emoji: '🛠️',
      text: 'Developed over 50+ engineering products and processes',
    },
  ];

  return (
    <section
      id='about'
      className='py-16 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='space-y-6'>
        <h2 className='text-3xl sm:text-4xl font-bold mb-8'>Hi there 👋</h2>
        <p className='text-xl sm:text-2xl font-medium'>
          I help interesting companies grow faster with creative full-stack solutions. Additionally, I love contributing
          massive value to everyone involved on the project.
        </p>
        <p className='text-lg text-muted-foreground'>
          As a Full Stack Developer with extensive experience in React, Next.js, and cloud services, I excel at rapidly
          solving technical challenges and delivering business value.
        </p>

        <div className='mt-8'>
          <h3 className='text-xl font-semibold mb-4'>Career Highlights</h3>
          <div className='space-y-4'>
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className='flex items-start gap-4'>
                <span className='text-2xl'>{highlight.emoji}</span>
                <p className='text-muted-foreground'>{highlight.text}</p>
              </div>
            ))}
          </div>
        </div>

        <TechStack />
      </div>
    </section>
  );
};

export default About;
