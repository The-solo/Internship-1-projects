import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Blogs }  from "./pages/Blogs";
import { Landing } from "./pages/landing";
import { BlogPage } from "./pages/Blog";
import { Publish } from "./pages/publish";
import { ProfilePage } from "./pages/Profile";



function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path={`/blogs/:id`} element={<BlogPage/>}/>
        <Route path="/publish" element={<Publish/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
