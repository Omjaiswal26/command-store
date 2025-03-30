"use client";

import { Upload } from 'lucide-react';
import { useCommandContext } from './CommandContext';

export const ExportButton = () => {
  const { commands } = useCommandContext();

  const handleExport = () => {
    // Create a JSON string from the commands array
    const exportData = JSON.stringify(commands, null, 2);
    
    // Create a blob with the data
    const blob = new Blob([exportData], { type: 'application/json' });
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor to download the file
    const a = document.createElement('a');
    a.href = url;
    a.download = `command-store-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button
        onClick={handleExport}
        className="text-gray-400 hover:text-[#FFD700] p-2"
        title="Export commands"
      >
        <Upload size={20} />
      </button>
    </div>
  );
}; 