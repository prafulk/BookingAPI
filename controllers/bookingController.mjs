import { createBooking as createBookingInDb, deleteBooking as deleteBookingInDb } from '../models/bookingModel.mjs';

// Create a booking for a user which belongs to the current agent
export const createBooking = async (req, res) => {
    try {
        const { userId, startAt, finishAt } = req.body;
        const agentId = req.headers['X-Agent-Id'];

        // Basic validation
        if (!userId || !startAt || !finishAt) {
            return res.status(400).json({
                success: false,
                message: 'Missing required booking fields.',
            });
        }

        const bookingData = {
            userId,
            agentId,
            startAt,
            finishAt,
        };

        const newBooking = await createBookingInDb(bookingData);

        res.status(201).json({
            success: true,
            message: 'Booking created successfully.',
            data: newBooking,
        });

    } catch (error) {
        console.error(`Error creating booking: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.',
        });
    }
};

// Delete booking
export const deleteBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;

        const result = await deleteBookingInDb(bookingId);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: `No booking found with ID: ${bookingId}`,
            });
        }

        res.status(200).json({
            success: true,
            message: `Booking with ID ${bookingId} deleted successfully.`,
        });

    } catch (error) {
        console.error(`Error deleting booking: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.',
        });
    }
};
