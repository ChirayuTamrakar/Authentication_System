import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
    const { dark, setDark } = useContext(ThemeContext);

    return (
        <button
            onClick={() => setDark(!dark)}
            className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 transition-all duration-300"
        >
            {dark ? "🌙 Dark" : "☀️ Light"}
        </button>
    );
};

export default ThemeToggle;