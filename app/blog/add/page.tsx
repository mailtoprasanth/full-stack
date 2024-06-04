"use client"
import SideBar from "@/app/sidebar/SideBar";
import React, { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IPost } from "../../post";

type Props = {};

const postBlog = async ({ title, description }: {title:String, description: String}) => {
  const res = await fetch("http://localhost:3000/api/blog", {
    method: "POST",
    body: JSON.stringify({ title, description }),
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};

const Blog = (props: Props) => {
  const title = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.current && descriptionRef.current) {
      toast.loading("sending request...📩",{id: "1"});
      await postBlog({
        title: title.current?.value,
        description: descriptionRef.current?.value,
      });
      toast.success("sending success",{id: "1"});
      title.current.value = "";
      descriptionRef.current.value = "";
    }
  };
  return (
    <div className="flex flex-col">
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-4 rounded-lg bg-slate-700 drop-shadow-xl">
        <h1 className="text-slate-200 text-center text-2x font-extrabold font-[verdana]">
          Add a blog
        </h1>
      </div>
      <div className="flex flex-row">
        <div className="md:w-1/6 sm-2/4">
          <SideBar />
        </div>
        <div className="w-full flex flex-row flex-wrap justify-center items-center">
          <Toaster />
          <div className="w-full m-auto flex my-4">
            <div className="flex flex-col md:w-3/6 m-auto">
              <form
                className="flex flex-col"
                onSubmit={(e) => submitHandler(e)}
              >
                <input
                  type="text"
                  placeholder="Title"
                  id="title"
                  name="title"
                  ref={title}
                  className="rounded-md px-4 py-2 my-2 "
                />

                <textarea
                  name=""
                  ref={descriptionRef}
                  placeholder="Description"
                  id=""
                  className="rounded-md px-4 py-2 w-full my-2 "
                ></textarea>
                <button
                  className="font-semibold px-4 py-2 shadow-xl bg-yellow-600 rounded-md text-center"
                  type="submit"
                >
                  {" "}
                  Submit{" "}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
