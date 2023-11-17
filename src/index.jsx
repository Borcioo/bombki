import ReactDOM from "react-dom/client";
import App from "./App";
import { Loader } from "./components/Loader";
import { Suspense } from "react";
import "./index.css";
import { store } from "./store/store";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root");
const lang = rootElement.getAttribute("data-lang");

ReactDOM.createRoot(rootElement).render(
  <Provider store={store}>
    <Suspense fallback={<Loader />}>
      <App lang={lang} />
    </Suspense>
  </Provider>
);
