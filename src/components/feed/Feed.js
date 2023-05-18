import Post from "../post/Post";
import Share from "../share/Share";
// import { Posts } from "../dummyData";
import "./Feed.css"
import { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { AuthContext } from "../../contex/AuthContext";


//If the props username is passed then we want the feed for profile page, otherwise we want feed for homepage
export default function Feed({userName}) {

  const [fetchedPosts, setFetchedPosts] = useState([]);
  const { user } = useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const baseURL = process.env.REACT_APP_API_URL;


  //It we skip writing "[]"", everytime our app renders/updates, this function will be called.
  //If we write "text" inside brackets eg. [text], this function runs everytime the "text" changes
  //in the following case, the function only runs once
  useEffect(() => {

    //we will fetch posts for timeline from our api and map through them later
    const fetchFeed = async () => {

      console.log(baseURL)
      console.log(PF)
          //we want to fetch 2 different types of data in 2 different situations. We want to fetch all posts if we do not have "userName" props available. If we have it available then we want to fetch only the current user's posts.
          const res = userName
          ? await Axios.get( baseURL + "/posts/profile/" + userName)
          : await Axios.get( baseURL + "/posts/timeline/" + user._id, { headers: { Authorization: `Bearer ${token}` } });

          //displaying the most recent post at the top
          const sortedPosts = res.data.sort((post1, post2) => {
            return new Date(post2.createdAt) - new Date(post1.createdAt)
          })
          //setting the value of posts using setPosts.
           setFetchedPosts(sortedPosts);
       }

    fetchFeed();
  }, [userName, user._id])




  return (
    <div className="feedContainer">
      <div className="feedWrapper">
        {
          // if username in url means the username of the user whose profile is open is same as the username of the logged in user then we will display <Share/>.
          // if userName does not exist means we are on homepage, then we will display <Share/>

          (!userName || userName === user.userName) && <Share/> 
        }
        {/* {console.log("sec")}
        {console.log((fetchedPosts))} */}

        {/* We will map through the posts that we fetched from our API*/}
        {
          fetchedPosts.map((item) =>{
                  return <Post key={item._id} post={item}/>
                })
        }
        
        

      </div>
    </div>
  )
}
