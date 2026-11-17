import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AggregatedInsights } from '@/types/content-intelligence.types';
import { TrendingUp, Hash } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';

interface ThemeAnalysisProps {
  insights: AggregatedInsights;
}

const ThemeAnalysis = ({ insights }: ThemeAnalysisProps) => {
  // Prepare theme frequency data
  const themeFrequencyData = insights.topThemes.slice(0, 15).map(theme => ({
    name: theme.theme.length > 25 ? theme.theme.substring(0, 25) + '...' : theme.theme,
    fullName: theme.theme,
    frequency: theme.frequency,
    engagement: theme.averageEngagement || 0
  }));

  // Theme engagement scatter data
  const themeEngagementData = insights.topThemes
    .filter(t => t.averageEngagement && t.averageEngagement > 0)
    .map(theme => ({
      frequency: theme.frequency,
      engagement: theme.averageEngagement!,
      name: theme.theme
    }));

  return (
    <div className="space-y-6">
      {/* Theme Frequency Chart */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Theme Frequency Analysis</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={themeFrequencyData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" width={150} />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 border rounded shadow-lg">
                      <p className="font-semibold">{payload[0].payload.fullName}</p>
                      <p className="text-sm text-gray-600">
                        Frequency: {payload[0].value}
                      </p>
                      {payload[0].payload.engagement > 0 && (
                        <p className="text-sm text-gray-600">
                          Avg Engagement: {payload[0].payload.engagement.toFixed(2)}%
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="frequency" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Theme Performance Scatter */}
      {themeEngagementData.length > 0 && (
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Theme Performance Matrix</h2>
          <p className="text-sm text-gray-600 mb-4">
            Frequency vs Engagement Rate - Upper right quadrant shows high-value themes
          </p>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                dataKey="frequency" 
                name="Frequency" 
                label={{ value: 'Frequency', position: 'bottom' }}
              />
              <YAxis 
                type="number" 
                dataKey="engagement" 
                name="Engagement" 
                label={{ value: 'Engagement Rate (%)', angle: -90, position: 'left' }}
              />
              <ZAxis range={[60, 400]} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 border rounded shadow-lg">
                        <p className="font-semibold">{payload[0].payload.name}</p>
                        <p className="text-sm text-gray-600">
                          Frequency: {payload[0].payload.frequency}
                        </p>
                        <p className="text-sm text-gray-600">
                          Engagement: {payload[0].payload.engagement.toFixed(2)}%
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter data={themeEngagementData} fill="#10B981" />
            </ScatterChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Theme Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.topThemes.slice(0, 10).map((theme, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Hash className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">{theme.theme}</h3>
              </div>
              {index < 3 && (
                <TrendingUp className="h-4 w-4 text-green-600" />
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Frequency:</span>
                <Badge variant="secondary">{theme.frequency} mentions</Badge>
              </div>
              
              {theme.averageEngagement !== undefined && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg Engagement:</span>
                  <Badge className="bg-green-100 text-green-800">
                    {theme.averageEngagement.toFixed(2)}%
                  </Badge>
                </div>
              )}

              {theme.examples.length > 0 && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs text-gray-500 mb-1">
                    Found in {theme.examples.length} content items
                  </p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ThemeAnalysis;

