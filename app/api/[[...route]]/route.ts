import { EnvConfig } from "@/types/config";
import { Redis } from "@upstash/redis";
import { Hono } from "hono";
import { env } from "hono/adapter";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.get("/search", async (c) => {

    try {
        
        const {UPSTASH_REDIS_URL, UPSTASH_REDIS_TOKEN} = env<EnvConfig>(c);

        //search time func.
        //-----------start
        const start = performance.now();

        const redis = new Redis({
            url: UPSTASH_REDIS_URL,
            token: UPSTASH_REDIS_TOKEN,
        });

        const query = c.req.query("query")?.toUpperCase(); //get query parameter from request
        if(!query) {
            return c.json({
                message: "Invalid query"
            }, { status: 400 });
        }

        //search algorithm (REDIS)
        const res = [];
        const rank = await redis.zrank("terms", query);

        if(rank !== null && rank !== undefined) {
            const temp = await redis.zrange<string[]>("terms", rank, rank + 100);

            for(const element of temp) {
                if(!element.startsWith(query)) {
                    break;
                }

                //send back the entire word without *
                if(element.endsWith("*")) {
                    res.push(element.substring(0, element.length - 1));
                }
            }
        }

        //----------end
        const end = performance.now();

        return c.json({
            results: res,
            duration: end - start
        });

    } catch (error) {
        console.log("HONO_API_ERROR", error);
        return c.json({ results: [], message: "Something went wrong"}, { status: 500 });
    }
    
});

export const GET = handle(app); //vercel integration

//cf workers
export default app as never;