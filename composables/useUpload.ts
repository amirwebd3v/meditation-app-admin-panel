import {MediaType} from "~/utils/enums";
import type {MediaPreview} from "~/utils/types";

interface RequestWithMediaProperties {
    thumbnail?: string;
    source?: string;
    duration?: number;
}

export default function useUpload<T extends RequestWithMediaProperties>(request: T) {
    const preview = ref<MediaPreview>({picture: null, track: null});
    const trackMedia = ref<File[]>([]);
    const pictureMedia = ref<File[]>([]);


    const getDuration = async (file: File) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        return new Promise<number>((resolve, reject) => {
            reader.onloadend = async (e) => {
                if (e.target) {
                    const ctx = new AudioContext();
                    const audioArrayBuffer = e.target.result as ArrayBuffer;

                    try {
                        const audioBuffer = await ctx.decodeAudioData(audioArrayBuffer);
                        const duration = Math.round(audioBuffer.duration);
                        resolve(duration);
                    } catch (error) {
                        console.error(error);
                        reject(error);
                    }
                } else {
                    reject(new Error('Unable to read file'));
                }
            };
        });
    };


    const upload = async (type: MediaType) => {
        try {
            useEvent('uploading', true);
            const media = type === MediaType.TRACK ? trackMedia : pictureMedia;
            if (!media.value) return;
            const [file] = media.value;
            if (!file) return;
            preview.value[type] = await useMediaStore().uploads([file]);
            if (type === MediaType.PICTURE) {
                request.thumbnail = preview.value.picture?.id;
            }
            if (type === MediaType.TRACK) {
                request.source = preview.value.track?.id;
                await getDuration(file).then(result => request.duration = result)
            }
        } catch (error) {
            console.error('Error getting duration:', error);
        } finally {
            useEvent('uploading', false);
        }
    };

    return {pictureMedia, trackMedia, upload, preview};
}