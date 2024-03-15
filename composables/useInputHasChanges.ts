export default function useInputHasChanges<T extends object>
(objectToWatch: T): { hasChanges: Ref<boolean>; resetHasChanges: () => void; } {

    const hasChanges = ref(false)
    let oldValObj = JSON.stringify(Object.values(objectToWatch))

    watch(objectToWatch, (newVal) => {
        const newValObj = JSON.stringify(Object.values(newVal))
        // Check if the new value is different from the old value
        hasChanges.value = oldValObj !== newValObj
    })


    function resetHasChanges(): void {
        hasChanges.value = false
    }

    return {hasChanges, resetHasChanges}
}