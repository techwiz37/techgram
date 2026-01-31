"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slowModeDurationToSeconds = slowModeDurationToSeconds;
function slowModeDurationToSeconds(duration) {
    const amount = Number(duration.slice(0, -1));
    const unit = duration[duration.length - 1];
    if (unit === "s") {
        return amount;
    }
    const multiplyBy = unit === "h" ? 60 ** 2 : 60;
    return amount * multiplyBy;
}
