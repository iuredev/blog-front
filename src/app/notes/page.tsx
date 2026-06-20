import { Metadata } from 'next';
import { Suspense } from 'react';
import ClientBlog from './ClientBlog';
import { Loading } from '@/components';

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Notes and thoughts on software engineering and technology by Iure',
  openGraph: {
    title: 'Notes',
    description: 'Notes and thoughts on software engineering and technology by Iure',
    type: 'website',
    url: 'https://iure.dev/notes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notes',
    description: 'Notes and thoughts on software engineering and technology by Iure',
  }
};

export default function Notes() {
  return (
    <Suspense fallback={<Loading />}>
      <ClientBlog />
    </Suspense>
  );
}
