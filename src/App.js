import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { Signup } from "./components/pages/Signup";
import { Root } from "./components/pages/Root";
import { Signin } from "./components/pages/Signin";
import { Home } from "./components/pages/Home";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { loginState } from "./store/loginState";
import { getCurrentUser } from "./apis/auth";
import { Post } from "./components/pages/Post";
import { Photo } from "./components/pages/Photo";
import { ShowTweet } from "./components/pages/ShowTweet";
import { Profile } from "./components/pages/Profile";
import { EditProfile } from "./components/pages/EditProfile";
import { currentUserState } from "./store/currentUser";

function App() {
  const location = useLocation();

  const navigate = useNavigate();

  const setLogin = useSetRecoilState(loginState);

  const setCurrentUser = useSetRecoilState(currentUserState);

  const backgroundLocation =
    location.state && location.state.backgroundLocation;

  const handleRequireLogin = async () => {
    const res = await getCurrentUser();
    if (res.status) {
      setLogin(true);
      setCurrentUser(res.currentUser);
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
        <Route path="/tweets/:id" element={<ShowTweet />} />
        <Route path="/:name" element={<Profile />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/sign_up" element={<Signup />} />
          <Route path="/sign_in" element={<Signin />} />
          <Route path="/post" element={<Post />} />
          <Route path="/photo/:id" element={<Photo />} />
          <Route path="/settings/*">
            <Route path="profile" element={<EditProfile />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
