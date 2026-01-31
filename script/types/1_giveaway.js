"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructGiveaway = constructGiveaway;
const _1_utilities_js_1 = require("../1_utilities.js");
const _0_giveaway_parameters_js_1 = require("./0_giveaway_parameters.js");
function constructGiveaway(g) {
    const winnerCount = g.quantity;
    const premiumMonthCount = g.months;
    const starCount = g.stars;
    const parameters = (0, _0_giveaway_parameters_js_1.constructGiveawayParameters)(g);
    return (0, _1_utilities_js_1.cleanObject)({ parameters, winnerCount, premiumMonthCount, starCount: starCount ? Number(starCount) : undefined });
}
