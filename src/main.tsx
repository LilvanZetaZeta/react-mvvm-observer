import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "../src/modules/todo/store/TodoStore";
import { Provider } from "react-redux";
import "./index.css";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);