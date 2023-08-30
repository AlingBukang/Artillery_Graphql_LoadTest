# Web/Graphql LoadTest
* [Learn Artillery](https://www.artillery.io/)

This is a tool that allows you to perform load testing on web applications and GraphQL APIs. Load testing is a process of simulating a large number of users accessing a web application or an API at the same time, in order to measure the performance, reliability, and scalability of the system. 

This tool can help you to:

- Simulate concurrent requests from different users with different parameters and data
- Measure the response time of each request and the overall throughput of the system
- Generate reports in various formats, such as HTML, JSON, and CSV, that show the statistics and graphs of the load test results  

## Required variables
Specify the test users default password in the config.json file.
```sh
"uatTestUserPassword": "UATPassword"
```
Set Honeycomb's API key as env variable
```sh
export apiKeyHoneycomb="HONEYCOMB-API-KEY"
```

## To create and populate the user credentials file

 - Step 1: Populate test users email and passwd

 - Step 2: To create the `client_credentialsUAT.json` 'DB' file, run:
    ```sh
    node ./populateDB.js
    ```
 - Step 3: To populate the 'DB' file with user token, run:
    ```sh
    node ./helper.js
    ```

## The 3 environments
We defined 3 environments with different load phases:

   - fixed-load 
   - low-load
   - max-load

## To run the test
 ```sh
artillery run -e <environment> -o <report-name.json> <config-file.yml>
```

### With Debugger
```sh
DEBUG=<debug-option> artillery run -e fixed-load -o ./reports/z_uat-load-test.json z_uat-load-test.yml

#debug-options:
http:request,http:response - display http request and response
http:request - display http request
http:response - display http response
http:http* - display all http
http:plugins* - display all plugins
```

### Without Debugger
```sh
artillery run -e fixed-load -o ./reports/z_uat-load-test.json z_uat-load-test.yml
#or
npm run fixed-load
npm run low-load
npm run max-load
```

## To create a report
```sh
artillery report ./reports/z_uat-load-test.json --output ./reports/z_uat-load-test.html
```

## To view the reports with local server
```
cd reports
python3 -m http.server
```
Open url `http://localhost:8000/` in browser.`


> **Note:** 
`Tokens` expire, currently set at `36000 seconds` in Test environment, re-run Step 3 to 'refresh' the tokens.



## TODO: Distributed Load Testing
