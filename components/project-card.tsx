import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

interface ProjectCardProps {
  title: string;
  description: string;
  imgUrl: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  number: number;
}

export function ProjectCard({ title, description, imgUrl, techStack, githubUrl, liveUrl, number }: ProjectCardProps) {
  return (
    <div className='group flex flex-col h-full border rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl bg-card'>
      <div className='relative aspect-video overflow-hidden'>
        <Image
          src={imgUrl}
          alt={title}
          width={500}
          height={500}
          className='object-cover transition-transform duration-700 group-hover:scale-110'
        />
        <div className='absolute bottom-4 left-4 text-white/90 font-mono text-xl'>
          {String(number).padStart(2, '0')}
        </div>
      </div>
      <div className='flex flex-col flex-grow p-6'>
        <h3 className='text-xl font-semibold mb-3'>{title}</h3>
        <p className='text-muted-foreground mb-6 flex-grow'>{description}</p>
        <div className='space-y-6'>
          <div className='flex flex-wrap gap-2'>
            {techStack.map((tech, index) => (
              <span
                key={index}
                className='bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs font-medium'>
                {tech}
              </span>
            ))}
          </div>
          <div className={`flex items-center pt-4 border-t ${liveUrl ? 'justify-between' : 'justify-end'}`}>
            {liveUrl && (
              <Button
                asChild
                variant='default'
                size='sm'>
                <a
                  href={liveUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2'>
                  <ExternalLink className='h-4 w-4' />
                  View Live
                </a>
              </Button>
            )}
            <Button
              asChild
              variant='ghost'
              size='icon'>
              <a
                href={githubUrl}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`View ${title} on GitHub`}>
                <Github className='h-5 w-5' />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
