import type { Api } from "../2_tl.ts";

export interface VoiceTranscription {

  id: string;

  done: boolean;

  text: string;
}

export function constructVoiceTranscription(transcribedAudio: Api.messages_TranscribedAudio | Api.updateTranscribedAudio): VoiceTranscription {
  return {
    id: String(transcribedAudio.transcription_id),
    done: !transcribedAudio.pending,
    text: transcribedAudio.text,
  };
}
