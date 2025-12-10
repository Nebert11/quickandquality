import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TrackShipment from "./pages/TrackShipment";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Dashboard from "./pages/admin/Dashboard";
import AdminShipments from "./pages/admin/AdminShipments";
// import AdminServices from "./pages/admin/AdminServices";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import About from "./pages/About";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <main className="container px-4 mx-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/track" element={<TrackShipment />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/admin/shipments" element={<ProtectedRoute><AdminShipments /></ProtectedRoute>} />
                        {/* <Route path="/admin/services" element={<ProtectedRoute><AdminServices /></ProtectedRoute>} /> */}
                        <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
                        <Route path="/about" element={<About />} />
                        <Route path="/admin/contacts" element={<ProtectedRoute><AdminContacts /></ProtectedRoute>} />
                        <Route path="/admin/testimonials" element={<ProtectedRoute><AdminTestimonials /></ProtectedRoute>} />
                    </Routes>
                </main>
                <Footer />
            </Router>
        </AuthProvider>
    )
}

export default App;