import { useEffect, useState } from "react";
import { getPosts } from "../communityapi";
import type { Post } from "../../types/communities";
import BottomNav from "../components/BottomNav";
import CommunityLoader from "../../components/ui/CommunityLoader";
import PostContainer from "../components/PostContainer";
import PostCard from "../components/PostCard";

export default function CommunityFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

const pinnedPosts = posts.filter(
  (p) => p.is_pinned
);

const normalPosts = posts.filter(
  (p) => !p.is_pinned
);

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
        < CommunityLoader  />
       );
   }

  return (
    <PostContainer>
     {pinnedPosts.length > 0 && (
  <div
    className="
    mb-6
    "
  >
    
   <div
  className="
  sticky
  top-0
  z-10
  mb-3
  "
>
 
</div>

    {pinnedPosts.map((post) => (
      <PostCard
        key={post.public_id}
        post={post}
      />
    ))}
  </div>
)}
{normalPosts.map((post) => (
  <PostCard
    key={post.public_id}
    post={post}
  />
))}

      <BottomNav />
    </PostContainer>
  );
}