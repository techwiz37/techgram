export function constructVoiceTranscription(transcribedAudio) {
    return {
        id: String(transcribedAudio.transcription_id),
        done: !transcribedAudio.pending,
        text: transcribedAudio.text,
    };
}
