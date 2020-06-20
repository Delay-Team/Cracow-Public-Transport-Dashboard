from pymongo import MongoClient
from dotenv import load_dotenv
import os


class StatisticsRepository:

    connection_string = ""

    def __init__(self):
        load_dotenv()
        self.connection_string = os.getenv("mongo_connection")

    def insert_line_statistics(self, lines_with_avg_delay_dict, day):
        client = MongoClient(self.connection_string)
        db = client['my-db']
        collection = db['statistics']
        collection.insert_one({"timestamp" :  day, "avg_delay_line_statistics" : lines_with_avg_delay_dict})

    def delete_line_statistics_by_day(self, day):
        client = MongoClient(self.connection_string)
        db = client['my-db']
        collection = db['statistics']
        collection.delete_many({"timestamp": day})