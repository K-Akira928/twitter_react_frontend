import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { Signup } from "./components/pages/Signup";
import { Root } from "./components/pages/Root";

function App() {
  const location = useLocation();
  const backgroundLocation =
    location.state && location.state.backgroundLocation;

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path={`/`} element={<Root />} />
        <Route path={`/sign_up`} element={<Signup />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/sign_up" element={<Signup />} />
        </Routes>
      )}
    </>
  );
}

export default App;
