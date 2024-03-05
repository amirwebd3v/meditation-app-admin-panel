import type {QueryParams} from "l5-client";
import type {CourseType} from "~/utils/enums";
import type {Category} from "~/utils/types";


interface CourseStoreRequest {
    type: CourseType
    categories?: number[]
    title: string
    set: 'SINGLE' | 'MULTIPLE'
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

interface LessonStoreRequest {
    course_id: string
    categories?: number[]
    set: 'SINGLE' | 'MULTIPLE'
    title: string
    source: string
    duration: string
    thumbnail?: string
    description?: string
    price: number
    is_new: boolean
    is_popular: boolean
}

interface LessonUpdateRequest {
    id: string
    categories?: number[]
    title: string
    source: string
    duration: string
    thumbnail?: string
    description?: string
    price: number
    is_new: boolean
    is_popular: boolean
}

interface CategoryStoreRequest {
    name: Category['name']
}


export {
    CourseIndexRequest,
    CourseStoreRequest,
    CourseUpdateRequest,
    LessonStoreRequest,
    LessonUpdateRequest,
    CategoryStoreRequest
}