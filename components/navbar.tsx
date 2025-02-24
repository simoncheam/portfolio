'use client';

import { DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Github, Linkedin, Menu } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // const [mounted, setMounted] = useState(false);

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ];

  useEffect(() => {
    const style2 = [
      'background: linear-gradient(#E36C4E, #19272f)',
      'border: 1px solid #E36C4E',
      'color: white',
      'padding: 1px 5px',
      'display: block',
      'line-height: 40px',
      'text-align: center',
      'font-weight: bold',
      'font-size: large',
    ].join(';');
    console.log(
      "%cIf you like what you see...I'd love to help you to take your software, team, or company to the next level.",
      style2
    );
    console.log("%cLet's chat >>> simon@simoncheam.dev", style2);
  }, []);

  useEffect(() => {
    // setMounted(true);

    Promise.all([
      fetch('https://covidtrackerdashboard.herokuapp.com/status', {
        mode: 'no-cors',
      }),
      fetch('https://ultimate-life-purpose.herokuapp.com/status', {
        mode: 'no-cors',
      }),
      fetch('https://react-cocktailsapp.netlify.app', {
        mode: 'no-cors',
      }),
      fetch('https://next-bnb.vercel.app', {
        mode: 'no-cors',
      }),
      fetch('https://nextjs-gpt-tour-guide.vercel.app', {
        mode: 'no-cors',
      }),
      fetch('https://personal-blogs-app.herokuapp.com/status', {
        mode: 'no-cors',
      }),
      fetch('https://mini-netflix-angular.web.app/movie', {
        mode: 'no-cors',
      }),
    ]).then(() => console.log('apps loaded successfully'));
  }, []);

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='flex h-14 items-center justify-between'>
          {/* Mobile Menu */}
          <div className='md:hidden'>
            <Sheet
              open={isOpen}
              onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'>
                  <Menu className='h-5 w-5' />
                  <span className='sr-only'>Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side='left'
                className='w-[240px] sm:w-[300px]'>
                <VisuallyHidden>
                  <DialogTitle>Mobile Navigation Menu</DialogTitle>
                </VisuallyHidden>

                <nav className='flex flex-col gap-4'>
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className='text-foreground/60 transition-colors hover:text-foreground/80'>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Logo */}
          <div className='hidden md:flex items-center gap-6'>
            <Link
              href='/'
              className='flex items-center space-x-2'>
              <span className='font-bold'>Simon Cheam</span>
            </Link>
            <span className='text-sm text-muted-foreground'>Full-Stack Developer</span>
          </div>

          {/* Mobile Logo */}
          <div className='md:hidden'>
            <Link
              href='/'
              className='flex items-center space-x-2'>
              <span className='font-bold'>Simon Cheam</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center gap-6'>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className='text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80'>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Social Links & Theme Toggle */}
          <div className='flex items-center gap-2'>
            <Button
              variant='ghost'
              size='icon'
              asChild>
              <a
                href='https://github.com/simoncheam'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='GitHub'>
                <Github className='h-5 w-5' />
              </a>
            </Button>
            <Button
              variant='ghost'
              size='icon'
              asChild>
              <a
                href='https://linkedin.com/in/simoncheam'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='LinkedIn'>
                <Linkedin className='h-5 w-5' />
              </a>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
