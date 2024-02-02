import {FilterSearchItem, FilterSortItem, L5Client, QueryParams} from 'l5-client';


const api = new L5Client('https://omni-api.hidevs.ir/admin/v1')

const prepareQueryParams = ({page = 1, itemsPerPage = 15, sortBy = []}, search: FilterSearchItem[] = []): QueryParams => {
    let sort: FilterSortItem = {}

    if (sortBy.length > 0) {
        sortBy.forEach(({key, order}) => sort[key] = order)
    }

    return {
        pagination: {page: page || 1, perPage: itemsPerPage || 15}, sort, search
    }
}

export {api, prepareQueryParams}