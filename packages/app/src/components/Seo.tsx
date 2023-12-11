import React from "react";

type SeoProps = {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string;
};

function Seo({ title, description, image, url, keywords }: SeoProps) {
  return (
    <>
      {/* General Meta Tags */}
      <title>{title ?? "Veloz - Your SaaS Launchpad"}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="image" content={image} />
      <meta name="url" content={url} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Veloz" />

      {/* Twitter Meta Tags */}
      <meta property="twitter:title" content={title} />
      <meta
        property="twitter:description"
        content={description ?? "Ship faster with veloz"}
      />
      <meta name="twitter:image" content={image} />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:type" content="website" />
      <meta name="twitter:site" content="@tryveloz" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@tryveloz" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />

      {/* Apple Touch Icon */}
      <meta name="apple-mobile-web-app-title" content="Veloz" />

      {/* Microsoft Tiles */}
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="application-name" content="Veloz" />
      <meta name="msapplication-TileImage" content="/images/logo/logo.png" />
      {/* <meta name="msapplication-config" content="/browserconfig.xml" /> */}
    </>
  );
}

export default Seo;
