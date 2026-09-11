import api from './axios'

export async function getEmployees() {
  const response = await api.get('/employees')
  return response.data
}

export async function getEmployeeById(id) {
  const response = await api.get(`/employees/${id}`)
  return response.data
}

export async function createEmployee(data) {
  const response = await api.post('/employees', data)
  return response.data
}

export async function updateEmployee(id, data) {
  const response = await api.put(`/employees/${id}`, data)
  return response.data
}

export async function deleteEmployee(id) {
  const response = await api.delete(`/employees/${id}`)
  return response.data
}
