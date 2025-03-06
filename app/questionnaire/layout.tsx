import './questionnaire.css'

export default function QuestionnaireLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="questionnaire-layout">
      {children}
    </div>
  )
} 