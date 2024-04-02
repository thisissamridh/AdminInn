import { Booking, IBooking } from '../models/Booking';
import { checkRoomAvailability } from './roomService'; // Import the availability check function
import calculateBookingPrice from '../../utils/PriceCal';
import Room from '../models/Room';
import RoomType from '../models/RoomType';
const createBooking = async (roomId: string, userEmail: string, startTime: Date, endTime: Date): Promise<IBooking> => {
  // Check room availability
  const isAvailable = await checkRoomAvailability(roomId, startTime, endTime);
  if (!isAvailable) throw new Error('Room is not available for the selected time range');

  const room = await Room.findById(roomId);
  if (!room) throw new Error('Room not found');

  const roomTypeId = room.type;
  const roomType = await RoomType.findById(roomTypeId);
  if (!roomType) throw new Error('Room type not found');

  // Extract room type name from the room type document
  const roomTypeName = roomType.name;

  // Calculate booking price
  const price = await calculateBookingPrice(roomId, startTime, endTime);

  // Create and save the booking
  const booking = new Booking({
    room: roomId,
    roomType: roomTypeName,
    userEmail: userEmail,
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
  // Find the booking to be canceled
  const booking = await Booking.findById(bookingId);
  if (!booking) throw new Error('Booking not found');

  // Calculate the difference between the booking start time and the current time
  const currentTime = new Date();
  const bookingStartTime = booking.startTime;
  const timeDifferenceInHours = Math.abs(bookingStartTime.getTime() - currentTime.getTime()) / (1000 * 3600);

  // Calculate refund percentage based on the time difference
  let refundPercentage;
  if (timeDifferenceInHours > 48) {
    refundPercentage = 100; // Complete refund if booking start time is more than 48 hrs
  } else if (timeDifferenceInHours >= 24 && timeDifferenceInHours <= 48) {
    refundPercentage = 50; // 50% refund if booking start time is within 24-48 hrs
  } else {
    refundPercentage = 0; // No refund if booking start time is less than 24 hrs
  }

  // Calculate the refund amount
  const refundAmount = (refundPercentage / 100) * booking.price;

  // Update the booking status and refund amount
  const cancelledBooking = await Booking.findByIdAndUpdate(
    bookingId,
    {
      status: 'Cancelled',
      refundAmount: refundAmount
    },
    { new: true }
  );

  if (!cancelledBooking) throw new Error('Booking not found');
  return cancelledBooking;
};


const getBookings = async (filters: any) => {
  const query: any = {};
  // email
  if (filters.userEmail) {
    query.userEmail = filters.userEmail;
  }
  // status
  if (filters.status) {
    query.status = filters.status;
  }
  // room type
  if (filters.roomType) {
    query.roomType = filters.roomType;
  }

  // Date range filtering
  if (filters.startDate && filters.endDate) {
    query.startTime = {
      $gte: new Date(filters.startDate),
      $lte: new Date(filters.endDate)
    };
  }
  let bookings;
  if (query.status === 'Cancelled') {
    // If status is "Cancelled", include refundAmount and _id fields
    bookings = await Booking.find(query).select('room userEmail startTime endTime price status refundAmount').exec();
  } else {
    // Otherwise, exclude refundAmount field
    bookings = await Booking.find(query).select('-refundAmount').exec();
  }

  bookings = await Booking.find(query).exec();
  return bookings;
};


export { getBookings, createBooking, modifyBooking, cancelBooking };