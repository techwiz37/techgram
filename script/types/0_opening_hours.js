"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructOpeningHours = constructOpeningHours;
function constructOpeningHours(hours) {
    return {
        timezone: hours.timezone_id,
        intervals: hours.weekly_open.map((v) => [v.start_minute, v.end_minute]),
    };
}
