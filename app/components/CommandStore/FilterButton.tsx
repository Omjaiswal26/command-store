import React, { useState, useRef, KeyboardEvent, useEffect } from "react";
import { Filter } from "lucide-react";
import { useCommandContext } from './CommandContext';

export const FilterButton = () => {
  const { setActiveFilters } = useCommandContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveFilters(tags);
  }, [tags, setActiveFilters]);

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const removeLastTag = () => {
    if (tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeLastTag();
    }
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    // Only focus input if clicking on the container but not on a tag button
    if (e.target === e.currentTarget || e.target === containerRef.current) {
      inputRef.current?.focus();
    }
  };

  return (
    <div
      className={`relative transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-8'
      }`}
      onMouseEnter={() => {
        setIsExpanded(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      }}
      onMouseLeave={() => tags.length === 0 && setIsExpanded(false)}
    >
      <div
        ref={containerRef}
        className={`flex items-center pl-8 pr-4 py-2 rounded-full border border-blue-500 transition-all duration-300 ${
          isExpanded ? 'w-full opacity-100' : 'w-8 opacity-0'
        }`}
        onClick={handleContainerClick}
      >
        <div className="flex items-center gap-1 flex-grow whitespace-nowrap overflow-hidden">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md text-sm"
            >
              <span className="truncate max-w-[80px]">{tag}</span>
              <button
                className="ml-1 text-blue-700 hover:text-blue-900"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
              >
                ×
              </button>
            </div>
          ))}
          <input
            ref={inputRef}
            type="text"
            className="bg-transparent outline-none text-sm text-gray-900 min-w-[60px] flex-grow"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={tags.length === 0 ? "Filter by tag..." : ""}
            onClick={(e) => e.stopPropagation()}
            onFocus={() => setIsExpanded(true)}
          />
        </div>
      </div>
      <Filter
        className="absolute left-2 top-1/2 -translate-y-1/2 text-blue-500 cursor-pointer z-10"
        size={20}
        onClick={() => {
          setIsExpanded(!isExpanded);
          if (!isExpanded) {
            setTimeout(() => inputRef.current?.focus(), 0);
          }
        }}
      />
    </div>
  );
};

export default FilterButton;
