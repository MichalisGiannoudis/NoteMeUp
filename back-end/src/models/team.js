import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    id : {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: false
    },
    teamLead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    status: {
        type: String,
        required: false,
    },
    tags: {
        type: [String],
        required: false,
        default: []
    },
}, {
  timestamps: true
});

teamSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    return ret;
  }
});

const Team = mongoose.model('Team', teamSchema);

export default Team;