import { Button } from "@/components/ui/button";
import { Mail, CalendarCheck } from "lucide-react";
import CaptureForm from "@/components/CaptureForm";

/**
 * Persistent bottom action bar for mobile. Seniors browse mostly on phones and
 * this is a call-driven business, so a fixed Email + Book bar keeps the primary
 * conversion action one tap away no matter how far they scroll.
 * Hidden on lg+ where the sticky header CTA is always visible.
 */
const MobileCTABar = () => {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-t border-rule shadow-[0_-4px_16px_rgba(14,31,58,0.08)] safe-bottom">
      <div className="grid grid-cols-[1fr_1.4fr] gap-3 px-4 py-3">
        <Button asChild variant="quiet" size="lg" className="h-12">
          <a href="mailto:support@yourmedguy.com">
            <Mail className="h-5 w-5" />
            Email
          </a>
        </Button>
        <CaptureForm
          trigger={
            <Button variant="amber" size="lg" className="h-12">
              <CalendarCheck className="h-5 w-5" />
              Free review
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default MobileCTABar;
