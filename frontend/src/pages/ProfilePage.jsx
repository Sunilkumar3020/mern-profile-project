import { useEffect, useState } from "react"
import { getProfile } from "../services/profileApi.js"
const ProfilePage = ({ profileId, onEdit }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await getProfile(profileId)
                setProfile(response.data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [profileId])

    if (loading) { return <p>Loading Profile...</p> }


    if (error) { return <p>{error}</p> }

    return (
        <div className="profile-page">
            <h1>My Profile</h1>
            <div className="profile-details">
                <h2>{profile.name}</h2>

                <p>
                    <strong>Email:</strong> {profile.email}
                </p>

                <p>
                    <strong>Phone:</strong> {profile.phone}
                </p>

                <p>
                    <strong>Location:</strong> {profile.location}
                </p>

                <p>
                    <strong>Bio:</strong> {profile.bio}
                </p>

                <p>
                    <strong>Website:</strong> {profile.website}
                </p>

                <button onClick={() => onEdit(profile)}  >Edit Profile</button>
            </div>  </div>
    )

}

export default ProfilePage;