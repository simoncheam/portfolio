import Image from 'next/image';

interface ProjectCardHeaderProps {
  imgUrl: string;
  title: string;
  number: number;
  featured?: boolean;
}

export function ProjectCardHeader({ imgUrl, title, number, featured }: ProjectCardHeaderProps) {
  return (
    <div className='relative aspect-[16/10] overflow-hidden bg-muted'>
      <Image
        src={imgUrl}
        alt={title}
        width={800}
        height={500}
        className='w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105'
      />
      {/* Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60'></div>

      {/* Project Number Badge */}
      <div className='absolute bottom-4 left-4 font-mono text-xs font-bold text-white bg-black/40 backdrop-blur-md px-2 py-1 rounded-sm border border-white/10'>
        ID-{String(number).padStart(2, '0')}
      </div>

      {/* Featured Badge */}
      {featured && (
        <div className='absolute top-4 right-4 flex items-center gap-1.5 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-full shadow-xl'>
          <span className='w-1.5 h-1.5 bg-white rounded-full animate-pulse'></span>
          Featured Case
        </div>
      )}
    </div>
  );
}
