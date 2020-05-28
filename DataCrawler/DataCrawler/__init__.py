import logging

import azure.functions as func

import os
arr = os.listdir()
logging.info("logging DUpa")


def main(mytimer: func.TimerRequest, outdoc: func.Out[func.Document]):
    logging.info("Executing Data Crawler")
    arr = os.listdir()
    logging.info("logging DUpa")
    logging.info(arr)
    import pathlib
    logging.info(pathlib.Path().absolute())
    from .CrawlerService import CrawlerService
    service = CrawlerService()
    service.get_all_stops_ids()


#

# if __name__ == '__main__':
#     main(func.TimerRequest, 0)


if __name__ == '__main__':
    print("as")
