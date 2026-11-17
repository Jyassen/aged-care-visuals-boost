import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AggregatedInsights } from '@/types/content-intelligence.types';
import { ExternalLink, TrendingUp } from 'lucide-react';

interface ContentTableProps {
  insights: AggregatedInsights;
}

const ContentTable = ({ insights }: ContentTableProps) => {
  const [sourceFilter, setSourceFilter] = useState<string>('all');

  const filteredPerformers = insights.topPerformers.filter(
    p => sourceFilter === 'all' || p.source === sourceFilter
  );

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'youtube':
        return 'bg-red-100 text-red-800';
      case 'facebook':
        return 'bg-blue-100 text-blue-800';
      case 'instagram':
        return 'bg-purple-100 text-purple-800';
      case 'competitor':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Top Performing Content</h2>
        
        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setSourceFilter('all')}
            className={`px-3 py-1 rounded-md text-sm ${
              sourceFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSourceFilter('youtube')}
            className={`px-3 py-1 rounded-md text-sm ${
              sourceFilter === 'youtube'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            YouTube
          </button>
          <button
            onClick={() => setSourceFilter('competitor')}
            className={`px-3 py-1 rounded-md text-sm ${
              sourceFilter === 'competitor'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Competitors
          </button>
          <button
            onClick={() => setSourceFilter('facebook')}
            className={`px-3 py-1 rounded-md text-sm ${
              sourceFilter === 'facebook'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Social
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Content
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Source
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Success Factors
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Link
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPerformers.slice(0, 20).map((performer, index) => (
              <tr key={performer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {index < 3 ? (
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    ) : null}
                    <span className="text-sm font-medium text-gray-900">
                      #{index + 1}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 max-w-md truncate">
                    {performer.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={getSourceColor(performer.source)}>
                    {performer.source}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-semibold text-gray-900">
                      {performer.engagementScore}
                    </div>
                    <div className="text-xs text-gray-500 ml-1">/100</div>
                  </div>
                  <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${performer.engagementScore}%` }}
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 max-w-xs">
                    {performer.keyFactors.slice(0, 3).map((factor, i) => (
                      <div key={i} className="truncate">• {factor}</div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a
                    href={performer.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-900 flex items-center justify-end"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredPerformers.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No content found for the selected filter.
        </div>
      )}
    </Card>
  );
};

export default ContentTable;

