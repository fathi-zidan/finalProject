import React, { useEffect, useState } from 'react';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import { useDataContext } from '../context/DataContext.jsx';
import axios from 'axios';

function DonorHistoryTable() {
    const { history,getDonationHistory } = useDataContext();
    useEffect(()=>{
        getDonationHistory();
    },[])

    const getStatusClassName = (status) => {
        switch (status) {
            case 'Approved':
                return 'bg-green-500'; 
            case 'Rejected':
                return 'bg-red-500'; 
            case 'Pending':
                return 'bg-orange-500';
            default:
                return '';
        }
    };

    return (
        <div className="w-[100%] mt-2">
            <table className="w-full overflow-x-auto table-fixed border-collapse shadow-md rounded-lg whitespace-nowrap mx-auto max-w-[90%] max-h-[90%]">
                <thead className="bg-gray-300 text-gray-800">
                    <tr>
                        <th className="p-4">Diseases</th>
                        <th className="p-4">Blood Group</th>
                        <th className="p-4">Units</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {history.donationHistory && Array.isArray(history.donationHistory) && history.donationHistory.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-200">
                            <td className="text-center flex justify-center p-4 font-semibold">
                                {item.diseases.length > 0 ? item.diseases.join(', ') : 'Nothing'}
                            </td>
                            <td className="text-center p-4 font-semibold">{item.bloodType}</td>
                            <td className="text-center p-4 font-semibold">{item.bloodUnits}</td>
                            <td className="text-center p-4 font-semibold">{item.donationDate.split('T')[0]}</td>
                            <td className={`text-center text-white p-4 font-semibold ${getStatusClassName(item.status)}`}>
                                {item.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DonorHistoryTable;
