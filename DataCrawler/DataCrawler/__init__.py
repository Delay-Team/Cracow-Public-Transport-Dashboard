import logging

import azure.functions as func


def main(mytimer: func.TimerRequest, outdoc: func.Out[func.Document]):
    logging.info("Executing Data Crawler")
