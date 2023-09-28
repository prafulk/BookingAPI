import sequelize from '../config/database.mjs';
import { DataTypes } from 'sequelize';
import Booking from './bookingModel.mjs';  // Assuming you have this model defined
import User from './userModel.mjs';  // Assuming you have this model defined

const Agent = sequelize.define('Agent', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    // There might be other attributes like 'role' based on the previous structure
});

// Define the relationships
Agent.hasMany(Booking, {
    foreignKey: 'agentId', // Assuming the 'Booking' table has 'agentId' as the foreign key
    as: 'bookings',  // Alias if you fetch an agent's bookings: agent.getBookings()
    onDelete: 'CASCADE'  // If an agent is deleted, its associated bookings will be deleted too.
});

Agent.hasMany(User, {
    foreignKey: 'agentId', // Assuming the 'User' table has 'agentId' as the foreign key
    as: 'users',  // Alias if you fetch an agent's users: agent.getUsers()
    onDelete: 'CASCADE'  // If an agent is deleted, its associated users will be deleted too.
});

export default Agent;
