 
import { SvelteKitAuth } from "@auth/sveltekit"
import PostgresAdapter from "@auth/pg-adapter"
import pkg from 'pg';
const {Pool} = pkg;
import github from "@auth/sveltekit/providers/github"
import google from "@auth/sveltekit/providers/google"
import { DATABASE_HOST, DATABASE_USER, DATABASE_PORT, DATABASE_PASSWORD, DATABASE_NAME } from "$env/static/private";
 
console.log({
  port: Number(DATABASE_PORT),
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
})
const pool = new Pool({
  port: Number(DATABASE_PORT),
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

export const { handle, signIn, signOut } = SvelteKitAuth({
  adapter: PostgresAdapter(pool),  
  providers: [
        github
  ],
})