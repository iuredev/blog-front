import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ClientPost from './ClientPost';
import { getPostBySlug } from '@/api/queries/posts';

type PostPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};

async function getStrapiLocale(searchParams: PostPageProps["searchParams"]) {
  const params = await searchParams;
  const lang = Array.isArray(params.lang) ? params.lang[0] : params.lang;

  return lang === "pt-br" ? "pt-BR" : undefined;
}

export async function generateMetadata({ params, searchParams }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug, await getStrapiLocale(searchParams));

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found',
    };
  }

  return {
    title: `${post.title} | Iure`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: ['Iure'],
      url: `https://iure.dev/notes/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    }
  };
}

export default async function Post({ params, searchParams }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, await getStrapiLocale(searchParams));
  if (!post) notFound();
  return <ClientPost slug={slug} initialData={post} />;
}
