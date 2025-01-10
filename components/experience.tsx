import { CalendarDays, Briefcase, MapPin } from 'lucide-react';

const experiences = [
  {
    company: 'jemini.io',
    role: 'FULL STACK ENGINEER | CONSULTANT',
    period: '08/2023 - 08/2024',
    location: 'Remote',
    responsibilities: [
      'Collaborated directly with clients to gather requirements by conducting discovery sessions and workshops to ensure alignment between business needs and technical deliverables',
      'Built manufacturing process inspection UI with React, improving workflow efficiency and production quality',
      'Developed Server-Sent Event handling for improved performance with GraphQL and NestJS endpoint integration',
      'Created error monitoring service using Bash and Slack, improving system response times',
      'Enhanced client efficiency through AI-based tools, automated CSV parsing and data enrichment with a phone scraper built with Python and TypeScript',
    ],
  },
  {
    company: 'linklive.ai',
    role: 'FULL STACK DEVELOPER',
    period: '08/2022 - 05/2023',
    location: 'Remote',
    responsibilities: [
      'Collaborated cross-functionally with developers, UX designers, and QA engineers to implement new features',
      'Developed a mobile responsive scheduling UI using Ionic & Angular, enhancing user experience',
      'Built customer engagement platform enhancements including drag-and-drop features for chat functionalities',
      'Improved user experience by debugging and resolving a backlog of legacy code issues',
    ],
  },
  {
    company: 'Functional Formulas, LLC.',
    role: 'FOUNDER | OWNER',
    period: '01/2018 - 12/2020',
    location: 'Remote',
    responsibilities: [
      'Invented, formulated, and launched performance body care product line for functional fitness athletes',
      'Engaged directly with customers to gather feedback, refining products based on insights, increasing repeat business',
      'Engineered automated email marketing funnels that drove recurring sales on Shopify and Amazon',
      'Generated 4.57% conversion rate from cold traffic using Facebook Advertising and email automation',
      'Developed product, branding, and internet marketing strategy remotely while living in Costa Rica (2018)',
    ],
  },
  {
    company: 'Power Systems Mfg., LLC.',
    role: 'STAFF MANUFACTURING ENGINEER | MECHANICAL DESIGN ENGINEER',
    period: '01/2012 – 01/2018',
    location: 'Jupiter, FL',
    responsibilities: [
      'Led cross-functional team activities across development, design, and operations to deliver complex projects efficiently',
      'Developed and implemented hardware repair process from concept to production',
      'Expanded product portfolio by coordinating project activities and knowledge transfer with external customers',
      'Drove new product initiatives through a broad range of development and manufacturing activities',
      'Designed and developed new products while supporting customers through technical analysis',
    ],
  },
];

const Experience = () => {
  return (
    <section
      id='experience'
      className='py-16 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
      <h2 className='text-3xl sm:text-4xl font-bold mb-12 text-center'>Experience</h2>
      <div className='space-y-12'>
        {experiences.map((exp, index) => (
          <div
            key={index}
            className='relative pl-8 sm:pl-32 py-6 group'>
            <div className='font-medium text-xl mb-2'>{exp.role}</div>
            <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4'>
              <span className='flex items-center text-muted-foreground'>
                <Briefcase className='h-4 w-4 mr-2' />
                {exp.company}
              </span>
              <span className='hidden sm:inline text-muted-foreground'>•</span>
              <span className='flex items-center text-muted-foreground'>
                <CalendarDays className='h-4 w-4 mr-2' />
                {exp.period}
              </span>
              <span className='hidden sm:inline text-muted-foreground'>•</span>
              <span className='flex items-center text-muted-foreground'>
                <MapPin className='h-4 w-4 mr-2' />
                {exp.location}
              </span>
            </div>
            <ul className='list-disc list-outside text-muted-foreground ml-4 space-y-2'>
              {exp.responsibilities.map((resp, respIndex) => (
                <li key={respIndex}>{resp}</li>
              ))}
            </ul>
            <div className='absolute left-0 top-0 h-full w-px bg-border sm:left-20 sm:ml-px' />
            <div className='absolute left-0 top-8 h-4 w-4 rounded-full border-2 border-primary bg-background sm:left-20 sm:ml-px' />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
