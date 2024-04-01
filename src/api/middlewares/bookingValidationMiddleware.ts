import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const bookingValidationRules = () => {
    return [
        // Validate and sanitize fields.
        body('roomId').not().isEmpty().withMessage('Room ID must not be empty'),
        body('userEmail').isEmail().withMessage('User email must be a valid email address'),
        body('startTime').isISO8601().withMessage('Start time must be a valid date'),
        body('endTime').isISO8601().withMessage('End time must be a valid date'),
    ];
};

export const validateBooking = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};
