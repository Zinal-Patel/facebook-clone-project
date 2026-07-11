import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users } from "../dummyData";
import OnlineUsers from "../onlineUser/OnlineUsers";
import "./Rightbar.css"
import Axios from "axios";
import { AuthContext } from "../../contex/AuthContext";
import { Add, Remove } from "@mui/icons-material";

export default function Rightbar({user}) {

  //The props "user" is the user whose profile is open.
  //The "currentUser" is whose account we are logged in.
  const PF= process.env.REACT_APP_PUBLIC_FOLDER;
  const baseURL = process.env.REACT_APP_API_URL;

  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  
  // console.log(currentUser)
  // console.log(user)
  // console.log(currentUser.following.includes(user?._id))

  //We will check if the currentUser's following array contains the userId of the user.
  //"user?.id" means if in case user does not exist, it won't give error. Called optional chainig
  const [isFollowed, setIsFollowed] = useState(currentUser.following.includes(user?._id));

 
 // ********* might need to remove  ************
  useEffect(() => {

            // Retrieve following array from storage
            const storedFollowing = localStorage.getItem("following");

            if (storedFollowing) {
            const parsedFollowing = JSON.parse(storedFollowing);
            setIsFollowed(parsedFollowing.includes(user?._id));
  }})
 // ********* ****** ************

  useEffect(() => {

    const fetchingFriends = async () => {
        try{
            const friendList = await Axios.get( baseURL + "/users/friends/" + user?._id);
            
            setFriends(friendList.data);
        }
        catch(err){
           console.log(err);
        }
       }
    fetchingFriends();
  }, [user?._id])

  const followHandler = async () => {

    try {
          if(isFollowed){
                await Axios.put(  baseURL + "/users/"+ user._id + "/unfollow", { userId: currentUser._id });

                dispatch({type: "UNFOLLOW", userId: user._id});

                // ********* might need to remove  ************
                
                // Update state
                setIsFollowed(false);

                // Update browser storage
                const updatedFollowing = currentUser.following.filter(id => id !== user._id);
                localStorage.setItem("following", JSON.stringify(updatedFollowing));
                // ***************************************************
            }
          else {
               await Axios.put( baseURL + "/users/"+ user._id + "/follow", { userId: currentUser._id });

               dispatch({type: "FOLLOW", userId: user._id});

              // ********* might need to remove  ************
              // Update state
              setIsFollowed(true);

              // Update browser storage
              const updatedFollowing = [...currentUser.following, user._id];
              localStorage.setItem("following", JSON.stringify(updatedFollowing));
              // ***************************************************
            }
        }
    catch(err){console.log(err)};

    //setting "isFollowed" opposite of its current value
    setIsFollowed(!isFollowed);
}

    
  
  

const HomeRightbar=()=>{

    return (
      <>
        <div className="birthdayContainer">
              <img className="birthdayImage" src={PF + "gift.png"} alt="" />
              <span className="birthdayText"><strong>Pola Foster</strong> and <strong>3 others</strong> friends have a birthday today</span>
        </div>         
        <img className="rightbarAd" src="https://d2jyir0m79gs60.cloudfront.net/news/images/successful-college-student-lg.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>

        <ul className="onlineFriendList">
              {Users.map((item)=> {
                    return <OnlineUsers key={item.id} onlineUser={item}/>
                })}
        </ul>
      </>
    )
  }

const ProfileRightbar = () => {

const PF= process.env.REACT_APP_PUBLIC_FOLDER;


    return (
      <>
      {/* The props "user" is the user whose profile is open. The "currentUser" is whose account we are logged in. If both those usenames are not same means they both are different people ad in that case only this button will be displayed */}
      { user.userName !== currentUser.userName && (
        <button className="rightbarFollowButton" onClick={followHandler}>
          {isFollowed ? "unfollow" : "follow"}
          {isFollowed ? <Remove /> : <Add />}
        </button> )
      }
      <h1 className="rightbarTitle">User Information</h1>
      <div className="rightbarInfo">
           <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">City:</span>
              <span className="rightbarInfoValue">{user.city}</span>
           </div> 
           <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">From:</span>
              <span className="rightbarInfoValue">{user.from}</span>
           </div>      
           <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Relationship:</span>
              <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2? "Married" : "-"}</span>
           </div>           
      </div>
      <h4 className="rightbarTitle">User Friends</h4>
      <div className="rightbarFollowings">
        
          {friends.map((eachFriend) => {
            return ( 
                <Link to={"/profile/" + eachFriend.userName} style={{textDecoration: "none", "display": "flex"}}>
                    <div className="rightbarFollowing">
                        <img src={eachFriend.profilePicture ? PF + eachFriend.profilePicture : PF + "person/noAvatar.png"} alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingUserName" >{eachFriend.userName}</span>
                    </div>
                </Link>
                  )
             })}
      </div>
      </>
    )
  }
  return (
    <div className="rightbarContainer">
        <div className="rightbarWrapper">
          {user ? <ProfileRightbar/>: <HomeRightbar/>}
        </div>
    </div>
  )
}
