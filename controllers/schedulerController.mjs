import { fetchBookingsForWeek } from '../models/bookingModel.mjs'; // A hypothetical database/model layer

// Get bookings for a specific week.
export const getBookingsForWeek = async (req, res) => {
    try {
        const weekDate = req.query.week;

        // Validate the weekDate
        if (!weekDate || !isValidDate(weekDate)) { // isValidDate is a function you might define to check date format
            return res.status(400).json({
                success: false,
                message: 'Invalid or missing week date.',
            });
        }

        // Retrieve bookings and user data for the specified week from the database.
        const bookings = await fetchBookingsForWeek(weekDate, req.agentId);

        // Check if bookings exist
        if (bookings.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No bookings found for the week of ${weekDate}`,
            });
        }

        res.json({
            success: true,
            data: bookings,
        });

    } catch (error) {
        console.error(`Error fetching bookings for the week: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.',
        });
    }
};

// Helper function to validate date format
const isValidDate = (dateString) => {
    // A basic check for YYYY-MM-DD format; you can expand on this
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
};
