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
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] safe-bottom">
      <div className="grid grid-cols-2 gap-3 px-4 py-3">
        <Button
          asChild
          variant="outline"
          className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold text-base h-12"
        >
          <a href="mailto:help@yourmedguy.com" className="flex items-center justify-center">
            <Mail className="h-5 w-5 mr-2" />
            Email Us
          </a>
        </Button>
        <CaptureForm
          trigger={
            <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-base h-12">
              <CalendarCheck className="h-5 w-5 mr-2" />
              Free Review
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default MobileCTABar;
