import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'

export default function NotFound() {
  return (
    <PageShell>
      <section className="section">
        <div className="container-x text-center">
          <p className="eyebrow justify-center">404</p>
          <h1 className="h2 mt-4">Page not found</h1>
          <Link to="/" className="btn-primary mt-8">Back to home</Link>
        </div>
      </section>
    </PageShell>
  )
}
