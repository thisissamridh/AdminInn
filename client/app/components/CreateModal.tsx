import { useState } from "react";
import { Button, Modal, TextInput, Label } from "flowbite-react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Booking {
    email?: string;
    roomId?: string;
    startDate?: Date;
    endDate?: Date;
}

interface BookingModalProps {
    booking?: Booking;
    onSave: (bookingData: Booking) => void;
}

function BookingModal({ booking, onSave }: BookingModalProps) {
    const [openModal, setOpenModal] = useState(false);
    // If a booking is passed in, we use that as our initial state, otherwise we use default values
    const [formData, setFormData] = useState<Booking>({
        email: booking?.email || '',
        roomId: booking?.roomId || '',
        startDate: booking?.startDate || new Date(),
        endDate: booking?.endDate || new Date(),
    });

    const handleSave = () => {
        onSave(formData);
        setOpenModal(false);
    };

    return (
        <>
            <Button onClick={() => setOpenModal(true)}>
                {booking ? 'Modify Booking' : 'Book Room'}
            </Button>
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header>
                    {booking ? 'Modify Booking' : 'New Booking'}
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6 px-6">
                        <div>
                            <Label htmlFor="email" value="Customer Email" />
                            <TextInput
                                id="email"
                                type="email"
                                placeholder="customer@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="roomId" value="Room ID" />
                            <TextInput
                                id="roomId"
                                type="text"
                                placeholder="Room ID"
                                value={formData.roomId}
                                onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="startDate" value="Start Date" />
                            <DatePicker
                                id="startDate"
                                selected={formData.startDate}
                                onChange={(date: Date) => setFormData({ ...formData, startDate: date })}
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="endDate" value="End Date" />
                            <DatePicker
                                id="endDate"
                                selected={formData.endDate}
                                onChange={(date: Date) => setFormData({ ...formData, endDate: date })}
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                required
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                Cancel
                            </Button>
                            <Button color="success" onClick={handleSave}>
                                {booking ? 'Update Booking' : 'Create Booking'}
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default BookingModal;
