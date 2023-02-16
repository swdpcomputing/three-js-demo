import Head from "next/head";

const PageHead = () => (
  <Head>
    <meta charSet="utf-8" />
    <title>Interactive 3d demo site for Three.js meshes and materials</title>
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link
      rel="icon"
      type="image/png"
      sizes="192x192"
      href="/android-chrome-192x192.png"
    />
    <link rel="canonical" href="https://threejstexturedemo.co.uk/" />
    <link rel="alternate" hrefLang="en-uk" href="https://threejstexturedemo.co.uk/"></link>
    <meta name="author" content="Stephen Powell" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no"
    />
    <meta
      name="description"
      content="This site demos three.js geometries and materials in a 3d environment"
    />
    <meta
      name="keywords"
      content="three, three.js, meshes, geometries, materials, textures"
      key="keywords"
    />
    <meta name="robots" content="index, follow"></meta>
  </Head>
);

export default PageHead;
