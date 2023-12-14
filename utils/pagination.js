export default function searchQuery(items = []) {
    let search = "";
    let searchFields = "";
    items.forEach((item) => {
        searchFields += `${item.key}:${item.operator};`;
        search += `${item.key}:${item.value};`;
    });
    return { search, searchFields };
}