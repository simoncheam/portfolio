'use client';

import { Button } from './ui/button';
import { Calendar, Github, Linkedin, Mail } from 'lucide-react';

const Contact = () => {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('simon@simoncheam.dev');
    alert('Email copied to clipboard!');
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
        <Button
          asChild
          size="lg"
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
        >
          <a href="https://cal.com/simoncheam/quickchat" target="_blank" rel="noopener noreferrer">
            <Calendar className="mr-2 h-5 w-5" />
            Let&apos;s Chat!
          </a>
        </Button>
        <div className="w-full flex items-center gap-4 my-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-muted-foreground text-sm">or</span>
          <div className="h-px flex-1 bg-border" />
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
      </div>
    </section>
  );
};

export default Contact;
