import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuth, signout } from '../helpers/auth';
import moment from 'moment';

var Profile = function ({ history }) {
    var [user, setUser] = useState(null);
    var [bookings, setBookings] = useState([]);
    var [favorites, setFavorites] = useState([]);

    useEffect(function () {
        console.log("Loading Profile Page (Ugly UseEffect)");
        if (!isAuth()) {
            history.push('/login');
            return;
        }

        // MONOLITHIC DATA FETCH
        setUser(isAuth());

        // Mock Bookings
        var mock = [
            { id: 101, roomName: 'Luxury Penthouse', date: moment().subtract(5, 'days').format('MMM Do, YYYY'), price: 500, status: 'Completed' },
            { id: 102, roomName: 'Cozy Studio', date: moment().add(10, 'days').format('MMM Do, YYYY'), price: 120, status: 'Upcoming' }
        ];
        setBookings(mock);

        // Favorites from LocalStorage (Brittle)
        var favIds = JSON.parse(localStorage.getItem('favs') || '[]');
        var all_rooms = [
            { id: 1, name: 'Luxury Penthouse', price: 500, location: 'Downtown', image: require('../assets/luxury_penthouse.png').default },
            { id: 2, name: 'Cozy Studio', price: 120, location: 'Old Town', image: require('../assets/cozy_studio.png').default },
            { id: 3, name: 'Beachside Villa', price: 350, location: 'Coastline', image: require('../assets/beachside_villa.png').default },
            { id: 4, name: 'Mountain Cabin', price: 200, location: 'Highlands', image: require('../assets/mountain_cabin.png').default }
        ];
        var filtered = all_rooms.filter(function (r) { return favIds.indexOf(r.id) !== -1; });
        setFavorites(filtered);

    }, []);

    var handleLogout = function () {
        signout(function () {
            history.push('/');
        });
    };

    if (!user) return null;

    return (
        <div className='bg-slate-50 min-h-screen'>
            {/* Header */}
            <nav className='bg-white border-b border-slate-200 py-4 mb-8'>
                <div className='container mx-auto px-6 flex justify-between items-center'>
                    <Link to="/dashboard" className='text-primary font-bold text-2xl tracking-tighter'>Roomsfy</Link>
                    <button
                        onClick={handleLogout}
                        className='text-slate-600 font-bold hover:text-primary transition-colors'
                    >
                        Sign Out
                    </button>
                </div>
            </nav>

            <div className='container mx-auto px-6 pb-20'>
                <div className='grid grid-cols-4 gap-12'>
                    {/* User Card */}
                    <div className='col-span-1'>
                        <div className='bg-white rounded-3xl p-8 border border-slate-200 shadow-sm'>
                            <div className='w-24 h-24 bg-slate-900 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold'>
                                {user.name.charAt(0)}
                            </div>
                            <div className='text-center mb-8'>
                                <h2 className='text-2xl font-bold text-slate-900'>{user.name}</h2>
                                <p className='text-slate-500'>Guest</p>
                            </div>
                            <div className='space-y-4 pt-8 border-t border-slate-100 font-bold'>
                                <p className='flex items-center gap-3 text-slate-700'><i className='fas fa-shield-alt text-slate-400'></i> Identity verified</p>
                                <p className='flex items-center gap-3 text-slate-700'><i className='fas fa-star text-slate-400'></i> 15 Reviews</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className='col-span-3 space-y-12'>
                        {/* Favorites */}
                        <section>
                            <h2 className='text-2xl font-bold text-slate-900 mb-6'>Your Wishlist</h2>
                            {favorites.length === 0 ? (
                                <div className='bg-white rounded-2xl p-10 text-center border-2 border-dashed border-slate-200'>
                                    <p className='text-slate-500'>No rooms saved yet. Start exploring!</p>
                                    <Link to="/dashboard" className='btn-primary py-3 px-8 mt-4 inline-block no-underline'>Browse Rooms</Link>
                                </div>
                            ) : (
                                <div className='grid grid-cols-3 gap-6'>
                                    {favorites.map(function (room) {
                                        return (
                                            <Link to={'/room/' + room.id} key={room.id} className='no-underline'>
                                                <div className='room-card group'>
                                                    <div className='h-48 rounded-xl overflow-hidden mb-3'>
                                                        <img src={room.image} className='w-full h-full object-cover group-hover:scale-105 transition-transform' />
                                                    </div>
                                                    <h3 className='font-bold text-slate-900'>{room.name}</h3>
                                                    <p className='text-slate-500 text-sm'>${room.price} night</p>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </section>

                        {/* Recent Bookings */}
                        <section>
                            <h2 className='text-2xl font-bold text-slate-900 mb-6'>Booking History</h2>
                            <div className='bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm'>
                                <table className='w-full text-left border-collapse'>
                                    <thead className='bg-slate-50 border-b border-slate-200'>
                                        <tr>
                                            <th className='p-6 font-bold text-sm text-slate-500 uppercase'>Room</th>
                                            <th className='p-6 font-bold text-sm text-slate-500 uppercase'>Date</th>
                                            <th className='p-6 font-bold text-sm text-slate-500 uppercase'>Total Price</th>
                                            <th className='p-6 font-bold text-sm text-slate-500 uppercase'>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map(function (b) {
                                            return (
                                                <tr key={b.id} className='border-b border-slate-100 last:border-none'>
                                                    <td className='p-6 font-bold text-slate-900'>{b.roomName}</td>
                                                    <td className='p-6 text-slate-600'>{b.date}</td>
                                                    <td className='p-6 font-bold text-slate-900'>${b.price}</td>
                                                    <td className='p-6'>
                                                        <span className={'px-3 py-1 rounded-full text-xs font-bold ' +
                                                            (b.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700')}>
                                                            {b.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
