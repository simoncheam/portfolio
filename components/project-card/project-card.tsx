import { ProjectCardHeader } from './ProjectCardHeader';
import { ProjectCardContent } from './ProjectCardContent';
import { ProjectCardTechStack } from './ProjectCardTechStack';
import { ProjectCardActions } from './ProjectCardActions';

interface ProjectCardProps {
  title: string;
  description: string;
  imgUrl: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  number: number;
  featured?: boolean;
}

export function ProjectCard({
  title,
  description,
  imgUrl,
  techStack,
  githubUrl,
  liveUrl,
  caseStudyUrl,
  number,
  featured,
}: ProjectCardProps) {
  return (
    <div
      className={`group relative flex flex-col h-full bg-card rounded-2xl overflow-hidden border border-border shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-primary/40 hover:-translate-y-2 ${
        featured
          ? 'border-primary/30 ring-1 ring-primary/5 bg-gradient-to-br from-card to-primary/[0.03]'
          : ''
      }`}>
      {/* HEADER: Image + overlays */}
      <ProjectCardHeader
        imgUrl={imgUrl}
        title={title}
        number={number}
        featured={featured}
      />

      {/* CONTENT: Main card content */}
      <div className='flex flex-col p-6 md:p-8 flex-grow'>
        {/* Title and Description */}
        <ProjectCardContent
          title={title}
          description={description}
        />

        {/* Tech Stack */}
        <div className='mt-auto pt-6 mb-6'>
          <ProjectCardTechStack techStack={techStack} />
        </div>

        {/* Actions */}
        <ProjectCardActions
          liveUrl={liveUrl}
          githubUrl={githubUrl}
          caseStudyUrl={caseStudyUrl}
          title={title}
        />
      </div>
    </div>
  );
}
