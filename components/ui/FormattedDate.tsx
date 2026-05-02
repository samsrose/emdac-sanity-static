import { parseISO, format } from "date-fns";

interface FormattedDateProps {
  dateString?: string;
  formatPattern?: string;
}

export function FormattedDate({
  dateString,
  formatPattern = "LLLL d, yyyy",
}: FormattedDateProps) {
  if (!dateString) return null;
  const parsed = parseISO(dateString);
  return <time dateTime={dateString}>{format(parsed, formatPattern)}</time>;
}
