'use server';

import { supabase } from '../lib/supabase';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// Generic Fetch
export async function fetchTableData(table: string, orderCol = 'created_at') {
  const { data, error } = await supabase.from(table).select('*').order(orderCol, { ascending: false });
  if (error && error.code !== '42P01') throw new Error(error.message);
  return data || [];
}

// Generic Insert
export async function insertRecord(table: string, payload: any) {
  const { data, error } = await supabase.from(table).insert([payload]).select();
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/${table}`);
  return data;
}

// Generic Update (Updated to support custom Primary Keys)
export async function updateRecord(table: string, id: string | number, payload: any, pkCol = 'id') {
  const { data, error } = await supabase.from(table).update(payload).eq(pkCol, id).select();
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/${table}`);
  return data;
}

// Generic Delete (Updated to support custom Primary Keys)
export async function deleteRecord(table: string, id: string | number, pkCol = 'id') {
  const { error } = await supabase.from(table).delete().eq(pkCol, id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/${table}`);
}

// Simple Login Action
export async function loginAdmin(password: string) {
  // In production, use environment variables: process.env.ADMIN_PASSWORD
  if (password === 'admin123') { 
    // Await the cookies() promise before setting
    const cookieStore = await cookies();
    cookieStore.set('admin_auth', 'true', { secure: true, httpOnly: true });
    return { success: true };
  }
  return { success: false, error: 'Invalid password' };
}

export async function logoutAdmin() {
  // Await the cookies() promise before deleting
  const cookieStore = await cookies();
  cookieStore.delete('admin_auth');
}