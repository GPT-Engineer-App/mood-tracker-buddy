const SUPABASE_URL = 'https://gaecvggrbzjihrtgoaji.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhZWN2Z2dyYnpqaWhydGdvYWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIxNTA0ODksImV4cCI6MjAyNzcyNjQ4OX0.tOmLn2y7wZdlBzuIt5cCIfszVnsk0bFqcVF6fKJAFLo';

const headers = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
};

export const fetchMoods = async () => {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/moods`, {
    headers,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch moods');
  }

  const data = await response.json();
  return data;
};

export const createMood = async (mood) => {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/moods`, {
    method: 'POST',
    headers,
    body: JSON.stringify(mood),
  });

  if (!response.ok) {
    throw new Error('Failed to create mood');
  }

  const data = await response.json();
  return data;
};

export const updateMood = async (id, updates) => {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/moods?id=eq.${id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error('Failed to update mood');
  }
};

export const deleteMood = async (id) => {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/moods?id=eq.${id}`, {
    method: 'DELETE',
    headers,
  });

  if (!response.ok) {
    throw new Error('Failed to delete mood');
  }
};