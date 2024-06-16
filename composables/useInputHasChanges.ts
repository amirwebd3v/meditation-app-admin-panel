import type {Ref} from "vue";
import type {MediaPreview} from "~/utils/types";


export default function useInputHasChanges<T extends object>
(objectToWatch: T): {
    hasChanges: Ref<boolean>;
    resetHasChanges: (initialState ?: T, preview?: Ref<MediaPreview> | null, pictureFile ?: Ref<File[]> | null, trackFile ?: Ref<File[]> | null) => void;
} {


    const hasChanges = ref(false);
    const textFieldsIs = ref(false);
    const thumbnailIs = ref(false);
    const trackIs = ref({source:false,duration:false});

    let oldValObj = JSON.stringify(objectToWatch, (key, value) => {
        if (value === null) return '';
        if (typeof value === 'number') return value.toString();
        if (Array.isArray(value)) return '[' + value.map((item) => JSON.stringify(item)).sort().join(',') + ']';
        return value;
    });

    watch(
        objectToWatch,
        (newVal) => {
            const newValObj = JSON.stringify(newVal, (key, value) => {
                if (value === null) return '';
                if (typeof value === 'number') return value.toString();
                if (Array.isArray(value)) return '[' + value.map((item) => JSON.stringify(item)).sort().join(',') + ']';
                return value;
            });

            const oldObj = JSON.parse(oldValObj);
            const newObj = JSON.parse(newValObj);

            const { thumbnail: oldThumbnail = null, source: oldSource = null, duration: oldDuration = null, ...filteredOld } = oldObj;
            const { thumbnail: newThumbnail = null, source: newSource = null, duration: newDuration = null,...filteredNew } = newObj;



            const emptyValuesInOldTextFields = Object.values(filteredOld).filter((value) => value === null || value === '').length;
            const oldTextFieldsHasEmpty = emptyValuesInOldTextFields > 1;

            const AllFieldsChanges = () => {
                const textFieldsChanged = JSON.stringify(filteredNew) !== JSON.stringify(filteredOld);
                const thumbnailChanged = newThumbnail !== oldThumbnail;
                const sourceChanged = newSource !== oldSource;
                const durationChanged = newDuration !== oldDuration;




                // If text fields changed, and either thumbnail or source changed, and old text field was empty
                if (textFieldsChanged && (thumbnailChanged || (sourceChanged && durationChanged)) && oldTextFieldsHasEmpty) {
                    console.log('Text fields and thumbnail/source changed, and at least one old text field was empty');
                    textFieldsIs.value = true;
                    if(thumbnailChanged){
                        thumbnailIs.value = true;
                    } else if(sourceChanged){
                        trackIs.value.source = true;
                        trackIs.value.duration = true;
                    } else {
                        thumbnailIs.value = true;
                        trackIs.value.source = true;
                        trackIs.value.duration = true;
                    }

                    return true;
                }

                // If text fields changed, but neither thumbnail nor source changed, and old text field was empty
                if (textFieldsChanged && !(thumbnailChanged || (sourceChanged && durationChanged)) && oldTextFieldsHasEmpty) {
                    console.log('Text fields changed, but neither thumbnail nor source changed, and at least one old text field was empty');
                    textFieldsIs.value = true;
                    if(thumbnailChanged){
                        thumbnailIs.value = false;
                    } else if(sourceChanged){
                        trackIs.value.source = false;
                        trackIs.value.duration = false;
                    } else {
                        thumbnailIs.value = false;
                        trackIs.value.source = false;
                        trackIs.value.duration = false;
                    }
                    return false;
                }


                // If text fields didn't change, but either thumbnail or source changed, and old text field was empty
                if (!textFieldsChanged && (thumbnailChanged || (sourceChanged && durationChanged)) && oldTextFieldsHasEmpty) {
                    console.log('Text fields didn\'t change, but either thumbnail or source changed, and at least one old text field was empty');
                    textFieldsIs.value = false;
                    if(thumbnailChanged){
                        thumbnailIs.value = true;
                    } else if(sourceChanged){
                        trackIs.value.source = true;
                        trackIs.value.duration = true;
                    } else {
                        thumbnailIs.value = true;
                        trackIs.value.source = true;
                        trackIs.value.duration = true;
                    }
                    return false;
                }


                // If old text fields were not empty
                if (!oldTextFieldsHasEmpty) {
                    console.log('No old text fields were empty');
                    return oldValObj !== newValObj;
                }

                console.log('No changes detected');
                textFieldsIs.value = false;
                thumbnailIs.value = false;
                trackIs.value.source = false;
                trackIs.value.duration = false;
                return false;
            };

            hasChanges.value = AllFieldsChanges();

        },

        { deep: true }

    );



    function resetHasChanges(initialState?: T,
                             preview?: Ref<MediaPreview> | null,
                             pictureFile?: Ref<File[]> | null,
                             trackFile?: Ref<File[]> | null):
        void {
        if (initialState) {
            Object.assign(objectToWatch, initialState);
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


