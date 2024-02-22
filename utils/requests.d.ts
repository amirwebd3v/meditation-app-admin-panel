import type {QueryParams} from "l5-client";
import type {Category} from "~/utils/types";
import type {CourseType} from "~/utils/enums";



interface CourseStoreRequest {
    type: CourseType
    categories?: number[]
    title: string
    thumbnail?: string
    description?: string
    price: number
    is_popular: boolean
}

interface CourseUpdateRequest {
    id: string
    categories?: number[]
    thumbnail?: string
    title?: string
    description?: string
    price?: number
    is_popular?: boolean
}

interface CourseIndexRequest extends QueryParams {
    type: CourseType
}


export {
    CourseIndexRequest,
    CourseStoreRequest,
    CourseUpdateRequest
}