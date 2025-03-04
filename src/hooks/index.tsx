import { Helmet } from 'react-helmet';
import { useEffect } from 'react';

const useHelmet = (title: string, description?: string) => { 

  useEffect(() => {
    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || '');
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
      <meta name="description" content={description} />
    </Helmet>
  );
 
};

export default useHelmet;