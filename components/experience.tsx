import { Calendar, CheckCircle2 } from 'lucide-react';

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  responsibilities: string[];
  keyClient?: {
    name: string;
    period: string;
    achievements: string[];
  };
}

const experiences: ExperienceItem[] = [
  {
    company: 'simoncheam.dev',
    role: 'FULL STACK ENGINEER | CONSULTANT',
    period: '01/2021 - Present',
    location: 'Remote',
    responsibilities: [
      'Built AI-enabled applications with modern frameworks, databases, and AWS cloud services',
      'Streamlined project delivery through AI-assisted spec generation and modular development workflows',
      'Developed Serverless RAG chatbot with AWS Bedrock, including hallucination safeguards and cost-optimization',
    ],
    keyClient: {
      name: 'Jemini.io',
      period: '08/2023 - 08/2024',
      achievements: [
        'Led discovery workshops to uncover bottlenecks, aligning dev roadmap with business goals — directly increased client acquisition via optimized content ops',
        'Built a custom React-based process inspection dashboard, reduced inspection time by ~30%',
        'Enhanced client and development efficiency through AI-based tools and workflows',
      ],
    },
  },
  {
    company: 'linklive.ai',
    role: 'FULL STACK DEVELOPER',
    period: '08/2022 - 05/2023',
    location: 'Remote',
    responsibilities: [
      'Drove cross-functional feature implementation, coordinating efforts between UX designers, developers, and QA engineers',
      'Built mobile responsive scheduling UI with Ionic & Angular',
      'Enhanced customer chat platform with drag-and-drop components',
      'Resolved 20+ critical legacy bugs improving UX, system stability and reducing support tickets',
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
      className='max-w-4xl mx-auto px-4 scroll-mt-24'>
      {/* Section Header */}
      <div className='text-center mb-20 space-y-4'>
        <h2 className='text-sm font-mono font-bold text-primary uppercase tracking-[0.2em]'>Professional Journey</h2>
        <h3 className='text-4xl md:text-5xl font-black tracking-tight'>Experience Timeline</h3>
      </div>

      {/* Timeline */}
      <div className='relative space-y-16'>
        {/* Vertical Line */}
        <div className='absolute left-4 sm:left-1/2 top-4 bottom-0 w-px bg-border -translate-x-1/2 hidden sm:block'></div>

        {experiences.map((exp, i) => (
          <div
            key={i}
            className={`relative flex flex-col sm:flex-row gap-8 sm:gap-12 ${
              i % 2 === 0 ? 'sm:flex-row-reverse text-left' : 'text-left'
            }`}>
            {/* Timeline Dot */}
            <div className='absolute left-4 sm:left-1/2 top-6 w-8 h-8 rounded-full bg-background border border-border -translate-x-1/2 hidden sm:flex items-center justify-center z-10 shadow-sm'>
              <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-primary animate-pulse' : 'bg-muted-foreground/30'}`}></div>
            </div>

            {/* Card */}
            <div className='w-full sm:w-[45%] group'>
              <div className='relative bg-card border border-border p-8 rounded-3xl shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/30'>
                {/* Period Badge */}
                <div className='inline-flex items-center gap-2 text-[10px] font-mono font-black text-primary uppercase tracking-widest mb-4 bg-primary/5 px-3 py-1 rounded-full border border-primary/10'>
                  <Calendar className='w-3 h-3' />
                  {exp.period}
                </div>

                {/* Role */}
                <h4 className='text-xl md:text-2xl font-black text-foreground mb-1'>{exp.role}</h4>

                {/* Company & Location */}
                <div className='flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-6'>
                  <span className='font-bold text-foreground/70'>{exp.company}</span>
                  <span className='text-muted-foreground/50'>•</span>
                  <span>{exp.location}</span>
                  {exp.keyClient && (
                    <span className='px-1.5 py-0.5 rounded-md bg-secondary text-secondary-foreground text-[8px] font-black uppercase tracking-widest border border-border'>
                      Key Client
                    </span>
                  )}
                </div>

                {/* Responsibilities */}
                <ul className='space-y-4'>
                  {exp.responsibilities.map((res, j) => (
                    <li
                      key={j}
                      className='flex items-start gap-3 text-sm md:text-base text-muted-foreground leading-relaxed'>
                      <CheckCircle2 className='w-5 h-5 text-primary/40 shrink-0 mt-0.5' />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>

                {/* Key Client Section */}
                {exp.keyClient && (
                  <div className='mt-8 pt-6 border-t border-border/50'>
                    <div className='font-bold text-sm text-primary mb-3'>
                      Key Client: {exp.keyClient.name} ({exp.keyClient.period})
                    </div>
                    <ul className='space-y-3'>
                      {exp.keyClient.achievements.map((achievement, achIndex) => (
                        <li
                          key={achIndex}
                          className='flex items-start gap-3 text-sm text-muted-foreground leading-relaxed'>
                          <CheckCircle2 className='w-4 h-4 text-primary/30 shrink-0 mt-0.5' />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Spacer for alternating layout */}
            <div className='hidden sm:block w-[45%]'></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
