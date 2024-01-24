import React, { useState, useRef } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import axios from 'axios';

function DonorEditModal({ user, onClose, onUpdate }) {
    // const [editedData, setEditedData] = useState({
    //     name: user?.name || '',
    //     profilePic: user?.profilePic || '',
    //     bloodType: user?.bloodType || '',
    //     address: user?.address || '',
    //     phone: user?.phone || '',
    // });
    const nameRef = useRef();
    const profilePicRef = useRef()
    const bloodTypeRef = useRef();
    const addressRef = useRef();
    const phoneRef = useRef();

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedUserData = {
            ...user,
            name: nameRef.current.value,
            profilePic: profilePicRef.current.value,
            bloodType: bloodTypeRef.current.value,
            address: addressRef.current.value,
            phone: phoneRef.current.value,
          };
        onUpdate(updatedUserData) 
            .then(() => {
                onClose();
            })
            .catch((error) => {
                console.error('Error updating user:', error);
            });
    };

    return (
        <div className='fixed z-10 left-[40%] top-2 max-w-[1000px] flex items-center justify-center bg-opacity-50 rounded-lg shadow-xl bg-gray-800'>
            <div className='flex-1  border border-gray-300 rounded-lg p-8 bg-white'>
                <form className='flex flex-col items-center mx-auto mb-4'>
                    <div className='flex items-center justify-end gap-x-4 mb-4'>
                        <button className='font-bold flex items-center justify-center ml-[320px] ' onClick={onClose}>
                            X
                        </button>
                    </div>
                    <div className='flex items-center justify-start gap-x-4 mb-4'>
                        <label htmlFor='name' className='w-20 text-right font-bold'>
                            Name:
                        </label>
                        <input
                            className='border border-black rounded-md p-2 text-base flex-1'
                            type='text'
                            id='name'
                            name='name'
                            ref={nameRef}
                            defaultValue={user?.name}
                        />
                    </div>

                    <div className='flex items-center justify-start gap-x-4 mb-4'>
                        <label htmlFor='profile' className='w-20 text-right font-bold'>
                            Profile:
                        </label>
                        <input
                            className='border border-black rounded-md p-2 text-base flex-1'
                            type='text'
                            id='profile'
                            name='profile'
                            ref={profilePicRef}
                            defaultValue={user?.profilePic}
                        />
                    </div>

                    <div className='flex items-center justify-start gap-x-4 mb-4'>
                        <label htmlFor='blood' className='w-20 text-right font-bold'>
                            Blood:
                        </label>
                        <input
                            className='border border-black rounded-md p-2 text-base flex-1'
                            type='text'
                            id='blood'
                            name='blood'
                            ref={bloodTypeRef}
                            defaultValue={user?.bloodType}
                        />
                    </div>

                    <div className='flex items-center justify-start gap-x-4 mb-4'>
                        <label htmlFor='address' className='w-20 text-right font-bold'>
                            Address:
                        </label>
                        <input
                            className='border border-black rounded-md p-2 text-base flex-1'
                            type='text'
                            id='address'
                            name='address'
                            ref={addressRef}
                            defaultValue={user?.address}
                        />
                    </div>

                    <div className='flex items-center justify-start gap-x-4 mb-4'>
                        <label htmlFor='mobile' className='w-20 text-right font-bold'>
                            Mobile:
                        </label>
                        <input
                            className='border border-black rounded-md p-2 text-base flex-1'
                            type='text'
                            id='mobile'
                            name='mobile'
                            ref={phoneRef}
                            defaultValue={user?.phone}
                        />
                    </div>

                    <button
                        className='bg-green-700 hover:bg-green-800 rounded p-2 text-sm text-white 
                    transition flex items-center justify-center gap-x-1 font-bold w-full'
                        onClick={handleUpdate}
                    >
                        <BsFillPencilFill /> Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default DonorEditModal;
