interface ProjectCardTechStackProps {
  techStack: string[];
}

export function ProjectCardTechStack({ techStack }: ProjectCardTechStackProps) {
  return (
    <div className='flex flex-wrap gap-1.5'>
      {techStack.map((tech, index) => (
        <span
          key={index}
          className='text-[10px] md:text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground border border-border/50 transition-colors hover:border-primary/30 hover:bg-primary/5'>
          {tech}
        </span>
      ))}
    </div>
  );
}
