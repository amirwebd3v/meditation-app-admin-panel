import type {Ref} from "vue";

export default function useInputHasChanges<T extends object>
(objectToWatch: T, initialState ?: T): { hasChanges: Ref<boolean>; resetHasChanges: () => void; } {

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


    function resetHasChanges(): void {
        if (initialState) {
            Object.assign(objectToWatch, initialState)
        }
        hasChanges.value = false
    }

    return {hasChanges, resetHasChanges}
}