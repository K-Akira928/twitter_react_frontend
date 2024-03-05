import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { Signup } from "./components/pages/Signup";
import { Root } from "./components/pages/Root";
import { Signin } from "./components/pages/Signin";
import { Home } from "./components/pages/Home";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { loginState } from "./store/loginState";
import { getValidateToken } from "./apis/auth";
import { Post } from "./components/pages/Post";
import { Photo } from "./components/pages/Photo";
import { Tweets } from "./components/pages/Tweets";

function App() {
  const location = useLocation();

  const navigate = useNavigate();

  const setLogin = useSetRecoilState(loginState);

  const backgroundLocation =
    location.state && location.state.backgroundLocation;

  const handleRequireLogin = async () => {
    const res = await getValidateToken();
    if (res.status) {
      setLogin(true);
      navigate(location);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    handleRequireLogin();
  }, []);

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Root />} />
        <Route path="/sign_up" element={<Signup />} />
        <Route path="/sign_in" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tweets/:id" element={<Tweets />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/sign_up" element={<Signup />} />
          <Route path="/sign_in" element={<Signin />} />
          <Route path="/post" element={<Post />} />
          <Route path="/photo/:id" element={<Photo />} />
        </Routes>
      )}
    </>
  );
}

export default App;
