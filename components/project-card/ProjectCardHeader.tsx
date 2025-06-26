import Image from 'next/image';

interface ProjectCardHeaderProps {
  imgUrl: string;
  title: string;
  number: number;
  featured?: boolean;
}

export function ProjectCardHeader({ imgUrl, title, number, featured }: ProjectCardHeaderProps) {
  return (
    <div className='relative aspect-video overflow-hidden'>
      <Image
        src={imgUrl}
        alt={title}
        width={500}
        height={500}
        className='object-cover transition-transform duration-700 group-hover:scale-110'
      />
      <div className='absolute bottom-3 left-3 text-white/90 font-mono text-lg font-medium'>
        {String(number).padStart(2, '0')}
      </div>
      {featured && (
        <div className='absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-semibold'>
          Featured
        </div>
      )}
    </div>
  );
}