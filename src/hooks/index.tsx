import { Helmet } from 'react-helmet';
import { useEffect } from 'react';

const useHelmet = (title: string, description?: string, image?: string) => {
  const siteUrl = 'https://iure.dev';
  const defaultDescription = 'Personal blog of Iure Gomes - Software Engineer sharing thoughts on technology, lifestyle, tutorials and personal development.';
  const defaultImage = `${siteUrl}/iure.jpg`;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : siteUrl;

  useEffect(() => {
    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || defaultDescription);
    }

    return () => {
      document.title = '';
      if (metaDescription) {
        metaDescription.setAttribute('content', '');
      }
    };
  }, [title, description]);

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

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description || defaultDescription} />
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

export default useHelmet;