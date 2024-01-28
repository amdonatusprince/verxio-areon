"use client";
// import React from "react";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import store, { persistor } from "../../store";

// function ReduxProvider({ children }) {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={nul} persistor={persistor}>
//         {children}
//       </PersistGate>
//     </Provider>
//   );
// }

// export default ReduxProvider;

import { Provider } from "react-redux";
import store, { persistor } from "../../store";
import { PersistGate } from "redux-persist/integration/react";
// import { Providers } from "@/Redux/provider";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
