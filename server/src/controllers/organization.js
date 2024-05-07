const jwtModel = require('../models/jwtModel');
const organization = require('../models/organizationModel');
const password = require('../models/passwordModel');
const user = require('../models/userModel');



const createOrganization = async (req, res) => {
    const { name } = req.body;
    const { userId } = req.user;

    if (!name) {
        res.status(400).json({ message: 'Missing required fields' }).send();
        return
    }

    try {
        const newOrganization = new organization(
            {name: name,
            users: [userId],
            administrators: [userId]}
            );

        const createdOrganisation = await newOrganization.save();

        try {
            const foundUser = await user.findById(userId);
            if(foundUser.organizations != null){
                console.log("ftdrtr6dty")
                res.status(400).json({ message: 'User already has an organization' }).send();
                return;
            }
            try{
                await user.findOneAndUpdate({ _id: userId },  { organizations: createdOrganisation._id });
            }catch(error){
                console.error('Error during creating organization:', error);
                res.status(500).json({ message: 'Internal server error' }).send();
            }
        }        
        catch (error) {
            try {
                await organization.deleteOne({ _id: createdOrganisation._id });
                console.error('Error during creating organization:', error);
                res.status(500).json({ message: 'Internal server error' }).send();
            }
            catch (error) {
                console.error('Error during deleting organization:', error);
                res.status(500).json({ message: 'Internal server error' }).send();
            }
            
        }

        res.status(200).json({ message: 'Organization created' }).send();
    } catch (error) {
        console.error('Error during creating organization:', error);
        res.status(500).json({ message: 'Internal server error' }).send();
    }
}

const addUserToOrganization = async (req, res) => {
    const { organistations, userId } = req.user;
    const { email} = req.body;

    console.log(organistations);

    try {
        const foundorganization = await organization.findById(organistations);
        if(!foundorganization){
            res.status(400).json({ message: 'Organization not found' }).send();
            return;
        }
        if(!foundorganization.administrators.includes(userId)){
            res.status(400).json({ message: 'User is not an administrator' }).send();
            return;
        }
        try{
            const foundUser = await user.findOneAndUpdate({ email: email }, { organizations: foundorganization._id });
            if(!foundUser){
                res.status(400).json({ message: 'User not found' }).send();
                return;
            }
            try{
                await organization.findOneAndUpdate({ _id: foundorganization._id }, { $push: { users: foundUser._id } });
                return res.status(200).json({ message: 'User added to organization' }).send();
            }catch(error){
                console.error('Error during adding user to organization:', error);
                return res.status(500).json({ message: 'Internal server error' }).send();
            }

            }catch(error){
            console.error('Error during adding user to organization:', error);
            res.status(500).json({ message: 'Internal server error' }).send();
            }
        }catch(error){          
            console.error('Error during adding user to organization:', error);
            return res.status(500).json({ message: 'Internal server error' }).send();
        }
    
}

const getUserInOrganization = async (req, res) => {
    const { organistations, userId } = req.user;
    //console.log(organistations, userId);
    let isAdmin = false;

    try {
        const foundOrganization = await organization.findById(organistations);
        if (!foundOrganization) {
            return res.status(309).json({ message: 'Organization not found' });
        }

        const users = await user.find({
            _id: { $in: foundOrganization.users, $ne: userId } // Exclude the current user
        }).select('username _id email');

        if (foundOrganization.administrators.includes(userId)) {
            isAdmin = true;
        }

        return res.status(200).json({ users: users,isAdmin: isAdmin});
    } catch (error) {
        console.error('Error during getting users in organization:', error);
        return res.status(502).json({ message: 'Internal server error' });
    }
};

const removeUserFromOrganization = async (req, res) => {
    const { organistations, userId } = req.user;
    const { email } = req.body;

    try {
        const foundOrganization = await organization.findById(organistations);
        if (!foundOrganization) {
            return res.status(309).json({ message: 'Organization not found' });
        }
        if (!foundOrganization.administrators.includes(userId)) {
            return res.status(400).json({ message: 'User is not an administrator' });
        }

        const foundUser = await user.findOne({ email: email });
        if (!foundUser) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (!foundOrganization.users.includes(foundUser._id)) {
            return res.status(400).json({ message: 'User is not in the organization' });
        }

        await organization.findOneAndUpdate({ _id: organistations }, { $pull: { users: foundUser._id } });
        await user.findOneAndUpdate({ _id: foundUser._id }, { organizations: null });

        return res.status(200).json({ message: 'User removed from organization' });
    } catch (error) {
        console.error('Error during removing user from organization:', error);
        return res.status(502).json({ message: 'Internal server error' });
    }
}


module.exports = { createOrganization, addUserToOrganization, getUserInOrganization, removeUserFromOrganization };