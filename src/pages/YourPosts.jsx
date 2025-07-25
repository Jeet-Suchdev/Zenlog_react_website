import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function YourPosts() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      } else {
        setPosts([]);
      }
      setLoading(false);
    });
  }, [authStatus]);

  const userPosts = userData
    ? posts.filter((post) => post.userid === userData.$id)
    : [];

  if (loading) {
    return (
      <div className="w-full min-h-screen flex justify-center text-center bg-[#222831] text-[#76ABAE] font-sans px-2">
        <h2 className="text-2xl md:text-3xl font-bold font-sans mt-48">
          Loading posts...
        </h2>
      </div>
    );
  }

  if (userPosts.length === 0) {
    return (
      <div className="w-full min-h-screen flex justify-center text-center bg-[#222831] text-[#EEEEEE] font-sans px-2">
        <div className="w-full max-w-4xl mx-auto mt-48">
          <div className="flex flex-wrap">
            <div className="w-full">
              {authStatus ? (
                <>
                  <h2 className="text-2xl md:text-3xl font-bold font-sans text-center mb-8 mt-2 md:mt-4 text-[#76ABAE]">
                    Your Posts
                  </h2>
                  <h1 className="text-2xl md:text-3xl font-bold font-sans text-center mb-8 text-[#EEEEEE]">
                    No posts to display
                  </h1>
                  <div className="flex flex-col items-center gap-4 w-full">
                    <Link to="/add-post" className="w-full flex justify-center">
                      <button className="px-6 py-3 rounded-xl font-bold text-lg bg-[#76ABAE] text-[#222831] hover:bg-[#5e8e90] transition-colors duration-200 w-48">
                        Add Post
                      </button>
                    </Link>
                    <span className="text-base font-medium text-[#76ABAE] my-2">
                      or
                    </span>
                    <Link
                      to="/all-posts"
                      className="w-full flex justify-center"
                    >
                      <button className="px-6 py-3 rounded-xl font-bold text-lg bg-transparent text-[#76ABAE] border border-[#76ABAE] hover:bg-[#393e46] transition-colors duration-200 w-48">
                        View All Posts
                      </button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-2xl md:text-3xl font-bold font-sans hover:text-[#76ABAE] mb-6">
                    Login to Add posts
                  </h1>
                  <Link to="/login">
                    <button className="px-6 py-3 rounded-xl font-bold text-lg bg-[#76ABAE] text-[#222831] hover:bg-[#5e8e90] transition-colors duration-200">
                      Login
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8 bg-[#222831] text-[#EEEEEE] min-h-screen font-sans">
      <div className="px-4 md:px-8 lg:px-0">
        <div className="w-full">
          <h2 className="text-2xl md:text-3xl font-bold font-sans text-center mb-8 text-[#76ABAE]">
            Your Posts
          </h2>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-12 px-4 md:px-8 lg:px-8 w-full">
            {userPosts.map((post) => (
              <div
                key={post.$id}
                className="w-full max-w-[480px] flex-grow flex-shrink basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <PostCard
                  {...post}
                  content={post.content}
                  author={post.author}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourPosts;
