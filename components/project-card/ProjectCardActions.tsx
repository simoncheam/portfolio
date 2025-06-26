import { Github, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';

interface ProjectCardActionsProps {
  liveUrl?: string;
  githubUrl?: string;
  title: string;
}

export function ProjectCardActions({ liveUrl, githubUrl, title }: ProjectCardActionsProps) {
  const getJustification = () => {
    if (liveUrl && githubUrl) return 'justify-between';
    if (liveUrl) return 'justify-start';
    if (githubUrl) return 'justify-end';
    return 'justify-center';
  };

  return (
    <div className={`flex items-center pt-4 border-t ${getJustification()}`}>
      {liveUrl && (
        <Button asChild variant='default' size='sm'>
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
      {githubUrl && (
        <Button asChild variant='ghost' size='icon'>
          <a
            href={githubUrl}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`View ${title} on GitHub`}>
            <Github className='h-5 w-5' />
          </a>
        </Button>
      )}
    </div>
  );
}