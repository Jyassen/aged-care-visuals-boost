import { Card } from '@/components/ui/card';
import { AggregatedInsights } from '@/types/content-intelligence.types';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface InsightsChartsProps {
  insights: AggregatedInsights;
}

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

const InsightsCharts = ({ insights }: InsightsChartsProps) => {
  // Source distribution data
  const sourceData = [
    { name: 'YouTube', value: insights.summary.bySource.youtube },
    { name: 'Facebook', value: insights.summary.bySource.facebook },
    { name: 'Instagram', value: insights.summary.bySource.instagram },
    { name: 'Competitors', value: insights.summary.bySource.competitor }
  ].filter(item => item.value > 0);

  // Top themes data
  const themesData = insights.topThemes.slice(0, 10).map(theme => ({
    name: theme.theme.length > 20 ? theme.theme.substring(0, 20) + '...' : theme.theme,
    frequency: theme.frequency,
    engagement: theme.averageEngagement || 0
  }));

  // Messaging patterns data
  const messagingData = insights.messagingPatterns.slice(0, 8).map(pattern => ({
    name: pattern.pattern.length > 15 ? pattern.pattern.substring(0, 15) + '...' : pattern.pattern,
    effectiveness: pattern.effectiveness || 0,
    frequency: pattern.frequency
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Content Source Distribution */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Content Source Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={sourceData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {sourceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Top Themes by Frequency */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Top Content Themes</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={themesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="frequency" fill="#3B82F6" name="Frequency" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Messaging Pattern Effectiveness */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Messaging Pattern Effectiveness</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={messagingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="effectiveness" fill="#10B981" name="Effectiveness Score" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Opportunities Summary */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Competitive Opportunities</h3>
        <div className="space-y-3">
          {insights.competitorGaps.slice(0, 5).map((gap, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-3 py-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">{gap.opportunity}</h4>
                  <p className="text-xs text-gray-600 mt-1">{gap.description}</p>
                </div>
                <span
                  className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                    gap.potentialImpact === 'high'
                      ? 'bg-red-100 text-red-800'
                      : gap.potentialImpact === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {gap.potentialImpact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default InsightsCharts;

