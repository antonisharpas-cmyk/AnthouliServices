// Adds the offset for the fixed header on inner pages.
export default function PageShell({ children }) {
  return <div className="pt-20">{children}</div>
}
