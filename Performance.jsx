import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Performance({ auth, PerformanceId = null }) {
    const [ newRequest, setNewRequest ] = useState(true);
    const [ performances, setPerformances ] = useState([]);

    async function fetchPerformance () {
        if(PerformanceId){
            setNewRequest(false);
            const response = await fetch('/performancedata/' + PerformanceId)
            const data = await response.json();
            console.log("Performance Data:", data);
            setPerformances(data[0]);
        }
        
    }

    async function fetchArtists () {
        const response = await fetch('/artists')
        const data = await response.json();
        setArtistData(data);
        console.log("Artists: ", data);

    }
    //LEARN!!!
    //Get Cookie by name
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Program save triggered")
        fetch('/sanctum/csrf-cookie', {
            credentials: 'include'
        })
        .then(() => {
            const csrfToken = getCookie('XSRF-TOKEN');
            if(PerformanceId){
                return fetch('/update/performance', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
                    },
                    credentials: 'include',
                    body: JSON.stringify(performances)
                })
            }else {
                return fetch('/create/performance', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
                    },
                    credentials: 'include',
                    body: JSON.stringify(performances)
                })
            }
            
           
        })
         .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // or response.text() depending on your API
                })
                .then(data => {
                    console.log('Success:', data);
                    alert('Task has been submited!');
                    router.get(route('dashboard'));
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred while submitting the form.');
                });
        
    }

    useEffect(() => {
        setNewRequest(true)
        console.log("is new request Use Effect?", newRequest)
        fetchPerformance();
        console.log('Your Performance ID:', PerformanceId);
    }, []);

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPerformances(prev => ({
            ...prev,
            [name]: value,
        }));
        console.log("Changed Data: ", performance);
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Program View</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Your selected Program:</div>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor='programName'>Time Slot Start</label><br/>
                            <input type='datetime-local' id='time_slot_start' name='time_slot_start' onChange={handleChange} value={performances.time_slot_start || ''} ></input><br/>
                            <label htmlFor='time_slot_end'>Time Slot End</label><br/>
                            <input type='datetime-local' id='time_slot_end' name='time_slot_end' onChange={handleChange} value={performances.time_slot_end || ''}></input><br/>

                            <button type='submit'>Save Changes</button>
                        </form><br/>
                        
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
