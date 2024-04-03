import mongoose from 'mongoose';

interface IBooking extends Document {
    room: mongoose.Schema.Types.ObjectId;
    roomType: string;
    userEmail: string;
    startTime: Date;
    endTime: Date;
    price: number;
    status: string;
    refundAmount: number;
}

const bookingSchema = new mongoose.Schema({
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    roomType: { type: String },
    userEmail: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true, default: 'Confirmed' },
    refundAmount: { type: Number, default: 0 }
});

const Booking = mongoose.model<IBooking>('Booking', bookingSchema);

export { Booking, IBooking };;
