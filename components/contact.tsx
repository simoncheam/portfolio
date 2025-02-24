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
  const [isLoading, setIsLoading] = useState(true);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  useEffect(() => {
    // console.log('Initial recaptcha state:', {
    //   ref: recaptchaRef.current,
    //   isReady: isRecaptchaReady,
    //   siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    // });

    // Check if reCAPTCHA script is loaded
    const checkRecaptchaScript = () => {
      if (window.grecaptcha) {
        setIsLoading(false);
      } else {
        setTimeout(checkRecaptchaScript, 1000);
      }
    };

    checkRecaptchaScript();
  }, [isRecaptchaReady]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('simon@simoncheam.dev');
    toast.success('Email copied to clipboard!');
  };

  const verifyRecaptchaLoaded = () => {
    console.log('Verifying recaptcha:', {
      ref: recaptchaRef.current,
      isReady: isRecaptchaReady,
    });
    return true; // Always return true to allow dialog to open
  };

  const handleRecaptchaError = () => {
    console.error('ReCAPTCHA error occurred');
    toast.error('Verification service encountered an error. Please try again.');
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };

  const handleRecaptchaExpired = () => {
    console.warn('ReCAPTCHA token expired');
    toast.warning('Verification expired. Please try again.');
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };

  const handleRecaptchaLoad = () => {
    console.log('ReCAPTCHA loaded successfully');
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
          {/* // TODO: Update here */}
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              // Remove the verification check here
              setIsDialogOpen(open);
            }}>
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
