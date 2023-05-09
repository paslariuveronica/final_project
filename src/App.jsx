import { Auth, UserProfile } from "./features";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./features/Auth/AuthContext";
import { BlogList } from "./features";
import { DeletePost } from "./features/Blogs/DelelePost";
import { SinglePost } from "./features/Blogs/SinglePost";
import { EditPost } from "./features/Blogs/EditPost";
import { About } from "./features";
import { Create } from "./features/Blogs/Create";
import { Bottom, Nav } from "./components";
import { Photo } from "./features/Blogs/Photo";
import { UpdateProfile } from "./features/Auth/UpdateProfile";


export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/create" element={<Create />} />
          <Route path="/about" element={<About />} />
          <Route path="/photo" element={<Photo />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/user/:user/update" element={<UpdateProfile />} />
          <Route path="/posts/:postId" element={<SinglePost />} />
          <Route path="/posts/:postId/edit" element={<EditPost />} />
          <Route path="/posts/:postId/delete" element={<DeletePost />} />
        </Routes>
      </AuthContextProvider>
      <Bottom />
    </BrowserRouter>
    
  );
}
