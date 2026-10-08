import { useEffect, useState } from "react";
import { getProfiles } from "./services/profileApi.js";
import EditProfile from "./pages/EditProfile.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ProfileCard from "./components/ProfileCard.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import "./index.css"

export default function App() {

  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null)
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [pendingProfile, setPendingProfile] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("")


  // restore the user after browser refresh

  useEffect(() => {

    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

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
    if (!user) {
      setPendingProfile(profile)
      setPage("register");
      return
    }
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

  // login 

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    if (pendingProfile) {
      setSelectedProfile(pendingProfile);
      setPendingProfile(null);
      setPage("profile")
    } else {

      setPage("home")
    }
  }

  // handle logout

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setSelectedProfile(null)
    setPage("home")
  }

  if (page === "login") {
    return (
      <Login onLogin={handleLogin} onRegister={() => setPage("register")} />
    )
  }
  if (page === "register") {
    return (
      <Register onRegisterSuccess={() => setPage("login")} onLogin={() => setPage("login")} />
    )
  }
  //Home

  return (
    <div className="app">
      <h1>MERN Profile</h1>
      {user ? (
        <div><p>Welcome, {user.name}</p> <button onClick={handleLogout}>Logout</button></div>
      ) : (<div>
        <button onClick={() => setPage("login")} >Login</button>
        <button onClick={() => setPage("register")}> Register</button>
      </div>)}
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