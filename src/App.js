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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/addRecipe" element={<AddRecipe />} />
        <Route path="/categories/:id" element={<CategoryWiseRecipes />} />
        <Route path="/recipe/:id" element={<FullRecipeBody />} />
        <Route path="/addBlog" element={<AddBlogs />} />
        <Route path="/blogs/:id" element={<FullBlogBody />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
