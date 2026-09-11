import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/Sidebar'

function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-text mb-1">
          Welcome, {user?.name}
        </h1>
        <p className="text-text-muted mb-6">
          You&apos;re logged in as {user?.role}
        </p>

        <div className="bg-surface border border-border rounded-2xl p-5">
          <p className="text-text-muted">
            Use the sidebar to manage branches, employees, customers, jobs,
            payments, inventory, invoices and feedback.
          </p>
        </div>
      </main>
    </div>
  )
}

export default Dashboard