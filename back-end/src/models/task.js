import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    id : {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    targetGroup: {
        type: String,
        required: false,
        trim: true
    },
    status: {
        type: String,
        default: false,
        required: false,
    },
    tags: {
        type: [String],
        required: false,
        default: []
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
        required: false
    }
}, {
  timestamps: true
});

taskSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    return ret;
  }
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
