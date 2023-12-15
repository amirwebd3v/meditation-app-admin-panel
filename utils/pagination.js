// export function searchQuery(items = []) {
//     let search = "";
//     let searchFields = "";
//     items.forEach((item) => {
//         searchFields += `${item.key}:${item.operator};`;
//         search += `${item.key}:${item.value};`;
//     });
//     return { search, searchFields };
// }
//
// export function metaData(meta = null) {
//
//     return {
//         per_page: meta?.per_page || 15,
//         current_page: meta?.current_page || 1,
//         total: meta?.total || 0
//     };
// }

//
// export function useSearchQuery(items = []) {
//     let search = '';
//     let searchFields = '';
//     items.forEach((item) => {
//         searchFields += `${item.key}:${item.operator};;`;
//         search += `${item.key}:${item.value};;`;
//     });
//     return {search, searchFields};
// }
//
//
// export function useMetaData(meta = null) {
//     const perPage = toRef(meta || { per_page: 15 }, 'per_page');
//     const currentPage = toRef(meta || { current_page: 1 }, 'current_page');
//     const total = toRef(meta || { total: 0 }, 'total');
//
//     return { perPage, currentPage, total };
// }