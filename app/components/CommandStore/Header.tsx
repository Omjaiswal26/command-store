"use client";

import { useCommandContext } from './CommandContext';
import { subheadings } from './types';

export const Header = () => {
  const { subheadingIndex } = useCommandContext();
  
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center mb-6">
        <div className="mr-6 relative">
          <div className="bg-[#FFD700] w-[100px] h-[100px] rounded-lg shadow-md flex items-center justify-center">
            <span className="text-white text-3xl font-mono">{">"}_</span>
          </div>
        </div>
        
        <div className="text-left">
          <h1 className="text-5xl font-bold text-[#4A4A4A] leading-tight">
            Command Store
          </h1>
          <p className="text-[#444444] text-xl mt-1 pl-[6px]">
            {subheadings[subheadingIndex]}
          </p>
        </div>
      </div>
    </div>
  );
}; 