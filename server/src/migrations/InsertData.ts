import RoomType from '../api/models/RoomType';
import Room from '../api/models/Room';


// Function to connect to MongoDB
export const insertdata = async () => {
    try {
        await insertRoomTypes();
        await insertRooms();
        console.log('Database population completed successfully. Connection closed.');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

// Define room types data
const roomTypesData = [
    { name: 'Deluxe', description: 'A deluxe room with sea view', hourlyRate: 100 },
    { name: 'Standard', description: 'A standard room with city view', hourlyRate: 80 },
    { name: 'Economy', description: 'An economy room for budget travelers', hourlyRate: 50 }
];

// Function to insert room types data into the database
const insertRoomTypes = async () => {
    try {
        // Clear existing room types data
        await RoomType.deleteMany({});

        // Insert new room types data
        await RoomType.insertMany(roomTypesData);
        console.log('Room types data inserted successfully.');
    } catch (error) {
        console.error('Error inserting room types data:', error);
    }
};

// Define room data with references to room types
const roomsData = [
    // Room type A: Deluxe
    { roomNumber: '101', type: 'Deluxe', floor: '1st', features: ['Sea view', 'King-sized bed'] },
    { roomNumber: '102', type: 'Deluxe', floor: '1st', features: ['Sea view', 'Queen-sized bed'] },

    // Room type B: Standard
    { roomNumber: '201', type: 'Standard', floor: '2nd', features: ['City view', 'King-sized bed'] },
    { roomNumber: '202', type: 'Standard', floor: '2nd', features: ['City view', 'Queen-sized bed'] },
    { roomNumber: '203', type: 'Standard', floor: '2nd', features: ['City view', 'Twin beds'] },

    // Room type C: Economy
    { roomNumber: '301', type: 'Economy', floor: '3rd', features: ['Budget-friendly', 'Single bed'] },
    { roomNumber: '302', type: 'Economy', floor: '3rd', features: ['Budget-friendly', 'Single bed'] },
    { roomNumber: '303', type: 'Economy', floor: '3rd', features: ['Budget-friendly', 'Single bed'] },
    { roomNumber: '304', type: 'Economy', floor: '3rd', features: ['Budget-friendly', 'Single bed'] },
    { roomNumber: '305', type: 'Economy', floor: '3rd', features: ['Budget-friendly', 'Single bed'] }
];


// Function to insert rooms data into the database
const insertRooms = async () => {
    try {
        // Retrieve Room Type IDs
        const roomTypes = await RoomType.find({});
        const roomTypeMap: Record<string, string> = {};
        roomTypes.forEach(roomType => {
            roomTypeMap[roomType.name] = roomType._id;
        });

        // Clear existing rooms data
        await Room.deleteMany({});

        // Insert new rooms data
        const roomsWithReferences = roomsData.map(room => ({
            ...room,
            type: roomTypeMap[room.type]
        }));
        await Room.insertMany(roomsWithReferences);

        console.log('Rooms data inserted successfully.');
    } catch (error) {
        console.error('Error inserting rooms data:', error);
    }
};

insertdata();
