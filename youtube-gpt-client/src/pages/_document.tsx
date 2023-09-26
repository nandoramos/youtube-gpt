import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body style={{ backgroundColor: '#5893CE' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
