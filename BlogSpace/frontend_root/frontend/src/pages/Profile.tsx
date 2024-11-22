import { useState, useEffect } from "react";
import { ProfileComponent } from "../components/profileComponent";
import { BlogComponent } from "../components/blogComponent";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Loading from "../components/skelaton"

interface Profile {
    profile: {
        name: string;
        email: string;
    };
    Blogs: {
        id: string;
        title: string;
        content: string;
    }[];
}

export const ProfilePage = () => {

    const [profile, setProfile] = useState<Profile | null>(null);

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/user/profile`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            setProfile(response.data); 
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    if (!profile) {
        return Loading
    }

    return (
        <div className="flex flex-col-1">
            <ProfileComponent
                name={profile.profile.name}
                email={profile.profile.email}
            />
            <div className="flex flex-col py-20 px-20">
                <div className="flex text-6xl font-bold mb-5">
                    My Articles ...
                </div>
                {profile.Blogs.map((blog) => (
                    <BlogComponent
                        key={blog.id}
                        id={blog.id}
                        title={blog.title}
                        content={blog.content}
                        author={{ 
                            name: profile.profile.name
                        }}
                    />
                ))}
            </div>
        </div>  
    );
};
