import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Program({ auth, ProgramId = null }) {
    const [ programData, setProgramData ] = useState({
        id: ProgramId,
        name: '',
        payment_type: '',
        price: '',
        artist_id: '',
    });
    const [ artistData, setArtistData ] = useState([]);
    const [ newRequest, setNewRequest ] = useState(true);
    const [ performances, setPerformances ] = useState([]);

    async function fetchProgramData () {
        if(ProgramId){
            setNewRequest(false);
            const response = await fetch('/programdata/' + ProgramId)
            const data = await response.json();
            setProgramData(data[0]);
            console.log("Program Data:", data);
            setPerformances(data[0].performance);
            console.log("Performances: ", data[0].performance);
            console.log("Artist sub: ", data[0].artist.id)
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
            if(ProgramId){
                return fetch('/update', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
                    },
                    credentials: 'include',
                    body: JSON.stringify(programData)
                })
            }else {
                return fetch('/create', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
                    },
                    credentials: 'include',
                    body: JSON.stringify(programData)
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
        fetchProgramData();
        fetchArtists();
        console.log('Your Program ID:', ProgramId);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProgramData(prev => ({
            ...prev,
            [name]: value,
        }));
        console.log("Changed Data: ", programData);
    }

    const handleRowClick = (id) => {
            console.log("Row Clicked", id);
            router.get(route('performance', {id: id}));
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
                            <label htmlFor='programName'>Program Name:</label><br/>
                            <input type='text' id='programName' name='name' onChange={handleChange} value={programData.name || ''} ></input><br/>
                            <label htmlFor='runtime'>Run Time:</label><br/>
                            <input type='number' id='runtime' name='runtime' onChange={handleChange} value={programData.runtime || ''}></input> Minutes<br/>
                            <label htmlFor='paymentType'>Payment type:</label><br/>
                            <input type='text' id='paymentType' name='payment_type' onChange={handleChange} value={programData.payment_type || ''}></input><br/>
                            <label htmlFor='price'>Price:</label><br/>
                            <input type='number' id='price' name='price' onChange={handleChange} value={programData.price || ''}></input> Euro<br/>
                            <label htmlFor='artists'>Artist: </label><br/>
                            <select name='artist_id' onChange={handleChange} id='artists'>
                                {newRequest && (
                                    <option value={"Select"} selected>Select your Artist</option> 
                                )}
                                {artistData.map(artist => {
                                    //console.log("is new request Mapping?", newRequest)
                                    if(programData.length > 0 && artist.id == programData.artist.id){
                                        console.log("ProgramData not null")
                                        return <option value={artist.id} selected>{artist.name}</option> 
                                    }else {
                                        return <option value={artist.id}>{artist.name}</option>
                                    }
                                    
                            })}
                            </select><br/>
                            <button type='submit'>Save Changes</button>
                        </form><br/>
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                            <thead>
                                <tr>
                                    <th scope='col' className='text-start'>ID</th>
                                    <th scope='col' className='text-start'>Time Slot Start</th>
                                    <th scope='col' className='text-start'>Time Slot End</th>
                                </tr>
                            </thead>
                            
                            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                            {performances.map(performance => (
                                <tr key={performance.id} onClick={() => handleRowClick(performance.id)}>
                                    <td className='whitespace-nowrap text-sm' >{performance.id}</td>    
                                    <td className='whitespace-nowrap text-sm'>{performance.time_slot_start}</td>
                                    <td className='whitespace-nowrap text-sm'>{performance.time_slot_end}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        
                        
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
