import { MoreVert } from "@mui/icons-material";
// import { Users } from "../dummyData";
import "./Post.css";
import { useState, useEffect, useContext} from "react";
// axios is to fecth data from api
import Axios from "axios";
//to show the time we uploaded the post
import {format} from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contex/AuthContext"

export default function Post({post}) {

    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [fetchedUsers, setFetchedUsers] = useState({});

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const baseURL = process.env.API_URL;


    //means we will refer imported "user" as "currentUser"
    const { user: currentUser } = useContext(AuthContext);


    useEffect(()=>{
        //if the "likes" array of the current post inlcudes the current user id, means the post was already liked by the user
        if(post.likes.includes(currentUser._id)){
            setIsLiked(true)
        }
        
    }, [currentUser._id, post.likes])

    const likeHandler = () =>{

        try{
            //our "like a post" path requires post id in the url and user id in the body.
            Axios.put(`/posts/${post._id}/like`, { userId: currentUser._id})

        }
        catch(err){

        }
        setLike(isLiked?like-1:like+1);
        setIsLiked(!isLiked?true:false);
    }

  

    useEffect(() => {

        //we will fetch posts for timeline from our api and map through them later
        const fetchUsers = async () => {
    
            //"post" is each post that we fecthed in Feed.js
              const res = await Axios.get(`${baseURL}/users?userId=${post.userId}`);
              setFetchedUsers(res.data);
        }
        
        fetchUsers();
      }, [post.userId])//Everytime post.userId changes, this function runs


  return (
    <div className="postContainer">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">

                    {/* If in case the profilePicture does not exist, we will show a default img */}
                    {/* {console.log("first")}
                    {console.log(fetchedUsers)} */}
                    <Link to={`/profile/${fetchedUsers.userName}`}  style={{textDecoration: "none", "display": "flex"}}>
                        <img className="postTopLeftImage" 
                            src={fetchedUsers.profilePicture ? PF + fetchedUsers.profilePicture : `${PF}person/noAvatar.png`} 
                            alt=""
                        />
                        <span className="postUserName" >{fetchedUsers.userName}</span>
                    </Link>
                    {/* <span className="postUserName">{Users.filter((item)=> {return (item.id === post.id)})[0].userName}</span> */}
                    {/* we imported "format()" form timeago.js library that we install */}
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postCenter Text">{post.desc}</span>
                <img className="postCenterImage" src={PF + post.img}  alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className="postLikeIcon" src={`${PF}/like.png`} alt="" />
                    <img className="postLikeIcon" onClick={likeHandler} src={`${PF}/heart.jpg`} alt="" />
                    <span className="postLikeCounter">{like} people liked it...</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment} Comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}
