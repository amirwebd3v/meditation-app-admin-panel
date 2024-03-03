import type {QueryParams} from "l5-client";
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

interface LessonStoreRequest {
    course_id: string
    categories?: number[]
    title: string
    url: string
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
    url: string
    duration: string
    thumbnail?: string
    description?: string
    price: number
    is_new: boolean
    is_popular: boolean
}



export {
    CourseIndexRequest,
    CourseStoreRequest,
    CourseUpdateRequest,
    LessonStoreRequest,
    LessonUpdateRequest,
}