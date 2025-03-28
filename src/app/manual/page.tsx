import { Metadata } from 'next';
import ClientManual from './ClientManual';
import { getPage } from '@/api/queries/pages';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('manual');

  if (!page) {
    return {
      title: "Manual",
      description: 'The manual page could not be found',
    };
  }

  return {
    title: `Manual`,
    description: 'Learn how to work with me effectively',
    openGraph: {
      title: 'Manual',
      description: 'Learn how to work with me effectively',
      type: 'website',
      url: 'https://iure.dev/manual',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Manual',
      description: 'Learn how to work with me effectively',
    }
  };
}

export default function Manual() {
  return <ClientManual />;
}
