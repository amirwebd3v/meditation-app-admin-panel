import {L5Client, type Paginator} from 'l5-client';
import type {FilterSearchItem, FilterSortItem, QueryParams} from 'l5-client'
import {FetchOptions, FetchResponse} from "ofetch";
import {useValidationStore} from "~/stores/validation";

const appConfig = useAppConfig()
const client = new L5Client(appConfig.api.baseUrl, {headers: appConfig.api.headers})

const onResponseError = async ({ request, response, options }) => {
    switch (response.status) {
        case 422:
            useValidationStore().setErrors(response._data.errors)
            break
        case 401:
            navigateTo('/auth/login')
            break
        default:
            break
    }
}


const get = <T = any, R extends ResponseType = "json">(route: string, option?: FetchOptions): Promise<FetchResponse<R, T>> => {
    return useSanctumClient()(route, {...option, method: 'GET', onResponseError, parseResponse: JSON.parse})
}

const post = async <T = any, R extends ResponseType = "json">(route: string, option?: FetchOptions): Promise<FetchResponse<R, T>> => {
    return await useSanctumClient()(route, {...option, method: 'POST', onResponseError, parseResponse: JSON.parse})
}

const put = <T = any, R extends ResponseType = "json">(route: string, option?: FetchOptions): Promise<FetchResponse<R, T>> => {
    return useSanctumClient()(route, {...option, method: 'PUT', onResponseError, parseResponse: JSON.parse})
}

const destroy = <T = any, R extends ResponseType = "json">(route: string, option?: FetchOptions): Promise<FetchResponse<R, T>> => {
    return useSanctumClient()(route, {...option, method: 'DELETE', onResponseError, parseResponse: JSON.parse})
}

const paginate = <T>(route: string, queryParams: QueryParams): Promise<Paginator<T>> => {
    return client.paginate<T>(route, queryParams)
}

const all = <T>(route: string, queryParams: Omit<QueryParams, "pagination">): Promise<T[]> => {
    return client.all<T>(route, queryParams)
}

const prepareQueryParams = ({page = 1, itemsPerPage = 10, sortBy = []}, search: FilterSearchItem[] = []): QueryParams => {
    let sort: FilterSortItem = {}

    if (sortBy.length > 0) {
        sortBy.forEach(({key, order}) => sort[key] = order)
    }

    return {
        pagination: {page: page || 1, perPage: itemsPerPage || 10}, sort, search
    }
}


export default function useApi() {
    return {paginate, all, get,post, put, destroy, prepareQueryParams}
}