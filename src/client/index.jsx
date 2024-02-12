import React from "react";

import { App } from "./foundation/App";

const root = document.getElementById("root");
import("react-dom").then((ReactDOM) => {
  ReactDOM.render(<App />, root);
});
