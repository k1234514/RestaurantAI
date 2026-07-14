import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import MenuGenerator from "./pages/MenuGenerator";
import MenuTranslator from "./pages/MenuTranslator";
import FoodCostCalculator from "./pages/FoodCostCalculator";
import RestaurantName from "./pages/RestaurantName";
import RestaurantSlogan from "./pages/RestaurantSlogan";
import RecipeGenerator from "./pages/RecipeGenerator";
import MenuPriceSuggestion from "./pages/MenuPriceSuggestion";
import SocialMediaCaption from "./pages/SocialMediaCaption";
import ReviewReply from "./pages/ReviewReply";
import History from "./pages/History";
import InventoryPredictor from "./pages/InventoryPredictor";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/menu-generator"
          element={
            <ProtectedRoute>
              <MenuGenerator />
            </ProtectedRoute>
          }
        />

        <Route
          path="/menu-translator"
          element={
            <ProtectedRoute>
              <MenuTranslator />
            </ProtectedRoute>
          }
        />

        <Route
          path="/food-cost-calculator"
          element={
            <ProtectedRoute>
              <FoodCostCalculator />
            </ProtectedRoute>
          }
        />

        <Route
          path="/restaurant-name"
          element={
            <ProtectedRoute>
              <RestaurantName />
            </ProtectedRoute>
          }
        />

        <Route
          path="/restaurant-slogan"
          element={
            <ProtectedRoute>
              <RestaurantSlogan />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recipe-generator"
          element={
            <ProtectedRoute>
              <RecipeGenerator />
            </ProtectedRoute>
          }
        />

        <Route
          path="/menu-price"
          element={
            <ProtectedRoute>
              <MenuPriceSuggestion />
            </ProtectedRoute>
          }
        />

        <Route
          path="/social-caption"
          element={
            <ProtectedRoute>
              <SocialMediaCaption />
            </ProtectedRoute>
          }
        />

        <Route
          path="/review-reply"
          element={
            <ProtectedRoute>
              <ReviewReply />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory-predictor"
          element={
            <ProtectedRoute>
              <InventoryPredictor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        <Route
  path="/favorites"
  element={
    <ProtectedRoute>
      <Favorites />
    </ProtectedRoute>
  }
/>
      </Routes>
    </>
  );
}

export default App;