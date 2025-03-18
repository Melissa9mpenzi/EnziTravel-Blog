import React from "react";
import { Link } from "react-router-dom";
import { PenSquare } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-beige-100 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="EnziTravel Logo"
              className="h-8 w-8 mr-2"
            />
            <span className="text-2xl font-bold text-pink-600">EnziTravel</span>
          </Link>

          <Link
            to="/create"
            className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <PenSquare size={20} />
            <span>Create Post</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
