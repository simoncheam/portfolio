import { TrendingUp } from 'lucide-react';

interface ProjectCardContentProps {
  title: string;
  description: string;
  metric?: string;
}

export function ProjectCardContent({ title, description, metric }: ProjectCardContentProps) {
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
        <p className='text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3'>{description}</p>
      </div>

      {/* Measurable outcome */}
      {metric && (
        <div className='mt-3 flex items-center gap-1.5 text-sm font-bold text-primary tabular-nums'>
          <TrendingUp className='w-4 h-4 shrink-0' />
          <span>{metric}</span>
        </div>
      )}
    </div>
  );
}
