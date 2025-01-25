import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import AlertDialogSlide from "./Modal";
import axios from "axios";
import { toast } from 'react-toastify';
interface ModalBlogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
  setBlogId?: React.Dispatch<React.SetStateAction<string>>;
}

const ModalBlog = ({ open, setOpen, id, setBlogId }: ModalBlogProps) => {
  const [content, setContent] = useState("");
  const [value, setValue] = useState<{ value: string; label: string }[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  // Handle Add/Edit Blog
  const handleAddBlog = async () => {
    try {
      const payload = { title, content, tags };
      const url = id
        ? `http://localhost:3000/blogs/${id}`
        : "http://localhost:3000/blogs";
      const method = id ? "put" : "post";

      await axios[method](url, payload, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      setOpen(false);
      setTitle("");
      setContent("");
      setTags([]);
      setValue([]);
      setBlogId && setBlogId("");
      toast.success(id ? "Blog updated successfully" : "Blog added successfully");

    } catch (error) {
      console.error("Error while adding/editing the blog:", error);
    }
  };

  const handleChange = (selectedOptions: any) => {
    const allValues = selectedOptions
      ? selectedOptions.map((opt: { value: string; label: string }) => opt.value)
      : [];
    setValue(selectedOptions || []);
    setTags(allValues);
  };

  const handleSingle = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/blogs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const blog = response.data.blog;
      setTitle(blog.title);
      setContent(blog.content);
      const formattedTags = blog.tags.map((tag: string) => ({
        value: tag,
        label: tag,
      }));
      setValue(formattedTags);
      setTags(blog.tags);

    } catch (error) {
      console.error("Error while fetching the blog:", error);
    }
  };

  useEffect(() => {
    if (id && open) {
      handleSingle();
    }
  }, [id, open]);

  return (
    <AlertDialogSlide
      headerTitle={id ? "Edit Blog" : "Add Blog"}
      open={open}
      setOpen={(e: boolean) => {
        setOpen(e);
        setBlogId && setBlogId("");
        setContent("");
        setTitle("");
        setTags([]);
        setValue([]);
      }}
    >
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-bold text-black"
        >
          Your Blog
        </label>
        <div className="flex flex-col gap-5">
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-80 p-2.5"
            placeholder="Title"
            required
          />
          <textarea
            name="content"
            id="content"
            className="bg-gray-50 border h-52 resize-none border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-80 p-2.5"
            placeholder="Start typing here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <CreatableSelect
            options={value}
            isMulti
            value={value}
            onChange={handleChange}
            className="w-80 rounded-lg"
            placeholder="Add or select tags"
          />
        </div>
      </div>
      <button
        onClick={handleAddBlog}
        className="mt-4 float-right text-white bg-black hover:bg-black active:scale-95 focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        {id ? "Edit Blog" : "Add Blog"}
      </button>
    </AlertDialogSlide>
  );
};

export default ModalBlog;
