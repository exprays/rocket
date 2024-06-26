
# Rocket 🚀

A Typesafe, lightning-fast, high-performance API built using Hono and cloudflare workers which searches countries in milliseconds.

It uses distriuted databases and cloudflare workers to provide superfast query messages throughout the world with the help of upstash. You can also switch database options between Redis & Serverless PostgreSQL.




## API Reference

#### Get all items

```bash
  GET /api/search
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `query` | `string[]` | **Required**. Country name to search |
| `source` | `redis` or `postgres` | Database to use |




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`UPSTASH_REDIS_URL` - Your upstash redis database url

`UPSTASH_REDIS_TOKEN` - Your upstash redis token

`NEON_POSTGRES_URL` - Your postgreSQL database url string ( For this I used NeonDB )


## Run Locally

Clone the project

```bash
  git clone https://github.com/rayxlab/rocket.git
```

Go to the project directory

```bash
  cd rocket
```

Install dependencies

```bash
  npm install or pnpm install
```

Start the server

```bash
  npm run dev or pnpm dev
```


## Deployment

To deploy this project run

```bash
  npm run deploy
```

**Note**: To deploy this project to cloudflare workers you have to add this wrangler.toml file to your root directory before deploying.

```toml
name = "rocket"
compatibility_date = "2024-04-02"

[vars]
UPSTASH_REDIS_URL="Your_redis_url"
UPSTASH_REDIS_TOKEN="Your_redis_token"
NEON_POSTGRES_URL="Your postgreSQL url"
```

## Features

- Fast searches
- Shows duration of searches
- Uses full-text RediSearch©️ algorithm
- Uses superfast serverless postgreSQL search
- Database switching


## License

[MIT](https://choosealicense.com/licenses/mit/)




# 💻 Tech Used:
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white) ![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![Hono](https://img.shields.io/badge/hono-F95F1B.svg?style=for-the-badge&logo=hono&logoColor=white) ![Upstash](https://img.shields.io/badge/upstash-1AEEC7.svg?style=for-the-badge&logo=upstash&logoColor=white) ![Postgresql](https://img.shields.io/badge/postgresql-2F80D7.svg?style=for-the-badge&logo=postgresql&logoColor=white)
