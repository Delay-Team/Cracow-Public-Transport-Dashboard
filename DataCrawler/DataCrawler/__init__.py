import logging

import azure.functions as func

import os
from .CrawlerService import CrawlerService


def main(mytimer: func.TimerRequest, outdoc: func.Out[func.Document]):
    logging.info("Executing Data Crawler")
    arr = os.listdir()
    logging.info(arr)
    import pathlib
    logging.info(pathlib.Path().absolute())
    service = CrawlerService()
    service.execute()


if __name__ == '__main__':
    main(func.TimerRequest, 0)



