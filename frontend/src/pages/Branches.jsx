import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import {
  getBranches,
  createBranch,
  updateBranch,
  deleteBranch,
} from '../api/branches'

function Branches() {
  const [branches, setBranches] = useState([])
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadBranches()
  }, [])

  async function loadBranches() {
    try {
      const data = await getBranches()
      setBranches(data)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load branches')
    }
  }

  function resetForm() {
    setName('')
    setAddress('')
    setEditingId(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (editingId) {
        await updateBranch(editingId, { name, address })
      } else {
        await createBranch({ name, address })
      }
      resetForm()
      await loadBranches()
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleEdit(branch) {
    setEditingId(branch.id)
    setName(branch.name)
    setAddress(branch.address)
  }

  async function handleDelete(id) {
    setError('')
    try {
      await deleteBranch(id)
      await loadBranches()
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete branch')
    }
  }

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-text mb-6">Branches</h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500/40 text-red-400 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-surface border border-border rounded-2xl p-5 mb-6 flex flex-wrap items-end gap-4"
        >
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-text-muted mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-text-muted mb-1">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-accent hover:bg-accent-hover text-white rounded-lg px-4 py-2 font-medium transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : editingId ? 'Update Branch' : 'Add Branch'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-surface-hover text-text rounded-lg px-4 py-2 font-medium border border-border"
            >
              Cancel
            </button>
          )}
        </form>

        <div className="bg-surface border border-border rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-hover text-text-muted">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Employees</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((branch) => (
                <tr key={branch.id} className="border-t border-border text-text">
                  <td className="px-4 py-3">{branch.name}</td>
                  <td className="px-4 py-3">{branch.address}</td>
                  <td className="px-4 py-3">{branch.employees?.length ?? 0}</td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <button
                      onClick={() => handleEdit(branch)}
                      className="text-accent hover:text-accent-hover font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(branch.id)}
                      className="text-red-400 hover:text-red-300 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {branches.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-text-muted">
                    No branches yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default Branches
