import { Bookmark, Chat, Event, Group, HelpOutline, PlayCircleFilledOutlined, RssFeed, School, WorkOutline } from '@mui/icons-material';
import { Users } from "../dummyData";
import CloseFriends from '../closeFriends/CloseFriends';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <div className="sidebarContainer">
       <div className="sidebarWrapper">
          {/* Sidebar List */}
          <ul className="sidebarList">
            <li className="sidebarListItem">
               <RssFeed className="sidebarListIcon"/>
               <span className="sidebarListItemText">Feed</span>
            </li>
            <li className="sidebarListItem">
               <Chat className="sidebarListIcon"/>
               <span className="sidebarListItemText">Chats</span>
            </li>
            <li className="sidebarListItem">
               <PlayCircleFilledOutlined className="sidebarListIcon"/>
               <span className="sidebarListItemText">Videos</span>
            </li>
            <li className="sidebarListItem">
               <Group className="sidebarListIcon"/>
               <span className="sidebarListItemText">Groups</span>
            </li> <li className="sidebarListItem">
               <Bookmark className="sidebarListIcon"/>
               <span className="sidebarListItemText">Bookmarks</span>
            </li>
            <li className="sidebarListItem">
               <HelpOutline className="sidebarListIcon"/>
               <span className="sidebarListItemText">Questions</span>
            </li>
            <li className="sidebarListItem">
               <WorkOutline className="sidebarListIcon"/>
               <span className="sidebarListItemText">Jobs</span>
            </li>
            <li className="sidebarListItem">
               <Event className="sidebarListIcon"/>
               <span className="sidebarListItemText">Events</span>
            </li> 
            <li className="sidebarListItem">
               <School className="sidebarListIcon"/>
               <span className="sidebarListItemText">Courses</span>
            </li>
          </ul>

          {/* Sidebar button and horizontal line */}
          <button className="sidebarButton">Show more</button>
          <hr className="sidebarHr"/>

          {/* Sidebar Friend List */}
          <ul className="sidebarFriendList">
            {Users.map((item)=>{
                  return <CloseFriends key={item.id} user={item}/>
            })}
          </ul>

       </div>
    </div>
  )
}
