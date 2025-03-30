"use client";

import { useState } from 'react';
import { Search, X, Trash2, AlertTriangle } from 'lucide-react';
import { useCommandContext } from './CommandContext';
import { ImportButton } from './ImportButton';
import { ExportButton } from './ExportButton';

export const SearchBar = () => {
  const { 
    activeFilters, 
    toggleFilter, 
    searchTerm, 
    setSearchTerm, 
    setCommands 
  } = useCommandContext();
  
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteAll = () => {
    setCommands([]);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="mb-8 flex items-center justify-end gap-4">
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 flex-1 justify-end">
          {activeFilters.map((filter) => (
            <span
              key={filter}
              onClick={() => toggleFilter(filter)}
              className="bg-[#FFD700] text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-[#FFC700] transition-colors flex items-center gap-1"
            >
              {filter}
              <X size={14} />
            </span>
          ))}
        </div>
      )}
      <div
        className={`relative transition-all duration-300 ${
          isSearchExpanded ? 'w-64' : 'w-8'
        }`}
        onMouseEnter={() => setIsSearchExpanded(true)}
        onMouseLeave={() => !searchTerm && setIsSearchExpanded(false)}
      >
        <input
          type="text"
          placeholder="Search commands..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`pl-8 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-[#FFD700] transition-all duration-300 search-input text-gray-900 ${
            isSearchExpanded ? 'w-full opacity-100' : 'w-8 opacity-0'
          }`}
        />
        <Search
          className="absolute left-2 top-2.5 text-gray-400"
          size={20}
        />
      </div>
      
      {/* Import/Export buttons */}
      <ImportButton />
      <ExportButton />
      
      <div className="relative">
        {showDeleteConfirm && (
          <div
            className="absolute right-0 top-12 bg-white rounded-lg shadow-lg p-4 w-72 z-50"
          >
            <div className="flex items-center gap-2 text-red-500 mb-3">
              <AlertTriangle size={20} />
              <span className="font-semibold">Delete All Commands</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              This will permanently delete all your commands. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAll}
                className="px-3 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete All
              </button>
            </div>
          </div>
        )}
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="text-gray-400 hover:text-red-500 p-2"
          title="Delete all commands"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}; 