export default function setup() {
    const counter = ref(0)

    const increase = function(amount = 1) {
        counter.value += amount
    }

    const decrease = function(amount = 1) {
        counter.value -= amount
    }

    return {counter, increase, decrease}
}