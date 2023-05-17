import "./Homepage.css";
import Topbar from "../../components/topbar/Topbar.js"
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

export default function HomePage(){

    return (
      <div>
        <Topbar/>
        <div className="homeContainer">
            <Sidebar/>
            <Feed/>
            <Rightbar/>
        </div>
      </div>
    )
}
