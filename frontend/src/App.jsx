import { useEffect, useState } from "react";
import { getProfiles } from "./services/profileApi.js";
import EditProfile from "./pages/EditProfile.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ProfileCard from "./components/ProfileCard.jsx";

import "./index.css"

export default function App() {

  const [page, setPage] = useState("home");
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("")

  // Load all profiles

  const loadProfiles = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getProfiles();

      setProfiles(data)
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to load profiles")
    } finally {
      setLoading(false)
    }
  }


  // Load profiles when app start

  useEffect(() => {
    loadProfiles()
  }, [])

  //view profile

  const handleViewProfile = (profile) => {
    setSelectedProfile(profile)
    setPage("profile")
  }

  //Edit profile

  const handleEdit = (profile) => {
    setSelectedProfile(profile)
    setPage("edit");
  }

  // Profile Updated

  const handleUpdated = (updatedProfile) => {
    setSelectedProfile(updatedProfile);

    // update profile inside profiles array

    setProfiles(previousProfiles => previousProfiles.map(profile => profile._id === updatedProfile._id ? updatedProfile : profile));


    setPage("profile");


  }

  // Delete Profile

  const handleDeleted = (deletedId) => {
    setProfiles((previousProfiles) => previousProfiles.filter((profile) => profile._id !== deletedId))

    setPage("home")
  }

  // profile page

  if (page === "profile" && selectedProfile) {
    return <ProfilePage profileId={selectedProfile._id} onEdit={handleEdit} />
  }

  // Edit page

  if (page === "edit" && selectedProfile) {
    return (
      <EditProfile profile={selectedProfile} onUpdated={handleUpdated} onCancel={() => setPage("home")} />
    )
  }

  // Loading

  if (loading) {
    return (
      <div className="app">
        <h1>MERN Profile</h1>
        <p>Loading Profiles...</p>
      </div>
    )
  }

  // Error

  if (error) {
    return (
      <div className="app">
        <h1>MERN Profile</h1>
        <p>{error}</p>
        <button onClick={loadProfiles}>Try Again</button>
      </div>
    )
  }

  //Home

  return (
    <div className="app">
      <h1>MERN Profile</h1>
      <h2>All Profiles</h2>
      {
        profiles.length === 0 ? (<p>No Profiles found.</p>) : (
          <div className="profile-list">
            {
              profiles.map((profile) => (
                <ProfileCard key={profile._id} profile={profile} onViewProfile={() => handleViewProfile(profile)} />
              ))
            }
          </div>
        )
      }

    </div>
  )
}