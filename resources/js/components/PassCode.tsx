import { useForm } from '@inertiajs/react'
import React, { useState } from "react";
import { useRef } from "react";

interface LoginType {
    usePasscode: boolean;
    setUsePasscode: React.Dispatch<React.SetStateAction<boolean>>;
}


const PassCode = ({ usePasscode, setUsePasscode }: LoginType) => {

    const [errorMessage, setErrorMessage] = useState({ field: '', message: '' });


    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    const { setData, post, processing } = useForm({
        otp: '',
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        const value = e.target.value;

        // allow only one digit
        if (!/^\d?$/.test(value)) {
            return;
        }

        e.target.value = value;

        // move to next input
        if (value && i < 3) {
            inputs.current[i + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
        if (e.key === "Backspace" && !e.currentTarget.value && i > 0) {
            inputs.current[i - 1]?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const otp = inputs.current.map((input) => input?.value || "").join("");

        
        setData("otp", otp);

        if (otp.length !== 4) {
            setErrorMessage({ field: 'passcode', message: 'Enter complete code' });

            return;
        }


        post('/login-code', {
            onSuccess: (data) => {
                console.log('Response JSON:', data);
            },
            onError: (msg) => {
                console.error(msg);
            },
            onFinish: () => {
                setData('otp', '');

            },
        });

    };

    return (
        <>
            <form onSubmit={handleSubmit} method="POST">
                <div className="block w-full space-y-4">
                    <div className="block py-4">
                        <label htmlFor="passcode" className='block w-full text-center'>Pass Code</label>
                        <div className="flex gap-4 justify-center">
                            {[0, 1, 2, 3].map((_, i) => (
                                <input
                                    key={i}
                                    type="text"
                                    maxLength={1}
                                    ref={(el) => {
                                        inputs.current[i] = el
                                    }}
                                    onChange={(e) => handleChange(e, i)}
                                    onKeyDown={(e) => handleKeyDown(e, i)}
                                    className="w-10 p-2 text-center rounded bg-gray-100 outline-none"
                                />
                            ))}
                        </div>
                        <small className="block text-red-500 text-center">{errorMessage.field === 'passcode' && errorMessage.message}</small>
                    </div>

                    <div className="flex gap-4 justify-between">
                        <button type="button" className="font-semibold hover:text-red-500">Forgot Password?</button>
                        <button onClick={() => setUsePasscode(!usePasscode)} type="button" className="font-semibold text-[#144BE9]">Use Password</button>
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

export default PassCode;