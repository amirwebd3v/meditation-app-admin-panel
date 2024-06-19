import type {Ref} from "vue";
import type {MediaPreview} from "~/utils/types";


export default function useInputHasChanges<T extends object>
(objectToWatch: T): {
    hasChanges: Ref<boolean>;
    resetHasChanges: (initialState ?: T, preview?: Ref<MediaPreview> | null, pictureFile ?: Ref<File[]> | null, trackFile ?: Ref<File[]> | null) => void;
} {

    // console.log('objectToWatch', objectToWatch)

    const hasChanges = ref(false);
    const textFieldsIs = ref(false);
    const thumbnailIs = ref(false);
    const trackIs = ref({source: false, duration: false});

    let oldValObj = JSON.stringify(objectToWatch, (key, value) => {
        if (value === null) return '';
        if (typeof value === 'number') return value.toString();
        if (Array.isArray(value)) return '[' + value.map((item) => JSON.stringify(item)).sort().join(',') + ']';
        return value;
    });


    const oldObj = JSON.parse(oldValObj);

    const {
        thumbnail: oldThumbnail = null,
        source: oldSource = null,
        duration: oldDuration = null,
        ...filteredOld
    } = oldObj;

    const isFormForEditing =
        Object.values(filteredOld).filter(
            (value) => value === null || value === '').length === 1 ||
        Object.values(filteredOld).filter(
            (value) => value === null || value === '').length === 0;


    // Determine the type of form based on the keys of oldObj
    const hasSourceField = 'source' in oldObj;
    const hasThumbnailField = 'thumbnail' in oldObj;

    watch(
        objectToWatch,
        (newVal) => {
            const newValObj = JSON.stringify(newVal, (key, value) => {
                if (value === null) return '';
                if (typeof value === 'number') return value.toString();
                if (Array.isArray(value)) return '[' + value.map((item) => JSON.stringify(item)).sort().join(',') + ']';
                return value;
            });


            const newObj = JSON.parse(newValObj);


            const {
                thumbnail: newThumbnail = null,
                source: newSource = null,
                duration: newDuration = null,
                ...filteredNew
            } = newObj;


            const textFieldsChanged = JSON.stringify(filteredNew) !== JSON.stringify(filteredOld);
            textFieldsIs.value = textFieldsChanged;
            const youtubeUrlRegex = /^(https?:\/\/)?(www\.|youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)(\?.*)?$/;

            console.log('=================================');
            console.log('textFieldsChanged:', textFieldsChanged);
            console.log('isFormForEditing:', isFormForEditing);
            // console.log('newThumbnail && oldSource === newSource:', (newThumbnail && oldSource === newSource));


            // Check if thumbnail or source has changed
            let thumbnailOrSourceChanged = false;

            if (!isFormForEditing) {
                // Case 1: Form for adding data with only source field
                if (hasSourceField && !hasThumbnailField) {
                    const isValidSource = !newSource?.endsWith('.mp3') && (!newSource || youtubeUrlRegex.test(newSource));
                    thumbnailOrSourceChanged = newSource && isValidSource || newDuration;
                    trackIs.value.source = !!newSource && isValidSource;
                    trackIs.value.duration = !!newDuration;
                    console.log('Case 1: Form for adding data with only source field');
                    console.log('newSource:', newSource);
                    console.log('newDuration:', newDuration);
                }

                // Case 2: Form for adding data with only thumbnail field
                else if (!hasSourceField && hasThumbnailField) {
                    thumbnailOrSourceChanged = newThumbnail;
                    thumbnailIs.value = !!newThumbnail;
                    console.log('Case 2: Form for adding data with only thumbnail field');
                    console.log('newThumbnail:', newThumbnail);
                }

                // Case 3: Form for adding data with both source and thumbnail fields
                else if (hasSourceField && hasThumbnailField) {
                    const isValidSource = !newSource?.endsWith('.mp3') && (!newSource || youtubeUrlRegex.test(newSource));
                    thumbnailOrSourceChanged = newThumbnail || (newSource && isValidSource && newDuration);
                    thumbnailIs.value = !!newThumbnail;
                    trackIs.value.source = !!newSource && isValidSource;
                    trackIs.value.duration = !!newDuration;

                    console.log('Case 3: Form for adding data with both source and thumbnail fields');
                    console.log('newThumbnail:', !!newThumbnail);
                    console.log('newSource:', !!newSource);
                    console.log('newDuration:', !!newDuration);
                }

                hasChanges.value = textFieldsChanged && thumbnailOrSourceChanged;
            } else if (isFormForEditing) {
                if (hasSourceField && newSource && !newSource?.endsWith('.mp3')) {
                    const isValidSource = youtubeUrlRegex.test(newSource);
                    console.log(isValidSource)
                    hasChanges.value = isValidSource && (oldValObj !== newValObj)
                } else {
                    hasChanges.value = (oldValObj !== newValObj);

                }

            }
            console.log('thumbnailOrSourceChanged', thumbnailOrSourceChanged);
            // return textFieldsChanged || thumbnailOrSourceChanged;


            // Determine the value of hasChanges based on textFields and thumbnail/source changes

            console.log('hasChanges.value:', hasChanges.value);
            console.log('Source', newSource, oldSource);
            console.log('compare', (oldValObj !== newValObj));

        },

        {deep: true}
    );


    function resetHasChanges(initialState?: T,
                             preview?: Ref<MediaPreview> | null,
                             pictureFile?: Ref<File[]> | null,
                             trackFile?: Ref<File[]> | null):
        void {
        if (initialState) {
            Object.assign(objectToWatch, initialState);

            textFieldsIs.value = false;
            thumbnailIs.value = false;
            trackIs.value.source = false;
            trackIs.value.duration = false;
            hasChanges.value = false;
        }
        if (preview) {
            preview.value.picture = null;
            preview.value.track = null;
        }
        if (pictureFile) {
            pictureFile.value = [];
        }
        if (trackFile) {
            trackFile.value = [];
        }


        textFieldsIs.value = false;
        thumbnailIs.value = false;
        trackIs.value.source = false;
        trackIs.value.duration = false;
        hasChanges.value = false;


    }

    return {hasChanges, resetHasChanges}
}



