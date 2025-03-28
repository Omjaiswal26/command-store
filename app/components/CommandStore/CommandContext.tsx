"use client";

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Command, subheadings } from './types';

interface CommandContextProps {
  commands: Command[];
  setCommands: React.Dispatch<React.SetStateAction<Command[]>>;
  subheadingIndex: number;
  setSubheadingIndex: React.Dispatch<React.SetStateAction<number>>;
  activeFilters: string[];
  setActiveFilters: React.Dispatch<React.SetStateAction<string[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  copiedId: string | null;
  setCopiedId: React.Dispatch<React.SetStateAction<string | null>>;
  toggleFilter: (tag: string) => void;
  handleCopyCommand: (command: string, id: string, e?: React.MouseEvent) => Promise<void>;
  filteredCommands: Command[];
}

const CommandContext = createContext<CommandContextProps | undefined>(undefined);

export const CommandProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with empty arrays/values to avoid hydration mismatch
  const [commands, setCommands] = useState<Command[]>([]);
  const [subheadingIndex, setSubheadingIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load stored commands after the component is mounted (client-side only)
  useEffect(() => {
    const savedCommands = localStorage.getItem('commands');
    if (savedCommands) {
      setCommands(JSON.parse(savedCommands));
    }
    setIsInitialized(true);
  }, []);

  // Save commands to localStorage when they change, but only after initialization
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('commands', JSON.stringify(commands));
    }
  }, [commands, isInitialized]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSubheadingIndex((current) => (current + 1) % subheadings.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (copiedId) {
      const timer = setTimeout(() => setCopiedId(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedId]);

  const toggleFilter = (tag: string) => {
    setActiveFilters(
      activeFilters.includes(tag)
        ? activeFilters.filter((t) => t !== tag)
        : [...activeFilters, tag]
    );
  };

  const handleCopyCommand = async (command: string, id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    try {
      await navigator.clipboard.writeText(command);
      setCopiedId(id);
    } catch (err) {
      console.error('Failed to copy command:', err);
    }
  };

  const filteredCommands = commands.filter((cmd) => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch = cmd.command.toLowerCase().includes(searchTermLower);
    const matchesTags =
      activeFilters.length === 0 ||
      activeFilters.every((filter) => cmd.tags.includes(filter));
    return matchesSearch && matchesTags;
  });

  return (
    <CommandContext.Provider
      value={{
        commands,
        setCommands,
        subheadingIndex,
        setSubheadingIndex,
        activeFilters,
        setActiveFilters,
        searchTerm,
        setSearchTerm,
        copiedId,
        setCopiedId,
        toggleFilter,
        handleCopyCommand,
        filteredCommands
      }}
    >
      {children}
    </CommandContext.Provider>
  );
};

export const useCommandContext = () => {
  const context = useContext(CommandContext);
  if (context === undefined) {
    throw new Error('useCommandContext must be used within a CommandProvider');
  }
  return context;
}; 