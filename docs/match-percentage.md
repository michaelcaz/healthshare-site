# Match Percentage Calculation

This document explains how the match percentage is calculated for plan recommendations.

## Overview

The match percentage shown to users (e.g., "95% Match") represents how well a plan matches the user's needs based on their questionnaire responses. The calculation is designed to:

1. Provide intuitive percentages that users can easily understand
2. Ensure all recommendations show high match percentages (80-99%)
3. Never show a perfect 100% match (which might seem untrustworthy)
4. Maintain the correct ranking order of plans based on their actual scores
5. Create a believable gradation between different plan rankings

## Calculation Process

The match percentage calculation happens in four steps:

### Step 1: Calculate Raw Scores

Each plan receives a raw score based on how well it matches the user's needs. This score is calculated using a weighted average of several factors:

- Monthly Cost
- Initial Unshared Amount (IUA)
- Annual Cost
- Maternity Coverage (if applicable)

The weights for these factors are adjusted based on the user's preferences (e.g., if they prefer lower monthly costs, the Monthly Cost factor gets a higher weight).

### Step 2: Rank Plans by Raw Score

Plans are ranked in descending order based on their raw scores. This determines which plan will be the top recommendation, second recommendation, etc.

### Step 3: Transform Scores for Display

The raw scores are transformed into display percentages using the following formula:

```javascript
// Scale the original score to a baseline (0-92 range)
const baselineScore = originalScore * 0.92;

// Apply position-based boost for clearer differentiation
// Use a more gradual scaling for position boosts
let positionBoost = 0;
if (index === 0) positionBoost = 15; // Top recommendation gets a significant boost
else if (index === 1) positionBoost = 10; // Second recommendation gets a strong boost
else if (index === 2) positionBoost = 7; // Third recommendation gets a medium boost
else positionBoost = Math.max(4, 12 - (index * 2)); // Gradually decreasing boost

// Calculate display score with cap at 99%
const displayScore = Math.min(baselineScore + positionBoost, 99);

// Create a sliding scale for minimum scores
// This ensures higher-ranked plans always have higher scores
let minimumScore;
if (index === 0) minimumScore = 90; // Top plan: minimum 90%
else if (index === 1) minimumScore = 86; // Second plan: minimum 86%
else if (index === 2) minimumScore = 83; // Third plan: minimum 83%
else if (index === 3) minimumScore = 82; // Fourth plan: minimum 82%
else minimumScore = 80; // All others: minimum 80%

const finalScore = Math.max(Math.round(displayScore), minimumScore);
```

This transformation ensures that:
- The top recommendation always shows at least a 90% match (typically 95-99%)
- The second recommendation always shows at least an 86% match
- The third recommendation always shows at least an 83% match
- The fourth recommendation always shows at least an 82% match
- All other recommendations show at least 80% match
- No recommendation ever shows a 100% match
- The ranking order is preserved with meaningful differentiation between each rank

### Step 4: Add Explanatory Text

Based on the final match percentage, an explanation is added to help users understand what the percentage means:

- 95-99%: "This plan is an excellent match for your needs based on your questionnaire responses."
- 90-94%: "This plan is a very good match for your needs based on your questionnaire responses."
- 85-89%: "This plan is a strong match for your needs based on your questionnaire responses."
- 80-84%: "This plan is a good match for your needs based on your questionnaire responses."

## Important Notes

- The transformation only affects how the match percentage is displayed to users. It does not change which plans are recommended or their relative ranking.
- The original scores are preserved internally for debugging and analysis purposes.
- The match percentage is rounded to the nearest integer before being displayed to users.
- The sliding scale of minimum scores ensures that higher-ranked plans always show higher match percentages.

## Example

If the raw scores for four plans are 85, 75, 65, and 55:

1. The baseline scores would be 78.2, 69, 59.8, and 50.6 (92% of the original)
2. After applying position boosts:
   - Top plan: 78.2 + 15 = 93.2 (final score: 93%)
   - Second plan: 69 + 10 = 79 (raised to minimum 86% → final score: 86%)
   - Third plan: 59.8 + 7 = 66.8 (raised to minimum 83% → final score: 83%)
   - Fourth plan: 50.6 + 4 = 54.6 (raised to minimum 82% → final score: 82%)
3. The final match percentages shown to users would be 93%, 86%, 83%, and 82%

This creates a clear and believable differentiation between recommendations while ensuring all plans appear as good matches for the user's needs. The gradual decrease in match percentages (93% → 86% → 83% → 82%) makes the ranking system more credible and meaningful to users. 