import {MediaType} from "~/utils/enums";
import type {MediaPreview} from "~/utils/types";



export default function useUpload(request: any) {
    const preview = ref<MediaPreview>({ picture: null, track: null });
    const trackMedia = ref<File[]>([]);
    const pictureMedia = ref<File[]>([]);



    const upload = async (type : MediaType) => {
        try {
            useEvent('uploading', true)
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
            }
        } catch (error) {

        } finally {
            useEvent('uploading',false)
        }
    };
    return {
        pictureMedia,
        trackMedia,
        upload,
        preview,
    }
}


