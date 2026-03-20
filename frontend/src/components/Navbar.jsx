import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-4 shadow-md 
                        bg-white dark:bg-gray-900 transition-all duration-300">
            
            <h1 className="text-xl font-bold text-blue-500">
                AuthApp 🚀
            </h1>

            <div className="flex gap-4 items-center">
                <Link to="/login">Login</Link>
                <Link to="/">Register</Link>
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default Navbar;
