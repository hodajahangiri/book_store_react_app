import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";
import EditAddresses from "./pages/EditAddresses/EditAddresses";
import EditPayments from "./pages/EditPayments/EditPayments";
import Favorites from "./pages/Favorites/Favorites";
import BookDetails from "./pages/BookDetails/BookDetails";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Privacy from "./pages/Privacy/Privacy";
import Terms from "./pages/Terms/Terms";
import NotFound from "./pages/NotFound/NotFound";
import { useTheme } from "./contexts/ThemeContext";
import { useState } from "react";

function App() {

  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "darkMode" : "lightMode"}`}>
      <Header className="basis-1/3" />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home loading={loading} setLoading={setLoading}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/update" element={<UpdateProfile />} />
          <Route path="/user/addresses" element={<EditAddresses />} />
          <Route path="/user/payments" element={<EditPayments />} />
          <Route path="/user/favorites" element={<Favorites />} />
          <Route path="/book/details" element={<BookDetails />} />
          <Route path="/cart" element={<Cart loading={loading} setLoading={setLoading}/>} />
          <Route path="/checkout" element={<Checkout loading={loading} setLoading={setLoading}/>}/>
          <Route path="/orders" element={<Orders />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer className="basis-1/3" />
    </div>
  )
}

export default App
