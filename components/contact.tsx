'use client';

import { Calendar, Github, Linkedin, Mail, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
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
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  useEffect(() => {
    // Check if reCAPTCHA script is loaded
    const checkRecaptchaScript = () => {
      if (window.grecaptcha) {
        setIsRecaptchaReady(true);
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

  const handleRecaptchaLoad = () => {
    setIsRecaptchaReady(true);
  };

  return (
    <section
      id='contact'
      className='py-16 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
      <h2 className='text-3xl sm:text-4xl font-bold mb-8 text-center'>Get in Touch</h2>
      <div className='flex flex-col items-center gap-6'>
        <p className='text-lg text-center text-muted-foreground mb-4'>
          If you think we&apos;d be a good fit (like your favorite pair of jeans 👖), Let&apos;s chat.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'>
          <Button
            asChild
            size='lg'
            className='w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg'>
            <a
              href='https://cal.com/simoncheam/quickchat'
              target='_blank'
              rel='noopener noreferrer'>
              <Calendar className='mr-2 h-5 w-5' />
              Let&apos;s Chat (15 min)
            </a>
          </Button>
          <Dialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size='lg'
                variant='outline'
                className='w-full sm:w-auto'>
                <MessageSquare className='mr-2 h-5 w-5' />
                Send Message
              </Button>
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
        </div>

        <div className='w-full flex items-center gap-4 my-4'>
          <div className='h-px flex-1 bg-border' />
          <span className='text-muted-foreground text-sm'>or</span>
          <div className='h-px flex-1 bg-border' />
        </div>

        <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
          <Button
            onClick={handleCopyEmail}
            className='w-full sm:w-auto'
            size='lg'>
            <Mail className='mr-2 h-5 w-5' />
            Copy Email Address
          </Button>
          <Button
            asChild
            variant='outline'
            size='lg'
            className='w-full sm:w-auto'>
            <a
              href='https://github.com/simoncheam'
              target='_blank'
              rel='noopener noreferrer'>
              <Github className='mr-2 h-5 w-5' />
              Connect on GitHub
            </a>
          </Button>
          <Button
            asChild
            variant='outline'
            size='lg'
            className='w-full sm:w-auto'>
            <a
              href='https://linkedin.com/in/simoncheam'
              target='_blank'
              rel='noopener noreferrer'>
              <Linkedin className='mr-2 h-5 w-5' />
              Connect on LinkedIn
            </a>
          </Button>
        </div>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          size='invisible'
          theme='light'
          onErrored={handleRecaptchaError}
          onExpired={handleRecaptchaExpired}
          onLoad={handleRecaptchaLoad}
        />
      </div>
    </section>
  );
};

export default Contact;
