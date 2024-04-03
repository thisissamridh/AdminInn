import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true, unique: true },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'RoomType', required: true },
    floor: String,
    features: [String]
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
