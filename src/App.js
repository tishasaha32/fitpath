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
import ProtectedRoute from "./common/ProtectedRoute";
import { useEffect, useState } from "react";
import { auth } from "./firebase/config";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false); // Set loading to false after checking auth state
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or placeholder content
  }

  return (
    <div className="App">
      <div className="desktop-message">Please check the app on mobile</div>
      <div className="app-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reels"
            element={
              <ProtectedRoute user={user}>
                <Reels />
              </ProtectedRoute>
            }
          />
          <Route
            path="/journal"
            element={
              <ProtectedRoute user={user}>
                <Journal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipes"
            element={
              <ProtectedRoute user={user}>
                <Recipes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addRecipe"
            element={
              <ProtectedRoute user={user}>
                <AddRecipe />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/:id"
            element={
              <ProtectedRoute user={user}>
                <CategoryWiseRecipes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipe/:id"
            element={
              <ProtectedRoute user={user}>
                <FullRecipeBody />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addBlog"
            element={
              <ProtectedRoute user={user}>
                <AddBlogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <ProtectedRoute user={user}>
                <FullBlogBody />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user}>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
