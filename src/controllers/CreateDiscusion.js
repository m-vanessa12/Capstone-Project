const Discussion = require('../models/Discusion');
const isAuthenticated = require('../middleware/isAuthenticated');

//controller function to create discusion forum content on the platform
const CreateDiscussion = async(req, res) =>{
    try{
        const {title, category,  content, contentCoverPicture} = req.body;
        
        const createdBy = req.user.id; // get the ID of the user creating the discussion
        console.log(createdBy)

        const discusion = new Discussion({
            title,
            category,
            content,
            contentCoverPicture,
            createdBy
        });

        await discusion.save();
        res.status(201).json({message: 'Discussion created successfully', discusion});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Internal Error'});
    }
};

module.exports ={
    CreateDiscussion
};