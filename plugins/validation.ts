/**
 * I define an interface ValidationRule that represents a validation function, which takes a value of
 * any type and returns a string (error message) or a boolean (valid or invalid).
 *
 *
 * I define an interface ValidationRules that represents an object with validation rules,
 * where the keys are strings (rule names), and the values are ValidationRule functions.
 * I create an object validationRules of type ValidationRules to store my validation functions.
 */
import type {ValidationRules} from "~/utils/types";


export default defineNuxtPlugin((nuxtApp) => {
    const validationRules: ValidationRules = {}


    validationRules.required = (value: any): string | boolean => {
        return !!value || value === 0 || 'This field is required'
    }

    validationRules.email = (value: any): string | boolean => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (pattern.test(value)) {
            return true;
        } else {
            return 'Invalid email address';
        }
    }


    validationRules.minLength = (value: any): string | boolean => {
        if (value?.length < 3) {
            return `Value must be at least 3 characters long`;
        }
        return true;
    };

    validationRules.maxLength = (value : any,maxLimit : number = 30,): string | boolean => {
        if (value?.length > maxLimit) {
            return `Value must not exceed ${maxLimit} characters`;
        }
        return true;
    }


    // validationRules.pictureFormat = (value: any): string | boolean => {
    //     const allowedPictureFormats = ['jpg', 'png', 'jpeg'];
    //     if (typeof value === 'string') {
    //         const extension = value.split('.').pop()!.toLowerCase();
    //         if (allowedPictureFormats.includes(extension)) {
    //             return true;
    //         } else {
    //             return `Invalid picture format. Allowed formats are: ${allowedPictureFormats.join(', ')}`;
    //         }
    //     } else {
    //         return 'Invalid input. Expected a file name.';
    //     }
    // };
    //
    //
    // validationRules.trackFormat = (value: any): string | boolean => {
    //     const allowedTrackFormats = ['mp3', 'wav'];
    //     if (typeof value === 'string') {
    //         const extension = value.split('.').pop()!.toLowerCase();
    //         if (allowedTrackFormats.includes(extension)) {
    //             return true;
    //         } else {
    //             return `Invalid track format. Allowed formats are: ${allowedTrackFormats.join(', ')}`;
    //         }
    //     } else {
    //         return 'Invalid input. Expected a file name.';
    //     }
    // };


    validationRules.url = (value: any): string | boolean => {
        const urlPattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+\w{2,}(\/\S*)?$/;

        if (typeof value === 'string') {
            if (urlPattern.test(value)) {
                return true;
            } else {
                return 'Invalid URL format';
            }
        } else {
            return 'Invalid input. Expected a string.';
        }
    };

    validationRules.price = (value) => {
        const pricePattern = /^(?!0+\.\d+$)(\d{1,3}(\.\d{1,3})?|\.\d{1,3})$/;
        const noLettersPattern = /^[0-9.]+$/;

        if (typeof value === 'string' || value === 0) {
            if (noLettersPattern.test(value) && pricePattern.test(value)) {
                return true;
            } else {
                return 'Please enter a valid price.';
            }
        } else {
            return 'Invalid input. Expected a number.';
        }
    };

    // Provide validation rules to the Nuxt app instance
    nuxtApp.provide('validationRules', validationRules)
})