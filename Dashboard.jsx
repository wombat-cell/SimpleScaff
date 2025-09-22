import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Dashboard({ auth }) {
    const [ programData, setProgramData ] = useState([]);

    async function fetchProgramData () {
        const response = await fetch('/programlist')
        const data = await response.json();
        setProgramData(data);
        console.log(data);
    }

    useEffect(() => {
        fetchProgramData();
    }, []);

    const handleCreateProgram = (e) => {
        e.preventDefault();
        router.get(route('program'));
    }

    const handleRowClick = (id) => {
        console.log("Row Clicked", id);
        router.get(route('program', {id: id}));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                            <thead>
                                <tr>
                                    <th scope='col' className='text-start'>ID</th>
                                    <th scope='col' className='text-start'>Name</th>
                                    <th scope='col' className='text-start'>Payment Type</th>
                                    <th scope='col' className='text-start'>Price</th>
                                    <th scope='col' className='text-end'>Runtime</th>
                                </tr>
                            </thead>
                            
                            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                            {programData.map(program => (
                                <tr key={program.id} onClick={() => handleRowClick(program.id)}>
                                    <td className='whitespace-nowrap text-sm' >{program.id}</td>    
                                    <td className='whitespace-nowrap text-sm'>{program.name}</td>
                                    <td className='whitespace-nowrap text-sm'>{program.payment_type}</td>
                                    <td className='whitespace-nowrap text-sm'>{program.price}€</td>
                                    <td className='whitespace-nowrap text-end'>{program.runtime} min</td>
                                </tr>
                            ))}
                            </tbody>
                           <button onClick={handleCreateProgram}>Add Program</button>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
