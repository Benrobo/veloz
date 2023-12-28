import "../style/global.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <p className="text-red-100">WELCOME</p>
      <Component {...pageProps} />
    </>
  );
}
