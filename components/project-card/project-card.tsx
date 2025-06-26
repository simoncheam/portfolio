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
  number: number;
  featured?: boolean;
}

export function ProjectCard({ title, description, imgUrl, techStack, githubUrl, liveUrl, number, featured }: ProjectCardProps) {
  return (
    <div className='group flex flex-col h-full border rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl bg-card'>
      
      {/* HEADER: Image + overlays */}
      <ProjectCardHeader 
        imgUrl={imgUrl}
        title={title}
        number={number}
        featured={featured}
      />
      
      {/* CONTENT: Main card content */}
      <div className='flex flex-col p-6 flex-grow'>
        {/* Title and Description - Fixed height zone */}
        <div className='mb-6'>
          <ProjectCardContent title={title} description={description} />
        </div>
        
        {/* Tech Stack - Flexible but consistent position */}
        <div className='flex-grow'>
          <ProjectCardTechStack techStack={techStack} />
        </div>
        
        {/* Actions - Always at bottom */}
        <div className='mt-6'>
          <ProjectCardActions 
            liveUrl={liveUrl}
            githubUrl={githubUrl}
            title={title}
          />
        </div>
      </div>
    </div>
  );
}
