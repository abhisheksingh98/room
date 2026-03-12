import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { isAuth } from '../helpers/auth';
import ReviewCard from '../Components/ReviewCard';
import moment from 'moment';

import penthouseImg from '../assets/luxury_penthouse.png';
import studioImg from '../assets/cozy_studio.png';
import villaImg from '../assets/beachside_villa.png';
import cabinImg from '../assets/mountain_cabin.png';

interface Room {
    id: number;
    name: string;
    price: number;
    description: string;
    location: string;
    image: string;
    host: string;
    rating: number;
    reviews: number;
}

interface Review {
    id: number;
    user: string;
    rating: number;
    comment: string;
    date: string;
}

const ALL_ROOMS: Room[] = [
    { id: 1, name: 'Luxury Penthouse', price: 500, description: 'Experience the height of luxury in our penthouse with stunning city views. Features a private terrace, infinity pool access, and designer interiors.', location: 'Downtown', image: penthouseImg, host: 'Sarah J.', rating: 4.9, reviews: 128 },
    { id: 2, name: 'Cozy Studio', price: 120, description: 'A perfect nest for solo travelers or couples. Located in a quiet alley, close to all major attractions but away from the noise.', location: 'Old Town', image: studioImg, host: 'Michael B.', rating: 4.7, reviews: 85 },
    { id: 3, name: 'Beachside Villa', price: 350, description: 'Wake up to the sound of waves. This villa offers direct beach access, a spacious deck, and tropical garden surrounds.', location: 'Coastline', image: villaImg, host: 'Elena R.', rating: 4.8, reviews: 210 },
    { id: 4, name: 'Mountain Cabin', price: 200, description: 'Escape to the serenity of the mountains. This rustic cabin features a wood-burning fireplace and panoramic peak views.', location: 'Highlands', image: cabinImg, host: 'David K.', rating: 4.6, reviews: 64 }
];

const MOCK_REVIEWS: Review[] = [
    { id: 1, user: 'Alice W.', rating: 5, comment: 'Absolutely incredible stay! The views are even better than the photos. Sarah was a fantastic host and helped us with local recommendations.', date: '2023-10-01' },
    { id: 2, user: 'John D.', rating: 4, comment: 'Great location and very clean. Only minor issue was the parking but the host sorted it out quickly. Would stay again.', date: '2023-09-15' },
    { id: 3, user: 'Mark S.', rating: 5, comment: 'Perfect for a weekend getaway. The interior design is stunning and the amenities are top-notch.', date: '2023-08-20' },
    { id: 4, user: 'Emily L.', rating: 5, comment: 'Loved every second here. The private terrace is paradise. Super hosts for a reason!', date: '2023-07-10' }
];

