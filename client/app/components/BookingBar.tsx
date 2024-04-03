import { Table, Button, Modal } from "flowbite-react";
import { HiPencilAlt, HiX } from 'react-icons/hi';
import BookingModal from "./CreateModal";
import DeleteBookingModal from "./DeletModal";
import React, { useState } from "react";
interface Booking {
    id: string;
    roomNumber: string;
    customerEmail: string;
    dateFrom: string;
    dateTo: string;
    amount: number;
    refund: number;
    status: string;
}
// Replace with actual booking data from your API
const initialBookings: Booking[] = [
    {
        id: "b1",
        roomNumber: "101",
        customerEmail: "john.doe@example.com",
        dateFrom: "2024-04-10",
        dateTo: "2024-04-15",
        amount: 500,
        refund: 0,
        status: 'active',
    },
    {
        id: "b2",
        roomNumber: "102",
        customerEmail: "jane.smith@example.com",
        dateFrom: "2024-04-12",
        dateTo: "2024-04-18",
        amount: 750,
        refund: 0,
        status: 'active',
    },
    {
        id: "b3",
        roomNumber: "103",
        customerEmail: "alex.johnson@example.com",
        dateFrom: "2024-05-01",
        dateTo: "2024-05-05",
        amount: 300,
        refund: 0,
        status: 'cancelled',
    },
    // Add more bookings as needed
];


function BookingTable() {
    const [bookings, setBookings] = useState<Booking[]>(initialBookings);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleOpenBookingModal = (booking: Booking) => {
        setSelectedBooking(booking);
        setIsBookingModalOpen(true);
    };

    const handleCloseBookingModal = () => {
        setIsBookingModalOpen(false);
        setSelectedBooking(null);
    };

    const handleOpenDeleteModal = (bookingId: string) => {
        setSelectedBookingId(bookingId);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedBookingId(null);
    };

    const onSave = (updatedBooking: Booking) => {
        const updatedBookings = bookings.map(booking =>
            booking.id === updatedBooking.id ? updatedBooking : booking
        );
        setBookings(updatedBookings);
        handleCloseBookingModal();
    };

    const onDelete = (bookingId: string) => {
        const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
        setBookings(updatedBookings);
        handleCloseDeleteModal();
    };

    return (
        <>
            <div className="overflow-x-auto w-full p-4 my-4 bg-white dark:bg-gray-800 shadow rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white ml-1 mb-4">BOOKINGS</h2>
                <Table hoverable className="min-w-full">
                    <Table.Head>
                        <Table.HeadCell>Room No</Table.HeadCell>
                        <Table.HeadCell>Customer Email</Table.HeadCell>
                        <Table.HeadCell>Date From</Table.HeadCell>
                        <Table.HeadCell>Date To</Table.HeadCell>
                        <Table.HeadCell>Amount</Table.HeadCell>
                        <Table.HeadCell>Refund</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {bookings.map((booking) => (
                            <Table.Row key={booking.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {booking.roomNumber}
                                </Table.Cell>
                                <Table.Cell>{booking.customerEmail}</Table.Cell>
                                <Table.Cell>{booking.dateFrom}</Table.Cell>
                                <Table.Cell>{booking.dateTo}</Table.Cell>
                                <Table.Cell>{`$${booking.amount}`}</Table.Cell>
                                <Table.Cell>{`$${booking.refund}`}</Table.Cell>
                                <Table.Cell>
                                    <span className={`font-semibold ${booking.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                    </span>
                                </Table.Cell>
                                <Table.Cell>


                                    <BookingModal onSave={() => { }} />

                                </Table.Cell>
                                <Table.Cell>



                                    <DeleteBookingModal onSave={() => { }} />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>

            </div>

            {isBookingModalOpen && selectedBooking && (
                <BookingModal
                    booking={selectedBooking}
                    onSave={onSave}
                    onClose={handleCloseBookingModal}
                />
            )}

            {isDeleteModalOpen && selectedBookingId && (
                <DeleteBookingModal
                    bookingId={selectedBookingId}
                    onDelete={onDelete}
                    onClose={handleCloseDeleteModal}
                />
            )}
        </>
    );
}

export default BookingTable;