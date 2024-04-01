
import RoomType from '../api/models/RoomType';
const calculateBookingPrice = async (roomTypeId: string, startTime: Date, endTime: Date): Promise<number> => {
    const roomType = await RoomType.findById(roomTypeId);
    if (!roomType) throw new Error('Room type not found');

    const durationHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60); // Convert ms to hours
    return durationHours * roomType.hourlyRate;
};

export default calculateBookingPrice;