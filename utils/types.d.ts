import type {CourseType} from "~/utils/enums";
import {CourseSet} from "~/utils/enums";
import type {Ref} from "vue";


interface Error {
    status: number | undefined,
    message: string | undefined,
    errors: Record<string, Array<string>> | undefined
}

interface Course {
    created_at: number
    description: string
    categories: Category[]
    categories_count: number
    lessons_count: number
    is_purchased: boolean
    price: number
    set: CourseSet
    thumbnail: Media | null
    title: string
    type: string
    updated_at: number
    deleted_at: number
    uuid: string
    _entity: string
}


interface Preview {
    id: string
    url: string
    duration ?: number
    mime_type: string
    size: string
    created_at: number
}

interface MediaPreview {
    picture: Preview | null;
    track: Preview | null;
}

interface Media {
    collection_name: string;
    created_at: number
    custom_properties: object
    disk: string
    file_name: string
    mime_type: string
    name: string
    size: string
    urls: {
        original: string | undefined
        large: string | undefined
        medium: string | undefined
        small: string | undefined
    }
    uuid: string
    _entity: string
}

interface UploadResult {
    preview: Preview;
}

interface Lesson {
    _entity: string
    uuid: string
    course: Course
    title: string
    description: string
    duration: number
    source: string | Media
    is_new: boolean
    is_popular: boolean
    is_lock: boolean
    thumbnail: Media | null
    created_at: number
    updated_at: number
}

interface User {
    uuid: string
    name: string
    email: string
    avatar: Media['urls']
    roles: string[]
    email_verified_at: number | null
    created_at: number
    updated_at: number
}


interface Category {
    _entity: string
    id: number
    type: CourseType
    name: string
    slug: string
    description: string
    parent_id: number
    created_at: number
    updated_at: number
    deleted_at: number
}


interface ValidationRule {
    (value: any, param?: any): string | boolean;
}

interface ValidationRules {
    [key: string]: ValidationRule
}


interface Analytic {
    _entity: string
    total: number
    count: number
    course: Course
}

export {
    Error,
    User,
    Preview,
    MediaPreview,
    UploadResult,
    Lesson,
    Course,
    Media,
    Category,
    ValidationRules,
    Analytic
}