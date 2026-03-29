import React, { useState } from 'react'
import { Head, usePage, Link } from '@inertiajs/react'
import AppLayout from '../../Layouts/AppLayout'
import CreateModal from './Components/CreateModal'
import CreateModalCategory from './Components/CreateModalCategory'

const Index = () => {
  const { categories, rooms } = usePage().props
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [categoryList, setCategoryList] = useState(categories)

  return (
    <AppLayout>
      <Head title="Rooms" />

      <div className="space-y-4">
        {/* Header with Buttons */}
        <div className="flex justify-between items-center">
          <h1 className="text-black text-3xl font-bold">Rooms</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setIsRoomModalOpen(true)}
              className="btn btn-primary"
            >
              + Add Room
            </button>
            <button
              onClick={() => setIsCategoryModalOpen(true)}
              className="btn btn-primary"
            >
              + Add Room Category
            </button>
          </div>
        </div>

        {/* Rooms Card */}
        {rooms.data && rooms.data.length > 0 ? (
          rooms.data.map((room, index) => (
            <div key={index} className='grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              <div key={room.id} className="card bg-base-100 w-96 shadow-sm">
                <figure className="px-10 pt-10">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"
                    className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{room.name}</h2>
                  <p className="text-sm text-gray-600">Available: {room.available} units</p>
                  <div className="card-actions">
                    <Link href={route('rooms.show', room.id)} className="btn btn-primary">
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <div colSpan="6" className="text-center text-gray-500">
              No rooms found
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateModal
        isOpen={isRoomModalOpen}
        onClose={() => setIsRoomModalOpen(false)}
        categories={categoryList}
      />
      <CreateModalCategory
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />
    </AppLayout>
  )
}

export default Index