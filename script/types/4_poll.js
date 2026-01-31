"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructPoll = constructPoll;
const _1_utilities_js_1 = require("../1_utilities.js");
const _2_message_entity_js_1 = require("./2_message_entity.js");
const _3_poll_option_js_1 = require("./3_poll_option.js");
function constructPoll(media_) {
    const poll = media_.poll;
    const correctOption = media_.results.results?.find((v) => v.correct)?.option;
    const correctOptionIndex = correctOption !== undefined ? poll.answers.findIndex((v) => v.option.every((v, i) => correctOption[i] === v)) : undefined;
    return (0, _1_utilities_js_1.cleanObject)({
        id: String(poll.id),
        question: poll.question.text,
        questionEntities: poll.question.entities.map(_2_message_entity_js_1.constructMessageEntity).filter((v) => v !== null),
        options: poll.answers.map((v) => (0, _3_poll_option_js_1.constructPollOption)(v, media_.results.results ?? [])),
        totalVoterCount: media_.results.total_voters ?? 0,
        isClosed: poll.closed || false,
        isAnonymous: !poll.public_voters,
        type: poll.quiz ? "quiz" : "regular",
        allowMultipleAnswers: poll.quiz ? undefined : poll.multiple_choice || false,
        correctOptionIndex,
        explanation: media_.results.solution,
        explanationEntities: media_.results.solution_entities?.map(_2_message_entity_js_1.constructMessageEntity).filter((v) => v !== null),
        openPeriod: poll.close_period,
        closeDate: poll.close_date,
    });
}
