import React, { useState, useEffect } from 'react';
import { isAuth, signout } from '../helpers/auth';
import { Link } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';
import $ from 'jquery';

// Import local premium assets
import penthouseImg from '../assets/luxury_penthouse.png';
import studioImg from '../assets/cozy_studio.png';
import villaImg from '../assets/beachside_villa.png';
import cabinImg from '../assets/mountain_cabin.png';

// UGLY CODE: Maintaining these for the challenge
var globalData = [];

export default function Dashboard({ history }) {
    var [rooms, setRooms] = useState([]);
    var [filter, setFilter] = useState('');
    var [loading, setLoading] = useState(false);

    useEffect(() => {
        // Keep internal legacy logic
        $('#dashboard-title').css('color', 'var(--slate-900)');

        setLoading(true);
        setTimeout(() => {
            var data = [
                { id: 1, name: "Luxury Penthouse", price: 500, available: true, date: new Date(), img: penthouseImg, location: "New York, USA" },
                { id: 2, name: "Cozy Studio", price: 120, available: true, date: new Date(), img: studioImg, location: "Paris, France" },
                { id: 3, name: "Beachside Villa", price: 1200, available: true, date: new Date(), img: villaImg, location: "Malibu, USA" },
                { id: 4, name: "Mountain Cabin", price: 300, available: true, date: new Date(), img: cabinImg, location: "Zermatt, Switzerland" },
                { id: 5, name: "Urban Loft", price: 250, available: false, date: new Date(), img: studioImg, location: "Berlin, Germany" },
                { id: 6, name: "Executive Suite", price: 800, available: true, date: new Date(), img: penthouseImg, location: "London, UK" }
            ];
            globalData = data;
            setRooms(data);
            setLoading(false);
        }, 800);
    }, []);

    const handleSearch = () => {
        var filtered = _.filter(globalData, function (o) {
            return o.name.toLowerCase().includes(filter.toLowerCase()) || o.location.toLowerCase().includes(filter.toLowerCase());
        });
        setRooms(filtered);
        if (filtered.length === 0) {
            window.alert("No properties found for your search.");
        }
    };

    return (
        <div className='min-h-screen bg-white pb-20'>
            {/* Header */}
            <header className='premium-header mb-8'>
                <div className='container flex justify-between items-center'>
                    <h1 id="dashboard-title" className='font-bold text-xl'>Explore Stays</h1>
                    <div className='flex items-center gap-6'>
                        <span className='text-sm font-medium text-slate-600'>Hello, {isAuth()?.name}</span>
                        <button onClick={() => signout(() => history.push('/'))} className='btn-secondary !py-2 !px-4 text-sm'>
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            <main className='container fade-in'>
                {/* Search Bar Refined */}
                <div className='max-w-4xl mx-auto mb-12 flex flex-col md:flex-row gap-4 items-center bg-white border border-slate-200 p-2 rounded-2xl shadow-sm'>
                    <input
                        type="text"
                        placeholder="Where are you going?"
                        className='input-premium border-none flex-1 focus:ring-0'
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <div className='h-8 w-px bg-slate-200 hidden md:block'></div>
                    <select
                        id="price-filter"
                        className='bg-white text-sm font-bold text-slate-900 border-none px-4 focus:ring-0 cursor-pointer'
                        onChange={function (e) {
                            var maxPrice = parseInt(e.target.value);
                            console.log("Filtering by price (jQuery logic): " + maxPrice);
                            // UGLY JQUERY FILTERING (Directly skipping React state for visibility)
                            $('.room-card').each(function () {
                                var price = parseInt($(this).find('.font-bold.text-slate-900').last().text().replace('$', ''));
                                if (maxPrice === 0 || price <= maxPrice) {
                                    $(this).show();
                                } else {
                                    $(this).hide();
                                }
                            });
                        }}
                    >
                        <option value="0">Any price</option>
                        <option value="200">Under $200</option>
                        <option value="500">Under $500</option>
                        <option value="1000">Under $1000</option>
                    </select>
                    <button onClick={handleSearch} className='btn-primary px-8 rounded-xl'>
                        Search
                    </button>
                </div>

                {loading ? (
                    <div className='flex justify-center items-center h-64'>
                        <div className='text-slate-400 font-medium'>Curating best stays for you...</div>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                        {rooms.map(room => (
                            <Link
                                to={`/room/${room.id}`}
                                key={room.id}
                                className='room-card group no-underline text-inherit block fade-in'
                            >
                                <div className='room-card-img-container mb-3 relative overflow-hidden rounded-2xl'>
                                    <img
                                        src={room.img}
                                        className='room-card-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                                        alt={room.name}
                                    />
                                    {!room.available && (
                                        <div className='room-card-badge absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-400 line-through'>Sold Out</div>
                                    )}
                                    {room.available && room.price > 1000 && (
                                        <div className='room-card-badge absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary'>Rare Find</div>
                                    )}
                                    <div className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm'>
                                        {room.location}
                                    </div>
                                </div>

                                <div className='flex justify-between items-start'>
                                    <div>
                                        <h3 className='font-bold text-slate-900 group-hover:text-primary transition-colors'>{room.name}</h3>
                                        <p className='text-slate-600 text-sm mb-1'>{room.location}</p>
                                        <p className='text-slate-400 text-xs mb-2'>{moment(room.date).fromNow()}</p>
                                    </div>
                                    <div className='text-right'>
                                        <div className='flex items-center gap-1 font-semibold text-slate-900 mb-1'>
                                            <i className='fas fa-star text-primary text-xs'></i>
                                            <span>4.9</span>
                                        </div>
                                        <div>
                                            <span className='font-bold text-slate-900'>${room.price}</span>
                                            <span className='text-slate-600 text-sm'> / night</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
