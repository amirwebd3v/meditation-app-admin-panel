import {defineStore} from 'pinia';
import type {Preview} from '~/utils/types';

export const useMediaStore = defineStore('media', {
    actions: {

        async uploads(files: File[]): Promise<Preview> {
            const formData = new FormData();
            files.forEach((file) => formData.append('files[]', file));

            try {
                const {data: previews} = await useApi().post('/admin/v1/media', {
                    body: formData,
                });

                return {...previews[0]};
            } catch (error) {
                console.error('Error uploading files:', error);
                throw error;
            }
        }
    },

});


