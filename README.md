[![Netlify Status](https://api.netlify.com/api/v1/badges/e9f165ee-578e-4d47-b2f9-27d34d45a6ea/deploy-status)](https://app.netlify.com/sites/netlify-backend/deploys)


# HTML to PDF Service

This project provides a serverless function to convert HTML content to PDF using Puppeteer, hosted on AWS Lambda.

## Features

- Convert HTML content to PDF
- Includes background graphics in the PDF
- Deployed using AWS Lambda and the Serverless Framework

## Prerequisites

- Node.js (version 16.x or later)
- Serverless Framework
- AWS account and credentials configured

## Project Structure
your-project/
├── functions/
│ └── api.js
├── node_modules/
├── package.json
└── serverless.yml

bash
Copy code

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   
Install the Serverless Framework globally:

bash
Copy code
npm install -g serverless
Install project dependencies:

bash
Copy code
npm install
Configuration
serverless.yml
The serverless.yml file defines the configuration for your AWS Lambda function using the Serverless Framework. It should look like this:

yaml
Copy code
service: html-to-pdf-service

provider:
  name: aws
  runtime: nodejs16.x
  region: us-east-1

functions:
  api:
    handler: functions/api.handler
    events:
      - http:
          path: convert
          method: post

package:
  exclude:
    - node_modules/**
    - .gitignore
    - .git/**

plugins:
  - serverless-offline

custom:
  chrome:
    args:
      - '--headless'
      - '--disable-gpu'
      - '--single-process'
      - '--no-zygote'
      - '--no-sandbox'
      - '--disable-dev-shm-usage'
