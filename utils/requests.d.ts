import type {QueryParams} from "l5-client";
import type {Category} from "~/utils/types";
import type {CourseType} from "~/utils/enums";



interface CourseStoreRequest {
    type: CourseType
    categories: number[]
    title: string
    description: string|null
    price: number
    is_popular: boolean
}

interface CourseUpdateRequest {
    id: string
    categories: number[]|null
    type: string|null
    title: string|null
    description: string|null
    price: number|null
    is_popular: boolean|null
}

interface CourseIndexRequest extends QueryParams {
    type: CourseType
}


export {
    CourseIndexRequest,
    CourseStoreRequest,
    CourseUpdateRequest
}