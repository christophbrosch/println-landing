import { useEffect } from "react";

// Bootstrap imported from package
import "../styles/bootstrap.scss"
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  // https://www.kindacode.com/article/how-to-correctly-use-bootstrap-5-in-next-js/
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return <Component {...pageProps} />
}

export default MyApp
