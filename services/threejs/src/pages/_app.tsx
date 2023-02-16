import "./style.css";

interface IMyApp {
  Component: React.ElementType;
  pageProps: any;
}

function MyApp({ Component, pageProps }: IMyApp) {
  return <Component {...pageProps} />;
}

export default MyApp;
