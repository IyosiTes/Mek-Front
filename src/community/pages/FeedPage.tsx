import { useEffect, useState } from "react";
import { getPosts } from "../communityapi";
import type { Post } from "../../types/communities";
import BottomNav from "../components/BottomNav";
import LoaderSpinner from "../../components/ui/LoadingSpinner";
import PostContainer from "../components/PostContainer";
import PostCard from "../components/PostCard";

export default function CommunityFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);



const loadPosts = () => {
  getPosts()
    .then((data) => setPosts(data))
    .finally(() => setLoading(false));
};
useEffect(() => {
  loadPosts();
}, []);

  if (loading) {
     return (
       <div className="min-h-screen flex justify-center items-center">
         <LoaderSpinner size={60} />
       </div>
     );
   }

  return (
    <PostContainer>
      {posts.map(post => (
        <PostCard key={post.public_id} post={post} />
      ))}

      <BottomNav />
    </PostContainer>
  );
}