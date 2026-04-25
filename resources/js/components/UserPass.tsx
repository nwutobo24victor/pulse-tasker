import { useForm } from '@inertiajs/react'
import React, { useState } from "react";

interface LoginType {
    usePasscode: boolean;
    setUsePasscode: React.Dispatch<React.SetStateAction<boolean>>;
}


const UserPass = ({ usePasscode, setUsePasscode }: LoginType) => {
    // state for error messages
    const [errorMessage, setErrorMessage] = useState({ field: '', message: '' });

    const { data, setData, post, processing } = useForm({
        username: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(name as 'username' | 'password', value);

    };
    // console.log(data);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.username.trim()) {
            setErrorMessage({ field: 'username', message: 'Please fill in username' });

            return;
        }

        if (!data.password.trim()) {
            setErrorMessage({ field: 'password', message: 'Please fill in password' });

            return;
        }

        post('/login-pass', {
            onSuccess: (data) => {
                console.log('Response JSON:', data);
            },
            onError: (msg) => {
                console.error(msg);
            },
            onFinish: () => {
                setData('password', '');

            },
        });
    };


    return (
        <>
            <form onSubmit={handleSubmit} method="POST">
                <div className="block w-full space-y-4">

                    <div className="block">
                        <label htmlFor="username">Username</label>
                        <input onChange={handleChange} value={data.username} type="text" id="username" name="username" className="w-full p-2 bg-gray-100 rounded-xl outline-none" />
                        <small className="block text-red-500">{errorMessage.field === 'username' && errorMessage.message}</small>
                    </div>

                    <div className="block">
                        <label htmlFor="password">Password</label>
                        <input onChange={handleChange} value={data.password} type="password" id="password" name="password" className="w-full p-2 bg-gray-100 rounded-xl outline-none" />
                        <small className="block text-red-500">{errorMessage.field === 'password' && errorMessage.message}</small>
                    </div>

                    <div className="flex gap-4 justify-between">
                        <button type="button" className="font-semibold hover:text-red-500">Forgot Password?</button>
                        <button onClick={() => setUsePasscode(!usePasscode)} type="button" className="font-semibold text-[#144BE9]">Use Pass Code</button>
                    </div>

                    <div className="block">
                        <button disabled={processing} type="submit" className="w-full py-2 px-4 bg-[#144BE9] text-white font-semibold rounded-xl hover:bg-blue-900">
                            {processing ? 'Logging in...' : 'Log In'}
                        </button>
                    </div>
                </div>
            </form>

        </>
    );
};

export default UserPass;