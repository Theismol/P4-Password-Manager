const z = require("zod");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const signup = async (req, res) => {
    const { email, username, password, privateKey, publicKey } = req.body;
    const emailSchema = z
    .object({
        email: z.string().email(),
    })
    try {
        const validatedForm = emailSchema.parse({email:email})

    }
    catch (error) {
        return res.status(400).send();
    }

    try {
        const user = await User.findOne({ username });
        const emailCheck = await User.findOne({ email });
        if (user) {
            return res
                .status(404)
                .json({ message: "Username is already taken" });
        } else if (emailCheck) {
            return res.status(404).json({ message: "Email is already taken" });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            User.create({
                email: email,
                username: username,
                password: hashedPassword,
                mfaSecret: "null",
                organizations: null,
                publicKey: publicKey,
                privateKey: privateKey,
            });
            res.status(200).json({ message: "Signup successful!" });
        }
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = signup;
