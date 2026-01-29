import { supabase } from './supabase';

const demoUsers = [
  { email: 'sme@demo.ch', password: 'password123', role: 'SME' },
  { email: 'provider@demo.ch', password: 'password123', role: 'PROVIDER' },
];

export const seedDemoAccounts = async () => {
  console.log("Starting seed process...");
  const results = [];

  for (const user of demoUsers) {
    try {
      // 1. Sign up AND pass the role in 'options.data'
      const { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
          data: {
            role: user.role, // Pass role here for the Trigger to pick up
          }
        }
      });

      if (error) {
        if (error.message.includes('already registered')) {
          results.push(`User ${user.email} already exists.`);
        } else {
          results.push(`Error creating ${user.email}: ${error.message}`);
        }
        continue;
      }

      // We NO LONGER manually insert into 'profiles'. The Trigger does it.
      if (data.user) {
        results.push(`Successfully created ${user.role} user: ${user.email}`);
      }

    } catch (e: any) {
      results.push(`Unexpected error for ${user.email}: ${e.message}`);
    }
  }

  return results;
};