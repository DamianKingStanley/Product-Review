import React, { useContext } from "react";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import AdminRegister from "./pages/SignIn/AdminRegister";
import AdminLogIn from "./pages/LogIn/AdminLogin";
import LogIn from "./pages/LogIn/LogIn";
import CreatePost from "./pages/CreatePost/CreatePost";
import PostDetails from "./pages/PostDetails/PostDetails";
import CartComponent from "./pages/CartComponent/Cartcomponent";
import BooksPage from "./pages/BooksPage/BooksPage";
import UserProfile from "./pages/UserProfile/UserProfile";
import ForgetPassword from "./pages/PasswordReset/ForgetPassword";
import ResetPassword from "./pages/PasswordReset/ResetPassword";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import { ThemeProvider, ThemeContext } from "./ThemeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppContent = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/as-admin-register" element={<AdminRegister />} />
          <Route exact path="/register" element={<SignIn />} />
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/as-admin-login" element={<AdminLogIn />} />

          <Route exact path="/share-review" element={<CreatePost />} />
          <Route exact path="/post/:postId" element={<PostDetails />} />
          <Route exact path="/user/profile/:userId" element={<UserProfile />} />
          <Route exact path="/cart" element={<CartComponent />} />
          <Route exact path="/:category/:type" element={<BooksPage />} />
          <Route exact path="/staffspanel" element={<AdminPanel />} />

          <Route exact path="/forgot-password" element={<ForgetPassword />} />
          <Route
            exact
            path="/reset-password/:token"
            element={<ResetPassword />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
