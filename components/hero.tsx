import Image from "next/image";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="hero"
      className="flex flex-col items-center justify-center min-h-[90vh] text-center max-w-5xl mx-auto px-4 animate-fade-up"
    >
      {/* Avatar with Glow Effects */}
      <div className="relative mb-16">
        {/* Multilayer Glow */}
        <div className="absolute inset-[-30%] bg-primary/20 rounded-full blur-[80px] animate-pulse-soft"></div>
        <div className="absolute inset-[-10%] bg-primary/10 rounded-full blur-[40px] animate-float"></div>

        <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-full border-2 border-primary/20 p-2 bg-background/50 backdrop-blur-md shadow-2xl overflow-hidden ring-[12px] ring-secondary/30 animate-float">
          <Image
            src="/images/avatar.webp"
            alt="Simon Cheam"
            width={256}
            height={256}
            priority={true}
            sizes="(max-width: 768px) 176px, 224px"
            quality={90}
            className="w-full h-full object-cover rounded-full transition-transform duration-1000 hover:scale-110"
          />
        </div>

      </div>

      {/* Content */}
      <div className="space-y-10">
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-foreground leading-[0.9]">
            Simon Cheam
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-8 text-xl md:text-3xl font-bold pt-4">
            <span className="highlight-container text-foreground/90">
              Full Stack Engineer
            </span>
            <span className="text-primary/30 font-thin hidden sm:inline">
              |
            </span>
            <span className="highlight-container text-foreground/90">
              Building Agentic AI Systems
            </span>
          </div>
        </div>

        <p className="max-w-3xl mx-auto text-muted-foreground text-lg md:text-2xl leading-relaxed font-medium">
          Building{" "}
          <span className="text-foreground border-b-2 border-primary/20">
            scalable web solutions
          </span>{" "}
          and{" "}
          <span className="text-foreground border-b-2 border-primary/20">
            AI-enhanced workflows
          </span>{" "}
          to drive your business forward.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
          <a
            href="#projects"
            className="group relative inline-flex items-center justify-center px-12 py-5 font-black text-primary-foreground bg-primary rounded-2xl transition-[transform,box-shadow] duration-500 hover:scale-[1.05] hover:shadow-[0_24px_48px_-12px_hsl(var(--primary)/0.4)] overflow-hidden"
          >
            <span className="relative flex items-center gap-3 text-lg">
              View Projects{" "}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-12 py-5 font-black text-foreground border-2 border-border bg-background/50 backdrop-blur-xl rounded-2xl transition-colors duration-300 hover:bg-secondary hover:border-primary/40 text-lg"
          >
            Start Project
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
