import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setToken(localStorage.getItem("accessToken"));
                const { data } = await axios.get("https://authentication-system-backend-wpt9.onrender.com/api/auth/profile");
                setUser(data.user);
                console.log("data---->", data, "data.user---->", data.user);
            } catch (err) {
                console.error("Error--->", err);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="flex items-center justify-center h-screen 
                        bg-gray-100 dark:bg-gray-900 transition-all">

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl 
                            w-96 text-center space-y-4">

                <h1 className="text-2xl font-bold">Profile 👤</h1>

                {user ? (
                    <>
                        <p className="text-lg">Email: {user.email}</p>
                        <p className="text-gray-500 text-sm">
                            User ID: {user.id}
                        </p>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
                <h5 className="h-[170px] w-[370px] overflow-hidden "> Your Current Token: {token}</h5>
            </div>
        </div>
    );
};

export default Profile;
