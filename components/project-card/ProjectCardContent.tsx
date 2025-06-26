interface ProjectCardContentProps {
  title: string;
  description: string;
}

export function ProjectCardContent({ title, description }: ProjectCardContentProps) {
  return (
    <div className='space-y-4'>
      {/* Title with min height for consistency (accommodates ~2 lines) */}
      <h3 className='text-xl font-semibold leading-tight min-h-[4.5rem]'>
        {title}
      </h3>
      
      {/* Description with min height for consistency */}
      <div className='min-h-[10rem]'>
        <p className='text-muted-foreground text-sm leading-relaxed'>
          {description}
        </p>
      </div>
    </div>
  );
}