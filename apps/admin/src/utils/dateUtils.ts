/**
 * Argentina Date/Time Utilities (UTC-3)
 * Formats inputs in Argentina local time and outputs ISO 8601 strings with explicit -03:00 offset.
 */

const ARGENTINA_OFFSET_MINUTES = -180; // UTC-3
export const ARGENTINA_OFFSET_STR = "-03:00";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Gets a Date object representing the current moment in Argentina (UTC-3).
 */
export const getArgentinaNow = (): Date => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + ARGENTINA_OFFSET_MINUTES * 60000);
};

/**
 * Formats a Date object into "YYYY-MM-DDTHH:mm" in Argentina local time for datetime-local inputs.
 */
export const formatToArgentinaDateTimeInput = (date: Date): string => {
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  const hh = pad(date.getHours());
  const mm = pad(date.getMinutes());
  return `${y}-${m}-${d}T${hh}:${mm}`;
};

/**
 * Formats a Date object into "YYYY-MM-DD" in Argentina local date.
 */
export const formatToArgentinaDateOnlyInput = (date: Date): string => {
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  return `${y}-${m}-${d}`;
};

/**
 * Converts "YYYY-MM-DDTHH:mm" directly into an ISO string with explicit "-03:00" offset without UTC conversion.
 * Example: "2026-04-14T09:30" -> "2026-04-14T09:30:00-03:00"
 */
export const formatToArgentinaIsoString = (dateTimeStr: string): string => {
  if (!dateTimeStr) return "";
  if (
    dateTimeStr.includes("-03:00") ||
    dateTimeStr.includes("+") ||
    dateTimeStr.endsWith("Z")
  ) {
    return dateTimeStr;
  }
  const cleanStr =
    dateTimeStr.length === 16 ? `${dateTimeStr}:00` : dateTimeStr;
  return `${cleanStr}${ARGENTINA_OFFSET_STR}`;
};

/**
 * Calculates ISO 8601 week key (e.g., "2026-W14") from a date string.
 */
export const getIsoWeekKey = (dateStr: string): string => {
  if (!dateStr) return "";
  const rawDate = dateStr.includes("T") ? dateStr.split("T")[0] : dateStr;
  const [year, month, day] = rawDate.split("-").map(Number);
  if (!year || !month || !day) return "";

  const d = new Date(Date.UTC(year, month - 1, day));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );

  return `${d.getUTCFullYear()}-W${pad(weekNo)}`;
};

/**
 * Calculates month key (e.g., "2026-04") from a date string.
 */
export const getMonthKey = (dateStr: string): string => {
  if (!dateStr) return "";
  const rawDate = dateStr.includes("T") ? dateStr.split("T")[0] : dateStr;
  const [year, month] = rawDate.split("-");
  if (!year || !month) return "";
  return `${year}-${month}`;
};
