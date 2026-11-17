import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AggregatedInsights } from '@/types/content-intelligence.types';
import { AlertCircle, CheckCircle, TrendingUp, Target } from 'lucide-react';

interface CompetitorComparisonProps {
  insights: AggregatedInsights;
}

const CompetitorComparison = ({ insights }: CompetitorComparisonProps) => {
  // Extract competitor-specific data
  const competitorThemes = insights.topThemes.filter(theme => 
    theme.examples.some(url => url.includes('humana') || url.includes('aetna') || url.includes('healthfirst'))
  );

  // Group gaps by impact
  const highImpactGaps = insights.competitorGaps.filter(g => g.potentialImpact === 'high');
  const mediumImpactGaps = insights.competitorGaps.filter(g => g.potentialImpact === 'medium');
  const lowImpactGaps = insights.competitorGaps.filter(g => g.potentialImpact === 'low');

  // Competitor-related recommendations
  const competitorRecs = insights.recommendations.filter(r => 
    r.category === 'Competitive Advantage' || r.basedOn.includes('Competitor')
  );

  return (
    <div className="space-y-6">
      {/* Opportunity Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">High Impact</p>
              <p className="text-3xl font-bold text-red-600">{highImpactGaps.length}</p>
              <p className="text-xs text-gray-500 mt-1">Opportunities</p>
            </div>
            <AlertCircle className="h-10 w-10 text-red-600 opacity-20" />
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Medium Impact</p>
              <p className="text-3xl font-bold text-yellow-600">{mediumImpactGaps.length}</p>
              <p className="text-xs text-gray-500 mt-1">Opportunities</p>
            </div>
            <TrendingUp className="h-10 w-10 text-yellow-600 opacity-20" />
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Impact</p>
              <p className="text-3xl font-bold text-green-600">{lowImpactGaps.length}</p>
              <p className="text-xs text-gray-500 mt-1">Opportunities</p>
            </div>
            <CheckCircle className="h-10 w-10 text-green-600 opacity-20" />
          </div>
        </Card>
      </div>

      {/* High Priority Opportunities */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-6 w-6 text-red-600" />
          <h2 className="text-2xl font-bold">High-Priority Opportunities</h2>
        </div>
        <div className="space-y-4">
          {highImpactGaps.length > 0 ? (
            highImpactGaps.map((gap, index) => (
              <div key={index} className="border-l-4 border-red-500 pl-4 py-3 bg-red-50 rounded-r">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{gap.opportunity}</h3>
                    <p className="text-sm text-gray-700">{gap.description}</p>
                  </div>
                  <Badge className="ml-2 bg-red-100 text-red-800">High Impact</Badge>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No high-impact opportunities identified</p>
          )}
        </div>
      </Card>

      {/* Medium Priority Opportunities */}
      {mediumImpactGaps.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Medium-Priority Opportunities</h3>
          <div className="space-y-3">
            {mediumImpactGaps.map((gap, index) => (
              <div key={index} className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50 rounded-r">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">{gap.opportunity}</h4>
                    <p className="text-xs text-gray-700">{gap.description}</p>
                  </div>
                  <Badge className="ml-2 bg-yellow-100 text-yellow-800 text-xs">Medium</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Competitor Themes Analysis */}
      {competitorThemes.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">What Competitors Are Focusing On</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {competitorThemes.slice(0, 9).map((theme, index) => (
              <div key={index} className="p-3 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm text-gray-900">{theme.theme}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {theme.frequency}x
                  </Badge>
                </div>
                {theme.averageEngagement !== undefined && (
                  <div className="text-xs text-gray-600">
                    Avg Engagement: {theme.averageEngagement.toFixed(1)}%
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Competitive Recommendations */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Strategic Recommendations</h2>
        <div className="space-y-4">
          {competitorRecs.length > 0 ? (
            competitorRecs.map((rec, index) => (
              <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{rec.category}</h3>
                    <p className="text-sm text-gray-700 mb-2">{rec.recommendation}</p>
                    <div className="flex items-center gap-2">
                      <Badge 
                        className={
                          rec.priority === 'high' 
                            ? 'bg-red-100 text-red-800' 
                            : rec.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }
                      >
                        {rec.priority} priority
                      </Badge>
                      <span className="text-xs text-gray-500">• {rec.basedOn}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">
              No specific competitive recommendations at this time
            </p>
          )}
        </div>
      </Card>

      {/* All Opportunities List */}
      {lowImpactGaps.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Additional Opportunities</h3>
          <div className="space-y-2">
            {lowImpactGaps.map((gap, index) => (
              <div key={index} className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded">
                <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <span className="font-medium text-sm text-gray-900">{gap.opportunity}:</span>{' '}
                  <span className="text-sm text-gray-700">{gap.description}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default CompetitorComparison;

