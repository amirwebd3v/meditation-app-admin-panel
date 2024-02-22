export default defineEventHandler(async (event) => {
    const data = await $fetch(`https://api.github.com/users/${getRouterParams(event, 'username')}`)
    return {data}
})
