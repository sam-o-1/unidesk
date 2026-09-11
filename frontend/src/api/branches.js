import api from './axios'

export async function getBranches() {
  const response = await api.get('/branches')
  return response.data
}

export async function getBranchById(id) {
  const response = await api.get(`/branches/${id}`)
  return response.data
}

export async function createBranch(data) {
  const response = await api.post('/branches', data)
  return response.data
}

export async function updateBranch(id, data) {
  const response = await api.put(`/branches/${id}`, data)
  return response.data
}

export async function deleteBranch(id) {
  const response = await api.delete(`/branches/${id}`)
  return response.data
}
