"use client";

import { CommandProvider } from './CommandContext';
import { Header } from './Header';
import { SearchBar } from './SearchBar';
import { CommandTable } from './CommandTable';

export const CommandStore = () => {
  return (
    <CommandProvider>
      <div className="min-h-screen bg-[#FFF8DC] p-6">
        <div className="max-w-6xl mx-auto">
          <Header />
          <SearchBar />
          <CommandTable />
        </div>
      </div>
    </CommandProvider>
  );
}; 