import { Github, ExternalLink, FileText } from 'lucide-react';

interface ProjectCardActionsProps {
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  title: string;
}

export function ProjectCardActions({ liveUrl, githubUrl, caseStudyUrl, title }: ProjectCardActionsProps) {
  return (
    <div className='flex items-center justify-between pt-6 border-t border-border/50'>
      {/* Left side: Live URL or Internal Project label */}
      {liveUrl ? (
        <a
          href={liveUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:opacity-80 transition-opacity'>
          <ExternalLink className='w-4 h-4' />
          Live
        </a>
      ) : (
        <span className='text-xs font-mono text-muted-foreground uppercase tracking-widest'>Internal Project</span>
      )}

      {/* Right side: Case Study + GitHub */}
      <div className='flex items-center gap-2'>
        {caseStudyUrl && (
          <a
            href={caseStudyUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-all border border-primary/20'
            aria-label={`Read case study for ${title}`}>
            <FileText className='w-3.5 h-3.5' />
            Case Study
          </a>
        )}
        {githubUrl && (
          <a
            href={githubUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all'
            aria-label={`View ${title} on GitHub`}>
            <Github className='w-5 h-5' />
          </a>
        )}
      </div>
    </div>
  );
}
