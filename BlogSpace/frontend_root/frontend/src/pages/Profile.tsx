import { useState, useEffect } from "react";
import { ProfileComponent } from "../components/profileComponent";
import { BlogComponent } from "../components/blogComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Loading } from "../components/skelaton";

//Types according to backend response.
interface Profile {
    profile: {
        name: string;
        email: string;
    };
    Blogs: {
        id: string;
        title: string;
        content: string;

    }[]; //response is an array of blog post each having the above properties.
}

export const ProfilePage = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<Profile | null>();

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/user/profile`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            setProfile(response.data); 
            navigate("/profile");

        } catch (error) {
            console.error("Failed to fetch profile", error);
            navigate("/signin");
        }
    };


    useEffect(() => {

        fetchProfile();
    }, []);


    if (!profile) {
        return <div>
            {Loading()}
        </div>
    }

    if(profile.Blogs.length === 0) {
        return <div>
        </div>
    }

    return (
        <div className="flex flex-col-1">
                <div className="">
                    <ProfileComponent
                        name={profile.profile.name}
                        email={profile.profile.email}
                    />
                </div>
                <div className="flex flex-col py-20 px-20">
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
