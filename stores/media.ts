import { defineStore } from 'pinia';
import useApi from '~/composables/api';
import type { Preview } from '~/utils/types';

export const useMediaStore = defineStore('media', {
    actions: {
        async upload(file: File): Promise<Preview> {
            const formData = new FormData();
            formData.append('files[]', file);

            try {
                const { data: preview } = await useApi().post('/admin/v1/media', {
                    body: formData,
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                return preview;
            } catch (error) {
                console.error('Error uploading file:', error);
                throw error;
            }
        },

        // async uploads(files: File[]): Promise<Preview[]> {
        //     const formData = new FormData();
        //     files.forEach((file) => formData.append('files[]', file));
        //
        //     try {
        //         const { data: previews } = await useApi().post('/admin/v1/media', {
        //             body: formData,
        //             headers: { 'Content-Type': 'multipart/form-data' },
        //         });
        //         return previews;
        //     } catch (error) {
        //         console.error('Error uploading files:', error);
        //         throw error;
        //     }
        // },
    },
});
