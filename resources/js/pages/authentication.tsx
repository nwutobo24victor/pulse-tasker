import { Head } from '@inertiajs/react';
import { useState } from 'react';

// import component
import Login from '@/components/login';
import Register from '@/components/register';

interface AuthProps {
    title: string;
}



const Auth = ({ title }: AuthProps) => {
    console.log(title);

    const [tab, setTab] = useState('login');

    return (
        <>
            <Head title="Authentication">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex h-screen items-center justify-center bg-gray-100 text-gray-700">
                <div className="block w-full lg:w-xl h-fit p-4">
                    <div className="lg:relative block w-full bg-white p-4 lg:pt-10 rounded-2xl">
                        <div className="block w-full lg:w-md lg:absolute lg:-top-6 lg:left-1/2 lg:-translate-x-1/2">
                            <div className="mx-auto shadow  bg-white lg:w-md w-full rounded-full flex items-center gap-2 p-1 mb-4">
                                <button onClick={() => setTab('login')} type="button" className={`w-full py-1 px-2 rounded-full text-black font-semibold ${tab === 'login' ? 'bg-gray-200' : 'hover:bg-gray-300 bg-white'}`}>Login</button>
                                <button onClick={() => setTab('register')} type="button" className={`w-full py-1 px-2 rounded-full text-black font-semibold ${tab === 'register' ? 'bg-gray-200' : 'hover:bg-gray-300 bg-white'}`}>Register</button>
                            </div>
                        </div>
                        {tab === 'login' ?
                            <Login />
                            :
                            <Register />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Auth;