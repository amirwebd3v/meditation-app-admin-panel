import { defineStore } from 'pinia';
import type {Preview, UploadResult} from '~/utils/types';
import {L5Client} from "l5-client";


const appConfig = useRuntimeConfig().public;
const client = new L5Client(appConfig.api.baseUrl, {headers: appConfig.api.headers});




export const useMediaStore = defineStore('media', () => {

    const percentComplete  = ref<number>(0);

    const fetchCSRFToken = async (): Promise<void> => {
        await fetch(`${appConfig.api.baseUrl}${appConfig.sanctum.endpoints.csrf}`, {
            credentials: 'include'
        });
    };

    const getCSRFToken = (): string => {
        const csrfCookie = useCookie(appConfig.sanctum.csrf.cookie);
        return csrfCookie.value || '';
    };

    const post = async <T = any>(
        route: string,
        options?: {
            body?: FormData | Record<string, any>,
            onUploadProgress?: (progressEvent: ProgressEvent<EventTarget>) => void
        }
    ): Promise<T> => {
        await fetchCSRFToken();

        if (options?.onUploadProgress) {
            return new Promise<T>((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                if (options.onUploadProgress) {
                    xhr.upload.onprogress = function(this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) {
                        options.onUploadProgress!(ev);
                    };
                }
                xhr.onload = function() {
                    if (this.status >= 200 && this.status < 300) {
                        resolve(JSON.parse(this.responseText));
                    } else {
                        reject(new Error(`HTTP error! status: ${this.status}`));
                    }
                };
                xhr.onerror = function() {
                    reject(new Error('Network error occurred'));
                };
                xhr.open('POST', `${appConfig.api.baseUrl}${route}`);
                const csrfToken = getCSRFToken();
                xhr.setRequestHeader(appConfig.sanctum.csrf.header, csrfToken);
                xhr.withCredentials = true;
                xhr.send(options.body as FormData);
            });
        } else {
            return await client.post(route, options?.body);
        }
    };

    const uploadWithProgress = async (file: File): Promise<UploadResult> => {
        const formData = new FormData();
        formData.append('files[]', file);

        percentComplete.value = 0;

        return new Promise((resolve, reject) => {
            post<{ data: Preview[] }>('/admin/v1/media', {
                body: formData,
                onUploadProgress: (progressEvent: ProgressEvent) => {
                    if (progressEvent.lengthComputable) {
                        percentComplete.value = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    }
                },
            })
                .then(response => {
                    resolve({
                        preview: response.data[0]
                    });
                })
                .catch(error => {
                    reject(error);
                });
        });
    };


    return {
        uploadWithProgress,
        percentComplete
    };
});