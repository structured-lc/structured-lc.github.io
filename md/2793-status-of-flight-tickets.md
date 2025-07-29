### Leetcode 2793 (Hard): Status of Flight Tickets [Practice](https://leetcode.com/problems/status-of-flight-tickets)

### Description  
You're given two tables:  
- **Flights**: Contains `flight_id` (unique for each flight) and `capacity` (maximum number of passengers the flight can take).
- **Passengers**: Contains `passenger_id` (unique for each passenger), `flight_id` (the flight they've booked), and `booking_time` (the time they booked their ticket).

When passengers book a flight, the first `capacity` passengers (by earliest `booking_time` for each flight) are **Confirmed**. Later passengers are on the **Waitlist**.  
Return a list showing each passenger's status – "Confirmed" or "Waitlist" – ordered by `passenger_id`.

### Examples  

**Example 1:**  
Input:  
Flights =  
```
| flight_id | capacity |
|-----------|----------|
|     1     |    2     |
|     2     |    1     |
```
Passengers =  
```
| passenger_id | flight_id | booking_time        |
|--------------|-----------|--------------------|
|      10      |     1     | 2023-01-01 08:00   |
|      20      |     1     | 2023-01-01 09:00   |
|      30      |     1     | 2023-01-01 10:00   |
|      40      |     2     | 2023-01-01 08:30   |
|      50      |     2     | 2023-01-01 09:00   |
```
Output:  
```
| passenger_id | status     |
|--------------|------------|
|     10       | Confirmed  |
|     20       | Confirmed  |
|     30       | Waitlist   |
|     40       | Confirmed  |
|     50       | Waitlist   |
```
*Explanation:*  
Flight 1 capacity = 2, earliest passengers 10, 20 are Confirmed, 30 is Waitlist.  
Flight 2 capacity = 1, earliest passenger 40 is Confirmed, 50 is Waitlist.

**Example 2:**  
Input:  
Flights =  
```
| flight_id | capacity |
|-----------|----------|
|     1     |    1     |
```
Passengers =  
```
| passenger_id | flight_id | booking_time        |
|--------------|-----------|--------------------|
|      5       |     1     | 2023-01-02 08:00   |
|      6       |     1     | 2023-01-02 08:01   |
```
Output:  
```
| passenger_id | status     |
|--------------|------------|
|      5       | Confirmed  |
|      6       | Waitlist   |
```
*Explanation:*  
Flight has 1 seat. First ticket at 8:00 is Confirmed, next is on Waitlist.

**Example 3:**  
Input:  
Flights =  
```
| flight_id | capacity |
|-----------|----------|
|     3     |    2     |
```
Passengers =  
```
| passenger_id | flight_id | booking_time        |
|--------------|-----------|--------------------|
|      8       |     3     | 2023-01-04 07:00   |
```
Output:  
```
| passenger_id | status     |
|--------------|------------|
|      8       | Confirmed  |
```
*Explanation:*  
Only one passenger, under capacity, gets Confirmed.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For every passenger, count how many passengers have booked for the same flight before them (including themself). If their rank ≤ capacity for their flight, they're Confirmed, else Waitlist.
- **Optimization:**  
  - Since we care about order by booking_time, we can use sorting/grouping or, in SQL, window functions.
  - For each passenger, determine their position in the booking sequence for their flight (`rank`).
  - Map rank to Confirmed or Waitlist based on the flight's capacity.
- **Trade-offs:**  
  - If implemented imperatively, need efficient sorting and grouping per flight.
  - In SQL, a window function like RANK() partitioned by flight, ordered by booking_time, is ideal and readable.

### Corner cases to consider  
- Passenger table is empty.
- Flight has 0 capacity (every passenger is Waitlist).
- Multiple flights with different capacities.
- Passengers' booking_time ties (should be unique per problem constraints, but clarify).
- All passengers for a flight are over capacity (all Waitlist).
- Only one passenger and capacity ≥ 1 (should be Confirmed).

### Solution

```python
# Flights: List[Dict], where each dict is {'flight_id': int, 'capacity': int}
# Passengers: List[Dict], where each dict is {'passenger_id': int, 'flight_id': int, 'booking_time': datetime string}

def status_of_flight_tickets(Flights, Passengers):
    # Map flight_id to capacity for O(1) lookup
    flight_capacities = {}
    for flight in Flights:
        flight_capacities[flight['flight_id']] = flight['capacity']
        
    # Group passengers by flight_id
    from collections import defaultdict
    flight_to_passengers = defaultdict(list)
    for passenger in Passengers:
        flight_to_passengers[passenger['flight_id']].append(passenger)
    
    # Dict to hold answer: passenger_id -> status
    passenger_status = dict()
    
    for flight_id, passengers in flight_to_passengers.items():
        # Sort passengers by booking_time (earliest first)
        sorted_passengers = sorted(passengers, key=lambda x: x['booking_time'])
        capacity = flight_capacities[flight_id]
        # First 'capacity' by booking_time are Confirmed, rest Waitlist
        for i, p in enumerate(sorted_passengers):
            status = "Confirmed" if i < capacity else "Waitlist"
            passenger_status[p['passenger_id']] = status
    
    # Prepare result, ordered by passenger_id
    result = []
    for passenger in sorted(Passengers, key=lambda x: x['passenger_id']):
        pid = passenger['passenger_id']
        result.append({'passenger_id': pid, 'status': passenger_status[pid]})
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n log n), where n = number of passengers.  
  - Sorting passengers for each flight: sum over (m log m) for each flight with m passengers, but overall ≤ n log n.  
  - Mapping and result compilation are linear.

- **Space Complexity:**  
  O(n + f), where n = total passengers, f = number of flights.  
  - Store groupings and answers per passenger.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle updates – e.g., passenger cancels or changes booking time?  
  *Hint: Can your grouping and sort logic efficiently support updates?*

- What would you do if flights or passengers data is huge and cannot fit in memory?  
  *Hint: Can you process in batches or use external storage/sorting?*

- How would you implement this in SQL?  
  *Hint: Can you use window functions (RANK() or ROW_NUMBER()) and a conditional CASE/IF?*

### Summary
This problem demonstrates the use of *group by*, sorting on a key (booking_time), and assigning bucketed statuses by a group-specific threshold (capacity). It’s a classic example of ranking within groups, similar to leaderboard cutoffs, hotel bookings, or other priority queue scenarios. Common patterns here are grouping, stable sorting by key, and mapping position to a status—useful in database window function queries and reservations/seating systems.