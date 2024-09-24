import * as contentful from 'contentful'

const SPACE_ID = import.meta.env.VITE_SPACE_ID;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN
});
