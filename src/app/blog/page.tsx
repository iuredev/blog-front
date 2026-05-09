import { Metadata } from 'next';
import { Suspense } from 'react';
import ClientBlog from './ClientBlog';
import { Loading } from '@/components';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles about software engineering, web development, and technology by Iure',
  openGraph: {
    title: 'Blog',
    description: 'Articles about software engineering, web development, and technology by Iure',
    type: 'website',
    url: 'https://iure.dev/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog',
    description: 'Articles about software engineering, web development, and technology by Iure',
  }
};

export default function Blog() {
  return (
    <Suspense fallback={<Loading />}>
      <ClientBlog />
    </Suspense>
  );
} 