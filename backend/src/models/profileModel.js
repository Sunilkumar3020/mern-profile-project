import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    phone:{
        type:String,
        default:""
    },
    location:{
        type: String,
        default: ""
    },
    bio:{
        type: String,
        default: ""
    },
    website:{
        type:String,
        default:""
    }
}, {timestamps:true})

export const Profile = mongoose.model("Profile", profileSchema)

