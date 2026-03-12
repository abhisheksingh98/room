import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import { useHistory, useParams, Link } from 'react-router-dom';

interface BookingData {
    checkIn: Date;
    checkOut: Date;
    guests: number;
    name: string;
    email: string;
    phone: string;
}

export default function BookingForm() {
    const history = useHistory();
    const { roomId } = useParams<{ roomId: string }>();
    const [step, setStep] = useState(1);
    const [bookingData, setBookingData] = useState<BookingData>({
        checkIn: new Date(),
        checkOut: new Date(),
        guests: 1,
        name: '',
        email: '',
        phone: ''
    });

    const nextStep = () => { setStep(step + 1); }
    const prevStep = () => { setStep(step - 1); }

    const confirmBooking = () => {
        const bookings = JSON.parse(localStorage.getItem('roomsfy_bookings') || '[]');
        bookings.push({ ...bookingData, roomId, id: Date.now() });
        localStorage.setItem('roomsfy_bookings', JSON.stringify(bookings));

        toast.success("Property booked successfully!");
        history.push('/dashboard');
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className='fade-in'>
                        <h3 className='text-2xl font-bold mb-6'>When are you traveling?</h3>
                        <div className='grid gap-4 mb-8'>
                            <div className='flex flex-col gap-2'>
                                <label className='text-xs font-bold uppercase text-slate-400'>Check In</label>
                                <DatePicker
                                    selected={bookingData.checkIn}
                                    onChange={(date: Date) => setBookingData({ ...bookingData, checkIn: date })}
                                    className='input-premium'
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='text-xs font-bold uppercase text-slate-400'>Check Out</label>
                                <DatePicker
                                    selected={bookingData.checkOut}
                                    onChange={(date: Date) => setBookingData({ ...bookingData, checkOut: date })}
                                    className='input-premium'
                                />
                            </div>
                        </div>
                        <button onClick={nextStep} className='btn-primary w-full py-4'>Continue</button>
                    </div>
                );
            case 2:
                return (
                    <div className='fade-in'>
                        <h3 className='text-2xl font-bold mb-6'>Who's coming?</h3>
                        <div className='mb-8'>
                            <label className='text-xs font-bold uppercase text-slate-400 mb-2 block'>Number of guests</label>
                            <input
                                type="number"
                                className='input-premium'
                                value={bookingData.guests}
                                onChange={e => setBookingData({ ...bookingData, guests: parseInt(e.target.value) || 1 })}
                            />
                        </div>
                        <div className='flex gap-4'>
                            <button onClick={prevStep} className='btn-secondary flex-1'>Back</button>
                            <button onClick={nextStep} className='btn-primary flex-1'>Continue</button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className='fade-in'>
                        <h3 className='text-2xl font-bold mb-6'>Final details</h3>
                        <div className='grid gap-4 mb-8'>
                            <input
                                placeholder="Full Name"
                                className='input-premium'
                                value={bookingData.name}
                                onChange={e => setBookingData({ ...bookingData, name: e.target.value })}
                            />
                            <input
                                placeholder="Email Address"
                                className='input-premium'
                                value={bookingData.email}
                                onChange={e => setBookingData({ ...bookingData, email: e.target.value })}
                            />
                        </div>
                        <div className='flex gap-4'>
                            <button onClick={prevStep} className='btn-secondary flex-1'>Back</button>
                            <button onClick={confirmBooking} className='btn-primary flex-1'>Confirm Booking</button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <div className='min-h-screen bg-slate-100 flex items-center justify-center p-6'>
            <div className='bg-white rounded-2xl shadow-lg max-w-md w-full p-8'>
                <Link to="/dashboard" className='text-slate-400 hover:text-slate-900 mb-8 inline-block transition-colors'>
                    <i className="fas fa-arrow-left"></i> Back to search
                </Link>

                <div className='w-full h-1 bg-slate-100 mb-8 rounded-full overflow-hidden'>
                    <div
                        className='h-full bg-primary transition-all duration-500 ease-out'
                        style={{ width: `${(step / 3) * 100}%` }}
                    ></div>
                </div>

                {renderStep()}
            </div>
        </div>
    );
}
