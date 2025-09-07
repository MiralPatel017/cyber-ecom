import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../supabaseClient';

const initialState = {
    user: null,
    session: null,
    status: 'idle',
    error: null,
};

// Email/Password Sign Up
export const signUp = createAsyncThunk(
    'auth/signUp',
    async ({ email, password, name }, { rejectWithValue }) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name },
            }
        });
        if (error) return rejectWithValue(error.message);
        // also create profile row (optional)
        const user = data?.user;
        if (user) {
            const { error: pErr } = await supabase
                .from('profiles')
                .insert({ id: user.id, name });
            if (pErr && pErr.code !== '23505') console.warn('Profile insert:', pErr.message);
        }
        return data;
    }
);

// Email/Password Sign In
export const signIn = createAsyncThunk(
    'auth/signIn',
    async ({ email, password }, { rejectWithValue }) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return rejectWithValue(error.message);
        return data;
    }
);

// OAuth Sign In
export const signInOAuth = createAsyncThunk(
    'auth/signInOAuth',
    async ({ provider }, { rejectWithValue }) => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider, // 'google' | 'github' | etc.
            options: { redirectTo: window.location.origin }
        });
        if (error) return rejectWithValue(error.message);
        // For OAuth, the redirect occurs; we return url for completeness.
        return data;
    }
);

// Sign Out
export const signOut = createAsyncThunk('auth/signOut', async () => {
    await supabase.auth.signOut();
    return true;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSession: (state, action) => {
            const { session } = action.payload || {};
            state.session = session || null;
            state.user = session?.user || null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (s) => { s.status = 'loading'; s.error = null; })
            .addCase(signUp.fulfilled, (s, a) => { s.status = 'succeeded'; s.session = a.payload.session; s.user = a.payload.user; })
            .addCase(signUp.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload || a.error.message; })

            .addCase(signIn.pending, (s) => { s.status = 'loading'; s.error = null; })
            .addCase(signIn.fulfilled, (s, a) => { s.status = 'succeeded'; s.session = a.payload.session; s.user = a.payload.user; })
            .addCase(signIn.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload || a.error.message; })

            .addCase(signInOAuth.pending, (s) => { s.status = 'loading'; s.error = null; })
            .addCase(signInOAuth.fulfilled, (s) => { s.status = 'succeeded'; })
            .addCase(signInOAuth.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload || a.error.message; })

            .addCase(signOut.fulfilled, (s) => { s.status = 'idle'; s.user = null; s.session = null; });
    },
});

export const { setSession } = authSlice.actions;
export default authSlice.reducer;
