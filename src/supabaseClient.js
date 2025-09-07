// // // import { createClient } from '@supabase/supabase-js';

// // // const supabaseUrl = import.meta.env.VITE_supabaseUrl;
// // // const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// // // export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// // import { createClient } from '@supabase/supabase-js';

// // const supabase = createClient(
// //     process.env.supabaseUrl,
// //     process.env.SUPABASE_ANON_KEY
// // );

// // src/supabaseClient.js
// import { createClient } from '@supabase/supabase-js';
// // import dotenv from 'dotenv';
// // dotenv.config(); // Ensure env is loaded here too if needed

// // Load environment variables from Vite
// const supaBaseUrl = import.meta.env.supabaseUrl
// const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY

// // Safety check to avoid "supabaseUrl is required" errors
// // if (!supabaseUrl || !supabaseAnonKey) {
// //     throw new Error(
// //         'Supabase URL or Anon Key is missing. Please check your .env file.'
// //     );
// // }

// // Create a single supabase client instance
// export const supabase = createClient(supaBaseUrl, supabaseAnonKey);




















// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
// console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY);

console.log("Supabase URL:", supabaseUrl);
console.log("Anon Key starts with:", supabaseAnonKey?.slice(0, 20));

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL or Anon Key is missing. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
