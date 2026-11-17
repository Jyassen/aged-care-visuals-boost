import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BookOpen, Mail } from "lucide-react";

/**
 * Exit-intent offer for the free NY Medicare Starter Kit (2027 edition).
 *
 * Shows once when a visitor is about to leave: on desktop when the cursor
 * leaves through the top of the window, on touch devices on a fast scroll
 * back up after reading part of the page. Captures name + email and sends
 * the kit through the existing /api/medicare-starter-kit endpoint.
 *
 * Frequency: at most once every SNOOZE_DAYS per browser, never within the
 * first ARM_DELAY_MS of a page view, and never again once a kit was requested.
 */

const STORAGE_KEY = "ymg_exit_kit_seen_at";
const REQUESTED_KEY = "ymg_kit_requested";
const SNOOZE_DAYS = 7;
const ARM_DELAY_MS = 8000;
const MOBILE_MIN_SCROLL_RATIO = 0.3;
const MOBILE_SCROLL_UP_PX = 320;

/** Pages where the offer is appropriate. Funnels, thank-you and legal pages are left alone. */
const ALLOWED_PATHS = ["/", "/longisland", "/statenisland", "/tools/cost-calculator"];

const safeGet = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeSet = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable: show-once logic degrades to per-page-view */
  }
};

/** Marks that the visitor already requested the kit so the popup stays quiet. */
export const markStarterKitRequested = () => safeSet(REQUESTED_KEY, "1");

const shouldOffer = (): boolean => {
  if (safeGet(REQUESTED_KEY)) return false;
  const seenAt = Number(safeGet(STORAGE_KEY) || 0);
  return !seenAt || Date.now() - seenAt > SNOOZE_DAYS * 24 * 60 * 60 * 1000;
};

const ExitIntentStarterKit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const firedRef = useRef(false);

  const allowed = ALLOWED_PATHS.includes(location.pathname);

  const fire = useCallback(() => {
    if (firedRef.current || !shouldOffer()) return;
    firedRef.current = true;
    safeSet(STORAGE_KEY, String(Date.now()));
    setOpen(true);
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (gtag) gtag("event", "exit_intent_shown", { source: location.pathname });
  }, [location.pathname]);

  useEffect(() => {
    if (!allowed || typeof window === "undefined" || !shouldOffer()) return;

    let armed = false;
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, ARM_DELAY_MS);

    // Desktop: cursor leaves through the top edge (toward the tabs / URL bar).
    const onMouseOut = (e: MouseEvent) => {
      if (!armed) return;
      if (e.relatedTarget === null && e.clientY <= 0) fire();
    };

    // Touch devices: read a chunk of the page, then a quick scroll back up.
    let lastY = window.scrollY;
    let upwardRun = 0;
    let reachedDepth = false;
    const onScroll = () => {
      const y = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0 && y / docHeight >= MOBILE_MIN_SCROLL_RATIO) reachedDepth = true;
      if (y < lastY) {
        upwardRun += lastY - y;
        if (armed && reachedDepth && upwardRun >= MOBILE_SCROLL_UP_PX) fire();
      } else {
        upwardRun = 0;
      }
      lastY = y;
    };

    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouch) {
      window.addEventListener("scroll", onScroll, { passive: true });
    } else {
      document.addEventListener("mouseout", onMouseOut);
    }

    return () => {
      window.clearTimeout(armTimer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [allowed, fire]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !consent) {
      setError("Please add your name and email and tick the box so we can send the kit.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/medicare-starter-kit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          disclaimerAgreed: true,
          pageUrl: `${window.location.href}${window.location.search ? "&" : "?"}src=exit-intent`,
        }),
      });
      if (!response.ok) throw new Error("send failed");
      markStarterKitRequested();
      setOpen(false);
      navigate("/thank-you-medicare-kit?src=exit-intent");
    } catch {
      setError("Something went wrong. Please try again or email support@yourmedguy.com.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!allowed) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-0">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-6 pt-7 pb-6">
          <span className="inline-block rounded-full bg-amber px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-amber-ink mb-3">
            2027 Edition
          </span>
          <DialogHeader className="text-left space-y-2">
            <DialogTitle className="text-2xl font-extrabold leading-tight text-white">
              Before you go, grab the free NY Medicare Starter Kit
            </DialogTitle>
            <DialogDescription className="text-blue-100 text-base">
              Three plain-English guides New Yorkers use before picking a plan: the 10 questions to ask, the VIP contact
              list, and Medicare myths vs reality, updated with the 2027 numbers.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 bg-white">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <BookOpen className="h-4 w-4 text-blue-600" />
            <span>Sent to your inbox in under a minute. No sales pitch, no obligation.</span>
          </div>
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="exit-kit-name">Full name</Label>
            <Input
              id="exit-kit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="exit-kit-email">Email address</Label>
            <Input
              id="exit-kit-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className="flex items-start gap-2">
            <Checkbox
              id="exit-kit-consent"
              checked={consent}
              onCheckedChange={(v) => setConsent(v === true)}
              className="mt-1"
            />
            <label htmlFor="exit-kit-consent" className="text-xs leading-relaxed text-gray-600">
              Yes, send me the starter kit. I understand I'll also receive helpful Medicare tips (unsubscribe anytime).
              These are general Medicare information and resources. For personalized plan options, please speak with one
              of our licensed Medicare brokers.
            </label>
          </div>
          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-amber hover:bg-amber-hover text-amber-ink font-bold text-base py-6"
          >
            <Mail className="w-5 h-5 mr-2" />
            {submitting ? "Sending..." : "Send me the free kit"}
          </Button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full text-sm text-gray-500 hover:text-gray-700 underline underline-offset-2"
          >
            No thanks, I'll keep browsing
          </button>
          <p className="text-[10px] text-gray-500 text-center leading-relaxed">
            Not affiliated with or endorsed by the U.S. government or the federal Medicare program. We do not offer every
            plan available in your area.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentStarterKit;
