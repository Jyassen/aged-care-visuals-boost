import { Card } from '@/components/ui/card';
import { AggregatedInsights } from '@/types/content-intelligence.types';
import { Trophy, Star, TrendingUp, Award } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';

interface EngagementMetricsProps {
  insights: AggregatedInsights;
}

const EngagementMetrics = ({ insights }: EngagementMetricsProps) => {
  // Top performers by score
  const topScoresData = insights.topPerformers.slice(0, 10).map(p => ({
    name: p.title.length > 30 ? p.title.substring(0, 30) + '...' : p.title,
    fullName: p.title,
    score: p.engagementScore,
    source: p.source
  }));

  // Performance by source
  const sourcePerformance = insights.topPerformers.reduce((acc, performer) => {
    if (!acc[performer.source]) {
      acc[performer.source] = {
        count: 0,
        totalScore: 0
      };
    }
    acc[performer.source].count++;
    acc[performer.source].totalScore += performer.engagementScore;
    return acc;
  }, {} as Record<string, { count: number; totalScore: number }>);

  const sourceData = Object.entries(sourcePerformance).map(([source, data]) => ({
    source,
    avgScore: Math.round(data.totalScore / data.count),
    count: data.count
  }));

  // Success factors frequency
  const factorFrequency = new Map<string, number>();
  insights.topPerformers.forEach(p => {
    p.keyFactors.forEach(factor => {
      factorFrequency.set(factor, (factorFrequency.get(factor) || 0) + 1);
    });
  });

  const factorsData = Array.from(factorFrequency.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([factor, count]) => ({
      factor: factor.length > 25 ? factor.substring(0, 25) + '...' : factor,
      fullFactor: factor,
      frequency: count
    }));

  // Radar chart data for messaging effectiveness
  const radarData = insights.messagingPatterns
    .filter(p => p.effectiveness && p.effectiveness > 0)
    .slice(0, 6)
    .map(p => ({
      pattern: p.pattern.length > 15 ? p.pattern.substring(0, 15) + '...' : p.pattern,
      effectiveness: p.effectiveness,
      frequency: Math.min(p.frequency * 10, 100) // Normalize to 100
    }));

  return (
    <div className="space-y-6">
      {/* Top Performers Scores */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="h-6 w-6 text-yellow-600" />
          <h2 className="text-2xl font-bold">Top Engagement Scores</h2>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={topScoresData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
            <YAxis domain={[0, 100]} />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 border rounded shadow-lg">
                      <p className="font-semibold text-sm">{payload[0].payload.fullName}</p>
                      <p className="text-sm text-gray-600">
                        Score: {payload[0].value}/100
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        Source: {payload[0].payload.source}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="score" fill="#3B82F6" name="Engagement Score" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Performance by Source and Success Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Performance by Source</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={sourceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="source" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="avgScore" fill="#10B981" name="Avg Score" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold">Common Success Factors</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={factorsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="factor" width={150} />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 border rounded shadow-lg">
                        <p className="text-xs font-semibold">{payload[0].payload.fullFactor}</p>
                        <p className="text-xs text-gray-600">
                          Found in {payload[0].value} top performers
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="frequency" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Messaging Pattern Radar */}
      {radarData.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold">Messaging Pattern Performance</h3>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="pattern" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar 
                name="Effectiveness" 
                dataKey="effectiveness" 
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.6} 
              />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Detailed Performer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.topPerformers.slice(0, 6).map((performer, index) => (
          <Card key={performer.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {index < 3 && (
                    <span className="text-yellow-600">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                    </span>
                  )}
                  <span className="text-xs text-gray-500">#{index + 1}</span>
                </div>
                <h4 className="font-medium text-sm text-gray-900 line-clamp-2">
                  {performer.title}
                </h4>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">Engagement Score</span>
                <span className="font-semibold">{performer.engagementScore}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${performer.engagementScore}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-gray-500 font-medium">Success Factors:</p>
              {performer.keyFactors.slice(0, 3).map((factor, i) => (
                <p key={i} className="text-xs text-gray-600">• {factor}</p>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EngagementMetrics;

