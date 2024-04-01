import RoomType from '../models/RoomType';
import { Booking, IBooking } from '../models/Booking';
import { checkRoomAvailability } from './roomService'; // Import the availability check function
import calculateBookingPrice from '../../utils/PriceCal';
const createBooking = async (roomId: string, userId: string, startTime: Date, endTime: Date): Promise<IBooking> => {
  // Check room availability
  const isAvailable = await checkRoomAvailability(roomId, startTime, endTime);
  if (!isAvailable) throw new Error('Room is not available for the selected time range');

  // Calculate booking price
  const price = await calculateBookingPrice(roomId, startTime, endTime);

  // Create and save the booking
  const booking = new Booking({
    room: roomId,
    user: userId,
    startTime,
    endTime,
    price
  });

  await booking.save();
  return booking;
};

const modifyBooking = async (bookingId: string, newRoomId: string, newStartTime: Date, newEndTime: Date): Promise<IBooking> => {
  // Check availability of the new room
  const isAvailable = await checkRoomAvailability(newRoomId, newStartTime, newEndTime);
  if (!isAvailable) throw new Error('Room is not available for the selected time range');

  // Calculate new price
  const newPrice = await calculateBookingPrice(newRoomId, newStartTime, newEndTime);

  // Find and update the booking
  const updatedBooking = await Booking.findByIdAndUpdate(
    bookingId,
    {
      room: newRoomId,
      startTime: newStartTime,
      endTime: newEndTime,
      price: newPrice
    },
    { new: true } // Return the modified document
  );

  if (!updatedBooking) throw new Error('Booking not found');
  return updatedBooking;
};


const cancelBooking = async (bookingId: string): Promise<IBooking> => {
  const cancelledBooking = await Booking.findByIdAndUpdate(
    bookingId,
    { status: 'Cancelled' }, // Assuming you have a status field to indicate cancellation
    { new: true }
  );

  if (!cancelledBooking) throw new Error('Booking not found');
  return cancelledBooking;
};



