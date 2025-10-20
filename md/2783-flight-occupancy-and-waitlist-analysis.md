### Leetcode 2783 (Medium): Flight Occupancy and Waitlist Analysis [Practice](https://leetcode.com/problems/flight-occupancy-and-waitlist-analysis)

### Description  
You are given two tables—**Flights** (flight\_id, capacity) and **Passengers** (passenger\_id, flight\_id). Each row in Passengers indicates a booking. For each flight, compute how many passengers successfully secured a seat (booked\_cnt) and how many are on the waitlist (waitlist\_cnt). If the bookings exceed available seats, only up to the flight's capacity are booked, and the rest go to the waitlist. For each flight, report flight\_id, booked\_cnt, waitlist\_cnt.

### Examples  

**Example 1:**  
Input:  
Flights =  
```
+-----------+----------+
| flight_id | capacity |
+-----------+----------+
| 1         | 2        |
| 2         | 2        |
| 3         | 1        |
+-----------+----------+
```
Passengers =  
```
+--------------+-----------+
| passenger_id | flight_id |
+--------------+-----------+
| 101          | 1         |
| 102          | 1         |
| 103          | 1         |
| 104          | 2         |
| 105          | 2         |
| 106          | 3         |
| 107          | 3         |
+--------------+-----------+
```
Output:  
```
+-----------+------------+--------------+
| flight_id | booked_cnt | waitlist_cnt |
+-----------+------------+--------------+
| 1         |     2      |      1       |
| 2         |     2      |      0       |
| 3         |     1      |      1       |
+-----------+------------+--------------+
```
Explanation:  
- Flight 1: Capacity=2, Bookings=3 → booked\_cnt=2, waitlist\_cnt=1  
- Flight 2: Capacity=2, Bookings=2 → booked\_cnt=2, waitlist\_cnt=0  
- Flight 3: Capacity=1, Bookings=2 → booked\_cnt=1, waitlist\_cnt=1  


**Example 2:**  
Input:  
Flights =  
```
+-----------+----------+
| flight_id | capacity |
+-----------+----------+
| 10        | 5        |
+-----------+----------+
```
Passengers =  
```
+--------------+-----------+
| passenger_id | flight_id |
+--------------+-----------+
+--------------+-----------+
```
Output:  
```
+-----------+------------+--------------+
| flight_id | booked_cnt | waitlist_cnt |
+-----------+------------+--------------+
| 10        |     0      |      0       |
+-----------+------------+--------------+
```
Explanation:  
- Flight 10: No bookings, so both booked and waitlist are 0.


**Example 3:**  
Input:  
Flights =  
```
+-----------+----------+
| flight_id | capacity |
+-----------+----------+
| 4         | 2        |
+-----------+----------+
```
Passengers =  
```
+--------------+-----------+
| passenger_id | flight_id |
+--------------+-----------+
| 200          | 4         |
| 201          | 4         |
+--------------+-----------+
```
Output:  
```
+-----------+------------+--------------+
| flight_id | booked_cnt | waitlist_cnt |
+-----------+------------+--------------+
| 4         |     2      |      0       |
+-----------+------------+--------------+
```
Explanation:  
- Flight 4: Capacity=2, Bookings=2 → booked\_cnt=2, waitlist\_cnt=0  


### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For each flight, scan all passengers and count bookings per flight\_id. Then, for each flight, booked\_cnt = min(number of bookings, capacity); waitlist\_cnt = max(0, bookings - capacity).

- **Optimized idea:**  
  1. Map flights by flight\_id to their capacity.
  2. Use a dictionary to count number of bookings per flight\_id.
  3. For all flight\_id in Flights, calculate booked\_cnt and waitlist\_cnt as above.
  4. Advantage: O(M+N) where M=#bookings, N=#flights.

- **SQL-based:**  
  LEFT JOIN Passengers to Flights, group by flight\_id, then use aggregation.
  But for an interview, implement in Python using dictionaries or Counters.  
  Result must be sorted by flight\_id.


### Corner cases to consider  
- Flight has 0 passengers/bookings.
- Passengers list is empty.
- Flight's capacity is 0.
- Passengers are booked for flight\_id not in Flights table (should not occur per constraints, but worth noting).
- Multiple flights with same capacities.
- Flight list is empty.


### Solution

```python
def flight_occupancy_and_waitlist(flights, passengers):
    """
    flights: List[List[int]], e.g., [[1,2],[2,2],[3,1]]
    passengers: List[List[int]], e.g., [[101,1],[102,1],...]
    return: List[List[int]], e.g., [[1,2,1],[2,2,0],[3,1,1]]
    """
    # Map each flight_id to its capacity
    flight_capacity = {}
    for flight_id, capacity in flights:
        flight_capacity[flight_id] = capacity

    # Count bookings for each flight_id
    # e.g., bookings[flight_id] = num of bookings
    bookings = {}
    for _, flight_id in passengers:
        bookings[flight_id] = bookings.get(flight_id, 0) + 1

    # Build result: for each flight_id in input order
    result = []
    for flight_id, capacity in flights:
        num_bookings = bookings.get(flight_id, 0)
        booked_cnt = min(capacity, num_bookings)
        waitlist_cnt = max(num_bookings - capacity, 0)
        result.append([flight_id, booked_cnt, waitlist_cnt])

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(M+N), where N is the number of flights and M is the number of passengers. Each is traversed once to build the capacity mapping and the booking counters. Final result built in O(N).

- **Space Complexity:**  
  O(N+K), where N is #flights (flight\_capacity mapping), K is #distinct flights in bookings (bookings dictionary), and output list is length N.


### Potential follow-up questions (as if you’re the interviewer)  

- What if a flight_id in passengers does not exist in Flights?  
  *Hint: Should such booking count? Skip safely, add validation.*

- How would you handle cancellations (cancelling a booking)?  
  *Hint: You'd need to process both bookings and cancellations.*

- Can you optimize for streaming data (when bookings and flights come in real-time)?  
  *Hint: Use streaming aggregations or update counts on the fly.*


### Summary
This problem is a classic example of "group by and aggregate" logic, often found in *relational joins* or *hash maps* questions. The key technique is to count (aggregate by id) and compare against a constraint (capacity). This coding pattern is common in problems like "top N per group", "meeting room assignment", or any "booking with limited resources" scenario.  
Knowledge of hash maps/dictionaries, counters, and aggregation is directly transferable to other resource allocation or interval problems.


### Flashcard
Count bookings per flight_id, then for each flight, booked_cnt = min(bookings, capacity), waitlist_cnt = max(0, bookings - capacity).

### Tags
Database(#database)

### Similar Problems
