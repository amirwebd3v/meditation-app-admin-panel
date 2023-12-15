export default function useSearchQuery(items = []) {
    let search = '';
    let searchFields = '';
    items.forEach((item) => {
        searchFields += `${item.key}:${item.operator};;`;
        search += `${item.key}:${item.value};;`;
    });
    return { search, searchFields };
}