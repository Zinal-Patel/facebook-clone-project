import { Search, Person, Chat, Notifications} from "@mui/icons-material";
import "./Topbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contex/AuthContext"
import { useContext } from "react";

export default function Topbar(){

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    

    //destructuring "user" property from the AuthContext object we imported
    //"user" is the user info we receive if log in was successful.
    const {user} = useContext(AuthContext)
    
    return (
        <>
            <div className="topbarConatiner">
                <div className="topbarLeft">
                    <Link to="/" style={{textDecoration: "none"}}>
                      <span className="topbarLogo">FaceBook</span>
                    </Link>
                </div>
                <div className="topbarCenter">
                    <div className="searchBar">
                      <Search className="searchIcon"/>
                      <input className="searchInput" type="text" placeholder="search"/>
                    </div>
                </div>
                <div className="topbarRight">
                    <div className="topbarLinks">
                        <span className="topbarLinkItem">Homepage</span>
                        <span className="topbarLinkItem">Timeline</span>
                    </div>
                    <div className="topbarIcons">
                        <div className="topbarIconItem">
                           <Person/>
                           <span className="topbarIconBadge">1</span>
                        </div>
                        <div className="topbarIconItem">
                           <Chat/>
                           <span className="topbarIconBadge">1</span>
                        </div>
                        <div className="topbarIconItem">
                           <Notifications/>
                           <span className="topbarIconBadge">1</span>
                        </div>
                    </div>
                    <Link to={`/profile/${user.userName}`}>
                        <img className="topbarImage" src={ user.profilePicture ? PF + user.profilePicture : PF+"person/noAvatar.png" } alt="" />
                    </Link>
                </div>
            </div>
        </>
    )
}
