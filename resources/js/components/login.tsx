import React, { useState } from "react";

// import component 
import PassCode from "./PassCode";
import UserPass from "./UserPass";


const Login = () => {
    // state to toggle between password and passcode login
    const [usePasscode, setUsePasscode] = useState(false);


    return (
        <>
            <div className="block w-full h-fit text-sm space-y-4 text-gray-700">
                <div className="block">
                    <h1 className="text-xl font-bold">Welcome Back!</h1>
                    <p className="text-gray-500">Please enter your details to log in.</p>
                </div>

                {!usePasscode ?
                    (
                        <UserPass setUsePasscode={setUsePasscode}  usePasscode={usePasscode}/>
                    ) : (
                        <PassCode setUsePasscode={setUsePasscode} usePasscode={usePasscode}/>
                    )}

            </div>

        </>
    );
};

export default Login;