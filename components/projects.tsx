import { ProjectCard } from './project-card';

const projects = [
  {
    title: 'NextBnB: Airbnb Clone',
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
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {projects.map((project, index) => (
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
