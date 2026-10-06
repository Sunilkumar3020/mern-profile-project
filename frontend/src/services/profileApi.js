const API_URL = "http://localhost:5000/api/profiles";


// get all profiles

export const getProfiles = async()=>{
    const response = await fetch(API_URL)
    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message|| "Failed to fetch profiles")
    }

    return data.data;
}

export const getProfile = async (id) => {
    const response = await fetch(`${API_URL}/${id}`)
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch profile")
    }

    return data;
}


export const updateProfile = async (id, profileDate)=>{
    const response = await fetch(`${API_URL}/${id}`,{
        method:"PUT",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify(profileDate)
    })

    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message || "Failed to update profile")
    }

    return data;
}

export const createProfile = async(profileData)=>{
    const response = await fetch(API_URL, {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify(profileData)
        
    })

    const data = await response.json();

    if(!response.ok){throw new Error(data.message|| "Failed to create profile")}

    return data;
}


// Delete Profile

export const deleteProfile = async(id)=>{
    const response = await fetch(`${API_URL}/${id}`,{
        method: "DELETE"
    })
    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message || "Failed to delete profile")
    }

    return data;
}