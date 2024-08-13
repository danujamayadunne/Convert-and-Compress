import { toBlobURL } from '@ffmpeg/util';

const loadFFMPEG = async (messageRef) => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
    const { FFmpeg } = await import('@ffmpeg/ffmpeg');

    const ffmpeg = new FFmpeg();
    const timeRegex = /time=(\d{2}:\d{2}:\d{2}\.\d{2})/;
    const durationRegex = /Duration: (\d{2}:\d{2}:\d{2}\.\d{2})/;

    let totalDuration = 0;

    ffmpeg.on('log', ({ message }) => {
        if (messageRef.current) {
            const durationMatch = message.match(durationRegex);
            const timeMatch = message.match(timeRegex);

            if (durationMatch) {
                totalDuration = parseTime(durationMatch[1]);
            }

            if (timeMatch) {
                const currentTime = parseTime(timeMatch[1]);
                if (totalDuration > 0) {
                    const progress = (currentTime / totalDuration) * 100;
                    let estimatedRemaining = 0;
                    if (progress > 0) {
                        estimatedRemaining = ((100 - progress) * currentTime) / progress;
                    }
                    messageRef.current.innerHTML = `Estimated Time: ${formatTime(estimatedRemaining)}`;
                }
            }
        }
    });

    await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm')
    });

    return ffmpeg;
};

const parseTime = (timeStr) => {
    const [hours, minutes, seconds] = timeStr.split(':');
    return (+hours) * 3600 + (+minutes) * 60 + (+seconds);
};

const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default loadFFMPEG;