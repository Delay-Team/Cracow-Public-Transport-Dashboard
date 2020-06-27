from .repository.TripRepository import TripRepository 
from .repository.StatisticsRepository import StatisticsRepository 
from datetime import datetime, timedelta

class ArchiveService:

    tripRepository: TripRepository
    statisticsRepository: StatisticsRepository


    def execute(self):
        print("Exeuting ArchiveService")
        self.tripRepository = TripRepository()
        self.statisticsRepository = StatisticsRepository()
        currentDay = datetime.today().strftime('%Y-%m-%d')
        FMT = '%H:%M'
        all_stops = self.tripRepository.get_all_stops(currentDay)
        print(all_stops)
        stop_result = {}
        for stop in all_stops:
            print("Current stop" + stop) 
            stopTrips = self.tripRepository.get_trips_for_stop(stop, currentDay)
            delaySum = datetime.strptime("00:00", FMT)
            for trip in stopTrips:
                planned_time = trip["planned_time"]
                actual_time = trip["actual_time"]
                tdelta = datetime.strptime(actual_time, FMT) - datetime.strptime(planned_time, FMT)
                delaySum = delaySum + tdelta
            print("DelaySum: ")
            print(delaySum)  
            sumInSeconds = float(delaySum.hour * 60 * 60 + delaySum.minute * 60)
            if (len(stopTrips) == 0):
                avgDelayInSeconds = 0
            else:
                avgDelayInSeconds = float(sumInSeconds) / float(len(stopTrips))
            
            secondsToAdd = timedelta(seconds=avgDelayInSeconds)
            secondsToAddInDatetime = datetime(2000, 1, 1, 0, 0, 0) + secondsToAdd
            HMSFormat='%H:%M:%S'
            stop_name_trimmed = stop.replace('.', "")
            stop_result[stop_name_trimmed] = secondsToAddInDatetime.strftime(HMSFormat)          

        allLines = self.tripRepository.get_all_lines(currentDay)
        print("AllLines")
        print(allLines)
        result = {}

        for line in allLines:
            print("Current Line" + line) 
            lineTrips = self.tripRepository.get_trips_for_line(line, currentDay)
            delaySum = datetime.strptime("00:00", FMT)
            for trip in lineTrips:
                planned_time = trip["planned_time"]
                actual_time = trip["actual_time"]
                tdelta = datetime.strptime(actual_time, FMT) - datetime.strptime(planned_time, FMT)
                delaySum = delaySum + tdelta
            
            sumInSeconds = float(delaySum.hour * 60 * 60 + delaySum.minute * 60)
            avgDelayInSeconds = float(sumInSeconds) / float(len(lineTrips))

            secondsToAdd = timedelta(seconds=avgDelayInSeconds)
            secondsToAddInDatetime = datetime(2000, 1, 1, 0, 0, 0) + secondsToAdd
            HMSFormat='%H:%M:%S'
            result[line] = secondsToAddInDatetime.strftime(HMSFormat)

        print("Result to be added to db (LINES): ") 
        print(result)
        print("Result to be added to db (STOPS): ") 
        print(stop_result)
        today=datetime.today().strftime('%Y-%m-%d')
        self.statisticsRepository.delete_line_statistics_by_day(today)
        self.statisticsRepository.insert_line_statistics(result, stop_result, today) 