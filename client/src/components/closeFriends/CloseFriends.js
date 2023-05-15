import "./CloseFriends.css"


export default function CloseFriends({user}) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
        <li className="sidebarFriendListItem">
            <img className="sidebarFriendImage" src={PF + user.profilePicture} alt=""  />
            <span className="sidebarFriendName">{user.userName}</span>
        </li>
  )
}
