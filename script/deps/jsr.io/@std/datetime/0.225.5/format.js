"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = format;
const _date_time_formatter_js_1 = require("./_date_time_formatter.js");
function format(date, formatString, options = {}) {
    const formatter = new _date_time_formatter_js_1.DateTimeFormatter(formatString);
    return formatter.format(date, options);
}
