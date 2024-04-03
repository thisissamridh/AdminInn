'use client'
import React from 'react';
import DeleteBookingModal from "./components/DeletModal";
import BookingModal from "./components/CreateModal";
import RoomList from "./components/RoomList";
import BookingSidebar from "./components/BookingBar";
import Analytics from "./components/Analytics";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top-level analytics component with added padding and margin */}
            <div className="container mx-auto px-4 pt-4 pb-6">
                <Analytics />
            </div>
            {/* Main content area */}
            <div className="container mx-auto px-4 py-2">
                {/* Use grid layout for responsive design */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Room list occupies less space, e.g., 3 of 12 columns on larger screens */}
                    <div className="lg:col-span-3">
                        <RoomList />
                    </div>
                    {/* Booking table occupies more space, e.g., 9 of 12 columns on larger screens */}
                    <div className="lg:col-span-9">
                        <BookingSidebar />
                    </div>
                </div>
            </div>
            {/* Modals would be conditionally rendered based on state */}
            {/* <BookingModal onSave={() => { }} />
            <DeleteBookingModal bookingId="123" onDelete={() => { }} /> */}
        </div>
    )
}
