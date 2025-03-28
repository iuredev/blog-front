import { Metadata } from 'next';
import ClientAbout from './ClientAbout';
import { getPage } from '@/api/queries/pages';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('about');

  if (!page) {
    return {
      title: 'About Not Found',
      description: 'The about page could not be found',
    };
  }

  return {
    title: `About`,
    description: page.description || 'Learn more about Iure, a software engineer passionate about web development and technology',
    openGraph: {
      title: 'About Iure',
      description: page.description || 'Learn more about Iure, a software engineer passionate about web development and technology',
      type: 'profile',
      url: 'https://iure.dev/about',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About Iure',
      description: page.description || 'Learn more about Iure, a software engineer passionate about web development and technology',
    }
  };
}

export default function About() {
  return <ClientAbout />;
}
