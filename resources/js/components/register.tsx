import { useForm } from '@inertiajs/react'
import React, { useState } from "react";

const Register = () => {
    // state for error messages
    const [errorMessage, setErrorMessage] = useState({ field: '', message: '' });

    const { data, setData, post, processing } = useForm({
        email: '',
        username: '',
        password: '',
        password_confirmation: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(name as 'email' | 'username' | 'password' | 'password_confirmation', value);

    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.email.trim()) {
            setErrorMessage({ field: 'email', message: 'Please fill in email' });

            return;
        }

        if (!data.username.trim()) {
            setErrorMessage({ field: 'username', message: 'Please fill in username' });

            return;
        }

        if (!data.password.trim()) {
            setErrorMessage({ field: 'password', message: 'Please fill in password' });

            return;
        }

        if (!data.password_confirmation.trim()) {
            setErrorMessage({ field: 'password_confirmation', message: 'Please fill in password confirmation' });

            return;
        }

        if (data.password_confirmation !== data.password) {
            setErrorMessage({ field: 'password_confirmation', message: 'Passwords does not match' });

            return;
        }

        post('/register-user', {
            onSuccess: (data) => {
                console.log('Response JSON:', data);
            },
            onError: (msg) => {
                console.error(msg);
            },
            onFinish: () => {
                setData(prev => ({
                    ...prev,
                    password: '',
                    password_confirmation: '',
                }));

            },
        });
    };

    return (
        <form onSubmit={handleSubmit} method="POST">
            <div className="block w-full h-fit text-sm space-y-4 text-gray-700">
                <div className="block">
                    <h1 className="text-xl font-bold">Create Account!</h1>
                    <p className="text-gray-500">Please enter correct details.</p>
                </div>

                <div className="block">
                    <label htmlFor="email">Email Address</label>
                    <input onChange={handleChange} value={data.email} type="email" id="email" name="email" className="w-full p-2 bg-gray-100 rounded-xl outline-none" />
                    <small className="block text-red-500">{errorMessage.field === 'email' && errorMessage.message}</small>
                </div>

                <div className="block">
                    <label htmlFor="username">Username</label>
                    <input onChange={handleChange} value={data.username} type="text" id="username" name="username" className="w-full p-2 bg-gray-100 rounded-xl outline-none" />
                    <small className="block text-red-500">{errorMessage.field === 'username' && errorMessage.message}</small>
                </div>

                <div className="flex lg:flex-row flex-col gap-4">
                    <div className="block">
                        <label htmlFor="password">Password</label>
                        <input onChange={handleChange} value={data.password} type="password" id="password" name="password" className="w-full p-2 bg-gray-100 rounded-xl outline-none" />
                        <small className="block text-red-500">{errorMessage.field === 'password' && errorMessage.message}</small>
                    </div>

                    <div className="block">
                        <label htmlFor="password_confirmation">Password Confirmation</label>
                        <input onChange={handleChange} value={data.password_confirmation} type="password" id="password_confirmation" name="password_confirmation" className="w-full p-2 bg-gray-100 rounded-xl outline-none" />
                        <small className="block text-red-500">{errorMessage.field === 'password_confirmation' && errorMessage.message}</small>
                    </div>
                </div>

                <div className="block">
                    <button disabled={processing} type="submit" className="w-full py-2 px-4 bg-[#144BE9] text-white font-semibold rounded-xl hover:bg-blue-900">
                        {processing ? 'Registering ...' : 'Register'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Register;