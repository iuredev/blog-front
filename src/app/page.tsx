import { Suspense } from 'react';
import ClientHome from './ClientHome';
import { Loading } from '@/components';

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <ClientHome />
    </Suspense>
  );
}
