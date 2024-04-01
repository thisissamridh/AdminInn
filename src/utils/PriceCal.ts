
// import RoomType from '../api/models/RoomType';
// const calculateBookingPrice = async (roomTypeId: string, startTime: Date, endTime: Date): Promise<number> => {
//     const roomType = await RoomType.findById(roomTypeId);
//     if (!roomType) throw new Error('Room type not found');

//     const durationHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60); // Convert ms to hours
//     return durationHours * roomType.hourlyRate;
// };

// export default calculateBookingPrice;


import Room from '../api/models/Room';
import RoomType from '../api/models/RoomType';

const calculateBookingPrice = async (roomId: string, startTime: Date, endTime: Date): Promise<number> => {
    try {
        // Retrieve the room document using the room ID
        const room = await Room.findById(roomId);
        if (!room) throw new Error('Room not found');

        // Retrieve the room type ID from the room document
        const roomTypeId = room.type;

        // Retrieve the room type document using the room type ID
        const roomType = await RoomType.findById(roomTypeId);
        if (!roomType) throw new Error('Room type not found');

        // Calculate the duration in hours
        const durationHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

        // Calculate the booking price based on the hourly rate of the room type
        const totalPrice = durationHours * roomType.hourlyRate;

        return totalPrice;
    } catch (error: any) { // Explicitly type error variable as any
        throw new Error(`Error calculating booking price: ${error.message}`);
    }
};

export default calculateBookingPrice;
