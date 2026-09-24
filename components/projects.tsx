import { ProjectCard } from './project-card/project-card';
import { SectionHeader } from './section-header';

interface Project {
  title: string;
  description: string;
  metric?: string;
  imgUrl: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: 'Cost-Optimized RAG Chatbot',
    description:
      'RAG portfolio assistant tuned for enterprise-grade performance',
    metric: '$4,200/yr AWS cost savings',
    imgUrl: '/images/rag-ai-portfolio-thumbnail.png',
    techStack: ['AWS Bedrock', 'OpenSearch', 'Lambda', 'Next.js 15', 'TypeScript', 'AWS CDK', 'DynamoDB', 'Cognito'],
    liveUrl: 'https://ai-portfolio-chatbot.vercel.app',
    featured: true,
  },
  {
    title: 'Local Business Subscription Platform',
    description:
      'Subscription platform connecting members with local businesses',
    metric: '90% less operational overhead',
    imgUrl: '/images/membership-platform.png',
    techStack: ['Next.js 14', 'PostgreSQL', 'Prisma', 'Clerk', 'Stripe', 'Vercel', 'Supabase', 'TypeScript'],
    liveUrl: 'https://pinellas-perks-mvp.vercel.app/',
    caseStudyUrl: 'https://medium.com/@simon_59622/we-built-a-50k-app-then-got-ghosted-lessons-in-trust-teamwork-and-integrity-887009a3edbf',
    featured: true,
  },
  {
    title: 'Serverless Portfolio Website',
    description:
      'Responsive portfolio with serverless contact forms and a reusable template architecture',
    metric: '50%+ faster project setup',
    imgUrl: '/images/portfolio-aws.png',
    techStack: ['Next.js', 'AWS Lambda', 'SES', 'CDK', 'Amplify', 'GitHub Actions'],
    githubUrl: 'https://github.com/simoncheam/portfolio',
    liveUrl: 'https://www.simoncheam.dev',
  },
  {
    title: 'NextBnB: Full-Stack Vacation Rental Platform',
    description:
      'Vacation rental platform on Next.js 14 with Stripe payments, Supabase, Prisma, and Clerk auth',
    imgUrl: '/images/nextbnb.png',
    techStack: ['Next.js', 'TailwindCSS', 'Shadcn/UI', 'Supabase', 'Clerk', 'Zod'],
    githubUrl: 'https://github.com/simoncheam/next-bnb',
    liveUrl: 'https://next-bnb.vercel.app',
  },
  {
    title: 'GPTGenius: AI Tour Guide Assistant',
    description:
      'AI tour-guide assistant on Next.js 14 with the OpenAI API, Clerk auth, Prisma, and TanStack Query',
    imgUrl: '/images/gptgenius.png',
    techStack: ['Next.js', 'OpenAI', 'Prisma', 'TailwindCSS', 'Clerk'],
    githubUrl: 'https://github.com/simoncheam/gpt-genius',
    liveUrl: 'https://nextjs-gpt-tour-guide.vercel.app',
  },
  {
    title: 'Mini Netflix',
    description: 'Responsive movie-browsing UI built with Angular 16 and SCSS',
    imgUrl: '/images/mininetflix.png',
    techStack: ['Angular', 'SCSS'],
    liveUrl: 'https://mini-netflix-angular.web.app/movie',
  },
  {
    title: 'GitHub Actions CI/CD for Lambda Functions and CloudFormation',
    description:
      'GitHub Actions CI/CD that deploys Lambda functions and validates CloudFormation on each pull request',
    imgUrl: '/images/lambda-cicd.png',
    techStack: ['GitHub Actions', 'AWS Lambda', 'AWS CloudFormation'],
    githubUrl: 'https://github.com/simoncheam/lambda-cicd',
    liveUrl: '',
  },
];

const Projects = () => {
  const projectCount = projects.length.toString().padStart(2, '0');

  return (
    <section
      id='projects'
      className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24'>
      {/* Section Header */}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4'>
        <SectionHeader
          align='left'
          eyebrow='Selected Work'
          title='Selected Projects'
          description='A showcase of full-stack applications combining robust cloud infrastructure with modern web technologies.'
        />
        <div className='hidden md:block h-px flex-grow mx-8 bg-border'></div>
        <div className='text-sm font-mono text-muted-foreground'>[{projectCount}] PROJECTS</div>
      </div>

      {/* Projects Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {projects.map((project: Project, index: number) => (
          <div key={index}>
            <ProjectCard
              {...project}
              number={index + 1}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
