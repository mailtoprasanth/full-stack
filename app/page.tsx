
import Link from "next/link";
import { IPost } from "./post";

async function fetchBlogs() {
  try {
    const res = await fetch("http://localhost:3000/api/blog", {
      next: {
        revalidate: 10,
      },
    });
    const data = await res.json();
    return data.posts;
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
}
export default async function Home() {
  const fetchData = await fetchBlogs();
  console.log(fetchData);
  
  return (
    <main className="w-full h-full">
   <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-4 rounded-lg bg-slate-700 drop-shadow-xl">
    <h1 className="text-slate-200 text-center text-2x font-extrabold font-[verdana]">Next app</h1>
   </div>
   <div className="flex flex-row">
   <div className="md:w-1/6 sm-2/4">
   <Link className="md:w-1/6 sm-2/4 text-center rounded-md p-2 bg-slate-300" href={"/blog/add"}>Add new Blog 🅱️</Link>
   </div>
   <div className="w-full flex flex-row flex-wrap justify-center items-center">
   {fetchData.length ? (
            fetchData.map((post: IPost,i:any) => (
              <div key={i} className="min-w-80 p-4 rounded-md mx-3 my-2 border-2 hover:border-orange-400 bg-slate-200 flex">
                <div className="flex flex-col justify-center">
                  <div className="mr-auto">
                    <div className="font-semibold">{post.title}</div>
                    <div className="font">{post.description}</div>
                    <div className="date">Date: { new Date(post?.date).toDateString()}</div>
                  </div>
                  <Link className="w-2/4 rounded-md mt-2 px-2 py-2 text-center text-md text-amber-700 bg-slate-800" href={`/blog/edit/${post.id}`}>Edit</Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-slate-200">No blogs available.</div>
          )}
    </div>
   </div>
    </main>
  );
}
