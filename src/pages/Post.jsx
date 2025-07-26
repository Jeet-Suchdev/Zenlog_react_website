import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import { Container, Button } from "../../components";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [backLoading, setBackLoading] = useState(false);

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userid === userData.$id : false;

  useEffect(() => {
    if (slug) {
      setLoading(true);
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
        setLoading(false);
      });
    } else navigate("/");
  }, [slug, navigate]);

  // Scroll to top when post loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredimage);
        navigate("/");
      }
    });
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#222831] text-[#76ABAE] font-sans">
        <h2 className="text-2xl md:text-3xl font-bold">Loading...</h2>
      </div>
    );
  }
  if (!post) {
    return null;
  }

  if (backLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center text-center bg-[#222831] text-[#76ABAE] font-sans px-2">
        <h2 className="text-2xl md:text-3xl font-bold font-sans mt-48">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="py-8 bg-[#222831] text-[#EEEEEE] min-h-screen font-sans px-6 flex items-center justify-center">
      <Container>
        {/* Back Arrow Button - always above the card, not inside */}
        <div className="w-full max-w-6xl mx-auto flex items-start">
          <button
            onClick={() => {
              setBackLoading(true);
              if (window.innerWidth < 768) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => navigate(-1), 500);
              } else {
                setTimeout(() => navigate(-1), 300);
              }
            }}
            className="flex items-center gap-2 text-[#76ABAE] bg-[#222831cc] hover:bg-[#76ABAE22] hover:text-[#EEEEEE] font-semibold mt-4 mb-2 ml-2 md:ml-4 focus:outline-none rounded-full px-3 py-2 shadow transition-all duration-200 z-20 group"
            aria-label="Go back"
            style={{ position: 'relative' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 md:w-7 md:h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span className="inline">Back</span>
          </button>
        </div>
        <div
          className={`w-full max-w-6xl mx-auto rounded-2xl bg-[#31363F] shadow-lg flex flex-col md:flex-row p-0 overflow-hidden relative
            md:bg-[#31363F] md:shadow-2xl md:animate-fadeIn md:transition-all md:duration-500
            ${!post.featuredimage ? 'justify-center items-center min-h-[320px]' : ''}`}
        >
          {post.featuredimage ? (
            <div className="w-full p-4 md:w-[45%] md:flex md:items-center md:justify-center md:p-8">
              <div className="w-full rounded-xl overflow-hidden bg-[#222831] shadow-md border border-[#76ABAE33] md:max-w-[90%] md:rounded-2xl md:shadow-lg md:border md:border-[#76ABAE55] md:shadow-[0_4px_32px_0_#76ABAE33]">
                <img
                  src={appwriteService.getFilePreview(post.featuredimage)}
                  alt={post.title}
                  className="w-full h-auto object-contain rounded-xl shadow transition-transform duration-300 md:rounded-2xl md:hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          ) : null}
          {/* Vertical divider for md+ */}
          <div className="hidden md:block w-px bg-gradient-to-b from-[#76ABAE33] to-transparent my-12"></div>
          <div className={`flex flex-col justify-center w-full ${post.featuredimage ? 'p-4 pt-6' : 'items-center text-center p-6 pt-10'} ${post.featuredimage ? 'md:w-[55%]' : ''}`}
            style={{ minWidth: 0 }}>
            <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-[#76ABAE] mb-4 break-words drop-shadow-sm md:mb-8 md:drop-shadow-lg leading-tight">{post.title}</h1>
            {/* Meta badge row */}
            <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-7 text-sm md:text-base">
              <span className="px-3 py-1 rounded-full bg-[#76ABAE22] text-[#76ABAE] font-medium">By: {post.author || 'Unknown'}</span>
              {post.date && (
                <span className="px-3 py-1 rounded-full bg-[#31363F] text-[#EEEEEE] opacity-80 font-normal border border-[#76ABAE33]">{post.date}</span>
              )}
            </div>
            <div className="browser-css mb-4 w-full text-base md:text-lg leading-relaxed md:leading-relaxed" style={{fontFamily: 'Inter, Arial, Helvetica, sans-serif'}}>{parse(post.content)}</div>
            <div className={`mt-auto flex flex-col gap-3 w-full ${post.featuredimage ? '' : 'items-center'} md:gap-4`}>
              {isAuthor && (
                <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full items-center justify-center md:gap-4 md:mt-6">
                  <Link to={`/edit-post/${post.$id}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    <Button bgColor="bg-[#76ABAE]" textColor="text-[#222831]" className="mr-2 px-8 py-3 text-lg shadow-md active:scale-95 transition-transform md:text-xl md:shadow-lg md:hover:scale-105">Update</Button>
                  </Link>
                  <Button bgColor="bg-red-700" textColor="text-[#EEEEEE]" onClick={deletePost} className="px-8 py-3 text-lg shadow-md active:scale-95 transition-transform md:text-xl md:shadow-lg md:hover:scale-105">Delete</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
