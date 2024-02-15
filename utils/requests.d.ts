import type {QueryParams} from "l5-client";
import {CourseType} from "~/utils/types";


export interface CourseStoreRequest {
    type: string
    title: string
    description: string|null
    price: number
    is_popular: boolean
}

export interface CourseUpdateRequest {
    id: string
    type: string|null
    title: string|null
    description: string|null
    price: number|null
    is_popular: boolean|null
}

export interface CourseIndexRequest extends QueryParams {
    type: CourseType
}
