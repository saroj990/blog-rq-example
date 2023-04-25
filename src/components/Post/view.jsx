import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../../api/Post";

const ViewPost =  () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const post = await getPost(id);
      console.log("post: ", post)
      setPost(post)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    if(!id) return; 
    fetchPost(id);
  }, [id]);

  return (
    <div  className="container p-4">
      <div>ViewPost {id}</div>
      {post ? (
        <div>
          <div className="text-lg font-semibold">{post.title}</div>
          <div className="text-md font-medium py-2">{post.description}</div>
        </div>
      ) : (<div>
        Unable to find the post
      </div>)}
    </div>
  );
};
export  default ViewPost;
