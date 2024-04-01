import mongoose from 'mongoose';

interface IBooking extends Document {
    room: mongoose.Schema.Types.ObjectId;
    userEmail: string;
    startTime: Date;
    endTime: Date;
    price: number;
    status: string;
}

const bookingSchema = new mongoose.Schema({
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    userEmail: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true, default: 'Confirmed' }
});

const Booking = mongoose.model<IBooking>('Booking', bookingSchema);

export { Booking, IBooking };;
