from .repository.TripRepository import TripRepository

class CrawlerService:

    tripRepo: TripRepository

    def __init__(self):
        self.triRepo = TripRepository()


    def get_all_stops_ids(self):
        print("execute")
        self.triRepo.insert_trip({"prop1" : "123", "prop2": "23"})

