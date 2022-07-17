import "tailwindcss/tailwind.css";
import "../../styles/globals.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
