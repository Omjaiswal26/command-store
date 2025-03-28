"use client";

import { useState, useRef, useEffect } from 'react';
import { Edit2, Trash2, X } from 'lucide-react';
import { useCommandContext } from './CommandContext';
import { Command } from './types';

interface CommandRowProps {
  cmd: Command;
}

export const CommandRow = ({ cmd }: CommandRowProps) => {
  const { 
    commands, 
    setCommands, 
    toggleFilter, 
    copiedId, 
    handleCopyCommand 
  } = useCommandContext();
  
  const [editingCommand, setEditingCommand] = useState<Command | null>(null);
  const [editingTag, setEditingTag] = useState('');
  const [lastTagEnterTime, setLastTagEnterTime] = useState(0);
  const [editingField, setEditingField] = useState<'command' | 'tags' | null>(null);
  
  const editCommandRef = useRef<HTMLInputElement>(null);
  const editTagRef = useRef<HTMLInputElement>(null);
  const editRowRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editingCommand && editRowRef.current && !editRowRef.current.contains(event.target as Node)) {
        saveEdit();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editingCommand]);

  const startEditing = (command: Command, field: 'command' | 'tags', e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingCommand(command);
    setEditingTag('');
    setEditingField(field);
    setTimeout(() => {
      if (field === 'command') editCommandRef.current?.focus();
      if (field === 'tags') editTagRef.current?.focus();
    }, 50);
  };

  const handleEditChange = (field: keyof Command, value: any) => {
    if (editingCommand) {
      setEditingCommand({
        ...editingCommand,
        [field]: value,
      });
    }
  };

  const saveEdit = () => {
    if (editingCommand) {
      setCommands(commands.map(command => 
        command.id === editingCommand.id ? {
          ...editingCommand,
          tags: editingCommand.tags || []
        } : command
      ));
      setEditingCommand(null);
      setEditingTag('');
      setLastTagEnterTime(0);
      setEditingField(null);
    }
  };

  const handleEditCommandKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      editTagRef.current?.focus();
      setEditingField('tags');
    }
  };

  const handleEditTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const now = Date.now();
      
      if (editingTag.trim()) {
        if (editingCommand && !editingCommand.tags.includes(editingTag.trim())) {
          handleEditChange('tags', [...(editingCommand?.tags || []), editingTag.trim()]);
        }
        setEditingTag('');
        setLastTagEnterTime(now);
      } else if (now - lastTagEnterTime < 500) {
        saveEdit();
        setLastTagEnterTime(0);
      } else {
        setLastTagEnterTime(now);
      }
    }
  };

  const removeEditTag = (tagToRemove: string) => {
    if (editingCommand) {
      handleEditChange('tags', editingCommand.tags.filter(tag => tag !== tagToRemove));
    }
  };

  const deleteCommand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCommands(commands.filter(command => command.id !== id));
  };

  const isEditing = editingCommand?.id === cmd.id;

  return (
    <tr
      ref={isEditing ? editRowRef : null}
      className={`transition-colors duration-150 group cursor-pointer ${
        isEditing ? 'bg-white' : 'hover:bg-gray-50'
      }`}
      onClick={() => !isEditing && handleCopyCommand(cmd.command, cmd.id)}
    >
      <td 
        className="px-6 py-4 align-top" 
        style={{ width: '60%' }}
      >
        {isEditing ? (
          <input
            ref={editCommandRef}
            type="text"
            value={editingCommand.command}
            onChange={(e) => handleEditChange('command', e.target.value)}
            onKeyDown={handleEditCommandKeyDown}
            onFocus={() => setEditingField('command')}
            className={`w-full p-2 border-b-2 focus:outline-none command-input text-gray-900 ${
              editingField === 'command' ? 'border-[#FFD700] bg-white' : 'border-transparent'
            }`}
          />
        ) : (
          <div className="group/tooltip relative">
            <code 
              className={`px-2 py-1 rounded transition-colors block w-full whitespace-pre-wrap break-words ${
                copiedId === cmd.id 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {cmd.command}
            </code>
            <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 transition-opacity pointer-events-none ${
              copiedId === cmd.id ? 'opacity-100' : 'group-hover/tooltip:opacity-100'
            }`}>
              {copiedId === cmd.id ? 'Copied!' : 'Click to copy'}
            </div>
          </div>
        )}
      </td>
      <td 
        className="px-6 py-4 align-top" 
        style={{ width: '30%' }}
      >
        {isEditing ? (
          <div className="flex flex-wrap gap-2 items-start">
            {editingCommand.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#FFD700] text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 flex-shrink-0"
              >
                {tag}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeEditTag(tag);
                  }}
                  className="hover:text-gray-200"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
            <input
              ref={editTagRef}
              type="text"
              placeholder={editingCommand.tags.length === 0 ? "tags" : ""}
              value={editingTag}
              onChange={(e) => setEditingTag(e.target.value)}
              onKeyDown={handleEditTagKeyDown}
              onFocus={() => setEditingField('tags')}
              className={`border-b-2 focus:outline-none min-w-[60px] flex-1 tag-input text-gray-900 ${
                editingField === 'tags' ? 'border-[#FFD700] bg-white' : 'border-transparent'
              }`}
            />
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {cmd.tags.map((tag) => (
              <span
                key={tag}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFilter(tag);
                }}
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm cursor-pointer hover:bg-[#FFD700] hover:text-white transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </td>
      <td className="px-6 py-4 align-top" style={{ width: '10%' }}>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (!isEditing) {
                startEditing(cmd, 'command', e);
              }
            }}
            className="text-gray-400 hover:text-[#FFD700]"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={(e) => deleteCommand(cmd.id, e)}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}; 