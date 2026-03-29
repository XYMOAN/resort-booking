import React, { useState, useEffect } from 'react'
import { useForm } from '@inertiajs/react'

const CreateModal = ({ isOpen, onClose, categories }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    room_category_id: '',
    name: '',
    capacity: '',
    available: 1,
    tour: [],
    base_price: '',
    amenities: [],
    inclusions: [],
    is_featured: false,
  })

  const [tourFields, setTourFields] = useState([''])
  const [amenityFields, setAmenityFields] = useState([''])
  const [inclusionFields, setInclusionFields] = useState([''])

  useEffect(() => {
    if (!isOpen) return
    reset()
    setTourFields([''])
    setAmenityFields([''])
    setInclusionFields([''])
  }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    post(route('rooms.store'), {
      onSuccess: () => {
        reset()
        setTourFields([''])
        setAmenityFields([''])
        onClose()
      },
      onError: (errors) => {
        console.log('Validation errors:', errors)
      },
    })
  }

  const addTourField = () => {
    const newFields = [...tourFields, '']
    setTourFields(newFields)
  }

  const removeTourField = (index) => {
    const newFields = tourFields.filter((_, i) => i !== index)
    const normalized = newFields.length === 0 ? [''] : newFields
    setTourFields(normalized)
    setData('tour', normalized.filter(item => item.trim()))
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
    <dialog id="room_modal" className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box w-full max-w-2xl">
        <h3 className="font-bold text-lg">Create New Room</h3>

        <form onSubmit={handleSubmit} className="py-4 space-y-4 max-h-96 overflow-y-auto">
          {/* Category */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
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
            {errors['room_category_id'] && (
              <span className="text-error text-sm mt-1">{errors['room_category_id']}</span>
            )}
          </div>

          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Room Name</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Room 101"
              className={`input input-bordered ${errors['name'] ? 'input-error' : ''}`}
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              disabled={processing}
            />
            {errors['name'] && <span className="text-error text-sm mt-1">{errors['name']}</span>}
          </div>

          {/* Capacity & Base Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Capacity</span>
              </label>
              <input
                type="number"
                placeholder="Max persons"
                className={`input input-bordered ${errors['capacity'] ? 'input-error' : ''}`}
                value={data.capacity}
                onChange={(e) => setData('capacity', e.target.value)}
                disabled={processing}
              />
              {errors['capacity'] && <span className="text-error text-sm mt-1">{errors['capacity']}</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Base Price</span>
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="Price per night"
                className={`input input-bordered ${errors['base_price'] ? 'input-error' : ''}`}
                value={data.base_price}
                onChange={(e) => setData('base_price', e.target.value)}
                disabled={processing}
              />
              {errors['base_price'] && <span className="text-error text-sm mt-1">{errors['base_price']}</span>}
            </div>
          </div>

          {/* Tour Fields */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tour Description</span>
            </label>
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
            </div>
            {errors['tour'] && <span className="text-error text-sm mt-1">{errors['tour']}</span>}
            <button
              type="button"
              onClick={addTourField}
              className="btn btn-sm btn-outline mt-2"
              disabled={processing}
            >
              + Add Tour
            </button>
          </div>

          {/* Amenities Fields */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Amenities</span>
            </label>
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
            </div>
            {errors['amenities'] && <span className="text-error text-sm mt-1">{errors['amenities']}</span>}
            <button
              type="button"
              onClick={addAmenityField}
              className="btn btn-sm btn-outline mt-2"
              disabled={processing}
            >
              + Add Amenity
            </button>
          </div>

          {/* Inclusions Fields */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Inclusions (Optional)</span>
            </label>
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
            </div>
            {errors['inclusions'] && <span className="text-error text-sm mt-1">{errors['inclusions']}</span>}
            <button
              type="button"
              onClick={addInclusionField}
              className="btn btn-sm btn-outline mt-2"
              disabled={processing}
            >
              + Add Inclusion
            </button>
          </div>

          {/* Available & Featured */}
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Available Units</span>
              </label>
              <input
                type="number"
                placeholder="Number of available rooms"
                className={`input input-bordered ${errors['available'] ? 'input-error' : ''}`}
                value={data.available}
                onChange={(e) => setData('available', e.target.value)}
                disabled={processing}
                min="0"
              />
              {errors['available'] && <span className="text-error text-sm mt-1">{errors['available']}</span>}
            </div>

            <div className="form-control flex items-end">
              <label className="label cursor-pointer">
                <span className="label-text mr-3">Featured</span>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={data.is_featured}
                  onChange={(e) => setData('is_featured', e.target.checked)}
                  disabled={processing}
                />
              </label>
            </div>
          </div>
        </form>

        <div className="modal-action">
          <button type="button" onClick={onClose} className="btn" disabled={processing}>
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary"
            disabled={processing}
          >
            {processing ? 'Creating...' : 'Create Room'}
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  )
}

export default CreateModal