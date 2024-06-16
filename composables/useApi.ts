import {L5Client, type Paginator} from 'l5-client';
import type {FilterSearchItem, FilterSortItem, QueryParams} from 'l5-client'
import {FetchOptions, FetchResponse, ResponseType} from "ofetch";
import type {AppConfig} from "@nuxt/schema";


const appConfig : AppConfig = useAppConfig()
const client = new L5Client(appConfig.api.baseUrl, {headers: appConfig.api.headers})


const onResponseError = async ({ request, response, options }) => {
    useValidationStore().setResponse(response)
    switch (response.status) {
        case 401:
            await useSanctumAuth().logout()
            break
        default:
            break
    }
}

export default function useApi() {

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
        const params = client.buildQueryParams(queryParams)
        return useSanctumClient()(route, {params, method: 'GET', onResponseError, parseResponse: JSON.parse})
        // return client.paginate<T>(route, queryParams)
    }

    const all = <T>(route: string, queryParams: Omit<QueryParams, "pagination">): Promise<T[]> => {
        const params = client.buildQueryParams(queryParams)
        return useSanctumClient()(route, {params, method: 'GET', onResponseError, parseResponse: JSON.parse})
        // return client.all<T>(route, queryParams)
    }

    const prepareQueryParams = ({
                                    page = 1,
                                    itemsPerPage = 10,
                                    sortBy = []
                                }, search: FilterSearchItem[] = []): QueryParams => {
        let sort: FilterSortItem = {}
        const sortState = reactive({})

        if (sortBy.length > 0) {
            sortBy.forEach(({key, order}) => {
                sort[key] = order
                sortState[key] = order
            })
        } else {

            sort = sortState
            // console.log(sortState)
        }

        // console.log('sort',sort)
        // console.log('sortState',sortState)


        return {
            pagination: {page: page || 1, perPage: itemsPerPage || 10}, sort, search
        }
    }

    return {paginate, all, get,post, put, destroy, prepareQueryParams}

}