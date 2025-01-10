'use client';

import Image from 'next/image';
import { RainbowHighlight } from './rainbow-highlight';
import { RoughNotation, RoughNotationGroup } from 'react-rough-notation';
import { Button } from './ui/button';

const Hero = () => {
  const colors = ['#F59E0B', '#10B981', '#3B82F6'];
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] w-full max-w-3xl mx-auto text-center px-4'>
      <div className='mb-8 relative w-48 h-48 sm:w-56 sm:h-56'>
        <Image
          src='/images/avatar.png'
          alt='Simon Cheam'
          fill
          className='rounded-full border-4 border-gray-300 dark:border-gray-700 object-cover'
        />
      </div>
      <RoughNotationGroup show={true}>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4'>Simon Cheam</h1>
        <div className='flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xl sm:text-2xl md:text-3xl mb-6'>
          <RainbowHighlight color={colors[0]}>
            <span>Full Stack Developer</span>
          </RainbowHighlight>
          <span className='hidden sm:inline'>|</span>
          <RainbowHighlight color={colors[1]}>
            <span>Cloud Engineer</span>
          </RainbowHighlight>
          {/* <span className='hidden sm:inline'>|</span>
          <RainbowHighlight color={colors[2]}>
            <span>Copywriter</span>
          </RainbowHighlight> */}
        </div>
      </RoughNotationGroup>
      <p className='mb-8 max-w-2xl text-sm sm:text-base'>
        Passionate about creating efficient, scalable solutions and bringing ideas to life through code.
      </p>
      <Button
        size='lg'
        asChild>
        <a href='#contact'>Get in Touch</a>
      </Button>
    </div>
  );
};

export default Hero;
