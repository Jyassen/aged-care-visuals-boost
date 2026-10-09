import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DISCLOSURE } from "@/funnels/config";

function Logo() {
  return (
    <a href="#top" className="flex items-center space-x-2 min-w-0">
      <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
        <span className="text-white font-bold text-base">M</span>
      </div>
      <div className="min-w-0">
        <p className="text-lg font-bold text-gray-900 leading-tight">YourMedGuy</p>
        <p className="text-xs text-gray-600 hidden sm:block">Medicare Made Simple</p>
      </div>
    </a>
  );
}

export function FunnelHeader({ showBook = true }: { showBook?: boolean }) {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Logo />
        <div className="flex items-center gap-3">
          <a href="mailto:help@yourmedguy.com" className="font-semibold text-blue-700 hover:text-blue-800 flex items-center text-sm sm:text-base">
            <Mail className="h-4 w-4 mr-1.5" />
            help@yourmedguy.com
          </a>
          {showBook && (
            <Button asChild className="hidden sm:inline-flex bg-blue-700 hover:bg-blue-800">
              <a href="#book">Book a Review</a>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export function FunnelFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <Logo />
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">
            <Link to="/privacy-policy" className="hover:text-blue-700">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-blue-700">Terms</Link>
            <Link to="/consent-to-contact" className="hover:text-blue-700">Consent to Contact</Link>
            <a href="mailto:help@yourmedguy.com" className="hover:text-blue-700">help@yourmedguy.com</a>
          </div>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed max-w-4xl">{DISCLOSURE}</p>
      </div>
    </footer>
  );
}

export function FunnelMobileBar() {
  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-2 gap-3 px-4 py-3">
        <Button asChild variant="outline" className="border-2 border-blue-600 text-blue-700 font-semibold h-12">
          <a href="mailto:help@yourmedguy.com" className="flex items-center justify-center">
            <Mail className="h-5 w-5 mr-2" />
            Email
          </a>
        </Button>
        <Button asChild className="bg-amber-500 hover:bg-amber-600 text-white font-bold h-12">
          <a href="#book">Free Review</a>
        </Button>
      </div>
    </div>
  );
}
