from pymongo import MongoClient
from dotenv import load_dotenv
import os


class TripRepository:

    def __init__(self):
        pass

    def insert_trip(self, trip):
        load_dotenv()
        connection_string = os.getenv("mongo_connection")
        client = MongoClient(connection_string)
        db = client['my-db']
        collection = db['trip']
        result = collection.insert_one(trip)
        print(result.inserted_id)

    def delete_by_trip_id(self, trip_id):
        load_dotenv()
        connection_string = os.getenv("mongo_connection")
        client = MongoClient(connection_string)
        db = client['my-db']
        collection = db['trip']
        collection.delete_many({"trip_id": trip_id})

