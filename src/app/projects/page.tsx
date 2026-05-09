import { Metadata } from 'next';
import ClientProjects from './ClientProjects';

export const metadata: Metadata = {
  title: 'Projects | Iure',
  description: 'Projects built by Iure — software engineer.',
  openGraph: {
    title: 'Projects | Iure',
    description: 'Projects built by Iure — software engineer.',
    type: 'website',
    url: 'https://iure.dev/projects',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Iure',
    description: 'Projects built by Iure — software engineer.',
  },
};

export default function Projects() {
  return <ClientProjects />;
}
