import "./OnlineUsers.css";

export default function OnlineUsers({onlineUser}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
   
        <>
            <li className="onlineFriendListItem">
                <div className="rightbarProfileImgContainer">
                    <img className="rightbarProfileImg" src={PF + onlineUser.profilePicture} alt="" />
                    <span className="rightbarOnline"></span>
                </div>
                <span className="rightbarUserName">{onlineUser.userName}</span>
            </li>
        </>
  
  )
}
