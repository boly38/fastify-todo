
## HowTo install

- Clone the repository and install dependencies

```bash
git clone https://github.com/boly38/fastify-todo.git
cd fastify-todo
pnpm install
```

## HowTo run

Start server
````bash
node startServer.js
# listen on localhost:4000 serving dist/ as front-end when exist
````
Start front-end
````bash
pnpx vite --host 0.0.0.0
# listen on localhost:3000 serving dynamically current source as front-end and proxifying /api to localhost:4000
````

## HowTo run test

Vite test
````bash
pnpm run test
````

## HowTo do application packaging (front-end)

````bash
pnpm run build
# or pnpx vite build
# generate dist/ dir with bundled frond-end
ls -la dist/
# dist/ file is an autonomous ready-to-prod app front-end
````

## HowTo run packaged application (PROD run)
````bash
# packaging is done
pnpm run start
# or node startServer.js
# listen on localhost:4000 serving dist/ as front-end
````

## HowTo do review with AI
- setup and configure `aichat` ([doc](https://github.com/sigoden/aichat)), 
- update `tools/aichatreview.sh` to fit your need : ie. `review_prompt`
- start review

````bash
make aireview
# without make, simply do
./tools/aichatreview.sh
````

## About nixpacks packaging

This app is a NodeJS ESM simple application.

- compatible with [nixpacks](https://nixpacks.com/docs/getting-started)

### nixpacks build
````bash
# git clone and cd fastify-todo/
# cat ./nixpacks.toml
nixpacks build . --name fastify-app
````

### run
Once nixpacks build is done, you could start app container.

````bash
docker run -it -p 4000:4000 fastify-app
````

