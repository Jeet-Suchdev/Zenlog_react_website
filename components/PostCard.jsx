import React from "react";
import appwriteService from "../src/appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredimage, content, author, date }) {
  const getPreview = (html, maxLength = 120) => {
    if (!html) return "";
    const text = html.replace(/<[^>]+>/g, "");
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="bg-[#31363F] rounded-3xl shadow-2xl hover:shadow-3xltransition-shadow duration-300 w-full max-w-[480px] mx-auto flex flex-col transform hover:scale-105 border-2 border-transparent hover:border-[#76ABAE] hover:border-opacity-80 hover:shadow-[0_0_16px_4px_#76ABAE55]">
      <div className="w-full relative" style={{ paddingBottom: "56.25%" }}>
        {featuredimage ? (
          <img
            src={appwriteService.getFilePreview(featuredimage)}
            alt={title}
            className="absolute top-0 left-0 w-full h-full object-cover object-center rounded-t-3xl"
            loading="lazy"
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-[#76ABAE] text-3xl font-bold opacity-60 bg-[#222831] rounded-t-3xl">
            No Image
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col px-8 py-6 gap-3">
        <h2
          className="text-2xl font-extrabold font-sans text-[#EEEEEE] truncate"
          title={title}
        >
          {title}
        </h2>
        {content && (
          <p className="text-[#EEEEEE] text-base font-sans opacity-80 line-clamp-2 min-h-[2.5em]">
            {getPreview(content)}
          </p>
        )}
        {author && (
          <p className="text-[#76ABAE] text-sm font-sans mt-2">By: {author}</p>
        )}
        {date && (
          <p className="text-[#EEEEEE] text-xs font-sans opacity-60 mt-1">
            {date}
          </p>
        )}
      </div>
      <div className="px-8 pb-8">
        <Link to={`/post/${$id}`}>
          <button className="w-full px-6 py-3 rounded-xl font-sans font-bold text-xl bg-[#76ABAE] text-[#222831] hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#76ABAE] transition-all duration-300 ease-in-out">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
