const {User} = require('../models')


const userController = {

    getAllUser(req,res) {
        User.find({})
        .select('-__v')
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    getUserById({params}, res) {
        User.findOne({_id: params.id})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
    },

    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id'})
                return
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err))
    },

    deleteUser({params}, res) {
        User.findOneAndDelete({_id:params.id})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err))
    },

    addFriend({params}, res) {
        User.findOneAndUpdate(
            {_id:params.id},
            {$push: {friend: params.friendId}}, 
            {new:true})
            .populate({path: 'friend', select:('-__v')})
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message:'No user found with this id'})
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err))
    },

    deleteFriend({ params }, res) {
        User.findOneAndUpdate({_id: params.id},{$pull: {friend: params.friendId}}, {new:true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id'})
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err))
    }
};

module.exports = userController;