### Leetcode 1396 (Medium): Design Underground System [Practice](https://leetcode.com/problems/design-underground-system)

### Description  
An underground railway system wants to keep track of how long it takes passengers to travel between any two stations. Each passenger can check in at one station at a particular time, later check out at another station and time, and the system should then be able to compute the **average travel time** between any pair of stations. The challenge is to efficiently **track passenger journeys** and **calculate average travel times** for station pairs.  
Design a class `UndergroundSystem` with 3 methods:
- `checkIn(id, stationName, t)`: Register that passenger `id` checked in at station `stationName` at time `t`.
- `checkOut(id, stationName, t)`: Register that passenger `id` checked out at station `stationName` at time `t`.
- `getAverageTime(startStation, endStation)`: Return average time taken to travel directly from `startStation` to `endStation` for all such completed trips.

### Examples  

**Example 1:**  
Input:  
`["UndergroundSystem","checkIn","checkIn","checkOut","checkOut","getAverageTime","getAverageTime"]`  
`[[],[45,"Leyton",3],[32,"Paradise",8],[45,"Waterloo",15],[32,"Cambridge",22],["Paradise","Cambridge"],["Leyton","Waterloo"]]`  
Output:  
`[null,null,null,null,null,14.0,12.0]`  
*Explanation:  
- 45 checks in at Leyton at t=3.
- 32 checks in at Paradise at t=8.
- 45 checks out from Waterloo at t=15. (time spent: 12)
- 32 checks out from Cambridge at t=22. (time spent: 14)
- Average from Paradise→Cambridge = 14/1 = 14.0
- Average from Leyton→Waterloo = 12/1 = 12.0*

**Example 2:**  
Input:  
`["UndergroundSystem","checkIn","checkOut","checkIn","checkOut","getAverageTime"]`  
`[[],[10,"A",1],[10,"B",5],[10,"A",7],[10,"B",10],["A","B"]]`  
Output:  
`[null,null,null,null,null,3.5]`  
*Explanation:  
- 10 checks in at A at t=1.
- 10 checks out from B at t=5. (time spent: 4)
- 10 checks in again at A at t=7.
- 10 checks out from B at t=10. (time spent: 3)
- Average from A→B = (4 + 3) / 2 = 3.5*

**Example 3:**  
Input:  
`["UndergroundSystem","checkIn","checkOut","getAverageTime"]`  
`[[],[20,"X",5],[20,"Y",15],["X","Y"]]`  
Output:  
`[null,null,null,10.0]`  
*Explanation:  
- 20 checked in at X at t=5.
- 20 checked out at Y at t=15. (time spent: 10)
- Average from X→Y = 10/1 = 10.0*

### Thought Process (as if you’re the interviewee)  
Let’s break down the problem:
- We need to efficiently record **check-in** and **check-out** info for each passenger.
- Then, for **each station pair**, we need to store the cumulative sum of journey times and the number of completed trips to compute averages.

**Brute-force idea:**  
- Store all journeys for every user; for computing the average, scan all trips between two stations and average.  
  *Downside:* Checking the average takes O(all trips) time.

**Optimized approach:**  
- Use a dictionary (hashmap) to record each passenger’s check-in station and time.
- When a user checks out, look up their check-in, compute the trip time and station pair, and update (sum, count) for that pair.
- To get the average, just return sum/count for the pair — O(1) time!

**Data Structures:**
- id → (start station, start time): for pending check-ins.
- (start station, end station) → [total_time, trip_count]: for averages.

This is fast (O(1) per operation), simple, and correct, as we never store individual trip records after checkout.

### Corner cases to consider  
- A user checks out without checking in (should not happen as per statement).
- Multiple users check in/out at the same time.
- Same user takes multiple trips (legal, need to update mapping on next check-in).
- getAverageTime requested before any trips for that pair (should not happen as per constraints).
- Extreme values for time or passenger id.
- Station names with special characters.

### Solution

```python
class UndergroundSystem:
    def __init__(self):
        # user_id → (start_station, start_time)
        self.checkins = {}
        # (start_station, end_station) → [total_time, trip_count]
        self.journey = {}

    def checkIn(self, id, stationName, t):
        # Record the check-in info for this id
        self.checkins[id] = (stationName, t)

    def checkOut(self, id, stationName, t):
        # Pop the check-in info
        start_station, start_time = self.checkins.pop(id)
        trip_time = t - start_time
        key = (start_station, stationName)
        if key not in self.journey:
            self.journey[key] = [0, 0]
        self.journey[key][0] += trip_time
        self.journey[key][1] += 1

    def getAverageTime(self, startStation, endStation):
        total_time, trip_count = self.journey[(startStation, endStation)]
        return total_time / trip_count
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  All operations are O(1): checkIn (dict insert), checkOut (dict pop + update), getAverageTime (dict lookup).

- **Space Complexity:**  
  O(P + S²)  
  Where P = number of passengers with active journeys at a time (for check-ins), and S = number of unique station names (worst-case all pairs).

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose station names could be integers instead of strings. How would you change your data structures?  
  *Hint: dicts work the same, but tuning may differ. You could use tuples directly as keys or nested dicts for faster lookup.*

- How would you let users take multiple trips before checking out, or handle overlapping trips per user?  
  *Hint: Store a list of check-ins per id or raise an error if multiple active trips per passenger are not allowed.*

- What if you were asked for the median time, not the average, for a station pair?  
  *Hint: Store each journey time in a list for each pair. Tracking medians efficiently is harder and needs a heap or specialized structure.*

### Summary
The solution is a classic example of efficient **hashmap-based tracking** and real-time aggregation. Data is normalized on check-out, ensuring O(1) per operation with minimal storage per active trip and per station-pair. This “aggregate statistics on the fly using dicts” pattern is common for interval/aggregate interview problems, and applies to network metering, event streams, and similar scenarios.

### Tags
Hash Table(#hash-table), String(#string), Design(#design)

### Similar Problems
- Design Bitset(design-bitset) (Medium)