const {User, Thought} = require('../models')

const thoughtController = {
    getAllthought(req, res) {
        Thought.find({})
        .select('-__v')
        .sort({_id:-1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
    },

    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
    },

    createThought({params, body}, res) {
        console.log(params.userId);
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$push: {thoughts: _id}},
                {new:true}
            )
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id'});
                return
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err))
    },

    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No pizza found with this id!'});
                return
            }
            res.json(dbThoughtData)

        })
        .catch(err => res.json(err))
    },

    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err))
    },

    addReaction({params, body}, res){
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new:true,runValidators: true})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message:'No thoughtId found with this id'})
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err))
    },

    deleteReaction({params}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {replyId: params.replyId}}},
            {new:true}
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err))
    }
}


module.exports = thoughtController