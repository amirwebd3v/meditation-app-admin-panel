import {
    FilterSearchItem,
    FilterSortItem,
    L5Client,
    QueryParams
} from 'l5-client';

const appConfig = useAppConfig()

const client = new L5Client(`${appConfig.api.baseUrl}/admin/v1`, {headers: appConfig.api.headers})

const prepareQueryParams = ({page = 1, itemsPerPage = 10, sortBy = []}, search: FilterSearchItem[] = []): QueryParams => {
    let sort: FilterSortItem = {}

    if (sortBy.length > 0) {
        sortBy.forEach(({key, order}) => sort[key] = order)
    }

    return {
        pagination: {page: page || 1, perPage: itemsPerPage || 10}, sort, search
    }
}

// export {api, prepareQueryParams}

export default function useApi() {
    return {client, prepareQueryParams}
}

