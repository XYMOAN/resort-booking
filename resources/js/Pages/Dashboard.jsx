import { Head } from '@inertiajs/react'
import React from 'react'
import AppLayout from '../Layouts/AppLayout'
const Dashboard = () => {
  return (
    <AppLayout>
      <div>
        <Head title="Dashboard" />
        <div className='text-black'>Dashboard</div>
      </div>
    </AppLayout>

  )
}

export default Dashboard