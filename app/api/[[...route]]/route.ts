import { EnvConfig } from "@/types/config";
import { Redis } from "@upstash/redis/cloudflare";
import { Hono } from "hono";
import { env } from "hono/adapter";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
import { neon } from '@neondatabase/serverless'; // Import Neon client

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.use("/*", cors());

app.get("/search", async (c) => {
    try {
        const { UPSTASH_REDIS_URL, UPSTASH_REDIS_TOKEN, NEON_POSTGRES_URL } = env<EnvConfig>(c);

        // Get query and source from request
        const query = c.req.query("query")?.toUpperCase();
        const source = c.req.query("source");

        if (!query) {
            return c.json({
                message: "Invalid query"
            }, { status: 400 });
        }

        // Search time measurement
        const start = performance.now();
        let res = [];

        if (source === "postgres") {
            // PostgreSQL search logic using Neon
            const sql = neon(NEON_POSTGRES_URL);
            const pgQuery = `SELECT country_name FROM countries WHERE UPPER(country_name) LIKE $1 LIMIT 100`;
            const result = await sql(pgQuery, [`${query}%`]);

            // Check if result is an array and extract country names
            if (Array.isArray(result)) {
                res = result.map(row => row.country_name);
            }

            console.log("POSTGRES_SEARCH");
        } else {
            // Redis search logic
            const redis = new Redis({
                url: UPSTASH_REDIS_URL,
                token: UPSTASH_REDIS_TOKEN,
            });

            const rank = await redis.zrank("terms", query);

            if (rank !== null && rank !== undefined) {
                const temp = await redis.zrange<string[]>("terms", rank, rank + 100);

                for (const element of temp) {
                    if (!element.startsWith(query)) {
                        break;
                    }

                    // Send back the entire word without *
                    if (element.endsWith("*")) {
                        res.push(element.substring(0, element.length - 1));
                    }
                }
            }
        }

        console.log("POSTGRES_SEARCH");

        const end = performance.now();

        return c.json({
            results: res,
            duration: end - start
        });

    } catch (error) {
        console.log("HONO_API_ERROR", error);
        return c.json({ results: [], message: "Something went wrong" }, { status: 500 });
    }
});

export const GET = handle(app); // Vercel integration

// CF workers
export default app as never;
