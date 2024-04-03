import { Table, Button } from "flowbite-react";
import { HiPencilAlt, HiX } from 'react-icons/hi';

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
const mockBookings: Booking[] = [
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
    const handleEdit = (bookingId: string) => {
        // Logic for handling the edit action
    };

    const handleCancel = (bookingId: string) => {
        // Logic for handling the cancel action
    };

    return (
        <div className="w-full lg:col-span-9">
            <div className="overflow-auto">
                <Table className="min-w-full" hoverable>
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
                        {mockBookings.map((booking) => (
                            <Table.Row key={booking.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {booking.roomNumber}
                                </Table.Cell>
                                <Table.Cell>{booking.customerEmail}</Table.Cell>
                                <Table.Cell>{booking.dateFrom}</Table.Cell>
                                <Table.Cell>{booking.dateTo}</Table.Cell>
                                <Table.Cell>{`$${booking.amount}`}</Table.Cell>
                                <Table.Cell>{`$${booking.refund}`}</Table.Cell>
                                <Table.Cell>{booking.status}</Table.Cell>
                                <Table.Cell>
                                    <div className="flex items-center gap-2">
                                        <Button size="xs" onClick={() => handleEdit(booking.id)}>
                                            <HiPencilAlt className="h-4 w-4" />
                                        </Button>
                                        <Button size="xs" color="failure" onClick={() => handleCancel(booking.id)}>
                                            <HiX className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
}

export default BookingTable;