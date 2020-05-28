from .repository.TripRepository import TripRepository
from .config.backend_endpoints import BackendEndpoints
import requests
import json
import logging

class CrawlerService:

    tripRepo: TripRepository

    def __init__(self):
        self.triRepo = TripRepository()

    def execute(self):
#         logging.info("executing crawler service")
        ids = self.get_all_stops_ids()
#         logging.info("Number of stops: " + str(len(ids))
        for id in ids:
            self.update_trips_data(id)


    def update_trips_data(self, stop_id):
        url = BackendEndpoints.stop_data + stop_id
        response = requests.get(url)
        objects = json.loads(response.text)
        trips = objects["actual"]
        stop_name = objects["stopName"]
#          logging.info("Updating: " + stop_name)
        for trip in trips:
            plannedTime = trip["plannedTime"]
            status = trip["status"]
            line_number = trip["patternText"]
            trip_id = trip["tripId"]

            if "actualTime" in trip:
                actualTime = trip["actualTime"]
            else:
                actualTime = trip["mixedTime"]
            self.triRepo.delete_by_trip_id(trip_id)
            self.triRepo.insert_trip({"line_number": line_number, "status": status, "trip_id": trip_id, "planned_time": plannedTime, "actual_time": actualTime, "stop_name": stop_name})


    def get_all_stops_ids(self):
        url = BackendEndpoints.all_stops_data
        print(url)
        response = requests.get(url)
        objects = json.loads(response.text)
        result = []
        for stop in objects["stops"]:
            id = stop["shortName"]
            result.append(id)
        return result



