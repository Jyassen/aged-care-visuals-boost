export type Remaining = {
  expired: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function remainingUntil(endsAt: string, now = Date.now()): Remaining {
  const end = new Date(endsAt).getTime();
  const diff = end - now;
  if (!Number.isFinite(diff) || diff <= 0) {
    return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const totalSeconds = Math.floor(diff / 1000);
  return {
    expired: false,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function pad2(value: number) {
  return String(value).padStart(2, "0");
}
