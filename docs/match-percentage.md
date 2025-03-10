# Match Percentage Calculation

This document explains how the match percentage is calculated for plan recommendations.

## Overview

The match percentage shown to users (e.g., "95% Match") represents how well a plan matches the user's needs based on their questionnaire responses. The calculation is designed to:

1. Provide intuitive percentages that users can easily understand
2. Ensure top recommendations show high match percentages (90-99%)
3. Never show a perfect 100% match (which might seem untrustworthy)
4. Maintain the correct ranking order of plans based on their actual scores

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
// Scale the original score to a baseline (0-85 range)
const baselineScore = originalScore * 0.85;

// Apply position-based boost for clearer differentiation
let positionBoost = 0;
if (index === 0) positionBoost = 20; // Top recommendation gets a significant boost
else if (index === 1) positionBoost = 10; // Second recommendation gets a medium boost
else if (index === 2) positionBoost = 5; // Third recommendation gets a small boost
else positionBoost = 2; // Other recommendations get a minimal boost

// Calculate display score with cap at 99%
const displayScore = Math.min(baselineScore + positionBoost, 99);

// Ensure minimum score of 70% for any recommendation shown
// For the top recommendation, ensure a minimum of 90%
const minimumScore = index === 0 ? 90 : 70;
const finalScore = Math.max(Math.round(displayScore), minimumScore);
```

This transformation ensures that:
- The top recommendation always shows at least a 90% match (typically 95-99%)
- The second recommendation typically shows an 85-95% match
- The third recommendation typically shows an 80-90% match
- No recommendation ever shows a 100% match
- The ranking order is preserved

### Step 4: Add Explanatory Text

Based on the final match percentage, an explanation is added to help users understand what the percentage means:

- 95-99%: "This plan is an excellent match for your needs based on your questionnaire responses."
- 90-94%: "This plan is a very good match for your needs based on your questionnaire responses."
- 80-89%: "This plan is a good match for your needs based on your questionnaire responses."
- Below 80%: "This plan matches some of your needs based on your questionnaire responses."

## Important Notes

- The transformation only affects how the match percentage is displayed to users. It does not change which plans are recommended or their relative ranking.
- The original scores are preserved internally for debugging and analysis purposes.
- The match percentage is rounded to the nearest integer before being displayed to users.

## Example

If the raw scores for three plans are 85, 75, and 65:

1. The baseline scores would be 72.25, 63.75, and 55.25 (85% of the original)
2. After applying position boosts:
   - Top plan: 72.25 + 20 = 92.25
   - Second plan: 63.75 + 10 = 73.75
   - Third plan: 55.25 + 5 = 60.25
3. The final match percentages shown to users would be 92%, 74%, and 60%

This creates a clear differentiation between the top recommendation and alternatives while maintaining the correct ranking order. The top recommendation is guaranteed to show at least a 90% match, making it appear as a strong match for the user's needs. 