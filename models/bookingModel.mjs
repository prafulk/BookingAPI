import sequelize from '../config/database.mjs';
import { DataTypes } from 'sequelize';
import Agent from './agentModel.mjs';  // Assuming you have this model defined
import User from './userModel.mjs';  // Assuming you have this model defined

const Booking = sequelize.define('Booking', {
    start_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    finish_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    // ... potentially other attributes ...
});

// Define the relationships
Booking.belongsTo(User, {
    foreignKey: 'userId', // Assuming the 'Booking' table has 'userId' as the foreign key
    as: 'user',  // Alias if you fetch the user of a booking: booking.getUser()
    onDelete: 'CASCADE'  // If a booking is deleted, its association with the user will also be removed.
});

Booking.belongsTo(Agent, {
    foreignKey: 'agentId', // Assuming the 'Booking' table has 'agentId' as the foreign key
    as: 'agent',  // Alias if you fetch the agent of a booking: booking.getAgent()
    onDelete: 'CASCADE'  // If a booking is deleted, its association with the agent will also be removed.
});

export default Booking;
