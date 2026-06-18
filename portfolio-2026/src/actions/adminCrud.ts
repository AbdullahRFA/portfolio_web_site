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

// Generic Update
export async function updateRecord(table: string, id: string | number, payload: any) {
  const { data, error } = await supabase.from(table).update(payload).eq('id', id).select();
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/${table}`);
  return data;
}

// Generic Delete
export async function deleteRecord(table: string, id: string | number) {
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/${table}`);
}

// Simple Login Action
export async function loginAdmin(password: string) {
  // In production, use environment variables: process.env.ADMIN_PASSWORD
  if (password === 'admin123') { 
    cookies().set('admin_auth', 'true', { secure: true, httpOnly: true });
    return { success: true };
  }
  return { success: false, error: 'Invalid password' };
}

export async function logoutAdmin() {
  cookies().delete('admin_auth');
}