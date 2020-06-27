import logging

import azure.functions as func

import os
from ArchiveService import ArchiveService



def main(mytimer: func.TimerRequest, outdoc: func.Out[func.Document]):
    logging.info("Executing Archive Manager")
    
    # arr = os.listdir()
    # logging.info(arr)
    # import pathlib
    # logging.info(pathlib.Path().absolute())
    service = ArchiveService()
    service.execute()


if __name__ == '__main__':
    main(func.TimerRequest, 0)



