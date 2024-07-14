import "./App.css";
import { Routes, Route } from "react-router-dom";
import Reels from "./pages/Reels";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Recipes from "./pages/Recipes";
import AddRecipe from "./pages/AddRecipe";
import CategoryWiseRecipes from "./pages/CategoryWiseRecipes";
import FullRecipeBody from "./pages/FullBodyRecipe";
import Journal from "./pages/Journal";
import AddBlogs from "./pages/AddBlogs";
import FullBlogBody from "./pages/FullBlogBody";
import Profile from "./pages/Profile";
import { useGetUserData } from "./hooks/useGetUserDetails";
import ProtectedRoute from "./common/ProtectedRoute";

function App() {
  const userDetails = useGetUserData();
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={userDetails ? <Home /> : <Login />} />
        <Route
          path="/register"
          element={userDetails ? <Home /> : <Register />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reels"
          element={
            <ProtectedRoute>
              <Reels />
            </ProtectedRoute>
          }
        />
        <Route
          path="/journal"
          element={
            <ProtectedRoute>
              <Journal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipes"
          element={
            <ProtectedRoute>
              <Recipes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addRecipe"
          element={
            <ProtectedRoute>
              <AddRecipe />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories/:id"
          element={
            <ProtectedRoute>
              <CategoryWiseRecipes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipe/:id"
          element={
            <ProtectedRoute>
              <FullRecipeBody />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addBlog"
          element={
            <ProtectedRoute>
              <AddBlogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <ProtectedRoute>
              <FullBlogBody />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
