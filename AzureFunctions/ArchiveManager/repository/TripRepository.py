from pymongo import MongoClient
from dotenv import load_dotenv
import os


class TripRepository:

    connection_string = ""

    def __init__(self):
        load_dotenv()
        self.connection_string = os.getenv("mongo_connection")

    def get_all_lines(self, day):
        client = MongoClient(self.connection_string)
        db = client['my-db']
        collection = db['trip']
        trips = list(collection.find({"timestamp" : day}))

        resultWithDuplicates = list(map(lambda x: x["line_number"], trips))
        result = list(dict.fromkeys(resultWithDuplicates))
        print(result)
        return result
    
    def get_trips_for_line(self, line, day):
        client = MongoClient(self.connection_string)
        db = client['my-db']
        collection = db['trip']
        trips = list(collection.find({"timestamp" : day, "line_number" : line}))
        return trips


