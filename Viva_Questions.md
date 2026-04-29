## 1. Why use TypeScript instead of plain JavaScript for this portfolio?

- Answer: It provides Static Type Checking. We catch bugs (like passing a string to a function that expects a number) during development rather than at runtime. It makes the code self-documenting.

## 2. What is the "App Router" in Next.js?

- Answer: It’s the new paradigm in Next.js that uses React Server Components. It allows for easier data fetching, better SEO, and simpler routing compared to the old pages directory.

## 3. Why do we need a "Cached Connection" for MongoDB in Next.js?

- Answer: Next.js API routes are serverless. Every time a user hits an API, a new instance might spin up. Without caching, we would create a new DB connection every single time, eventually crashing our database (Too Many Connections error).


## 4. What does mv app src/ do?

- It moves the entire routing directory into src. Next.js is smart; it automatically checks if a src/app or app folder exists. By moving it, we are just organizing our "Source" code.

## 5. Why did we use (global as any) in the code above?

- In TypeScript, the global object doesn't know what mongoose is. By using any (or a custom interface), we tell TypeScript: "Trust me, I'm attaching a custom property to the global scope to save our database connection."

## 6. What is .env.local?

- It’s a file where we store sensitive secrets (like DB passwords). Never commit this file to GitHub!
  
## 7. What is the benefit of the src/ directory?

- Answer: It creates a clear boundary between Project Meta-files (configs, linting, packages) and Application Source Code. This improves scannability and prevents the root folder from becoming a "junk drawer" of files.

## 8. Why do we check for cached.conn in connectDB?

- Answer: Efficiency. If a connection already exists, we reuse it. In serverless environments, opening a new connection for every API call is expensive and can crash the database by exceeding connection limits.

## 9. What does the ! after process.env.MONGODB_URI! do?

- Answer: That is the Non-null assertion operator in TypeScript. It tells the compiler, "I guarantee this variable will exist at runtime, so don't complain about it potentially being undefined."


## Why do we export both an interface and a model?

Answer: The interface is for TypeScript (compile-time safety so we don't misspell title as tite). The model is for Mongoose (runtime logic to actually talk to MongoDB).

## What is NextResponse.json()?

Answer: It's a Next.js helper that formats our data as a JSON response and sets the correct headers (like Content-Type: application/json) automatically.

## Why models.Project || model(...)?

Answer: In development, Next.js reloads code frequently. If we just used model(...), Mongoose would throw an error saying "Model 'Project' already exists." This check ensures we reuse the existing model.

## What is the difference between Status Code 200 and 201?

Answer: 200 OK is a general success code (usually for fetching data). 201 Created specifically means a new resource was successfully created in the database.

## Why do we use await request.json()?

Answer: In Next.js App Router, the request body is a Stream. We have to "await" the parsing of that stream into a JSON object so we can use it in our code.

## How does the frontend know which project is which?

Answer: MongoDB automatically generates a unique _id (ObjectId) for every document. We use this ID later for specific project pages (e.g., /projects/123).

## What is line-clamp-2 in Tailwind?

Answer: it's a utility that truncates text to exactly 2 lines and adds an ellipsis (...). It keeps our grid looking neat even if one project has a longer description than another.

## Why do we fetch data directly in the Home() function?

Answer: Because it's a Server Component. Fetching data here is faster (less JavaScript sent to the client) and better for SEO, as the HTML comes pre-rendered with the data.

## What is process.env.NEXT_PUBLIC_BASE_URL?

Answer: When running on localhost, the URL is http://localhost:3000, but when we deploy to Vercel, it changes. We use an environment variable so the code works in both places.