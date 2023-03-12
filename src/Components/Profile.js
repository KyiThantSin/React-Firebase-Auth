import pic from "../img/paint.jpg"

const Profile = () => {
  return (
    <div className="profile-container">
      <img src={pic} alt="profile" className="profile"/>
      <h4>@Email</h4>
      <h4>Name</h4>
    </div>
  );
};
export default Profile;
