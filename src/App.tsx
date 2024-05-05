import { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ROUTES } from "./utils/router";
import 'react-loading-skeleton/dist/skeleton.css'

function App() {
  return (
    <div id="app">
      <Suspense>
        <Router>
          <Routes>
            {ROUTES.map((route: any, index: number) => (
              <Route
                key={index}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
