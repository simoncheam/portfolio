import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiReact,
  SiGit,
  SiMysql,
  SiAmazon,
  SiNextdotjs,
  SiClaude,
} from 'react-icons/si';

const techStack = [
  { icon: SiJavascript, name: 'JavaScript' },
  { icon: SiTypescript, name: 'TypeScript' },
  { icon: SiHtml5, name: 'HTML5' },
  { icon: SiCss3, name: 'CSS3' },
  { icon: SiReact, name: 'React' },
  { icon: SiNextdotjs, name: 'Next.js' },
  { icon: SiGit, name: 'Git' },
  { icon: SiMysql, name: 'MySQL' },
  // { icon: SiDocker, name: 'Docker' },
  { icon: SiAmazon, name: 'AWS' },
  { icon: SiClaude, name: 'Claude Code' },
];

export function TechStack() {
  return (
    <div className='py-8'>
      <h3 className='text-xl font-semibold mb-4'>Tech Stack</h3>
      <div className='grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-6'>
        {techStack.map((tech) => (
          <div
            key={tech.name}
            className='flex flex-col items-center justify-center group'>
            <tech.icon className='w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors' />
            <span className='mt-2 text-xs text-muted-foreground group-hover:text-foreground transition-colors'>
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
