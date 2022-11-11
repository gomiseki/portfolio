import React from 'react';
import useSiteMetadata from '../hooks/use-site-metadata';

export default function SEO({
  title, description, children,
}: { title: string, description: string, children: React.ReactNode }) {
  const {
    title: defaultTitle, description: defaultDescription,
  } = useSiteMetadata();

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="title" content={seo.title} />
      {children}
    </>
  );
}
