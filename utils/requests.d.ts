import type {CourseType} from "~/utils/enums";
import type {Category} from "~/utils/types";
import {CourseSet} from "~/utils/enums";


interface CourseStoreRequest {
    type: CourseType
    categories?: number[]
    title: string
    set: CourseSet
    thumbnail?: string
    description?: string
    price: number
}

interface CourseUpdateRequest {
    id: string
    categories?: number[]
    thumbnail?: string
    title?: string
    description?: string
    price?: number
}


interface LessonStoreRequest {
    course_uuid: string
    categories?: number[]
    set: CourseSet
    title: string
    source: string
    duration: string
    thumbnail?: string
    description?: string
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
    is_new: boolean
    is_popular: boolean
}

interface CategoryStoreRequest {
    name: Category['name']
    type: Category['type']
}


export {
    CourseStoreRequest,
    CourseUpdateRequest,
    LessonStoreRequest,
    LessonUpdateRequest,
    CategoryStoreRequest
}