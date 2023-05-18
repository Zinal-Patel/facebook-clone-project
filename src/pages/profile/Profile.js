import Topbar from "../../components/topbar/Topbar.js"
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./Profile.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

export default function Profile() {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const baseURL = process.env.REACT_APP_API_URL;

  const [fetchedUsers, setFetchedUsers] = useState([]);

  //using "useParams", we can access the parameters that we pass in the URL
  //We have written this path "profil/:username" in the app.js file in Routes.
  const paramsUsername = useParams().username;
  
  useEffect(() => {

    //we will fetch posts for timeline from our api and map through them later
    const fetchUsers = async () => {

        //"post" is each post that we fecthed in Feed.js
          const res = await Axios.get(`/${baseURL}/users?userName=${paramsUsername}`);
          setFetchedUsers(res.data);
    }
    
    fetchUsers();
  }, [paramsUsername])//Everytime post.userId changes, this function runs

 
  return (
    <div>
        <Topbar/>
        <div className="profileContainer">
            <Sidebar/>
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img src={fetchedUsers.coverPicture ? PF + fetchedUsers.coverPicture : PF + "person/noCover.png"} alt="" className="profileCoverImg" />
                        <img src={fetchedUsers.profilePicture ? PF + fetchedUsers.profilePicture : PF + "person/noAvatar.png"} alt="" className="profileUserImg" />
                    </div>
                    <div className="profileInfo">
                        <h4 className="profileInfoName">{fetchedUsers.userName}</h4>
                        <span className="profileInfoDesc">{fetchedUsers.desc}</span>
                    </div>
                </div>
                <div className="profileRightBottom">

                  <Feed userName={paramsUsername}/>
                  <Rightbar user={fetchedUsers} />
                </div>
            </div>
            
        </div>
    </div>
  )
}
