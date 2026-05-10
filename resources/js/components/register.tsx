import axios from 'axios';
import { useState } from 'react';


const Register = () => {

    const [data, setData] = useState({ email: '', username: '', password: '', password_confirmation: '', });

    const [serverError, setServerError] = useState({ email_error: '', username_error: '', password_error: '', });

    const [errorMessage, setErrorMessage] = useState({ field: '', message: '', });

    const [processing, setProcessing] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // clear frontend errors
        setErrorMessage({ field: '', message: '', });

        // clear backend errors
        setServerError({ email_error: '', username_error: '', password_error: '', });
    };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        // clear old errors
        setErrorMessage({ field: '', message: '', });

        setServerError({ email_error: '', username_error: '', password_error: '', });

        // frontend validation
        if (!data.email.trim()) {

            setErrorMessage({
                field: 'email',
                message: 'Please fill in email',
            });

            return;
        }

        if (!data.username.trim()) {

            setErrorMessage({
                field: 'username',
                message: 'Please fill in username',
            });

            return;
        }

        if (!data.password.trim()) {

            setErrorMessage({
                field: 'password',
                message: 'Please fill in password',
            });

            return;
        }

        if (!data.password_confirmation.trim()) {

            setErrorMessage({
                field: 'password_confirmation',
                message: 'Please confirm password',
            });

            return;
        }

        if (data.password !== data.password_confirmation) {

            setErrorMessage({
                field: 'password_confirmation',
                message: 'Passwords do not match',
            });

            return;
        }

        try {

            setProcessing(true);

            const response = await axios.post('/register-user', data);

            console.log(response.data);

            alert(response.data.message);

            // clear form
            setData({
                email: '',
                username: '',
                password: '',
                password_confirmation: '',
            });

        } catch (error: any) {

            if (error.response?.status === 422) {

                const errors = error.response.data.errors;
                console.log(errors);
                

                setServerError({
                    email_error: errors.email?.[0] || '',
                    username_error: errors.username?.[0] || '',
                    password_error: errors.password?.[0] || '',
                });

            } else {

                console.error(error);

                alert('Something went wrong');
            }

        } finally {

            setProcessing(false);
        }
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
                        <small className="block text-red-500 text-center">{serverError?.password_error}</small>
                    </div>

                    <div className="block">
                        <label htmlFor="password_confirmation">Password Confirmation</label>
                        <input onChange={handleChange} value={data.password_confirmation} type="password" id="password_confirmation" name="password_confirmation" className="w-full p-2 bg-gray-100 rounded-xl outline-none" />
                        <small className="block text-red-500">{errorMessage.field === 'password_confirmation' && errorMessage.message}</small>
                    </div>
                </div>

                <div className="block space-y-2">
                    <button disabled={processing} type="submit" className="w-full py-2 px-4 bg-[#144BE9] text-white font-semibold rounded-xl hover:bg-blue-900">
                        {processing ? 'Registering ...' : 'Register'}
                    </button>
                    <p>
                        <small className="block text-red-500 text-center">{serverError?.email_error}</small>
                        <small className="block text-red-500 text-center">{serverError?.username_error}</small>
                    </p>
                </div>


            </div>
        </form>
    );
};

export default Register;