'use client';

import { Calendar, Github, Linkedin, Mail, MessageSquare, MapPin } from 'lucide-react';
import { RefObject, useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'sonner';
import { ContactForm } from './contact-form';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

declare global {
  interface Window {
    grecaptcha: ReCAPTCHA;
  }
}

const Contact = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  useEffect(() => {
    const checkRecaptchaScript = () => {
      if (window.grecaptcha) {
      } else {
        setTimeout(checkRecaptchaScript, 1000);
      }
    };
    checkRecaptchaScript();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('simon@simoncheam.dev');
    toast.success('Email copied to clipboard!');
  };

  const handleRecaptchaError = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
    toast.error('Verification service encountered an error. Please try again.');
  };

  const handleRecaptchaExpired = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
    toast.warning('Verification expired. Please try again.');
  };

  return (
    <section
      id='contact'
      className='max-w-5xl mx-auto px-4 scroll-mt-24'>
      <div className='bg-primary rounded-3xl p-8 md:p-16 text-primary-foreground relative overflow-hidden shadow-2xl'>
        {/* Decorative Circles */}
        <div className='absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/10 rounded-full blur-3xl'></div>
        <div className='absolute bottom-[-50px] left-[-50px] w-48 h-48 bg-black/10 rounded-full blur-3xl'></div>

        <div className='relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
          {/* Left Column - Info */}
          <div className='space-y-6'>
            <h2 className='text-3xl md:text-5xl font-bold tracking-tight'>Ready to build something robust?</h2>
            <p className='text-primary-foreground/80 text-lg leading-relaxed max-w-md'>
              Whether you&apos;re looking for a technical audit, cloud migration, or a custom AI solution, I&apos;m here
              to help you scale efficiently.
            </p>

            <div className='flex flex-col gap-4'>
              <div className='flex items-center gap-4'>
                <div className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center'>
                  <Mail className='w-5 h-5' />
                </div>
                <span className='text-lg font-medium'>simon@simoncheam.dev</span>
              </div>
              <div className='flex items-center gap-4'>
                <div className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center'>
                  <MapPin className='w-5 h-5' />
                </div>
                <span className='text-lg font-medium'>Global / Remote</span>
              </div>
            </div>
          </div>

          {/* Right Column - Actions */}
          <div className='bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 space-y-6'>
            <h3 className='text-xl font-bold'>Start a Conversation</h3>
            <p className='text-sm text-primary-foreground/70'>
              I usually respond within 24 hours. Let&apos;s discuss your technical challenges.
            </p>

            <div className='grid grid-cols-1 gap-3'>
              {/* Schedule Call Button */}
              <a
                href='https://cal.com/simoncheam/quickchat'
                target='_blank'
                rel='noopener noreferrer'
                className='w-full flex items-center justify-center gap-2 py-4 bg-white text-primary rounded-xl font-bold hover:bg-white/90 transition-all shadow-lg'>
                <Calendar className='w-5 h-5' /> Schedule a Call
              </a>

              {/* Send Message Dialog */}
              <Dialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <button className='w-full flex items-center justify-center gap-2 py-4 bg-white/20 hover:bg-white/30 transition-colors rounded-xl font-bold'>
                    <MessageSquare className='w-5 h-5' /> Send Message
                  </button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                  <DialogHeader>
                    <DialogTitle>Send me a message</DialogTitle>
                    <DialogDescription>
                      Fill out the form below and I&apos;ll get back to you as soon as possible.
                    </DialogDescription>
                  </DialogHeader>
                  <ContactForm
                    onSuccess={() => setIsDialogOpen(false)}
                    recaptchaRef={recaptchaRef as RefObject<ReCAPTCHA>}
                  />
                </DialogContent>
              </Dialog>

              {/* Social Links */}
              <div className='flex gap-3'>
                <a
                  href='https://linkedin.com/in/simoncheam'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex-1 flex items-center justify-center py-3 bg-white/20 hover:bg-white/30 transition-colors rounded-xl font-bold gap-2'>
                  <Linkedin className='w-4 h-4' /> LinkedIn
                </a>
                <a
                  href='https://github.com/simoncheam'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex-1 flex items-center justify-center py-3 bg-white/20 hover:bg-white/30 transition-colors rounded-xl font-bold gap-2'>
                  <Github className='w-4 h-4' /> GitHub
                </a>
              </div>

              {/* Copy Email */}
              <button
                onClick={handleCopyEmail}
                className='w-full flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl text-sm font-medium border border-white/10'>
                <Mail className='w-4 h-4' /> Copy Email Address
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden reCAPTCHA */}
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        size='invisible'
        theme='light'
        onErrored={handleRecaptchaError}
        onExpired={handleRecaptchaExpired}
      />
    </section>
  );
};

export default Contact;
