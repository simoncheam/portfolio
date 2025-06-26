interface ProjectCardTechStackProps {
  techStack: string[];
}

export function ProjectCardTechStack({ techStack }: ProjectCardTechStackProps) {
  return (
    <div className='flex flex-wrap gap-2'>
      {techStack.map((tech, index) => (
        <span
          key={index}
          className='bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs font-medium'>
          {tech}
        </span>
      ))}
    </div>
  );
}