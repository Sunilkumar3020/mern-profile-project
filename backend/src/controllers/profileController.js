import { Profile } from "../models/profileModel.js";

//Get All Profile

const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().sort({ createdAt: -1 })
        res.status(200).json({
            success: true,
            count: profiles.length,
            data: profiles
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch Profiles"
        })
    }
}


// Get Profile 
const getProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await Profile.findById(id);
        if (!profile) {
            return res.status(404).json({ success: false, message: "Profile not found" })
        }
        res.status(200).json({ success: true, message: "Profile get successfully", data: profile })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        })
    }
}

// Create profile

const createProfile = async (req, res) => {
    try {
        const { name, email, phone, location, bio, website } = req.body;
        const existingProfile = await Profile.findOne({ email })
        if (existingProfile) {
            return res.status(409).json({ success: false, message: "Profile with this email already exists" })
        }

        const profile = await Profile.create({ name, email, phone, location, bio, website })
        res.status(201).json({
            success: true,
            message: "Profile created successfully",
            data: profile
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        })
    }
}


// update profile

const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, location, bio, website } = req.body;
        const profile = await Profile.findById(id);
        if (!profile) {
            return res.status(404).json({ success: false, message: "Profile not found" })
        }

        profile.name = name;
        profile.email = email;
        profile.phone = phone;
        profile.location = location;
        profile.bio = bio;
        profile.website = website;

        await profile.save();

        res.status(200).json({ success: true, message: "Profile updated successfully", data: profile })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        })
    }
}

// Delete profile

const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const profile = await Profile.findByIdAndDelete(id);
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Profile deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        })
    }
}

export default { getProfile, createProfile, updateProfile, deleteProfile, getProfiles }