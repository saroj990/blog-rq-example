import { useState } from "react";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getPost } from "../../api/Post";
import { Loader } from "../Loader";
import { useQuery } from "react-query";

const ViewPost =  () => {
  const { id } = useParams();
  const { isLoading, data: post} = useQuery(["posts", "view", "id"], () => getPost(id))
  const history = useHistory();
  // const [post, setPost] = useState(null);
  // const [isLoading, setIsLoading] = useState(false)

  // const fetchPost = async () => {
  //   try {
  //     setIsLoading(true);
  //     const post = await getPost(id);
  //     console.log("post: ", post)
  //     setPost(post)
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }
  // useEffect(() => {
  //   if(!id) return; 
  //   fetchPost(id);
  // }, [id]);

  return (
    <div className="h-screen p-4 border-1 rounded bg-slate-500 text-white">
      {isLoading ? (<div className="flex h-screen justify-center items-center">
        <Loader />
      </div>): (
        post ? (
          <div >
            <div onClick={() => history.push("/posts")}> Back To Home </div>
            <div className="text-2xl font-bold text-center">{post.title}</div>
            <div className="text-md font-medium py-2">{post.description}</div>
            <div className="flex flex-row gap-4 justify-between">
              <div className="flex flex-row gap-4">
                <div>
                  Author: {post.author}
                </div>
                <div>
                  Created at: {post.date}
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <div>
                Veiws:  {post.views}
                </div>
                <div>
                Likes:  {post.likes}
                </div>
              </div>
            </div>
          </div>
        ) : (<div className="h-screen flex justify-center items-center">
            Post not found
        </div>)
      )}
    </div>
  );
};
export  default ViewPost;
