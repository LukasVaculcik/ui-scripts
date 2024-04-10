// Youtube commands
export const youtubePlayCommand = {
    event: "command",
    func: "playVideo",
}
export const youtubeStopCommand = {
    event: "command",
    func: "pauseVideo",
}

// Vimeo commands
export const vimeoPlayCommand = {
    method: "play",
}
export const vimeoStopCommand = {
    method: "pause",
}

/**
 * Send postMessage to iframe
 * @param {HTMLIFrameElement} iframeElement
 * @param {Object} command
 */
export function videoCommand(iframeElement, command) {
    iframeElement.contentWindow.postMessage(
        JSON.stringify(command),
        iframeElement.src
    )
}