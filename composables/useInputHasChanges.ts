import type {Ref} from "vue";

export default function useInputHasChanges<T extends object>
(objectToWatch: T): {
    hasChanges: Ref<boolean>;
    resetHasChanges: (initialState ?: T, pictureFile ?: Ref<File[]> | null, trackFile ?: Ref<File[]> | null) => void;
} {

    const hasChanges = ref(false)
    let oldValObj = JSON.stringify(objectToWatch, (key, value) => {
        if (value === null) {
            return '';
        } else if (typeof value === 'number') {
            return value.toString();
        }
        return value;
    })

    watch(objectToWatch, (newVal) => {
        const newValObj = JSON.stringify(newVal, (key, value) => {
            if (value === null) {
                return '';
            } else if (typeof value === 'number') {
                return value.toString();
            }
            return value;
        })

        hasChanges.value = oldValObj !== newValObj
    })


    function resetHasChanges(initialState?: T, pictureFile?: Ref<File[]> | null, trackFile?: Ref<File[]> | null): void {
        if (initialState) {
            Object.assign(objectToWatch, initialState);
        }
        if (pictureFile) {
            pictureFile.value = [];
        }
        if (trackFile) {
            trackFile.value = [];
        }
        hasChanges.value = false;
    }

    return {hasChanges, resetHasChanges}
}