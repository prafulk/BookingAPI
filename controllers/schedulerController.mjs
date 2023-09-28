import { getBookingsForWeek } from '../models/bookingModel.mjs';

// Returns all bookings and user data for a specific week for the authenticated agent
const getWeeklyBookings = async (req, res, next) => {
    try {
        const agentId = req.agentId;

        // Week date format can be YYYY-MM-DD representing the start of the week (like a Monday)
        const weekStartDate = req.query.week;

        if (!weekStartDate) {
            return res.status(400).json({ error: 'Week date parameter is missing.' });
        }

        const bookings = await getBookingsForWeek(agentId, weekStartDate);

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for the specified week.' });
        }

        res.status(200).json(bookings);
    } catch (error) {
        next(error);
    }
};

export {
    getWeeklyBookings
};
