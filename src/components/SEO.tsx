import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noIndex?: boolean;
}

const SITE_NAME = 'NetVeggies';
const DEFAULT_DESCRIPTION = 'Your ultimate plant-based resource — free nutrition calculators, cooking tools, meal planning guides, and delicious vegan recipes. Eat better, live greener.';
const BASE_URL = 'https://netveggies.com';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;

export const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
  noIndex = false,
}: SEOProps) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Plant-Based Recipes & Nutrition Tools`;
  const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL;
  const imageUrl = image
    ? (image.startsWith('http') ? image : `${BASE_URL}${image}`)
    : DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      {type === 'article' && publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {type === 'article' && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {type === 'article' && author && <meta property="article:author" content={author} />}
      {type === 'article' && section && <meta property="article:section" content={section} />}
      {type === 'article' && tags.map((tag, i) => <meta key={i} property="article:tag" content={tag} />)}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default SEO;
