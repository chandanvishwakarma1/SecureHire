import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" }); //expiress in 15 days
}

const postRegister = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required. " });
        }

        if (username.length < 3) {
            return res.status(400).json({ message: "Username should be atleast 3 characters long. " });
        }

        if (username.length > 20) {
            return res.status(400).json({ message: "Username should be atmost 20 characters long. " });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Passwoord should be atleast 6 characters long. " });
        }

        const existingUser = await User.findOne({$or: [{username}, {email}]}); 
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        //get random avatars
        const profileImage = `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(username)}`;

        const user = new User({
            username,
            email,
            password,
            profileImage,
        });

        await user.save();

        const token = generateToken(user._id);

        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
                createdAt: user.createdAt,
            }
        })

    } catch (error) {
        console.log("Error registering user: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const postLogin = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if ((!username && !email) || !password) {
            return res.status(400).json({ message: "All fields are requied" });
        }

        const lookupCondition = []
        if(username) lookupCondition.push({ username });
        if(email) lookupCondition.push({ email });

        const existingUser = await User.findOne({ $or: lookupCondition});
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await existingUser.comparePassword(password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials " });

        const token = await generateToken(existingUser._id);

        res.status(200).json({
            token,
            user: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                profileImage: existingUser.profileImage,
                createdAt: existingUser.createdAt,
            }
        });

    } catch (error) {
        console.log("Error Loggin in: ", error);
        res.status(500).json({ message: "Internal server error " });
    }


}


const authController = {
    postRegister,
    postLogin
};

export default authController;