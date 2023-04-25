import React, { useState } from "react";
import { createPost, deletePost, getPosts, updatePost } from "../../api/Post";
import { useHistory } from 'react-router-dom';
import EditPost from "./edit";
import { Loader } from "../Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery, useMutation, useQueryClient } from "react-query";

const Post = () => {

  // const [posts, setPosts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient()


  const {isLoading, data: posts } = useQuery(["posts"], getPosts);

  const mutationDelete = useMutation(deletePost, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["posts"])
    },
  })

  const mutationUpdate = useMutation(updatePost, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["posts"])
    },
  });

  const mutationCreate = useMutation(createPost, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["posts"])
    },
  })


  const history = useHistory();

  const createOrEditPost =  (id) => {
    setIsCreating(false);
    setEditId(id)
  };
  const onClose = () => {
    setIsCreating(false);
    setEditId(null);
  }
  
  const showToastMsg = (title) => {
    toast.success(`🦄 ${title}`, {
      position: "bottom-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  const onDelete =  async (id) => {
    try {
      mutationDelete.mutate(id)
      showToastMsg("Deleted!")
    } catch (error) {
      console.log("Error on Delete: ", error);
    } finally {
    }
  };

  const onUpdate = async (id, post) => {
    try {
      debugger
      if (id) {
        mutationUpdate.mutate({id, ...post})
        onClose();
        showToastMsg("updated!")
      } else {
        mutationCreate.mutate(post);
        onClose();
        showToastMsg('🦄 Created!');
      }
    } catch (error) {
      console.log("Error updating post: ", error);
      toast.error('Unable to update!', {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } finally {
    }
  }

  return (
    <div className="container p-4">
      <div className="flex flex-col">
        <div className="p-4 text-right">
          <input
            type="button" className="p-2 font-medium rounded-md bg-white text-slate-700"
            onClick={() => {
              setIsCreating(true);
              setEditId(null)
            }
          }  value="Create New" />
        </div>
        {editId && <EditPost  id={editId} onClose={onClose} onUpdate={onUpdate}/>}
        {isCreating && <EditPost onClose={onClose} onUpdate={onUpdate}/>}
        {isLoading ? (<Loader />): (
          posts && posts.map(post => (
            <div key={post._id} className="relative shadow-lg bg-slate-600 h-[150px] my-4 rounded-md flex flex-col justify-start border-2">
              <div className="text-2xl font-bold text-center py-2 text-white">{post.title}</div>
              <div className="text-md opacity-80 px-4 py-1 text-white">{post.description}</div>
              <div className="flex w-full flex-row gap-2 py-2 px-6 rounded justify-between absolute bottom-0 bg-slate-500 text-white ">
                <div className="flex flex-row gap-4 text-sm">
                  <div>
                  👨‍💻 Author: {post.author}
                  </div>
                  <div>
                  👍 Likes: {post.likes}
                  </div>
                  <div>
                  👀 Views: {post.views}
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <div onClick={() => {
                    history.push(`/posts/${post._id}`)
                  }} className="rounded py-1 px-2 bg-white text-slate-600 text-sm pointer">View</div>
                  <div onClick={() => createOrEditPost(post._id)} className="rounded py-1 px-2 bg-white text-slate-600 text-sm">Edit</div>
                  <div className="rounded py-1 px-2 bg-white text-slate-600 text-sm" onClick={() => onDelete(post._id) }>Delete</div>
                </div>
              </div>
            </div>
          ))
        )}
        <ToastContainer
          position="bottom-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  )
}

export default Post;
