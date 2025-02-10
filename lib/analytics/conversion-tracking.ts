import { event } from './google-analytics';

export function trackPotentialConversion({
  providerId,
  planId,
  questionnaireId,
  monthlyPrice,
}: {
  providerId: string;
  planId?: string;
  questionnaireId?: string;
  monthlyPrice?: number;
}) {
  event({
    action: 'potential_conversion',
    category: 'Conversions',
    label: providerId,
    value: monthlyPrice ? Math.round(monthlyPrice) : undefined,
    customData: {
      provider_id: providerId,
      plan_id: planId,
      questionnaire_id: questionnaireId,
      conversion_type: 'outbound_click'
    }
  });
} 