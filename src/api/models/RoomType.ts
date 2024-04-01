import mongoose from 'mongoose';


interface IRoomType extends mongoose.Document {
    name: string;
    hourlyRate: number;
    description: string;
}
const roomTypeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    hourlyRate: { type: Number, required: true }
});

const RoomType = mongoose.model<IRoomType>('RoomType', roomTypeSchema);

export default RoomType;
