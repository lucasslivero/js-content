# Serverless Framework AWS NodeJS Project

## Start

To Run the project

```bash
$ yarn start
# Or
$ yarn start:dev # For Live Reloading (automatically refresh the functions)

```

## Docs

### First Steps

- Install all packages: `yarn install `
- Install dynamoDB Local with docker or locally in your machine

### Docker S3 Local

https://github.com/ar90n/serverless-s3-local
In order to create s3 instance:

### Docker DynamoDB Local

In order to create dynamoDB instance:

```bash
$ docker run -p 8000:8000 --name dynamoDB -d amazon/dynamodb-local -jar DynamoDBLocal.jar -sharedDb -inMemory
```

### Deployment

In order to deploy:

```bash
$ serverless deploy
```

In order to remove everything:

```bash
$ serverless remove
```
