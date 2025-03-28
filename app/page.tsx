import { Metadata } from 'next';
import { CommandStore } from './components/CommandStore';

export const metadata: Metadata = {
  title: 'Command Store - Your Personal Vault of Terminal Commands',
  description: 'Save, search, and easily access your most used terminal commands in one place. Never forget a command again!',
  keywords: [
    'terminal commands', 'command store', 'cli commands', 'command line', 
    'developer tools', 'command vault', 'code snippets'
  ]
};

export default function Home() {
  return <CommandStore />;
}
