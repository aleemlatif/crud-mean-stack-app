import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Issue = new Schema({
  title: {
    type: String
  },
  responsible: {
    type: String
  },
  description: {
    type: String
  },
  severity: {
    type: String
  },
  status: {
    type: String,
    default: 'Open'
  },
  creationDate: {
    type: Date
  }
});

export default mongoose.model('Issue', Issue);
