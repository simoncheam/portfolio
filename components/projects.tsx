import { ProjectCard } from './project-card/project-card';

// creater projects interface
interface Project {
  title: string;
  description: string;
  imgUrl: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: 'Cost-Optimized RAG Chatbot',
    description:
      'Intelligent portfolio assistant with advanced retrieval-augmented generation. Engineered $4,200 annual cost savings through strategic AWS service optimization while delivering enterprise-grade performance.',
    imgUrl: '/images/rag-ai-portfolio-thumbnail.png',
    techStack: ['AWS Bedrock', 'OpenSearch', 'Lambda', 'Next.js 15', 'TypeScript', 'AWS CDK', 'DynamoDB', 'Cognito'],
    liveUrl: 'https://ai-portfolio-chatbot.vercel.app',
    featured: true,
  },
  {
    title: 'Local Business Subscription Platform',
    description:
      'Full-stack subscription platform connecting members with local businesses. Features automated coupon system, Stripe payments, and role-based access, reducing operational overhead by 90%.',
    imgUrl: '/images/membership-platform.png',
    techStack: ['Next.js 14', 'PostgreSQL', 'Prisma', 'Clerk', 'Stripe', 'Vercel', 'Supabase', 'TypeScript'],
    liveUrl: 'https://pinellas-perks-mvp.vercel.app/',
    featured: true,
  },
  {
    title: 'Portfolio Website with AWS Serverless Backend',
    description:
      'Modern responsive portfolio with serverless contact form processing. Template architecture reused for multiple projects, reducing setup time by 50%+.',
    imgUrl: '/images/portfolio-aws.png',
    techStack: ['Next.js', 'AWS Lambda', 'SES', 'CDK', 'Amplify', 'GitHub Actions'],
    githubUrl: 'https://github.com/simoncheam/portfolio',
    liveUrl: 'https://www.simoncheam.dev',
  },
  {
    title: 'NextBnB: Full-Stack Vacation Rental Platform',
    description:
      'A fully responsive vacation rental platform using Next.js 14, integrating TailwindCSS, Shadcn/UI, and Supabase for dynamic user interfaces and robust backend support.',
    imgUrl: '/images/nextbnb.png',
    techStack: ['Next.js', 'TailwindCSS', 'Shadcn/UI', 'Supabase', 'Clerk', 'Zod'],
    githubUrl: 'https://github.com/simoncheam/next-bnb',
    liveUrl: 'https://next-bnb.vercel.app',
  },
  {
    title: 'GPTGenius: AI Tour Guide Assistant',
    description:
      'An AI-powered assistant using Next.js 14+, OpenAI, Prisma, Tailwind CSS, and Clerk authentication, driving personalized user engagement.',
    imgUrl: '/images/gptgenius.png',
    techStack: ['Next.js', 'OpenAI', 'Prisma', 'TailwindCSS', 'Clerk'],
    githubUrl: 'https://github.com/simoncheam/gpt-genius',
    liveUrl: 'https://nextjs-gpt-tour-guide.vercel.app',
  },
  {
    title: 'Mini Netflix',
    description: 'A mobile responsive app showcasing proficiency in Angular and SCSS.',
    imgUrl: '/images/mininetflix.png',
    techStack: ['Angular', 'SCSS'],
    githubUrl: 'https://github.com/simoncheam/mini-netflix-app',
    liveUrl: 'https://mini-netflix-angular.web.app/movie',
  },
  {
    title: 'GitHub Actions CI/CD for Lambda Functions and CloudFormation',
    description:
      'This project automates the deployment of AWS Lambda functions and validates CloudFormation templates using GitHub Actions workflows.',
    imgUrl: '/images/lambda-cicd.png',
    techStack: ['GitHub Actions', 'AWS Lambda', 'AWS CloudFormation'],
    githubUrl: 'https://github.com/simoncheam/lambda-cicd',
    liveUrl: '',
  },
  // {
  //   title: 'Momentum: Life Purpose App',
  //   description: 'Full stack CRUD App for user clarity and momentum towards life purpose.',
  //   imgUrl: '/placeholder.svg',
  //   techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
  //   githubUrl: 'https://github.com/simoncheam/ultimate-life-purpose',
  //   liveUrl: 'https://ultimate-life-purpose.herokuapp.com/status',
  // },
  // {
  //   title: 'Personal Blogs App',
  //   description: 'Full stack CRUD App with search function and author private routes for members.',
  //   imgUrl: '/placeholder.svg',
  //   techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
  //   githubUrl: 'https://github.com/simoncheam/personal-blogs-app',
  //   liveUrl: 'https://personal-blogs-app.herokuapp.com/status',
  // },
];

const Projects = () => {
  return (
    <section
      id='projects'
      className='py-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <h2 className='text-3xl sm:text-4xl font-bold mb-12 text-center'>Projects</h2>
      <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 max-w-8xl mx-auto'>
        {projects.map((project: Project, index: number) => (
          <ProjectCard
            key={index}
            {...project}
            number={index + 1}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
