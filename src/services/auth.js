import { supabase } from "../supabaseClient";

// sign up
export async function signUp(email, password) {
  return await supabase.auth.signUp({ email, password });
}

// sign in
export async function signIn(email, password) {
  return await supabase.auth.signInWithPassword({ email, password });
}

// sign out
export async function signOut() {
  return await supabase.auth.signOut();
}

// get current user
export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data?.user ?? null;
}

// listen for auth changes
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback);
}
