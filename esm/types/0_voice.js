export function constructVoice(document, audioAttributes, fileId, fileUniqueId) {
    return {
        fileId,
        fileUniqueId,
        duration: audioAttributes.duration,
        mimeType: document.mime_type,
        fileSize: Number(document.size),
    };
}
