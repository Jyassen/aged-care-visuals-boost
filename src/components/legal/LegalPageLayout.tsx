import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { ArrowLeft } from "lucide-react";

type LegalPageLayoutProps = {
  title: string;
  description: string;
  canonicalPath: string;
  children: React.ReactNode;
  backTo?: string;
  backLabel?: string;
};

const LegalPageLayout = ({
  title,
  description,
  canonicalPath,
  children,
  backTo = "/legal",
  backLabel = "All Legal Documents",
}: LegalPageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={`${title} | YourMedGuy`}
        description={description}
        canonical={`https://yourmedguy.com${canonicalPath}`}
      />
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <Link
            to={backTo}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>
          <article className="space-y-8 text-foreground">{children}</article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPageLayout;
