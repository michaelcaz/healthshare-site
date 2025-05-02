'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface MatchScoreSimulation {
  planName: string
  originalScore: number
  displayScore: number
  ranking: number
}

export default function MatchPercentageDebug() {
  const [simulations, setSimulations] = useState<MatchScoreSimulation[]>([])
  const [loading, setLoading] = useState(false)

  // Function that mimics our scoring transformation algorithm
  const calculateDisplayScores = (originalScores: number[]) => {
    // Sort scores in descending order (highest first)
    const sortedScores = [...originalScores].sort((a, b) => b - a)

    // Transform scores for display
    const transformedScores = sortedScores.map((score, index) => {
      // Scale the original score to a baseline (0-92 range)
      const baselineScore = score * 0.92

      // Apply position-based boost with gradual scaling
      let positionBoost = 0
      if (index === 0) positionBoost = 15
      else if (index === 1) positionBoost = 10
      else if (index === 2) positionBoost = 7
      else positionBoost = Math.max(4, 12 - (index * 2))

      // Calculate display score with cap at 99%
      const displayScore = Math.min(baselineScore + positionBoost, 99)

      // Apply sliding scale minimum scores
      let minimumScore
      if (index === 0) minimumScore = 90 // Top plan: minimum 90%
      else if (index === 1) minimumScore = 86 // Second plan: minimum 86%
      else if (index === 2) minimumScore = 83 // Third plan: minimum 83%
      else if (index === 3) minimumScore = 82 // Fourth plan: minimum 82%
      else minimumScore = 80 // All others: minimum 80%

      const finalScore = Math.max(Math.round(displayScore), minimumScore)

      return {
        planName: `Plan ${String.fromCharCode(65 + index)}`, // A, B, C, etc.
        originalScore: score,
        displayScore: finalScore,
        ranking: index + 1
      }
    })

    return transformedScores
  }

  // Sample score sets to demonstrate the algorithm
  const scoreSets = [
    // Scenario 1: High scoring plans
    [95, 90, 85, 80, 75],
    // Scenario 2: Medium scoring plans
    [85, 75, 65, 60, 55],
    // Scenario 3: Low scoring plans
    [70, 60, 50, 40, 30],
    // Scenario 4: Mixed scoring plans
    [95, 80, 65, 50, 35],
    // Scenario 5: Close scoring plans
    [85, 83, 82, 80, 79]
  ]

  // Run simulation
  const runSimulation = (scoreSet: number[]) => {
    setLoading(true)
    // Simulate async processing
    setTimeout(() => {
      setSimulations(calculateDisplayScores(scoreSet))
      setLoading(false)
    }, 500)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Match Percentage Debug Tool</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Select a Score Set to Simulate</h2>
        <div className="flex flex-wrap gap-4">
          {scoreSets.map((scoreSet, index) => (
            <Button 
              key={index}
              onClick={() => runSimulation(scoreSet)}
              variant="outline"
              className="text-sm"
            >
              Scenario {index + 1}: [{scoreSet.join(', ')}]
            </Button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="text-center py-8">
          <p>Calculating scores...</p>
        </div>
      )}

      {simulations.length > 0 && !loading && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Simulation Results</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-3 text-left">Rank</th>
                  <th className="p-3 text-left">Plan</th>
                  <th className="p-3 text-left">Original Score</th>
                  <th className="p-3 text-left">Display Score</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {simulations.map((sim) => (
                  <tr key={sim.ranking} className="border-b border-slate-200">
                    <td className="p-3">{sim.ranking}</td>
                    <td className="p-3">{sim.planName}</td>
                    <td className="p-3">{sim.originalScore}</td>
                    <td className="p-3">{sim.displayScore}%</td>
                    <td className="p-3">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs text-white ${
                        sim.displayScore >= 95 ? 'bg-green-600' :
                        sim.displayScore >= 90 ? 'bg-green-500' :
                        sim.displayScore >= 85 ? 'bg-blue-600' :
                        sim.displayScore >= 80 ? 'bg-blue-500' : 'bg-gray-500'
                      }`}>
                        {sim.displayScore >= 95 ? 'Excellent Match' :
                         sim.displayScore >= 90 ? 'Very Good Match' :
                         sim.displayScore >= 85 ? 'Strong Match' :
                         sim.displayScore >= 80 ? 'Good Match' : 'Some Match'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 p-4 bg-slate-50 rounded-lg">
            <h3 className="font-semibold mb-2">Notes:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Original scores represent raw scoring based on user's questionnaire responses</li>
              <li>Display scores use our transformation algorithm with a sliding scale of minimums</li>
              <li>Rank 1: minimum 90%, Rank 2: minimum 86%, Rank 3: minimum 83%, Rank 4: minimum 82%, Others: minimum 80%</li>
              <li>The sliding scale ensures higher-ranked plans always show higher match percentages</li>
              <li>Plans maintain their relative ranking with meaningful differentiation in score</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
} 