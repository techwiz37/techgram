"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructPollAnswer = constructPollAnswer;
const _0_deps_js_1 = require("../0_deps.js");
const _1_utilities_js_1 = require("../1_utilities.js");
function constructPollAnswer(update, getPeer) {
    const pollId = String(update.poll_id);
    const peer = getPeer(update.peer);
    if (!peer) {
        (0, _0_deps_js_1.unreachable)();
    }
    const from = peer[0];
    const optionIndexes = update.options.map((v) => Number((0, _1_utilities_js_1.decodeText)(v)));
    return {
        pollId,
        from,
        optionIndexes,
    };
}
