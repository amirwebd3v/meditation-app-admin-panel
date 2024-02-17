import type {QueryParams} from "l5-client";
import {CourseType} from "~/utils/types";


interface CourseStoreRequest {
    type: CourseType
    title: string
    description: string|null
    price: number
    is_popular: boolean
}

interface CourseUpdateRequest {
    id: string
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