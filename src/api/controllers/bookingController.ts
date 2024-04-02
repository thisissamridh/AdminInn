import { Request, Response } from 'express';
import { createBooking as createBookingService, modifyBooking as modifyBookingService, cancelBooking as cancelBookingService, getBookings as getBookingsService } from '../services/bookingService';

// Controller for creating a booking
export const createBooking = async (req: Request, res: Response) => {
    try {
        const { roomId, userEmail, startTime, endTime } = req.body;
        console.log(req.body);
        const booking = await createBookingService(roomId, userEmail, new Date(startTime), new Date(endTime));
        res.status(201).json(booking);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
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
