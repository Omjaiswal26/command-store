import Head from 'next/head';
import { CommandStore } from './components/CommandStore';

export default function Home() {
  return (
    <>
      <Head>
        <title>Command Store - Your Personal Vault of Commands</title>
        <meta name="description" content="Save, search, and easily access your most used terminal commands in one place. Never forget a command again!" />
        <meta name="keywords" content="store commands, command, command storage, terminal commands, command store, cli commands, command line, developer tools, command vault, code snippets" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Command Store - Your Personal Vault of Commands" />
        <meta property="og:description" content="Save, search, and access terminal commands easily." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://command-store.dev" />
        <meta property="og:image" content="/images/og-image.jpg" />
      </Head>
      <CommandStore />
    </>
  );
}
