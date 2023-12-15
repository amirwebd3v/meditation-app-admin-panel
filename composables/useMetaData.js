

export default function useMetaData(meta = null) {

    return {
        per_page: meta?.per_page || 15,
        current_page: meta?.current_page || 1,
        total: meta?.total || 0
    };
}