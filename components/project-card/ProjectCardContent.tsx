interface ProjectCardContentProps {
  title: string;
  description: string;
}

export function ProjectCardContent({ title, description }: ProjectCardContentProps) {
  return (
    <div>
      {/* Title with min height for consistency */}
      <div className='min-h-[3.5rem] md:min-h-[4rem]'>
        <h3 className='text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-2'>
          {title}
        </h3>
      </div>

      {/* Description with min height for consistency */}
      <div className='mt-2 min-h-[6rem] md:min-h-[7.5rem]'>
        <p className='text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-4'>{description}</p>
      </div>
    </div>
  );
}
