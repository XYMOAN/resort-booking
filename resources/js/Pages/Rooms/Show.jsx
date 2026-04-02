import React, { useState } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import AppLayout from '../../Layouts/AppLayout'

const Show = ({ room, categories }) => {
  const [isEditing, setIsEditing] = useState(false)
  const { data, setData, put, processing, errors, isDirty, reset } = useForm({
    room_category_id: room.room_category_id,
    name: room.name,
    capacity: room.capacity,
    available: room.available,
    tour: room.tour || [],
    base_price: room.base_price,
    amenities: room.amenities || [],
    inclusions: room.inclusions || [],
    is_featured: room.is_featured,
  })

  const [tourFields, setTourFields] = useState(room.tour || [''])
  const [amenityFields, setAmenityFields] = useState(room.amenities || [''])
  const [inclusionFields, setInclusionFields] = useState(room.inclusions || [''])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    reset()
    setTourFields(room.tour || [''])
    setAmenityFields(room.amenities || [''])
    setInclusionFields(room.inclusions || [''])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    put(route('rooms.update', room.id), {
      onSuccess: () => {
        setIsEditing(false)
        reset()
        setTourFields(data.tour || [''])
        setAmenityFields(data.amenities || [''])
      },
      onError: (errors) => {
        console.log('Validation errors:', errors)

      }
    })
  }

  const addTourField = () => {
    const newFields = [...tourFields, '']
    setTourFields(newFields)
    setData('tour', newFields.filter(item => item.trim()))
  }

  const removeTourField = (index) => {
    const newFields = tourFields.filter((_, i) => i !== index)
    setTourFields(newFields.length === 0 ? [''] : newFields)
    setData('tour', newFields.filter(item => item.trim()))
  }

  const updateTourField = (index, value) => {
    const newFields = [...tourFields]
    newFields[index] = value
    setTourFields(newFields)
    setData('tour', newFields.filter(item => item.trim()))
  }

  const addAmenityField = () => {
    const newFields = [...amenityFields, '']
    setAmenityFields(newFields)
    setData('amenities', newFields.filter(item => item.trim()))
  }

  const removeAmenityField = (index) => {
    const newFields = amenityFields.filter((_, i) => i !== index)
    setAmenityFields(newFields.length === 0 ? [''] : newFields)
    setData('amenities', newFields.filter(item => item.trim()))
  }

  const updateAmenityField = (index, value) => {
    const newFields = [...amenityFields]
    newFields[index] = value
    setAmenityFields(newFields)
    setData('amenities', newFields.filter(item => item.trim()))
  }

  const addInclusionField = () => {
    const newFields = [...inclusionFields, '']
    setInclusionFields(newFields)
    setData('inclusions', newFields.filter(item => item.trim()))
  }

  const removeInclusionField = (index) => {
    const newFields = inclusionFields.filter((_, i) => i !== index)
    setInclusionFields(newFields.length === 0 ? [''] : newFields)
    setData('inclusions', newFields.filter(item => item.trim()))
  }

  const updateInclusionField = (index, value) => {
    const newFields = [...inclusionFields]
    newFields[index] = value
    setInclusionFields(newFields)
    setData('inclusions', newFields.filter(item => item.trim()))
  }

  return (
    <AppLayout>
      <Head title={`Room: ${room.name}`} />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-black">{room.name}</h1>
          <div className="flex gap-2">
            {!isEditing ? (
              <>
                <button onClick={handleEdit} className="btn btn-primary">
                  Edit
                </button>
                <Link href={route('rooms.index')} className="btn btn-outline">
                  Back
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="btn btn-outline"
                  disabled={processing}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="btn btn-primary"
                  disabled={processing || !isDirty}
                >
                  {processing ? 'Saving...' : isDirty ? 'Save Changes' : 'No Changes'}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Room Details */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body space-y-4">
            {/* Basic Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Category</span>
                </label>
                {!isEditing ? (
                  <p className="text-lg">{room.category?.name}</p>
                ) : (
                  <select
                    className={`select select-bordered ${errors['room_category_id'] ? 'select-error' : ''}`}
                    value={data.room_category_id}
                    onChange={(e) => setData('room_category_id', e.target.value)}
                    disabled={processing}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )}
                {errors['room_category_id'] && (
                  <span className="text-error text-sm mt-1">{errors['room_category_id']}</span>
                )}
              </div>

              {/* Capacity */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Capacity</span>
                </label>
                {!isEditing ? (
                  <p className="text-lg">{data.capacity} persons</p>
                ) : (
                  <input
                    type="number"
                    className={`input input-bordered ${errors['capacity'] ? 'input-error' : ''}`}
                    value={data.capacity}
                    onChange={(e) => setData('capacity', e.target.value)}
                    disabled={processing}
                  />
                )}
                {errors['capacity'] && (
                  <span className="text-error text-sm mt-1">{errors['capacity']}</span>
                )}
              </div>

              {/* Available Units */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Available Units</span>
                </label>
                {!isEditing ? (
                  <p className="text-lg">{data.available}</p>
                ) : (
                  <input
                    type="number"
                    className={`input input-bordered ${errors['available'] ? 'input-error' : ''}`}
                    value={data.available}
                    onChange={(e) => setData('available', e.target.value)}
                    disabled={processing}
                    min="0"
                  />
                )}
                {errors['available'] && (
                  <span className="text-error text-sm mt-1">{errors['available']}</span>
                )}
              </div>

              {/* Base Price */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Base Price</span>
                </label>
                {!isEditing ? (
                  <p className="text-lg">${parseFloat(data.base_price).toFixed(2)}</p>
                ) : (
                  <input
                    type="number"
                    step="0.01"
                    className={`input input-bordered ${errors['base_price'] ? 'input-error' : ''}`}
                    value={data.base_price}
                    onChange={(e) => setData('base_price', e.target.value)}
                    disabled={processing}
                  />
                )}
                {errors['base_price'] && (
                  <span className="text-error text-sm mt-1">{errors['base_price']}</span>
                )}
              </div>

              {/* Availability */}
            </div>

            {/* Tour Descriptions */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Tour Description</span>
              </label>
              {!isEditing ? (
                <div className="space-y-2">
                  {data.tour && data.tour.length > 0 ? (
                    data.tour.map((tour, index) => (
                      <p key={index} className="text-base border-l-4 border-primary pl-3">
                        {index + 1}. {tour}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-400">No tour description provided</p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  {tourFields.map((field, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        placeholder={`Tour ${index + 1}`}
                        className={`input input-bordered flex-1 ${errors['tour'] ? 'input-error' : ''}`}
                        value={field}
                        onChange={(e) => updateTourField(index, e.target.value)}
                        disabled={processing}
                      />
                      {tourFields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTourField(index)}
                          className="btn btn-outline btn-error btn-sm"
                          disabled={processing}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addTourField}
                    className="btn btn-sm btn-outline"
                    disabled={processing}
                  >
                    + Add Tour
                  </button>
                </div>
              )}
            </div>

            {/* Amenities */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Amenities</span>
              </label>
              {!isEditing ? (
                <div className="flex flex-wrap gap-2">
                  {data.amenities && data.amenities.length > 0 ? (
                    data.amenities.map((amenity, index) => (
                      <span key={index} className="badge badge-primary badge-lg">
                        {amenity}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-400">No amenities provided</p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  {amenityFields.map((field, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        placeholder={`Amenity ${index + 1}`}
                        className={`input input-bordered flex-1 ${errors['amenities'] ? 'input-error' : ''}`}
                        value={field}
                        onChange={(e) => updateAmenityField(index, e.target.value)}
                        disabled={processing}
                      />
                      {amenityFields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeAmenityField(index)}
                          className="btn btn-outline btn-error btn-sm"
                          disabled={processing}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addAmenityField}
                    className="btn btn-sm btn-outline"
                    disabled={processing}
                  >
                    + Add Amenity
                  </button>
                </div>
              )}
            </div>

            {/* Inclusions */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Inclusions</span>
              </label>
              {!isEditing ? (
                <div className="flex flex-wrap gap-2">
                  {data.inclusions && data.inclusions.length > 0 ? (
                    data.inclusions.map((inclusion, index) => (
                      <span key={index} className="badge badge-success badge-lg">
                        {inclusion}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-400">No inclusions provided</p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  {inclusionFields.map((field, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        placeholder={`Inclusion ${index + 1}`}
                        className={`input input-bordered flex-1 ${errors['inclusions'] ? 'input-error' : ''}`}
                        value={field}
                        onChange={(e) => updateInclusionField(index, e.target.value)}
                        disabled={processing}
                      />
                      {inclusionFields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeInclusionField(index)}
                          className="btn btn-outline btn-error btn-sm"
                          disabled={processing}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addInclusionField}
                    className="btn btn-sm btn-outline"
                    disabled={processing}
                  >
                    + Add Inclusion
                  </button>
                </div>
              )}
            </div>

            {/* Featured Status */}
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text font-semibold">Featured Room</span>
                {!isEditing ? (
                  <span className="text-lg">{data.is_featured ? '✓ Yes' : '✗ No'}</span>
                ) : (
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={data.is_featured}
                    onChange={(e) => setData('is_featured', e.target.checked)}
                    disabled={processing}
                  />
                )}
              </label>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Show
