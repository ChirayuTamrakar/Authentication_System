import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const { data } = await axios.post("https://authentication-system-backend-wpt9.onrender.com/api/auth/login", form);
            localStorage.setItem("accessToken", data.accessToken);
            navigate("/profile");
        } catch(err){
            console.log("Error-->", err);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen 
                        bg-gradient-to-br from-blue-500 to-purple-600
                        dark:from-gray-900 dark:to-gray-800 transition-all">

            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl w-96 space-y-4 transition-all"
            >
                <h2 className="text-2xl font-bold text-center">Login User</h2>
                

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
                    className="w-full bg-blue-500 text-white py-2 rounded-lg
                               hover:scale-105 transition-transform"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
