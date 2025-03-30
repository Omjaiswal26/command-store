"use client";

import { useState, useRef } from 'react';
import { Download } from 'lucide-react';
import { useCommandContext } from './CommandContext';

export const ImportButton = () => {
  const { commands, setCommands } = useCommandContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportStatus('processing');
    setStatusMessage('Processing file...');
    setShowDialog(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedCommands = JSON.parse(event.target?.result as string);
        
        // Validate that it's an array of commands
        if (Array.isArray(importedCommands)) {
          // Merge imported commands with existing ones, avoiding duplicates by id
          const existingIds = commands.map(cmd => cmd.id);
          const uniqueImportedCommands = importedCommands.filter(cmd => 
            cmd.id && cmd.command && Array.isArray(cmd.tags) && !existingIds.includes(cmd.id)
          );
          
          if (uniqueImportedCommands.length > 0) {
            setCommands([...uniqueImportedCommands, ...commands]);
            setImportStatus('success');
            setStatusMessage(`Successfully imported ${uniqueImportedCommands.length} commands.`);
          } else {
            setImportStatus('error');
            setStatusMessage('No new commands found to import.');
          }
        } else {
          setImportStatus('error');
          setStatusMessage('Invalid format: File does not contain an array of commands.');
        }
      } catch (error) {
        console.error('Error parsing imported file:', error);
        setImportStatus('error');
        setStatusMessage('Invalid JSON file format. Please import a valid command store export file.');
      }

      // Auto-hide success dialog after 3 seconds
      if (importStatus === 'success') {
        setTimeout(() => {
          setShowDialog(false);
        }, 3000);
      }
    };
    reader.readAsText(file);
    
    // Reset the file input
    e.target.value = '';
  };

  const closeDialog = () => {
    setShowDialog(false);
    setImportStatus('idle');
  };

  return (
    <div className="relative">
      <input
        type="file"
        ref={fileInputRef}
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={handleImport}
        className="text-gray-400 hover:text-[#FFD700] p-2"
        title="Import commands"
      >
        <Download size={20} />
      </button>

      {/* Status Dialog */}
      {showDialog && (
        <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg p-4 w-72 z-50">
          <div className={`flex items-center gap-2 mb-3 ${
            importStatus === 'error' ? 'text-red-500' : 
            importStatus === 'success' ? 'text-green-500' : 
            'text-blue-500'
          }`}>
            <span className="font-semibold">
              {importStatus === 'processing' ? 'Importing Commands...' : 
               importStatus === 'success' ? 'Import Successful' : 
               'Import Failed'}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">{statusMessage}</p>
          
          <div className="flex justify-end">
            <button
              onClick={closeDialog}
              className={`px-3 py-1.5 text-sm rounded ${
                importStatus === 'error' ? 'bg-red-500 text-white hover:bg-red-600' :
                importStatus === 'success' ? 'bg-green-500 text-white hover:bg-green-600' :
                'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {importStatus === 'processing' ? 'Please wait...' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 