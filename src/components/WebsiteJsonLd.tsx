import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'NetVeggies';
const BASE_URL = 'https://netveggies.com';

export const WebsiteJsonLd = () => {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.ico`,
    sameAs: [],
  };
  const site = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/search?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(org)}</script>
      <script type="application/ld+json">{JSON.stringify(site)}</script>
    </Helmet>
  );
};

export default WebsiteJsonLd;
