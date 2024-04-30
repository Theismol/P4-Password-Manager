const Password = require('../models/passwordModel.js');
const user = require('../models/userModel.js');
const incomingPassword = require('../models/incomingPasswordsModel.js');

const getAllPasswords = async (req, res) => {
    try {
        const passwords = await Password.find();
        res.status(200).json(passwords).send();
    } catch (error) {
        console.error('Error during fetching passwords:', error);
        res.status(500).json({ message: 'Internal server error' }).send();
    }
}

const getRandom = async (req, res) => {
    try {
        const numPasswords = req.query.num || 10;
        const passwords = [];

        for (let i = 0; i < numPasswords; i++) {
            const newPassword = new Password({
                _id: '65e5d28e1d546bf0e961c358',
                organization_id: '65e5d28e1d546bf0e961c358',
                user_id: "65e5d28e1d546bf0e961c358",
                title: "faker.lorem.words()",
                username: "faker.internet.userName()",
                password: "faker.internet.password()",
                url: "faker.internet.url()",
                notes: "faker.lorem.paragraph()"
            });

            passwords.push(newPassword);
        }

        console.log(passwords);

        res.status(200).json(passwords).send();
    } catch (error) {
        console.error('Error during generating passwords:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const addPasswordToUser = async (req, res) => {
    const {title, username, password, url, notes } = req.body;
    const { userId } = req.user;

    if (!title || !username || !password || !userId) {
        res.status(400).json({ message: 'Missing required fields' }).send();
        return
    }

    const newPassword = new Password({
        organization_id: null,
        user_id: userId,
        title: title,
        username: username,
        password: password,
        url: url,
        notes: notes
    });

    try {

        const createdPassword = await newPassword.save();
        console.log(createdPassword);
        try {
            await user.findOneAndUpdate({ _id: req.user.userId }, { $push: { passwords: createdPassword._id } });
        } catch (error) {
            try {
                await Password.deleteOne({ _id: createdPassword._id });
                console.error('Error during adding password:', error);
                res.status(500).json({ message: 'Internal server error' }).send();
            } catch (error) {
                console.error('Error during deleting password:', error);
                res.status(500).json({ message: 'Internal server error' }).send();
            }
        }
        res.status(200).json(newPassword).send();
    } catch (error) {
        console.error('Error during adding password:', error);
        res.status(500).json({ message: 'Internal server error' }).send();
    }
}

const updatePassword = async (req, res) => {
    const {passwordId,title, username, password, url, notes } = req.body;
    try {
        await Password.findByIdAndUpdate(passwordId, {title:title, username:username, password:password, url:url, notes: notes})
        console.log("updated");
        res.status(200).send();
    }
    catch(error) {
        res.status(404).json({message: "password not found"}).send();
    }
}

const deletePassword = async (req, res) => {
    const { passwordId } = req.params;
    const { userId } = req.user;

    if (!passwordId || !userId) {
        res.status(400).json({ message: 'Missing required fields' }).send();
        return
    }

    try {
        const deletedPassword = await Password.findOneAndDelete({ _id: passwordId, user_id: userId });
        if (!deletedPassword) {
            res.status(404).json({ message: 'Password not found' }).send();
            return
        }
        try {
            await user.findOneAndUpdate({ _id: userId }, { $pull: { passwords: passwordId } });
        } catch (error) {
            console.error('Error during deleting password:', error);
            res.status(500).json({ message: 'Internal server error' }).send();
        }
        res.status(200).json(deletedPassword).send();
    } catch (error) {
        console.error('Error during deleting password:', error);
        res.status(500).json({ message: 'Internal server error' }).send();
    }
}


const getPasswords = async (req, res) => {
    const { userId } = req.user;
    let passwords;
    let incomingPasswords;

    try {
        const userData = await user.findById({ _id: userId });

        try {
            passwords = await Password.find({ _id: userData.passwords });
        } catch (error) {
            console.error('Error during fetchiƒng passwords:', error);
            res.status(500).json({ message: 'Internal server error' }).send();
        }
        try {
            incomingPasswords = await incomingPassword.find({to: userData})
        }
        catch (error) {
            incomingPasswords = null;
        }
        res.status(200).json({passwords: passwords, incomingPasswords: incomingPasswords});
    }
    catch (error) {
        console.error('Error during fetching passwords:', error);
        return res.status(500).json({ message: 'Internal server error' }).send();
    }
}

const sendPassword = async (req, res) => {
    const toUser = req.body.user;
    const password = req.body.password;
    const jwt = req.cookies.token;
    let decodedJwt;
    let fromUser;
    let toUserObject;
    try {
        decodedJwt = verifyToken(jwt);
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" }).send(); // Unauthorized
        } else if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" }).send(); // Unauthorized
        } else {
            return res
                .status(500).json({ message: "Internal server error" }).send(); // Internal server error
        }
    }
    try {
        fromUser = await user.findById(decodedJwt.userId);
        toUserObject = await user.findOne({username: toUser});
        if (fromUser.organizations !== toUserObject.organizations) {
            return res.status(500).json({ message: "User not in same organization" }).send();
        }
        try {
            const newIncomingPassword = new incomingPassword(
                {
                    from : fromUser,
                    to : toUserObject,
                    password : password
                }
            )
            const createdIncomingPassword = await newIncomingPassword.save();
        }
        catch (error) {
            res.status(500).json({message: 'Internal server error'}).send();
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" }).send();
    }


}


module.exports = { getAllPasswords, getRandom, addPasswordToUser, deletePassword, getPasswords, sendPassword, updatePassword };