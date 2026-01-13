import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //basic validation

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are important and need to be filled!"})
        }

        //check user exists
        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ message: "User already exists!"} );
        }

        //create user

        const user = await User.create({
            username, 
            email: email.toLowerCase(),
            password, 
            loggedIn: false,
        });
        res.status(201).json({
            message: "User registered",
            user: { id: user._id, email: user.email, username: user.username } 
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error!", error: error.message });
    }
};

const loginUser = async (req, res) => {
    try{
        //check user exists
        const { email, password } = req.body;
        const user = await User.findOne({
            email: email.toLowerCase()
        });
        if (!user) return res.status(400).json({
            message: "User not found"
        });

        //compare passwords
        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({
            message: "Invalid credentials"
        })
        res.status(200).json({
            message: "User Logged in!",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })
    }catch (error){
        res.status(500).json({
            message: "Internal Server Error", error: error.message
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({
            email
        });
        if (!user) return res.status(404).json({
            message: "User not found"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server error"
        })
    }
}
export {
    registerUser,
    loginUser,
    logoutUser
}
