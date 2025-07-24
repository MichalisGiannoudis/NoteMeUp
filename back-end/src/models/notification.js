import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true
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
  read: {
    type: Boolean,
    default: false,
    required: false,
  },
}, {
  timestamps: true
});

notificationSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    return ret;
  }
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
