import { useState } from "react";
import { createPost, getPost, updatePost } from "../../api/Post";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import _ from "lodash"

const EditPost = ({ id, onClose, onUpdate }) => {

  const [post, setPost] = useState({
    title: "",
    description: ""
  });
  const history = useHistory();
  const { isLoading, data } = useQuery(["posts", "edit", id], () => getPost(id))

  // const fetchPost = async () => {
  //   try {
  //     const post = await getPost(id);
  //     console.log("post: ", post)
  //     setPost(post)
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //   }
  // }

  // useEffect(() => {
  //   if(id) {
  //     fetchPost(id);
  //   }
  // }, [id]);

  useEffect(() => {
    if (!_.isEmpty(data)) {
      setPost(data);
    }
  }, [data])

  const update = (id) => {
    if (id) {
      onUpdate(id, post)
    } else {
      onUpdate(null, post)
    }
  }


  return (
    <div className="container bg-slate-500 text-black px-4 py-2 border-2 border-slate-200 rounded-md">
      <div className="font-bold text-xl text-center py-2"> {id ? "Edit Post" : "Create Post"}</div>
      <div>
        <input placeholder="title" className="auto-dfocus w-full p-2 rounded-md" type="text" value={post.title} onChange={(e) => setPost(prev => ({...prev, title: e.target.value}))} />
      </div>
      <div>
        <textarea  placeholder="description" className="w-full rounded-md my-4" value={post.description} cols={200} rows={10} onChange={(e) => setPost(prev => ({...prev, description: e.target.value}))}>
        </textarea>
      </div>
      <div className="flex  gap-4">
        <div>
          <input onClick={() => update(id)} type="button" className="p-2 font-medium rounded-md bg-white text-slate-700" value={id ? "Update Post" : "Create Post"} />
        </div>
        <div className="p-2 font-medium rounded-md bg-white text-slate-700 px-4" onClick={() =>   onClose() && history.push("/") }>Close</div>
      </div>
    </div>
  );
};
export  default EditPost;
