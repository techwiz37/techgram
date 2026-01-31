"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructVoiceTranscription = constructVoiceTranscription;
function constructVoiceTranscription(transcribedAudio) {
    return {
        id: String(transcribedAudio.transcription_id),
        done: !transcribedAudio.pending,
        text: transcribedAudio.text,
    };
}
