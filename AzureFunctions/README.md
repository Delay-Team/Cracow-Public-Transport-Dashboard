# Data Crawler

## Install requirements

Before running application execute: <br />
pip install -r requirements.txt
 
 
## Install Azure Functions Core Tools CLI
How to install: 
https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=linux%2Ccsharp%2Cbash


## Configure local.settings.json 
1. Copy local.settings.json.example, rename to local.settings.json
2. Add "AzureWebJobsStorage"

## Run application
func start


## About
DataCrawler will run by default every minute. You can configure it in function.json:   "schedule": "0 */1 * * * *"

