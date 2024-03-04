const Password = require('../models/passwordModel');
const middleware = require('../middleware');

const createPassword = async (req, res) => {
    const { organization_id, user_id, title, username, password, url,notes } = req.body;
    try{
        middleware.authenticateToken(req, res);
        const newPassword = await Password.create({ organization_id, user_id, title, username, password, url, notes});
        return res.status(201).json({ newPassword });
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
}

