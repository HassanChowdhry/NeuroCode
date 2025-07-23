import { Badge } from '@/components/ui/badge'
import { APP_NAME } from './APP_NAMEConfig'
export function ComparisonTable() {
  const rows = [
    { label: "Personalized Recommendations", app: true, traditional: false },
    { label: "AI Tutor Assistance", app: true, traditional: false },
    { label: "Secure Code Execution", app: true, traditional: false },
    { label: "Study Plans", app: true, traditional: false },
    { label: "Manual Problem Selection", app: false, traditional: true },
    { label: "Static Hints", app: false, traditional: true },
    { label: "No Progress Tracking", app: false, traditional: true },
  ]
  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 overflow-x-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900">Why {APP_NAME}?</h2>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-gray-500 font-semibold">Feature</th>
                <th className="px-4 py-3 text-center text-primary-600 font-bold">{APP_NAME}</th>
                <th className="px-4 py-3 text-center text-gray-400">Traditional</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} className="border-t border-gray-100">
                  <td className="px-4 py-3 text-gray-900">{row.label}</td>
                  <td className="px-4 py-3 text-center">
                    {row.app && <Badge variant="success">Yes</Badge>}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {row.traditional && <Badge variant="secondary">Yes</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
} 