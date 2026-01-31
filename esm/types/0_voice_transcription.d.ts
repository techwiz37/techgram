import type { Api } from "../2_tl.js";
export interface VoiceTranscription {
    id: string;
    done: boolean;
    text: string;
}
export declare function constructVoiceTranscription(transcribedAudio: Api.messages_TranscribedAudio | Api.updateTranscribedAudio): VoiceTranscription;
//# sourceMappingURL=0_voice_transcription.d.ts.map