// // RoomList.tsx
// import React, { useState } from 'react';
// import { Card, TextInput, Select, Button } from "flowbite-react";
// import { HiSearch, HiCalendar } from 'react-icons/hi';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// interface RoomInfo {
//     id: string;
//     number: string;
//     description: string;
//     status: 'Available' | 'Booked';
// }

// const mockRooms: RoomInfo[] = [
//     { id: "1", number: "101", description: "Deluxe Room, Ocean View", status: "Available" },
//     { id: "2", number: "102", description: "Standard Room, Garden View", status: "Booked" },
//     { id: "2", number: "102", description: "Standard Room, Garden View", status: "Booked" },
//     { id: "2", number: "102", description: "Standard Room, Garden View", status: "Booked" },
//     { id: "2", number: "103", description: "Standard Room, Garden View", status: "Booked" },
//     { id: "2", number: "102", description: "Standard Room, Garden View", status: "Booked" },
//     { id: "2", number: "102", description: "Standard Room, Garden View", status: "Booked" },
//     { id: "2", number: "102", description: "Standard Room, Garden View", status: "Booked" },
//     { id: "2", number: "102", description: "Standard Room, Garden View", status: "Booked" },
//     { id: "2", number: "102", description: "Standard Room, Garden View", status: "Available" },
//     // ... more rooms
// ];

// const RoomList: React.FC = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filterType, setFilterType] = useState('All');

//     const [startDate, setStartDate] = useState<Date | null>(new Date());
//     const [endDate, setEndDate] = useState<Date | null>(new Date());


//     const filteredRooms = mockRooms.filter(
//         room =>
//             room.number.includes(searchTerm) &&
//             (filterType === 'All' || room.status === filterType)
//     );

//     const handleBookRoom = (roomId: string) => {
//         // Logic to handle room booking
//     };
//     return (
//         <div className="container mx-auto p-4 my-4 bg-white dark:bg-gray-800 shadow rounded-lg">
//             <h2 className="text-2xl font-semibold text-gray-900 dark:text-white ml-1 mb-4">ROOMS</h2>

//             {/* Search and filter UI */}
//             <div className="flex flex-wrap gap-4 mb-4 items-center">
//                 <TextInput icon={HiSearch} placeholder="Search room..." onChange={(e) => setSearchTerm(e.target.value)} />
//                 <Select onChange={(e) => setFilterType(e.target.value)} defaultValue="All">
//                     <option value="All">All</option>
//                     <option value="Available">Available</option>
//                     <option value="Booked">Booked</option>
//                 </Select>
//                 <div className="flex items-center">
//                     <DatePicker
//                         selectsRange={true}
//                         startDate={startDate}
//                         endDate={endDate}
//                         onChange={(dates) => {
//                             const [start, end] = dates as [Date, Date];
//                             setStartDate(start);
//                             setEndDate(end);
//                         }}
//                         placeholderText="Select date range"
//                         className="p-2 border text-black rounded"
//                     />
//                     <HiCalendar className="ml-2 text-gray-500" />
//                 {/* </div> */}
//             </div>

//             {/* Room cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {filteredRooms.map((room) => (
//                     <Card key={room.id} className="mb-4 border border-gray-200">
//                         <div className="flex flex-col p-4">
//                             <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
//                                 Room No - {room.number}
//                             </h5>
//                             <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
//                                 {room.description}
//                             </p>
//                             <p className={`font-semibold mb-4 ${room.status === "Available" ? "text-green-600" : "text-red-600"}`}>
//                                 {room.status}
//                             </p>
//                             {/* Conditionally render the 'Book' button */}
//                             {room.status === "Available" && (
//                                 <Button color="green" onClick={() => handleBookRoom(room.id)}>
//                                     Book
//                                 </Button>
//                             )}
//                         </div>
//                     </Card>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default RoomList;


// RoomList.tsx
import React, { useState, useEffect } from 'react';
import { Card, TextInput, Select, Button } from "flowbite-react";
import { HiSearch, HiCalendar } from 'react-icons/hi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BookingModal from "./CreateModal"; // Ensure this import path is correct

interface RoomInfo {
    id: string;
    roomNumber: string;
    description: string;
    status: 'Available' | 'Booked';
    pricePerHour: number; // Added price per hour for each room
}

const RoomList: React.FC = () => {
    const [rooms, setRooms] = useState<RoomInfo[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [selectedRoom, setSelectedRoom] = useState<RoomInfo | null>(null); // State to keep track of selected room for booking

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('http://3.223.212.138:8080/api/bookings/rooms'); // Adjust if your API endpoint is different
                if (!response.ok) {
                    throw new Error('Failed to fetch rooms');
                }
                const data: RoomInfo[] = await response.json();
                setRooms(data); // Set fetched rooms
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };

        fetchRooms();
    }, []);

    const handleBookRoom = (room: RoomInfo) => {
        setSelectedRoom(room); // Set the selected room for booking
    };

    // Filter rooms based on search term and status
    const filteredRooms = rooms.filter(room =>
        room.roomNumber.includes(searchTerm) &&
        (filterType === 'All' || room.status === filterType)
    );
    return (
        <>
            <div className="container mx-auto p-4 my-4 bg-white dark:bg-gray-800 shadow rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white ml-1 mb-4">ROOMS</h2>

                {/* Search and filter UI */}
                <div className="flex flex-wrap gap-4 mb-4 items-center">
                    <TextInput icon={HiSearch} placeholder="Search room..." onChange={(e) => setSearchTerm(e.target.value)} />
                    <Select onChange={(e) => setFilterType(e.target.value)} defaultValue="All">
                        <option value="All">All</option>
                        <option value="Available">Available</option>
                        <option value="Booked">Booked</option>
                    </Select>
                    <div className="flex items-center">
                        <DatePicker
                            selectsRange={true}
                            startDate={new Date()}
                            endDate={new Date()}
                            onChange={() => { }}
                            placeholderText="Select date range"
                            className="p-2 border text-black rounded"
                        />
                        <HiCalendar className="ml-2 text-gray-500" />
                    </div>
                </div>

                {/* Room cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filteredRooms.map((room) => (
                        <Card key={room.id} className="mb-4 border border-gray-200">
                            <div className="flex flex-col p-4">
                                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Room No - {room.roomNumber}
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
                                    {room.description}
                                </p>
                                <p className="mb-2">Price/hr: ${room.pricePerHour}</p>
                                <p className={`font-semibold mb-4 ${room.status === "Available" ? "text-green-600" : "text-red-600"}`}>
                                    {room.status}
                                </p>
                                {room.status === "Available" && (
                                    <Button color="green" onClick={() => handleBookRoom(room)}>
                                        Book
                                    </Button>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Booking Modal */}
                {selectedRoom && (
                    <BookingModal
                        booking={{
                            roomId: selectedRoom.id,
                            // Include other booking details here. For example:
                            // startDate: selectedRoom.startDate,
                            // endDate: selectedRoom.endDate,
                            // Ensure these properties exist on your selectedRoom object
                        }}
                        onSave={(bookingData) => {
                            console.log(bookingData);
                            setSelectedRoom(null); // Reset selected room after saving
                        }}
                    />
                )}

            </div>
        </>
    );
};

export default RoomList;
