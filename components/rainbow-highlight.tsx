import React from 'react';
import { RoughNotation } from 'react-rough-notation';

export const RainbowHighlight = ({ color, children }: { color: string; children: React.ReactNode }) => {
  return (
    <RoughNotation
      type='highlight'
      multiline={true}
      padding={[0, 2]}
      iterations={1}
      animationDuration={300}
      color={color}>
      {children}
    </RoughNotation>
  );
};
