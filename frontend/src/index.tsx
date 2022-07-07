import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./PublicApp"
import reportWebVitals from "./reportWebVitals"

import { AuthContextProvider } from "./utils/auth"
import { Apollo } from "./utils/apollo"

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Apollo>
        <App />
      </Apollo>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
