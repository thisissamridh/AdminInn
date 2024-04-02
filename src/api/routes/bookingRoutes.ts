import express from "express";

import { createBooking, modifyBooking, cancelBooking, getBookings } from '../controllers/bookingController';
import { bookingValidationRules, validateBooking } from '../middlewares/bookingValidationMiddleware';
import { checkBookingPrice, checkRoomAvailability, getAllRooms } from "../controllers/bookingController";

const router = express.Router();



router.get('/rooms', getAllRooms);

router.get('/availability', checkRoomAvailability);


router.get('/price', checkBookingPrice);

//get all bookings
router.get('/', getBookings);

// crete new booking
router.post('/', bookingValidationRules(), validateBooking, createBooking);

// modidy a booking
router.put('/:id', bookingValidationRules(), validateBooking, modifyBooking);

// cancel an existing booking
router.delete('/:id', cancelBooking);

export default router;