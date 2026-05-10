import { useState } from "react";

const SweetAlert = () => {

    const [alert, setAlert] = useState({ status: 'success', message: 'ChatGPT can make mistakes. Check important info.' });


    console.log(alert);


    return (
        <>
            <div className={`p-2 absolute top-6 right-0 z-50 lg:w-84 w-full ${alert?.status ? 'block' : 'hidden'}`}>
                <div className={`relative block min-h-16 rounded-lg shadow bg-linear-to-r from-0% via-25% to-50% via-white to-white ${alert?.status == 'success' ? 'from-blue-200 ' : 'from-red-200'}`}>
                    <div className="h-full w-full flex flex-row items-center gap-2">
                        <span className={`m-3 block bg-white rounded p-1 ${alert?.status == 'success' ? 'text-blue-500 ' : 'text-red-500'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z"></path></svg>
                        </span>
                        <div className="block w-full h-full p-2">
                            <p className="font-semibold capitalize">{alert?.status}</p>
                            <p className="font-normal text-sm">{alert?.message}</p>
                        </div>
                    </div>

                    <button type="button" className="text-gray-500 absolute top-2 right-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
                    </button>
                </div>
            </div>
        </>
    );
}

export default SweetAlert;