export default function RoomDetails() {
    const { roomId } = useParams<{ roomId: string }>();
    const [room, setRoom] = useState<Room | null>(null);
    const [loading, setLoading] = useState(true);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [currentRating, setCurrentRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            const found = ALL_ROOMS.find(r => r.id === parseInt(roomId));
            setRoom(found || null);
            setLoading(false);
        }, 800);
    }, [roomId]);

    const handleSave = () => {
        if (!room) return;
        const favs = JSON.parse(localStorage.getItem('favs') || '[]');
        favs.push(room.id);
        localStorage.setItem('favs', JSON.stringify(favs));
        alert("Added to favorites!");
    };

    const handleReviewSubmit = () => {
        if (!currentRating || !comment) {
            alert("Please provide both rating and comment");
            return;
        }
        alert("Review submitted successfully!");
        setShowReviewModal(false);
        setComment('');
        setCurrentRating(0);
    };

    if (loading) return <div className='p-20 text-center font-bold'>Searching for your dream room...</div>;
    if (!room) return <div className='p-20 text-center'>Room not found.</div>;

    return (
        <div className='bg-white min-h-screen'>
            <nav className='border-b border-slate-100 py-4 sticky top-0 bg-white z-50'>
                <div className='container mx-auto px-6 flex justify-between items-center'>
                    <Link to="/dashboard" className='text-primary font-bold text-2xl tracking-tighter'>Roomsfy</Link>
                    <div className='flex items-center gap-6'>
                        <Link to="/profile" className='text-slate-600 font-medium hover:text-slate-900'>Profile</Link>
                        {isAuth() ? <span className='text-slate-900 font-bold'>{(isAuth() as any).name}</span> : null}
                    </div>
                </div>
            </nav>

            <div className='container mx-auto px-6 py-8 fade-in'>
                <h1 className='text-3xl font-bold text-slate-900 mb-4'>{room.name}</h1>

                <div className='flex items-center justify-between mb-6'>
                    <div className='flex items-center gap-2 text-sm'>
                        <span className='font-bold flex items-center'><i className='fas fa-star text-primary mr-1'></i> {room.rating}</span>
                        <span className='text-slate-400'>•</span>
                        <span className='underline font-medium'>{room.reviews} reviews</span>
                        <span className='text-slate-400'>•</span>
                        <span className='underline font-medium'>{room.location}</span>
                    </div>
                    <div className='flex items-center gap-4 text-sm font-medium'>
                        <button className='flex items-center gap-2 hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors'><i className='far fa-share-square'></i> Share</button>
                        <button
                            className='flex items-center gap-2 hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors'
                            onClick={handleSave}
                        >
                            <i className='far fa-heart'></i> Save
                        </button>
                    </div>
                </div>

                <div className='grid grid-cols-4 grid-rows-2 gap-2 h-[450px] rounded-2xl overflow-hidden mb-10'>
                    <div className='col-span-2 row-span-2 bg-slate-200'>
                        <img src={room.image} className='w-full h-full object-cover hover:brightness-90 transition-all cursor-pointer' alt={room.name} />
                    </div>
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className='bg-slate-200'>
                            <img src={room.image} className='w-full h-full object-cover hover:brightness-90 transition-all cursor-pointer' alt={`${room.name} ${i}`} />
                        </div>
                    ))}
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-16'>
                    <div className='lg:col-span-2'>
                        <div className='flex justify-between items-start pb-8 border-b border-slate-100 mb-8'>
                            <div>
                                <h2 className='text-2xl font-bold text-slate-900'>Entire rental unit hosted by {room.host}</h2>
                                <p className='text-slate-600 mt-1'>2 guests • 1 bedroom • 1 bed • 1 bath</p>
                            </div>
                            <div className='w-14 h-14 bg-slate-100 rounded-full overflow-hidden flex items-center justify-center'>
                                <i className='fas fa-user text-2xl text-slate-400'></i>
                            </div>
                        </div>

                        <div className='space-y-6 pb-8 border-b border-slate-100 mb-8'>
                            <div className='flex gap-4'>
                                <i className='fas fa-door-open text-2xl text-slate-400 w-8'></i>
                                <div>
                                    <p className='font-bold text-slate-900'>Self check-in</p>
                                    <p className='text-slate-500 text-sm'>Check yourself in with the lockbox.</p>
                                </div>
                            </div>
                            <div className='flex gap-4'>
                                <i className='fas fa-medal text-2xl text-slate-400 w-8'></i>
                                <div>
                                    <p className='font-bold text-slate-900'>{room.host} is a Superhost</p>
                                    <p className='text-slate-500 text-sm'>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
                                </div>
                            </div>
                            <div className='flex gap-4'>
                                <i className='far fa-calendar-check text-2xl text-slate-400 w-8'></i>
                                <div>
                                    <p className='font-bold text-slate-900'>Free cancellation before {moment().add(2, 'days').format('MMMM Do')}</p>
                                </div>
                            </div>
                        </div>

                        <div className='pb-8 border-b border-slate-100 mb-8'>
                            <h3 className='text-xl font-bold mb-4'>About this space</h3>
                            <p className='text-slate-700 leading-relaxed whitespace-pre-line'>
                                {room.description}
                                {"\n\n"}
                                Relax and unwind in this meticulously designed space. Whether you are visiting for business or leisure, our room provides the perfect blend of comfort and style.
                            </p>
                        </div>
                    </div>

                    <div className='relative'>
                        <div className='sticky top-28 border border-slate-200 rounded-2xl p-6 shadow-xl'>
                            <div className='flex justify-between items-center mb-6'>
                                <div className='text-2xl font-bold'>${room.price} <span className='text-base font-normal text-slate-500'>night</span></div>
                                <div className='text-sm'><i className='fas fa-star mr-1'></i> {room.rating} • {room.reviews} reviews</div>
                            </div>

                            <div className='border border-slate-400 rounded-xl mb-4 overflow-hidden'>
                                <div className='grid grid-cols-2 border-b border-slate-400'>
                                    <div className='p-3 border-r border-slate-400'>
                                        <label className='block text-[10px] font-extrabold uppercase'>Check-in</label>
                                        <div className='text-sm'>{moment().format('MM/DD/YYYY')}</div>
                                    </div>
                                    <div className='p-3'>
                                        <label className='block text-[10px] font-extrabold uppercase'>Checkout</label>
                                        <div className='text-sm'>{moment().add(3, 'days').format('MM/DD/YYYY')}</div>
                                    </div>
                                </div>
                                <div className='p-3'>
                                    <label className='block text-[10px] font-extrabold uppercase'>Guests</label>
                                    <div className='text-sm'>1 guest</div>
                                </div>
                            </div>

                            <Link
                                to={'/book/' + room.id}
                                className='btn-primary w-full py-4 text-lg font-bold block text-center no-underline hover:brightness-95'
                            >
                                Reserve
                            </Link>

                            <p className='text-slate-500 text-sm text-center mt-4 italic font-medium'>You won't be charged yet</p>

                            <div className='space-y-3 mt-6'>
                                <div className='flex justify-between text-slate-600 underline'>
                                    <span>${room.price} x 3 nights</span>
                                    <span>${room.price * 3}</span>
                                </div>
                                <div className='flex justify-between text-slate-600 underline'>
                                    <span>Cleaning fee</span>
                                    <span>$45</span>
                                </div>
                                <div className='flex justify-between text-slate-600 underline'>
                                    <span>Service fee</span>
                                    <span>$22</span>
                                </div>
                                <div className='border-t border-slate-200 mt-4 pt-4 flex justify-between font-bold text-lg'>
                                    <span>Total</span>
                                    <span>${(room.price * 3) + 45 + 22}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-16 pt-16 border-t border-slate-100'>
                    <div className='flex justify-between items-center mb-8'>
                        <h3 className='text-2xl font-bold flex items-center gap-2'>
                            <i className='fas fa-star text-primary'></i> {room.rating} • {room.reviews} reviews
                        </h3>
                        {isAuth() && (
                            <button
                                onClick={() => setShowReviewModal(true)}
                                className='btn-secondary text-sm py-2 px-4'
                            >
                                Write a review
                            </button>
                        )}
                    </div>

                    {showReviewModal && (
                        <div className='fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center'>
                            <div className='bg-white max-w-lg w-full mx-4 rounded-2xl p-8 shadow-2xl relative'>
                                <button onClick={() => setShowReviewModal(false)} className='absolute top-4 right-4 text-2xl'>&times;</button>
                                <h2 className='text-2xl font-bold mb-6'>Share your experience</h2>

                                <div className='space-y-4'>
                                    <div>
                                        <label className='block text-sm font-bold mb-2'>Rating</label>
                                        <div className='flex gap-2 text-2xl'>
                                            {[1, 2, 3, 4, 5].map(s => (
                                                <i
                                                    key={s}
                                                    className={`fas fa-star cursor-pointer transition-colors ${s <= currentRating ? 'text-primary' : 'text-slate-200'}`}
                                                    onClick={() => setCurrentRating(s)}
                                                ></i>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className='block text-sm font-bold mb-2'>Comment</label>
                                        <textarea
                                            className='w-full border border-slate-300 rounded-xl p-4 h-32'
                                            placeholder='What did you love about this stay?'
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <button
                                        className='btn-primary w-full py-4'
                                        onClick={handleReviewSubmit}
                                    >
                                        Submit Review
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10'>
                        {MOCK_REVIEWS.map(rev => (
                            <ReviewCard key={rev.id} review={rev} />
                        ))}
                    </div>

                    <button className='mt-12 bg-white border border-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors'>
                        Show all {room.reviews} reviews
                    </button>
                </div>
            </div>
        </div>
    );
}
