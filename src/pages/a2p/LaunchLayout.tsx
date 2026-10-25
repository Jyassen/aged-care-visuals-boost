import SEO from "@/components/SEO";

/**
 * Standalone layout for the /launch funnel only.
 * Deliberately does NOT use the main site's Header or Footer, so this
 * funnel shares no navigation, tabs, or footer content with the original
 * YourMedGuy site. The logo/name here are plain text, not links back to
 * the main site. Only the /launch pages link to each other.
 */
type LaunchLayoutProps = {
  title: string;
  description: string;
  canonicalPath: string;
  children: React.ReactNode;
};

const LaunchLayout = ({ title, description, canonicalPath, children }: LaunchLayoutProps) => (
  <div className="min-h-screen bg-white text-gray-900">
    <SEO
      title={`${title} | YourMedGuy`}
      description={description}
      canonical={`https://yourmedguy.com${canonicalPath}`}
    />
    <header className="border-b border-gray-200">
      <div className="mx-auto max-w-3xl px-4 py-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">M</span>
        </div>
        <div>
          <p className="text-xl font-bold leading-tight">YourMedGuy</p>
          <p className="text-sm text-gray-600">Queens Village, Queens County, NY</p>
        </div>
      </div>
    </header>
    <main>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <article className="space-y-8">{children}</article>
      </div>
    </main>
  </div>
);

export default LaunchLayout;
