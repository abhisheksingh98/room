import React from 'react';
import { Link } from 'react-router-dom';
import { signout, isAuth } from './helpers/auth';
import { ToastContainer, toast } from 'react-toastify';

function App({ history }) {
  return (
    <div className='min-h-screen bg-white'>
      <ToastContainer />

      {/* Navigation */}
      <nav className='premium-header'>
        <div className='container flex justify-between items-center'>
          <Link to="/" className='text-primary font-bold text-2xl tracking-tighter flex items-center gap-2'>
            <i className="fas fa-home"></i> Roomsfy
          </Link>
          <div className='flex gap-4 items-center'>
            {isAuth() ? (
              <>
                <Link to="/dashboard" className='btn-secondary'>Go to Dashboard</Link>
                <button
                  onClick={() => signout(() => { toast.success('Signed out'); history.push('/'); })}
                  className='text-slate-600 font-semibold hover:text-slate-900 transition-colors'
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className='text-slate-600 font-semibold hover:text-slate-900 transition-colors'>Sign In</Link>
                <Link to="/signup" className='btn-primary'>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className='container mt-20 fade-in'>
        <div className='max-w-2xl'>
          <h1 className='text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6'>
            Find the perfect <span className='text-primary'>room</span> for your next trip.
          </h1>
          <p className='text-xl text-slate-600 mb-10 leading-relaxed'>
            Experience premium stays at curated locations across the world.
            Direct local booking with absolute privacy and zero fees.
          </p>

          <div className='flex gap-4'>
            {isAuth() ? (
              <Link to="/dashboard" className='btn-primary !py-4 !px-8 text-lg'>
                Browse Collections
              </Link>
            ) : (
              <Link to="/signup" className='btn-primary !py-4 !px-8 text-lg'>
                Start Your Journey
              </Link>
            )}
            <Link to="/login" className='btn-secondary !py-4 !px-8 text-lg'>
              Learn More
            </Link>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className='grid-cols-4 mt-32 border-t border-slate-100 pt-16 mb-20'>
          <div>
            <h3 className='font-bold mb-2'>Verified Stays</h3>
            <p className='text-slate-600 text-sm'>Every listing is hand-verified for quality and style.</p>
          </div>
          <div>
            <h3 className='font-bold mb-2'>Offline First</h3>
            <p className='text-slate-600 text-sm'>Your data stays on your device. Fast and private.</p>
          </div>
          <div>
            <h3 className='font-bold mb-2'>Instant Booking</h3>
            <p className='text-slate-600 text-sm'>Seamless multi-step booking flow with zero wait time.</p>
          </div>
          <div>
            <h3 className='font-bold mb-2'>Secure Identity</h3>
            <p className='text-slate-600 text-sm'>Local authentication system designed for privacy.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
