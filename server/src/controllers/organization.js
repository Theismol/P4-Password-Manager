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
            await user.findOneAndUpdate({ _id: userId }, { $push: { organizations: createdOrganisation._id } });
        }catch (error) {
            try {
                await organization.deleteOne({ _id: createdOrganisation._id });
                console.error('Error during adding organization:', error);
                res.status(500).json({ message: 'Internal server error' }).send();
            }catch (error) {
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

module.exports = { createOrganization };