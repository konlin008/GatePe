import React from 'react'
import useUserStore from '@/app/userStore';
import { useRole } from '@/queries/auth.queries';

const OrgRequestStatusPage = () => {
    const { user } = useUserStore()
    const { data } = useRole(user?.isLoggedIn)
    return (
        <div className='px-60 py-20 min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-100  '>
            <div >
                <h1>Your request to be A organizer is: <span className='font-semibold'>{data?.status.charAt(0).toLocaleUpperCase() + data?.status.slice(1)}</span></h1>
            </div>
        </div>
    )
}

export default OrgRequestStatusPage