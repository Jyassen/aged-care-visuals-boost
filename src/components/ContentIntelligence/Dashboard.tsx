import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import ContentTable from './ContentTable';
import InsightsCharts from './InsightsCharts';
import ThemeAnalysis from './ThemeAnalysis';
import EngagementMetrics from './EngagementMetrics';
import CompetitorComparison from './CompetitorComparison';
import { AggregatedInsights } from '@/types/content-intelligence.types';

const Dashboard = () => {
  const [insights, setInsights] = useState<AggregatedInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/content-intelligence');
      
      if (!response.ok) {
        throw new Error('Failed to fetch insights');
      }

      const data = await response.json();
      setInsights(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading insights...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-8 text-center">
        <h3 className="text-lg font-semibold text-red-600 mb-2">Error Loading Insights</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button 
          onClick={fetchInsights}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
      </Card>
    );
  }

  if (!insights) {
    return (
      <Card className="p-8 text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Data Available</h3>
        <p className="text-gray-600">
          Run content collection and analysis to generate insights.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Content Intelligence Dashboard</h1>
        <p className="text-blue-100">
          Medicare & Aged Care Niche Analysis
        </p>
        <div className="mt-4 flex gap-6 text-sm">
          <div>
            <span className="text-blue-200">Total Items:</span>{' '}
            <span className="font-semibold">{insights.summary.totalItems}</span>
          </div>
          <div>
            <span className="text-blue-200">Last Updated:</span>{' '}
            <span className="font-semibold">
              {new Date(insights.generatedDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-600 mb-1">YouTube</div>
          <div className="text-2xl font-bold text-blue-600">
            {insights.summary.bySource.youtube}
          </div>
          <div className="text-xs text-gray-500">videos analyzed</div>
        </Card>

        <Card className="p-4">
          <div className="text-sm text-gray-600 mb-1">Social Media</div>
          <div className="text-2xl font-bold text-purple-600">
            {insights.summary.bySource.facebook + insights.summary.bySource.instagram}
          </div>
          <div className="text-xs text-gray-500">posts analyzed</div>
        </Card>

        <Card className="p-4">
          <div className="text-sm text-gray-600 mb-1">Competitors</div>
          <div className="text-2xl font-bold text-orange-600">
            {insights.summary.bySource.competitor}
          </div>
          <div className="text-xs text-gray-500">pages analyzed</div>
        </Card>

        <Card className="p-4">
          <div className="text-sm text-gray-600 mb-1">Opportunities</div>
          <div className="text-2xl font-bold text-green-600">
            {insights.competitorGaps.length}
          </div>
          <div className="text-xs text-gray-500">gaps identified</div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="themes">Themes</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <InsightsCharts insights={insights} />
        </TabsContent>

        <TabsContent value="themes" className="space-y-4">
          <ThemeAnalysis insights={insights} />
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <EngagementMetrics insights={insights} />
        </TabsContent>

        <TabsContent value="competitors" className="space-y-4">
          <CompetitorComparison insights={insights} />
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <ContentTable insights={insights} />
        </TabsContent>
      </Tabs>

      {/* Recommendations Section */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Actionable Recommendations</h2>
        <div className="space-y-4">
          {insights.recommendations
            .filter(r => r.priority === 'high')
            .map((rec, i) => (
              <div key={i} className="border-l-4 border-red-500 pl-4 py-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{rec.category}</h3>
                    <p className="text-gray-700 mt-1">{rec.recommendation}</p>
                    <p className="text-sm text-gray-500 mt-1">Based on: {rec.basedOn}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    High Priority
                  </span>
                </div>
              </div>
            ))}

          {insights.recommendations
            .filter(r => r.priority === 'medium')
            .slice(0, 3)
            .map((rec, i) => (
              <div key={i} className="border-l-4 border-yellow-500 pl-4 py-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{rec.category}</h3>
                    <p className="text-gray-700 mt-1">{rec.recommendation}</p>
                    <p className="text-sm text-gray-500 mt-1">Based on: {rec.basedOn}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Medium Priority
                  </span>
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;

