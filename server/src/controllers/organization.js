const jwtModel = require('../models/jwtModel');
const organization = require('../models/organizationModel');
const password = require('../models/passwordModel');
const user = require('../models/userModel');
const EmailService = require('../utils/Email/emailService');


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
    const mailService = new EmailService();
    const { email, organizationId } = req.body;
    mailService.sendEmail("nicholas.mazur.hansen@gmail.com", "You have been invited to join an organization", "please doksapod");
    res.status(200).json({ message: 'Email sent' }).send();

}

module.exports = { createOrganization, addUserToOrganization };