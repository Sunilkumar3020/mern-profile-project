const ProfileCard = ({ profile, onViewProfile }) => {
    return (
        <div className="profile-card">
            <div className="avatar">
                {profile.name.charAt(0)}
            </div>
            <h2>{profile.name}</h2>
            <p>{profile.email}</p>
            <p>{profile.location}</p>
            <button onClick={onViewProfile}>View Profile</button>
            
            
        </div>
    )
}

export default ProfileCard;