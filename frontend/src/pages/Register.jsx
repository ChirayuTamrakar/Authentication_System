import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        await axios.post("http://localhost:5000/api/auth/register", form);            
        navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen 
                        bg-gradient-to-br from-purple-500 to-blue-500
                        dark:from-gray-900 dark:to-gray-800 transition-all">

            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl 
                           w-96 space-y-4 transition-all"
            >
                <h2 className="text-2xl font-bold text-center">Register</h2>

                <input
                    type="text"
                    placeholder="Name"
                    className="w-full p-2 rounded-lg border dark:bg-gray-800"
                    onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                    }
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 rounded-lg border dark:bg-gray-800"
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 rounded-lg border dark:bg-gray-800"
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />

                <button
                    className="w-full bg-purple-500 text-white py-2 rounded-lg
                               hover:scale-105 transition-transform"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;