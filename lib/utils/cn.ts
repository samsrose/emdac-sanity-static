import classnames from "classnames";
import type { Argument } from "classnames";

export function cn(...args: Argument[]): string {
  return classnames(...args);
}
