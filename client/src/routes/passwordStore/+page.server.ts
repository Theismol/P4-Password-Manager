import type { PageServerLoad } from './$types';
import axios from 'axios';
import {fail} from '@sveltejs/kit'


export const load = (async () => {
    return {};
}) satisfies PageServerLoad;