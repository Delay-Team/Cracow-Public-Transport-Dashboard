from pymongo import MongoClient


class TripRepository:

    def __init__(self):
        pass

    def insert_trip(self, trip):
        print("inserting trip")
        client = MongoClient()
        db = client['my-db']
        collection = db['trip']
        result = collection.insert_one(trip)
        print("InsertedId: " + result.inserted_id)
