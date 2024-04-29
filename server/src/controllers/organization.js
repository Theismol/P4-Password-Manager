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
    const {organistations, userId } = req.user;


    try{
        const foundorganization = await organization.findById(organistations);
        if(!foundorganization){
            res.status(400).json({ message: 'Organization not found' }).send();
            return;
        }
        
        try{
            console.log(foundorganization.users);
            const users = await user.find({
                _id: { $in: foundorganization.users, $ne: userId } // Exclude the current user
            }).select('username _id email');
            console.log(users);
            
            res.status(200).json({ users: users }).send();
        }catch(error){
            console.error('Error during getting users in organization:', error);
            res.status(500).json({ message: 'Internal server error' }).send();
        }

    }catch(error){
        console.error('Error during getting users in organization:', error);
        res.status(500).json({ message: 'Internal server error' }).send();
    }

}

module.exports = { createOrganization, addUserToOrganization, getUserInOrganization };