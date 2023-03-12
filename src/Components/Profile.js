import pic from "../img/paint.jpg"
import {MdOutlineMailOutline} from 'react-icons/md'
import { useContext } from "react";
import { ContextValue } from "../App";

const Profile = () => {
  const {currentUser} = useContext(ContextValue)
  return (
    <div className="profile-container">
      <img src={pic} alt="profile" className="profile"/>
      <h4>{currentUser.displayName || currentUser.email?.split('@')[0]}</h4>
      <h4 className="flex flex-row gap-3"><MdOutlineMailOutline size={30} /> {currentUser.email}</h4>
    </div>
  );
};
export default Profile;
