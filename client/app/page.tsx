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
            {/* Analytics component at the top */}
            <div className="mb-4">
                <Analytics />
            </div>

            {/* Room list component in the middle */}
            <div className="mb-4">
                <RoomList />
            </div>

            {/* Booking table (sidebar) at the bottom */}
            <div className="mb-4">
                <BookingSidebar />
            </div>

            {/* Modals would be conditionally rendered based on state */}
            {/* <BookingModal onSave={() => { }} />
                <DeleteBookingModal bookingId="123" onDelete={() => { }} /> */}
        </div>
    );
};