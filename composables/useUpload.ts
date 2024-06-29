import {MediaType} from "~/utils/enums";
import type {MediaPreview, Preview} from "~/utils/types";
import {L5Client} from "l5-client";


interface RequestWithMediaProperties {
    thumbnail?: string;
    source?: string;
    duration?: number;
}

export default function useUpload<T extends RequestWithMediaProperties>(request: T) {
    const preview = ref<MediaPreview>({picture: null, track: null});
    const trackMedia = ref<File[]>([]);
    const pictureMedia = ref<File[]>([]);
    const uploadProgress = ref<number>(0);


    const getDuration = async (file: File): Promise<number> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const ctx = new AudioContext();
                    const audioBuffer = await ctx.decodeAudioData(e.target?.result as ArrayBuffer);
                    resolve(Math.round(audioBuffer.duration));
                } catch (error) {
                    console.error(error);
                    reject(error);
                }
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    };

    const validateFileSize = (file: File, type: MediaType): boolean => {
        const MAX_FILE_SIZE = 104857600; // 100 MB in bytes
        if (file.size > MAX_FILE_SIZE) {
            useValidationStore().setResponse({
                status: 413 as number,
                // @ts-ignore
                _data: {
                    message: 'File size exceeds 100 MB limit' as string,
                    errors: <object>{
                        [type === MediaType.TRACK ? 'source' : 'thumbnail']: ['File size exceeds 100 MB limit']
                    }
                }
            });
            return false;
        }
        return true;
    };



    const upload = async (type: MediaType) => {
        try {
            useEvent('uploading', true);
            const media = type === MediaType.TRACK ? trackMedia : pictureMedia;

            if (!media.value[0]) {
                return;
            }

            const file = media.value[0];

            if (!validateFileSize(file, type)) {
                return;
            }

            const stopWatcher = watch(
                () => useMediaStore().percentComplete,
                (newProgress) => {
                    uploadProgress.value = newProgress;
                }
            );

            const { preview: uploadedFile } = await useMediaStore().uploadWithProgress(file);
            stopWatcher();
            useValidationStore().clearErrors();
            preview.value[type] = uploadedFile;



            if (type === MediaType.PICTURE) {
                request.thumbnail = uploadedFile.id;
            } else if (type === MediaType.TRACK) {
                request.source = uploadedFile.id;
                request.duration = await getDuration(file);
            }


        } catch (error) {
            throw error;
        } finally {
            useEvent('uploading', false);
        }
    };

    return {pictureMedia, trackMedia, upload, preview, uploadProgress};
}


