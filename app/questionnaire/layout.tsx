import './questionnaire.css'
import './questionnaire-enhanced.css'

export default function QuestionnaireLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="questionnaire-layout pt-[calc(var(--announcement-bar-height,40px)+56px)] md:pt-[calc(var(--announcement-bar-height,40px)+64px)]">
      {children}
    </div>
  )
} 