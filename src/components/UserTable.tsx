import { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import ModalBlog from "./ModalBlog";
import { toast } from "react-toastify";

interface blogData {
  _id: number;
  content: string;
  title: string;
  tags: string[];
  userId: {
    _id: string;
  };

}
const UserTable = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState("");
  const [blogsData, setBlogsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  const handleModal = (id?: string) => {
    setOpen(true);
    if (id) return setBlogId(id);
  };
  const getBlog = async () => {
    setLoading(true);
    const response = await axios.get(`http://localhost:3000/blogs`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    setBlogsData(response?.data?.blogs);
    setLoading(false);
  }
  useEffect(() => {
    getBlog();
  }, [open]);
  const handleDelete = async (id: string) => {
    const response = await axios.delete(`http://localhost:3000/blogs/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    toast.success("Blog deleted successfully!");
    if (response) return getBlog();

  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>

    );

  }
  return (
    <div className=" overflow-x-auto m-4 md:m-10 sm:m-7 ">
      <div className="flex items-end flex-col  flex-wrap md:flex-nowrap space-y-4 md:space-y-0  pb-4">
        <div
          onClick={() => handleModal()}
          className="text-lg px-5 py-2 !rounded-lg font-semibold cursor-pointer  border border-white text-white bg-black active:scale-[0.97]"
        >
          Add Blog
        </div>
      </div>
      <div className=" flex items-center ">
        <div className=" w-full py-4">
          <div className="md:columns-3 sm:columns-2 columns-1 gap-4">
            {blogsData?.map((blog: blogData, index: number) => {
              return (
                <div
                  key={index}
                  className=
                  {`mb-4 break-inside-avoid p-4 border group bg-white rounded-lg shadow-md hover:scale-[0.97] transition-transform duration-300 ease-in-out gap-4  ${blog?.userId._id == user.id ? "border-gray-400" : ""}`}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{blog?.title}</h2>
                    {
                      blog?.userId._id == user.id &&
                      <div className="flex gap-2 transition duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                        <MdModeEdit
                          className="cursor-pointer active:scale-95"
                          size={20}
                          onClick={() => handleModal(String(blog?._id))}
                        />
                        <MdDelete
                          size={20}
                          className="cursor-pointer active:scale-95 "
                          onClick={() => handleDelete(String(blog?._id))}
                        />
                      </div>
                    }
                  </div>
                  <p className="text-gray-600 text-sm break-words">{blog?.content}</p>
                  <div className="flex gap-2 mt-2">
                    {blog?.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block bg-green-100 text-green-800 border border-green-800 text-xs px-2 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          {blogsData?.length === 0 && (
            <div className="flex items-center justify-center h-44">
              <h1 className="text-2xl font-semibold text-black">No Blogs Found</h1>
            </div>

          )}
        </div>
      </div>
      <ModalBlog
        id={blogId}
        setBlogId={setBlogId}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default UserTable;
