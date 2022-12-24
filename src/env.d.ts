/// <reference types="astro/client" />

declare namespace NodeJS {
    export interface ProcessEnv {
        mailjet_api_id: string;
        mailjet_api_secret: string;
    }
}
