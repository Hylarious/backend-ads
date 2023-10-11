import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadAdsRequest } from "./redux/adsRedux";
import MainLayout from "./components/views/MainLayout";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Ad from "./components/pages/Ad/Ad";
import AddAd from "./components/pages/AddAd/AddAd";
import EditAd from "./components/pages/EditAd/EditAd";
import DeleteAd from "./components/pages/DeleteAd/DeleteAd";
import NotFound from "./components/pages/NotFound/NotFound";
import SearchResults from "./components/pages/SearchResults/SearchResults";
import { API_URL } from "./config";
import { logIn } from "./redux/usersRedux";
import Logout from "./components/pages/Logout";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);

  const options = {
    method: "GET",
    credentials: "include",
  };

  fetch(`${API_URL}/auth/user`, options)
    .then((res) => {
      if (res.status === 200) {
        return res.json(); // Parse the JSON data and return it
      } else {
        throw new Error("Request failed");
      }
    })
    .then((data) => {
      dispatch(logIn({ login: data.login }));
    })
    .catch((e) => {
      console.log(e);
    });

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ad/:id" element={<Ad />} />
        <Route path="/ad/add" element={<AddAd />} />
        <Route path="/ad/edit/:id" element={<EditAd />} />
        <Route path="/ad/delete/:id" element={<DeleteAd />} />
        <Route path="/search/:searchPhrase" element={<SearchResults />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
