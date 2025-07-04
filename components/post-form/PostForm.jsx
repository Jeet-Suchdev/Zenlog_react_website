import React, { useState, useCallback, useEffect } from "react";
import appwriteService from "../../src/appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const getFormattedDate = () => {
    const now = new Date();
    return now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const submit = async (data) => {
    // Content length check
    if (data.content && data.content.length > 5000) {
      alert('Content is too large. Please reduce the length to under 5000 characters before submitting or updating your post.');
      return;
    }

    let file = null;

    if (data.image && data.image.length > 0) {
      file = await appwriteService.uploadFile(data.image[0]);
      if (file && file.$id) {
        data.featuredImage = file.$id;
      }
    }

    if (post) {
      if (file) {
        await appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : post.featuredImage,
        date: getFormattedDate(),
      });

      if (dbPost && dbPost.$id) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      // Always try to create a post, even if no image
      const postData = {
        title: data.title,
        slug: data.slug,
        content: data.content,
        status: data.status,
        userid: userData?.$id,
        author: userData?.name,
        date: getFormattedDate(),
      };
      if (data.featuredImage) {
        postData.featuredimage = data.featuredImage;
      }
      const dbPost = await appwriteService.createPost(postData);

      if (dbPost && dbPost.$id) {
        navigate(`/post/${dbPost.$id}`);
      } else {
        alert("Failed to create post. Please try again.");
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col md:flex-row gap-8 bg-[#31363F] text-[#EEEEEE] rounded-2xl shadow-md p-6 md:p-10 font-sans w-full max-w-7xl mx-auto transition-all duration-300 ease-in-out"
      encType="multipart/form-data"
    >
      <div className="flex-1 flex flex-col gap-6 justify-between min-w-0">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-2"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-full md:w-1/3 flex flex-col gap-4">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image")}
        />
        {post && (
          <div className="w-full mb-4 flex items-center justify-center">
            { (post.featuredimage || post.featuredImage) && (
              <img
                src={appwriteService.getFilePreview(post.featuredimage || post.featuredImage)}
                alt={post.title}
                className="w-full h-40 object-cover rounded-xl shadow max-w-full"
              />
            )}
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
