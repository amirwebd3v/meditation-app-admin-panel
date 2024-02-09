interface Course {
    created_at: number
    description: string
    lessons_count: number
    price: number
    price_type: string
    set: string
    thumbnail: Media | null
    title: string
    type: string
    updated_at: number
    uuid: string
    _entity: string
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
        large: string
        medium: string
        original: string
        small: string
    }
    large: string
    medium: string
    original: string
    small: string
    uuid: string
    _entity: string
}

interface Lesson {
    _entity: string
    uuid: string
    course: Course
    title: string
    description: string
    duration: number
    price: number
    is_new: boolean
    is_popular: boolean
    thumbnail: Media | null
    created_at: number
    updated_at: number
}

export {
    Lesson,
    Course,
    Media,
}