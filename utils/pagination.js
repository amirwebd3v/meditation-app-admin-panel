export function searchQuery(items = []) {
    let search = "";
    let searchFields = "";
    items.forEach((item) => {
        searchFields += `${item.key}:${item.operator};`;
        search += `${item.key}:${item.value};`;
    });
    return { search, searchFields };
}

export function metaData(meta = null) {

    return {
        per_page: meta?.per_page || 15,
        current_page: meta?.current_page || 1,
        total: meta?.total || 0
    };
}