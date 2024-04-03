'use client'
import React from 'react';
import DeleteBookingModal from "./components/DeletModal";
import BookingModal from "./components/CreateModal";
import RoomList from "./components/RoomList";
import BookingSidebar from "./components/BookingBar";
import Analytics from "./components/Analytics";


export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-5">

            <div className="container mx-auto mb-5">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center my-5">
                    HotelSuite
                </h1>
            </div>
            {/* Analytics component */}
            <div className="container mx-auto mb-5">
                <Analytics />
            </div>

            {/* Room list section with heading */}
            <div className="container mx-auto mb-5">
                <RoomList />
            </div>


            <div className="container mx-auto mb-5">
                <BookingSidebar />
            </div>


            {/* <BookingModal onSave={() => { }} />
            <DeleteBookingModal bookingId="123" onDelete={() => { }} /> */}
        </div>
    );
};