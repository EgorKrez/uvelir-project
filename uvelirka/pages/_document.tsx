import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head/>
      <body>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        {/*<script src="https://api-maps.yandex.ru/2.1/?apikey=e3fb1e56-6e1d-4123-919e-3c14742f6451&lang=ru_RU"*/}
        {/*        type="text/javascript"/>*/}
        <Main/>
        <NextScript/>
      </body>
    </Html>
  );
}
