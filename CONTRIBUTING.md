
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

## HowTo do application packaging

````bash
pnpx vite build
# generate dist/ dir with bundled frond-end
ls -la dist/
# dist/ file is an autonomous ready-to-prod app front-end
````

## HowTo run packaged application (PROD run)
````bash
# packaging is done
node startServer.js
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
