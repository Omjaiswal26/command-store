'use client';

import Script from 'next/script';

export default function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Command Store',
    applicationCategory: 'DeveloperApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    operatingSystem: 'Any',
    description: 'Store, organize and retrieve terminal commands with ease',
    url: 'https://command-store.dev',
    image: 'https://command-store.dev/logo-dark.png',
    author: {
      '@type': 'Person',
      name: 'Command Store Developer'
    }
  };

  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
} 