// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { DateTimeFormatter } from "./_date_time_formatter.js";
export function format(date, formatString, options = {}) {
    const formatter = new DateTimeFormatter(formatString);
    return formatter.format(date, options);
}
