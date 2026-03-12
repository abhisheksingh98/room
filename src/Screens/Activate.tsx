import React, { useState, FormEvent } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { activateUser } from '../helpers/localAuth';

const Activate = () => {
  const { token } = useParams<{ token: string }>();
  const [formData, setFormData] = useState({
    show: true
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const res = activateUser(token);
    if (res.success) {
      setFormData({ ...formData, show: false });
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className='min-h-screen bg-slate-100 flex items-center justify-center p-6'>
      <ToastContainer />
      <div className='bg-white rounded-2xl shadow-lg max-w-md w-full p-10 text-center fade-in'>
        <Link to="/" className='text-primary font-bold text-3xl tracking-tighter mb-4 inline-block'>
          Roomsfy
        </Link>
        <h1 className='text-2xl font-bold text-slate-900 mb-2'>Ready to activate?</h1>
        <p className='text-slate-600 mb-8'>Click the button below to activate your account and start your journey.</p>

        <form onSubmit={handleSubmit}>
          <button type='submit' className='btn-primary w-full py-4'>
            Activate Account
          </button>
        </form>

        <div className='mt-8 pt-8 border-t border-slate-100'>
          <Link to='/signup' className='text-slate-500 hover:text-primary transition-colors font-medium'>
            Sign up again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Activate;