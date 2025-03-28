"use client";

import { useState, useRef } from 'react';
import { Plus, X } from 'lucide-react';
import { useCommandContext } from './CommandContext';

// Helper function to generate UUID safely
const generateId = () => {
  return crypto.randomUUID();
};

export const CommandForm = () => {
  const { commands, setCommands } = useCommandContext();
  const [newCommand, setNewCommand] = useState({ command: '', tags: [] as string[] });
  const [currentTag, setCurrentTag] = useState('');
  const [lastEnterTime, setLastEnterTime] = useState(0);
  
  const commandInputRef = useRef<HTMLInputElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);

  const handleAddCommand = () => {
    if (newCommand.command) {
      setCommands([
        {
          id: generateId(),
          ...newCommand,
          tags: newCommand.tags || [],
          timestamp: Date.now(),
        },
        ...commands,
      ]);
      setNewCommand({ command: '', tags: [] });
      setCurrentTag('');
      commandInputRef.current?.focus();
    }
  };

  const handleCommandKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      tagInputRef.current?.focus();
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const now = Date.now();
      
      if (currentTag.trim()) {
        if (!newCommand.tags.includes(currentTag.trim())) {
          setNewCommand({
            ...newCommand,
            tags: [...newCommand.tags, currentTag.trim()],
          });
        }
        setCurrentTag('');
        setLastEnterTime(now);
      } else if (now - lastEnterTime < 500) {
        handleAddCommand();
        setLastEnterTime(0);
      } else {
        setLastEnterTime(now);
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewCommand({
      ...newCommand,
      tags: newCommand.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  return (
    <tr className="bg-white">
      <td className="px-6 py-4" style={{ width: '60%' }}>
        <input
          ref={commandInputRef}
          type="text"
          placeholder="command"
          value={newCommand.command}
          onChange={(e) =>
            setNewCommand({ ...newCommand, command: e.target.value })
          }
          onKeyDown={handleCommandKeyDown}
          className={`w-full p-2 border-b-2 border-transparent focus:border-[#FFD700] focus:outline-none command-input placeholder-gray-400 ${
            newCommand.command ? 'text-gray-900' : ''
          }`}
        />
      </td>
      <td className="px-6 py-4" style={{ width: '30%' }}>
        <div className="flex flex-wrap gap-2 items-center">
          {newCommand.tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#FFD700] text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 flex-shrink-0"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="hover:text-gray-200"
              >
                <X size={14} />
              </button>
            </span>
          ))}
          <input
            ref={tagInputRef}
            type="text"
            placeholder={newCommand.tags.length === 0 ? "tags" : ""}
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            onKeyDown={handleTagKeyDown}
            className={`border-b-2 border-transparent focus:border-[#FFD700] focus:outline-none min-w-[60px] flex-1 tag-input placeholder-gray-400 ${
              currentTag ? 'text-gray-900' : ''
            }`}
          />
        </div>
      </td>
      <td className="px-6 py-4" style={{ width: '10%' }}>
        <button
          onClick={handleAddCommand}
          disabled={!newCommand.command}
          className={`rounded-full p-1.5 transition-colors ${
            newCommand.command
              ? 'bg-[#FFD700] text-white hover:bg-[#FFC700]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Plus size={20} />
        </button>
      </td>
    </tr>
  );
}; 