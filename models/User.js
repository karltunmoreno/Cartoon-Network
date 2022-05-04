const {Schema, model} = require('mongoose')


const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        match: [/.+@.+\..+/]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref:'Thought'
        }
    ],
    friend:
    [
        {
            type: Schema.Types.ObjectId,
            ref:'User'
        }
    ]
    },
    {
        toJSON: {
            virtuals:true,
        },
        id: false
    }
    )


UserSchema.virtual('friendCount').get(function(){
    return this.friend.length
})     

const User = model('User', UserSchema);

