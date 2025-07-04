import React from "react";
import { Container, PostForm } from "../../components";

function AddPost() {
  return (
    <div className="py-8 bg-[#222831] text-[#EEEEEE] min-h-screen font-sans flex items-center justify-center px-2">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
