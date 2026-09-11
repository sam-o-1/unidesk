import Sidebar from '../components/Sidebar'

function AskAI() {
  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-text mb-6">Ask AI</h1>
        <div className="bg-surface border border-border rounded-2xl p-5">
          <p className="text-text-muted">
            This feature isn&apos;t wired up yet — there is no backend endpoint
            for it. This page is a placeholder so the sidebar link works.
          </p>
        </div>
      </main>
    </div>
  )
}

export default AskAI
