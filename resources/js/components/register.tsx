
// import { useForm } from '@inertiajs/react';
import React from "react";

const Register = () => {


    return (
        <form method="POST">
            <div className="block w-full h-fit text-sm space-y-4 text-gray-700">
                <div className="block">
                    <h1 className="text-xl font-bold">Create Account!</h1>
                    <p className="text-gray-500">Please enter correct details.</p>
                </div>

                <div className="block">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" className="w-full p-2 bg-gray-100 rounded-xl outline-none" />
                </div>

                <div className="block">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" className="w-full p-2 bg-gray-100 rounded-xl outline-none" />
                </div>

                <div className="flex lg:flex-row flex-col gap-4">
                    <div className="block">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" className="w-full p-2 bg-gray-100 rounded-xl outline-none" />
                </div>

                <div className="block">
                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <input type="password" id="confirmpassword" name="confirmpassword" className="w-full p-2 bg-gray-100 rounded-xl outline-none" />
                </div>
                </div>

                <div className="block">
                    <button type="submit" className="w-full py-2 px-4 bg-[#144BE9] text-white font-semibold rounded-xl hover:bg-blue-900">
                        Register
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Register;