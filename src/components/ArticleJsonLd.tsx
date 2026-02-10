import { Helmet } from 'react-helmet-async';

interface Props {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedTime: string;
  modifiedTime?: string;
  authorName: string;
  section?: string;
  wordCount?: number;
}

const BASE_URL = 'https://netveggies.com';

export const ArticleJsonLd = ({ title, description, url, image, publishedTime, modifiedTime, authorName, section, wordCount }: Props) => {
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  const imageUrl = image?.startsWith('http') ? image : image ? `${BASE_URL}${image}` : `${BASE_URL}/og-image.jpg`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: imageUrl,
    url: fullUrl,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: { '@type': 'Person', name: authorName },
    publisher: { '@type': 'Organization', name: 'NetVeggies', logo: { '@type': 'ImageObject', url: `${BASE_URL}/favicon.ico` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': fullUrl },
    ...(section && { articleSection: section }),
    ...(wordCount && wordCount > 0 && { wordCount }),
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default ArticleJsonLd;
