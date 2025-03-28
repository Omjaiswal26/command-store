"use client";

import { useCommandContext } from './CommandContext';
import { CommandForm } from './CommandForm';
import { CommandRow } from './CommandRow';

export const CommandTable = () => {
  const { filteredCommands } = useCommandContext();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full table-fixed">
        <tbody className="divide-y divide-gray-200">
          <CommandForm />
          {filteredCommands.map((cmd) => (
            <CommandRow key={cmd.id} cmd={cmd} />
          ))}
        </tbody>
      </table>
    </div>
  );
}; 