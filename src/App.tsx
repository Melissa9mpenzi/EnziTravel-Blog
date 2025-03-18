import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import BlogDetail from "./pages/BlogDetail";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-beige-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8 font-sans">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/edit/:id" element={<EditBlog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
