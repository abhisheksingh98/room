import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useHistory, Link, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { isAuth } from '../helpers/auth';
import { registerUser } from '../helpers/localAuth';

export default function SignUp() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password1: '',
    password2: ''
  });

  const { name, email, password1, password2 } = formData;

  const handleChange = (text: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name && email && password1) {
      if (password1 === password2) {
        const res = registerUser({ name, email, password: password1 });
        if (res.success) {
          setFormData({ name: '', email: '', password1: '', password2: '' });
          toast.success(res.message);
          history.push('/dashboard');
        } else {
          toast.error(res.message);
        }
      } else {
        toast.error("Passwords do not match.");
      }
    } else {
      toast.error('All fields are required.');
    }
  };

  if (isAuth()) return <Redirect to='/' />;

  return (
    <div className='min-h-screen bg-slate-100 flex items-center justify-center p-6'>
      <ToastContainer />

      <div className='bg-white rounded-2xl shadow-lg max-w-md w-full p-10 fade-in'>
        <div className='text-center mb-10'>
          <Link to="/" className='text-primary font-bold text-3xl tracking-tighter mb-4 inline-block'>
            Roomsfy
          </Link>
          <h1 className='text-2xl font-bold text-slate-900'>Create an Account</h1>
          <p className='text-slate-600 mt-2'>Join Roomsfy to start booking stays.</p>
        </div>

        <form onSubmit={handleSubmit} className='grid gap-4'>
          <input
            className='input-premium'
            type='text'
            placeholder='Full Name'
            onChange={handleChange('name')}
            value={name}
          />
          <input
            className='input-premium'
            type='email'
            placeholder='Email Address'
            onChange={handleChange('email')}
            value={email}
          />
          <input
            className='input-premium'
            type='password'
            placeholder='Password'
            onChange={handleChange('password1')}
            value={password1}
          />
          <input
            className='input-premium'
            type='password'
            placeholder='Confirm Password'
            onChange={handleChange('password2')}
            value={password2}
          />

          <button type='submit' className='btn-primary w-full py-4 mt-2'>
            Sign Up
          </button>

          <div className='text-center mt-6 pt-6 border-t border-slate-100'>
            <p className='text-slate-600 text-sm'>
              Already have an account? <Link to='/login' className='text-primary font-bold hover:underline'>Sign In</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
