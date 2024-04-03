// RoomList.tsx
import React, { useState } from 'react';
import { Card, TextInput, Select } from "flowbite-react";
import { HiSearch } from 'react-icons/hi';

interface RoomInfo {
    id: string;
    number: string;
    description: string;
    status: 'Available' | 'Booked';
}

const mockRooms: RoomInfo[] = [
    { id: "1", number: "101", description: "Deluxe Room, Ocean View", status: "Available" },
    { id: "2", number: "102", description: "Standard Room, Garden View", status: "Booked" },
    // ... more rooms
];

const RoomList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');

    const filteredRooms = mockRooms.filter(
        room =>
            room.number.includes(searchTerm) &&
            (filterType === 'All' || room.status === filterType)
    );

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">ROOMS</h2>
            <div className="flex gap-4 mb-4">
                <div className="flex items-center max-w-xs">
                    <TextInput
                        icon={HiSearch}
                        placeholder="Search room..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select
                    onChange={(e) => setFilterType(e.target.value)}
                    defaultValue="All"
                >
                    <option value="All">All</option>
                    <option value="Available">Available</option>
                    <option value="Booked">Booked</option>
                </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRooms.map((room) => (
                    <Card key={room.id} className="mb-4 border border-gray-200">
                        <div className="flex flex-col">
                            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Room No - {room.number}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
                                {room.description}
                            </p>
                            <p className={`font-semibold ${room.status === "Available" ? "text-green-600" : "text-red-600"}`}>
                                {room.status}
                            </p>
                            {/* You can add more interactive elements here */}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default RoomList;
