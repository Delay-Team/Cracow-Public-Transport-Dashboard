from .repository.TripRepository import TripRepository 
from datetime import datetime

class ArchiveService:

    tripRepository: TripRepository


    def execute(self):
        self.tripRepository = TripRepository()
        currentDay = datetime.today().strftime('%Y-%m-%d')
        allLines = self.tripRepository.get_all_lines(currentDay)
        for line in allLines:
            print("Current Line" + line) 
            lineTrips = self.tripRepository.get_trips_for_line(line, currentDay)
            
            FMT = '%H:%M'
            delaySum = datetime.strptime("00:00", FMT)
            for trip in lineTrips:
                planned_time = trip["planned_time"]
                actual_time = trip["actual_time"]
                tdelta = datetime.strptime(actual_time, FMT) - datetime.strptime(planned_time, FMT)
                delaySum = delaySum + tdelta
            # print(lineTrips)