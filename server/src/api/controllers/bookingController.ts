import { Request, Response } from 'express';
import { createBooking as createBookingService, modifyBooking as modifyBookingService, cancelBooking as cancelBookingService, getBookings as getBookingsService } from '../services/bookingService';
import { checkRoomAvailability as checkRoomAvailabilityService } from '../services/roomService';
import calculateBookingPrice from '../../utils/PriceCal';
import Room from '../models/Room';
import RoomType from '../models/RoomType';
// Controller for creating a booking
export const createBooking = async (req: Request, res: Response) => {
    try {
        const { roomId, userEmail, startTime, endTime } = req.body;

        const booking = await createBookingService(roomId, userEmail, new Date(startTime), new Date(endTime));
        res.status(201).json(booking);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};


// Controller for getting room type by ObjectId
export const getRoomType = async (req: Request, res: Response) => {
    try {
        console.log(req.params);
        const { roomTypeId } = req.params; // Access roomTypeId from URL path

        // Find the room type by ObjectId
        const roomType = await RoomType.findById(roomTypeId);

        if (!roomType) {
            return res.status(404).json({ message: 'Room type not found' });
        }

        res.status(200).json(roomType);
    } catch (error: any) {
        res.status(500).json({ message: 'An error occurred while fetching room type', error: error.message });
    }
};


// Controller for modifying a booking
export const modifyBooking = async (req: Request, res: Response) => {
    try {
        const { newRoomId, newStartTime, newEndTime } = req.body;
        const bookingId = req.params.id;
        const updatedBooking = await modifyBookingService(bookingId, newRoomId, new Date(newStartTime), new Date(newEndTime));
        res.status(200).json(updatedBooking);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// Controller for canceling a booking
export const cancelBooking = async (req: Request, res: Response) => {
    try {
        const bookingId = req.params.id;
        const cancelledBooking = await cancelBookingService(bookingId);
        res.status(200).json(cancelledBooking);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};





// Controller for fetching bookings
export const getBookings = async (req: Request, res: Response) => {
    try {
        const filters = req.query;
        const bookings = await getBookingsService(filters);
        res.status(200).json(bookings);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'An error occurred while fetching bookings.', error: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};




export const checkRoomAvailability = async (req: Request, res: Response) => {
    try {
        const roomId = req.query.roomId as string;
        const startTime = req.query.startTime as string;
        const endTime = req.query.endTime as string;

        const isAvailable = await checkRoomAvailabilityService(roomId, new Date(startTime), new Date(endTime));
        res.json({ available: isAvailable });
    } catch (error) {
        console.error('Error checking room availability:', error);
        res.status(500).json({ error: 'An error occurred while checking room availability' });
    }
};


export const checkBookingPrice = async (req: Request, res: Response) => {
    try {
        const roomId = req.query.roomId as string;
        const startTime = req.query.startTime as string;
        const endTime = req.query.endTime as string;
        const price = await calculateBookingPrice(roomId, new Date(startTime), new Date(endTime));
        res.json({ price });
    } catch (error) {
        console.error('Error retrieving room price:', error);
        res.status(500).json({ error: 'An error occurred while retrieving room price' });
    }

};


export const getAllRooms = async (req: Request, res: Response) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (error) {
        console.error('Error retrieving rooms:', error);
        res.status(500).json({ error: 'An error occurred while retrieving rooms' });
    }
};