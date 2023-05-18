import { Cancel, EmojiEmotions, Label, PermMedia, Room } from "@mui/icons-material";
import "./Share.css";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../contex/AuthContext";
import Axios from "axios";

export default function Share() {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const baseURL = process.env.REACT_APP_API_URL;


    const [file, setFile] = useState(null);
    const refDesc = useRef();
    const { user } = useContext(AuthContext);

    console.log("share")
    console.log(user)

    //this function runs when the value of "file" input element changes
    const handleFile = (event) => {
        //we are setting the value of "file" varibale to whatever we received from "file" input element
        //event.target means the element that triggered the event which here is input element
        //event.target.files[0] means the first file we uploaded in that input element.
        setFile(event.target.files[0]);
    }

    //When we click share/sumbit, we want to post two things: file/image and desc 
    //
    //We then send a post request to create a post and send desc in the req body
    const submitHandler = async (event) => {

        event.preventDefault();

        //whatever data(desc and file/image for creating new post) we received, we are assigning it to the properties of the post and create a new post
        const createdPost = {
                             userId: user._id,
                             desc: refDesc.current.value,
                            }

        //posting a file/image
        //If we have file, 
        if(file){
            //just like we sent josn object in req body, we can send form-data as well. form-data is the data submitted through html form. 
            //we create object of FormData() and appended the file and its name to the "data" object.
            //"formData" allows us to pass file and its name as req body
            //then we sent a post request with path "/upload" and  the req body containing the "data" object.

            const data = new FormData();
            //We are generating unique file name so if different users have same file name, we can store them with unique name 
            // const fileName = Date.now() + file.name;
            data.append("file", file);
            data.append("name", file.name)            
            //we are assigning a path of the img to img property of new created post
            createdPost.img = file.name;
        
            try{
                console.log(file.name);

                await Axios.post(baseURL + "/upload", data);
                //refreshes the page
                window.location.reload();
            }
            catch(err){
                console.log("first")
                console.log(err)}
        }

        // a post request to create a post and send "desc" in the req body 
        try{
            await Axios.post( baseURL + "/posts", createdPost)
        }
        catch(err){
            console.log(err)
        }
    }

  return (
    <div className="shareContainer">
        <div className="shareWrapper">
            <div className="shareTop">
                <img className="shareProfileImage" src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" />
                <input className="shareInput" type="text" placeholder={`What's in your mind ${user.userName}?`} ref={refDesc}/>
            </div>
            <hr className="shareHr" />
            {/* If file exists means if we selected a file to be uploaded, then this div will be displayed */}
            {file && (
                <div className="shareImageContainer">
                    {/* "src={URL.createObjectURL(file)}" allows us to create sudo URL to see our file before uploading it  */}
                    <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                    {/* when we click on cancel icon, the file is set to null to we won't be able to see the file anymore  */}
                    <Cancel className="shareCancelImg" onClick={()=>{setFile(null)}} />
                </div>
            )}
            <form className="shareBottom" encType="multipart/form-data" onSubmit={submitHandler}>
                <div className="shareOptions">
                    {/* htmlFor="file" means this label is a label for the element that has "file" id. And so the label acts same as that that elemetn itself. We will now hide that input element to look better. */}
                    <label className="shareOption" htmlFor="file">
                        <PermMedia className="shareOptionIcon"/>
                        <span className="shareOptionText">Photo or Video</span>
                        <input style={{display: "none"}} type="file" name="file" id="file" accept=".png, .jpeg, .jpg" onChange={handleFile} />
                    </label>
                    <div className="shareOption">
                        <Label className="shareOptionIcon"/>
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                        <Room className="shareOptionIcon"/>
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions className="shareOptionIcon"/>
                        <span className="shareOptionText">Feelings</span>
                    </div>
                </div>
                <button className="shareButton" type="sumbit">Share</button>
            </form>
        </div>
    </div>
  )
}
