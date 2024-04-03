import Room from '../models/Room';
import { Booking } from '../models/Booking';

export const checkRoomAvailability = async (roomId: string, startTime: Date, endTime: Date): Promise<boolean> => {
    // Check if the room exists
    const room = await Room.findById(roomId);
    if (!room) {
        throw new Error('Room not found');
    }

    // Check for overlapping bookings, excluding canceled ones
    const overlappingBookings = await Booking.find({
        room: roomId,
        status: { $ne: 'Cancelled' }, // Exclude canceled bookings
        $or: [
            { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, // Overlaps with the requested time range
        ],
    });

    return overlappingBookings.length === 0; // Room is available if there are no overlapping non-canceled bookings
};
