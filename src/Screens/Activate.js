import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { activateUser } from '../helpers/localAuth';
import { isAuth } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';

const Activate = ({ match }) => {
  const [formData, setFormData] = useState({
    token: '',
    show: true
  });

  useEffect(() => {
    let token = match.params.token;
    if (token) { setFormData({ ...formData, token }); }
  }, [match.params]);

  const { token, show } = formData;

  const handleSubmit = e => {
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
      {isAuth() ? <Redirect to='/' /> : null}
      <ToastContainer />

      <div className='bg-white rounded-2xl shadow-lg max-w-md w-full p-10 fade-in text-center'>
        <Link to="/" className='text-primary font-bold text-3xl tracking-tighter mb-8 inline-block'>
          Roomsfy
        </Link>

        <h1 className='text-2xl font-bold text-slate-900 mb-2'>
          Ready to start?
        </h1>
        <p className='text-slate-600 mb-8'>
          Click the button below to activate your account and begin your journey.
        </p>

        <form onSubmit={handleSubmit}>
          {show ? (
            <button type='submit' className='btn-primary w-full py-4 mb-4'>
              Activate Account
            </button>
          ) : (
            <Link to="/login" className='btn-primary w-full py-4 mb-4'>
              Proceed to Sign In
            </Link>
          )}

          <div className='text-center mt-6 pt-6 border-t border-slate-100'>
            <p className='text-slate-600 text-sm'>
              Need help? <Link to='/signup' className='text-primary font-bold hover:underline'>Contact Support</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Activate;