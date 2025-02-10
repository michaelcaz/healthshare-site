import { createClient } from '@supabase/supabase-js';

export async function trackAffiliateClick({
  providerId,
  userId,
  questionnaireId,
  sourcePage,
  utmParams
}: {
  providerId: string;
  userId?: string;
  questionnaireId?: string;
  sourcePage: string;
  utmParams: Record<string, string>;
}) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return await supabase
    .from('affiliate_clicks')
    .insert({
      provider_id: providerId,
      user_id: userId,
      questionnaire_id: questionnaireId,
      source_page: sourcePage,
      utm_params: utmParams,
    });
} 