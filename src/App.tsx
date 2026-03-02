import { Provider } from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { Component } from "./Component";

const App = () => (
  <Provider
    styles={style({
      padding: 80,
    })}
  >
    <Component />
  </Provider>
);

export default App;
