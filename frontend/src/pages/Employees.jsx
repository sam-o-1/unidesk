import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { getBranches } from '../api/branches'
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../api/employees'

function Employees() {
  const [employees, setEmployees] = useState([])
  const [branches, setBranches] = useState([])
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [branchId, setBranchId] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadEmployees()
    loadBranches()
  }, [])

  async function loadEmployees() {
    try {
      const data = await getEmployees()
      setEmployees(data)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load employees')
    }
  }

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
    setRole('')
    setBranchId('')
    setEditingId(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = { name, role, branchId }
      if (editingId) {
        await updateEmployee(editingId, data)
      } else {
        await createEmployee(data)
      }
      resetForm()
      await loadEmployees()
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleEdit(employee) {
    setEditingId(employee.id)
    setName(employee.name)
    setRole(employee.role)
    setBranchId(employee.branchId)
  }

  async function handleDelete(id) {
    setError('')
    try {
      await deleteEmployee(id)
      await loadEmployees()
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete employee')
    }
  }

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-text mb-6">Employees</h1>

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
              Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-text-muted mb-1">
              Branch
            </label>
            <select
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
              required
              className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Select a branch</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-accent hover:bg-accent-hover text-white rounded-lg px-4 py-2 font-medium transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : editingId ? 'Update Employee' : 'Add Employee'}
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
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Branch</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-t border-border text-text">
                  <td className="px-4 py-3">{employee.name}</td>
                  <td className="px-4 py-3">{employee.role}</td>
                  <td className="px-4 py-3">{employee.branch?.name}</td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <button
                      onClick={() => handleEdit(employee)}
                      className="text-accent hover:text-accent-hover font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="text-red-400 hover:text-red-300 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-text-muted">
                    No employees yet.
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

export default Employees
