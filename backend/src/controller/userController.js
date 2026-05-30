import User from "../models/User.js";

const checkUsername = async(req,res,next) => {
    try {
        const { username } = req.body;

        const isAvailable = await User.exists({ username });
        if(isAvailable) return res.status(400).json({ message: "Username already taken", success: false})
        
        return res.json({
            success: true,
            message: "Username available"
        })
    } catch (error) {
        console.log("Error checking username: ", error)
        return res.status(500).json({ success: false, message: "Internal server error"})
    }
}


const userController = {
    checkUsername,
}

export default userController;