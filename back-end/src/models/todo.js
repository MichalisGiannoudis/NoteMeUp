import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    id : {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low',
        required: false
    },
    dueDate: {
        type: Date,
        required: false
    },
    type: {
        type: String,
        enum: ['personal', 'work', 'home', 'errand', 'other'],
        default: 'personal',
        required: true,
        trim: true,
    },
    isCompleted: {
        type: Boolean,
        required: false,
        default: false
    },
    tags: {
        type: [String],
        required: false,
        default: []
    }
}, {
  timestamps: true
});

todoSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    return ret;
  }
});

const ToDo = mongoose.model('ToDo', todoSchema);

export default ToDo;
