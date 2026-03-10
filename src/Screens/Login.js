import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { loginUser } from '../helpers/localAuth';
import { authenticate, isAuth } from '../helpers/auth';

const Login = ({ history }) => {
  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    textChange: 'Sign In'
  });
  const { email, password1, textChange } = formData;

  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (email && password1) {
      setFormData({ ...formData, textChange: 'Submitting' });
      const res = loginUser(email, password1);
      if (res.success) {
        authenticate({ data: { token: res.token, user: res.user } }, () => {
          setFormData({ ...formData, email: '', password1: '', textChange: 'Submitted' });
          history.push('/dashboard');
          toast.success(`Welcome back, ${res.user.name}!`);
        });
      } else {
        setFormData({ ...formData, textChange: 'Sign In' });
        toast.error(res.message);
      }
    } else {
      toast.error('Please enter your email and password.');
    }
  };

  return (
    <div className='min-h-screen bg-slate-100 flex items-center justify-center p-6'>
      {isAuth() ? <Redirect to='/' /> : null}
      <ToastContainer />

      <div className='bg-white rounded-2xl shadow-lg max-w-md w-full p-10 fade-in'>
        <div className='text-center mb-10'>
          <Link to="/" className='text-primary font-bold text-3xl tracking-tighter mb-4 inline-block'>
            Roomsfy
          </Link>
          <h1 className='text-2xl font-bold text-slate-900'>Welcome Back</h1>
          <p className='text-slate-600 mt-2'>Sign in to manage your stays.</p>
        </div>

        <form onSubmit={handleSubmit} className='grid gap-4'>
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-semibold text-slate-700'>Email Address</label>
            <input
              className='input-premium'
              type='email'
              placeholder='name@example.com'
              onChange={handleChange('email')}
              value={email}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-semibold text-slate-700'>Password</label>
            <input
              className='input-premium'
              type='password'
              placeholder='••••••••'
              onChange={handleChange('password1')}
              value={password1}
            />
          </div>

          <button
            type='submit'
            className='btn-primary w-full py-4 mt-2'
            disabled={textChange === 'Submitting'}
          >
            {textChange}
          </button>

          <div className='text-center mt-6 pt-6 border-t border-slate-100'>
            <p className='text-slate-600 text-sm'>
              Don't have an account? <Link to='/signup' className='text-primary font-bold hover:underline'>Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;