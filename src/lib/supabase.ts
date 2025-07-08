import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wjkpvnyjfltgvaxpifnv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indqa3B2bnlqZmx0Z3ZheHBpZm52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NTE5OTksImV4cCI6MjA2NzUyNzk5OX0.ULT8ZTQnvLel2ZyTmXyjMDzDggDncOfDDzWze7TpsCw'

export const supabase = createClient(supabaseUrl, supabaseKey)