import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget.jsx";

const PostsWidget = ({ userId, isProfile = false}) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) = state.posts);
    const token = useSelector((state) => state.token);

    const getPosts = async () => {
        const response = await fetch(process.env.REACT_APP_BASE_URL+`/posts`,{
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    const getUserPosts = async () => {
        const response = await fetch(process.env.REACT_APP_BASE_URL + `/posts/${userId}/posts`,{
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    useEffect(() => {
        if(isProfile){
            getUserPosts();
        }else{
            getPosts();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {posts.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    username,
                    picturePath,
                    userPicturePath,
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        username={`${username}`}
                        picture={picturePath}
                        userPicturePath={userPicturePath}
                    />
                )
            )}
        </>
    )

};

export default PostsWidget;