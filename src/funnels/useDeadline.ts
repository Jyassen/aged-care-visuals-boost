import { useEffect, useState } from "react";
import type { FunnelDeadline } from "@/funnels/config";
import { remainingUntil } from "@/funnels/countdown";

export function useDeadlineState(deadline: FunnelDeadline) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!deadline.endsAt) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [deadline.endsAt]);

  const remaining = deadline.endsAt ? remainingUntil(deadline.endsAt, now) : null;
  const expired = Boolean(remaining?.expired);
  const line = expired && deadline.expiredLine ? deadline.expiredLine : deadline.line;

  return {
    remaining,
    line,
    showClock: Boolean(deadline.endsAt) && !expired,
  };
}
