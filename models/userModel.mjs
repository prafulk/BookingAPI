import sequelize from '../config/database.mjs';
import { DataTypes } from 'sequelize';
import Booking from './bookingModel.mjs'; 

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    // ... any other attributes if necessary ...
});

// Define the relationships
User.hasMany(Booking, {
    foreignKey: 'userId', // Assuming the 'Booking' table has 'userId' as the foreign key
    as: 'bookings',  // Alias if you fetch a user's bookings: user.getBookings()
    onDelete: 'CASCADE'  // If a user is deleted, its associated bookings will be deleted too.
});

export default User;
