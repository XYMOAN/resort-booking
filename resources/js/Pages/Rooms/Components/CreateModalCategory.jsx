import React from 'react'
import { useForm } from '@inertiajs/react'

const CreateModalCategory = ({ isOpen, onClose }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post(route('room-categories.store'), {
      onSuccess: () => {
        reset()
        onClose()
      },
      onError: () => {
        console.log(errors)
      }
    })
  }

  return (
    <dialog id="category_modal" className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box w-full max-w-md">
        <h3 className="font-bold text-lg">Create New Category</h3>

        <form onSubmit={handleSubmit} className="py-4 space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category Name</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Deluxe, Standard"
              className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              disabled={processing}
            />
            {errors.name && <span className="text-error text-sm mt-1">{errors.name}</span>}
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
            {processing ? 'Creating...' : 'Create'}
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  )
}

export default CreateModalCategory