import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

export default function useHelmet(title: string, description?: string, image?: string, keywords?: string[]) {
  const siteUrl = 'https://www.iure.dev';
  const defaultDescription = 'Personal blog of Iure - Software Engineer sharing thoughts on technology, lifestyle, tutorials and personal development.';
  const defaultImage = `${siteUrl}/iure.jpg`;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : siteUrl;

  useEffect(() => {
    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');

    if (metaDescription) {
      metaDescription.setAttribute('property', 'og:description');
      metaDescription.setAttribute('content', description || defaultDescription);
    }
    if (metaKeywords && keywords) {
      const existingKeywords = metaKeywords.getAttribute('content') || '';
      const keywordsString = keywords.join(', ');
      const newKeywords = existingKeywords ? `${existingKeywords}, ${keywordsString}` : keywordsString;
      metaKeywords.setAttribute('content', newKeywords);
    }


  }, [title, description, keywords]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:site_name" content="Iure.dev" />
      <meta property="og:keywords" content={keywords?.join(', ') || ''} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={image || defaultImage} />


      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <link rel="canonical" href={currentUrl} />

      <meta name="theme-color" content="#ffffff" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

    </Helmet>
  );
};