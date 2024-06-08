# ecommerce-app

## Setup AWS CLI
Add your access key and secret access keys. And enter region as `ap-south-1`. 
```
aws configure
```

## Create DynamoDb Tables
Go to the repository
```
cd Templates
```
Create DynamoDB tables using AWS CLI
```
aws cloudformation create-stack --stack-name MyDynamoDBStack --template-body file://Dynamodb.yml
```

## Deploy the application
```
npm run deploy:dev
```

## API specs
Visit this file in the root directory for API specs - api-specs.yml
