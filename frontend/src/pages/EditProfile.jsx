import { useState } from "react"
import { updateProfile } from "../services/profileApi.js";

const EditProfile = ({ profile, onUpdated, onCancel }) => {
    const [formData, setFormData] = useState({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        location: profile.location,
        bio: profile.bio,
        website: profile.website
    })

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((previous) => ({
            ...previous,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            setLoading(true)
            setError("")

            const response = await updateProfile(profile._id, formData)

            onUpdated(response.data)
        } catch (error) {
            setError(error.message);

        } finally { setLoading(false) }
    }

    return (
        <div className="edit-profile">
            <h1>Edit Profile</h1>
            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label> Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />

                </div>
                <div>
                    <label>Phone</label>

                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>


                <div>
                    <label>Location</label>

                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>


                <div>
                    <label>Website</label>

                    <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                    />
                </div>


                <div>
                    <label>Bio</label>

                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                    />
                </div>

                <div className="buttons">
                    <button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
            <button onClick={onCancel}>View All Profiles</button>
        </div>
    )
}

export default EditProfile;