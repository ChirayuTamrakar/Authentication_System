import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.post("https://authentication-system-backend-wpt9.onrender.com/api/auth/profile");
                setUser(data.user);
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
            </div>
        </div>
    );
};

export default Profile;
