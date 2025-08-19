### Leetcode 2153 (Hard): The Number of Passengers in Each Bus II [Practice](https://leetcode.com/problems/the-number-of-passengers-in-each-bus-ii)

### Description  
Given two tables:
- **Buses**: Each row has a unique bus_id, the arrival_time of the bus, and its capacity (number of empty seats).
- **Passengers**: Each row has a unique passenger_id and their arrival_time at the station.

Each bus picks up, in order of passenger arrival time, as many waiting passengers as its capacity allows. A passenger boards the earliest bus they can: a bus at or after their arrival time, if they have not yet taken a bus. Buses and passengers do not necessarily arrive at the same time, and both tables may be unsorted. You are to compute the number of passengers who end up in each bus, ordered by bus_id.

### Examples  

**Example 1:**  
Input:  
Buses = `[[1,2,1], [2,4,10], [3,7,2]]`  
Passengers = `[[11,1], [12,1], [13,5], [14,6], [15,7]]`  
Output:  
`[[1,1], [2,1], [3,2]]`  
Explanation:  
- Passenger 11 and 12 arrive at time 1.  
- Bus 1 arrives at 2 with 1 seat, so picks up passenger 11 (earliest by arrival).
- Passenger 13 at time 5 is too late for bus 1, still waiting.  
- Bus 2 at 4 with 10 seats, picks up remaining earliest waiting - which is passenger 12 (arrived at 1).
- Passengers 13 (5), 14 (6), 15 (7) all waiting as of bus 3's arrival (7). Bus 3 with 2 seats takes passengers 13 and 14 (earliest). Passenger 15 is left behind.

**Example 2:**  
Input:  
Buses = `[[5,10,2],[1,2,1],[2,4,10]]`  
Passengers = `[[9,2],[8,1],[10,2],[11,5]]`  
Output:  
`[[1,1],[2,2],[5,1]]`  
Explanation:  
- Bus 1 (id 1) at 2 has 1 seat. Passengers 8 (1) and 9 (2) waiting; 8 boards.
- Bus 2 at 4 with 10 seats. Passenger 9 (arrived 2), 10 (2), 11 (5) waiting; 9 and 10 can board.
- Bus 5 at 10 with 2 seats, only 11 waiting; 11 boards.

**Example 3:**  
Input:  
Buses = `[[1,5,5]]`  
Passengers = `[[1,1],[2,2],[3,3],[4,4],[5,5],[6,6]]`  
Output:  
`[[1,5]]`  
Explanation:  
- Passengers 1 to 5 (arrivals ≤ 5) all waiting as of bus 1 ('5' at 5 seats).
- 5 passengers fill up the bus; passenger 6 arrives after the bus.

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  For each bus, check all passengers who have not yet boarded and whose arrival_time ≤ bus's arrival_time, assigning them until the bus is full.

- **Optimized Approach:**  
  1. **Sort both buses and passengers by arrival_time.**
  2. Use a pointer or queue for passengers:  
    - For each bus in arrival order, pick the earliest passengers (by arrival_time) still waiting, up to bus's capacity.
    - Mark those passengers as taken (move the pointer).
    - Track per-bus count.

This simulates the queue at the bus stop efficiently, using a two-pointer pattern. It avoids repeatedly scanning all passengers for each bus; each passenger and bus is only processed once.

- **Trade-offs:**  
  - Sorting is O(n log n) for both tables, but then everything is O(n) traversals and picks.
  - List/queue management is clean, since each passenger can board at most one bus.

### Corner cases to consider  
- No buses or no passengers.
- Multiple passengers arriving at the same time.
- Bus arrives before any passengers.
- All passengers arrive after all buses.
- Passengers more than bus capacity at any arrival.
- Buses out of order in input; unsorted input.

### Solution

```python
def number_of_passengers_in_each_bus(buses, passengers):
    # buses: List of [bus_id, arrival_time, capacity]
    # passengers: List of [passenger_id, arrival_time]
    # Return: List of [bus_id, passengers_cnt] sorted by bus_id

    # Sort buses by arrival_time (keep bus_id and capacity)
    buses_sorted = sorted(buses, key=lambda x: x[1])
    # Sort passengers by arrival_time
    passengers_sorted = sorted(passengers, key=lambda x: x[1])

    result = []
    passenger_ptr = 0
    n_passengers = len(passengers_sorted)
    used = [False] * n_passengers  # Keep track for clarity, though in our pointer, this isn't really needed

    # For each bus, pick up to capacity passengers who arrived <= bus's arrival_time
    for bus_id, bus_arrival, bus_cap in buses_sorted:
        cnt = 0
        pick = 0
        # Pick passengers in order until either capacity reached or arrivals run out
        while (passenger_ptr < n_passengers and 
               passengers_sorted[passenger_ptr][1] <= bus_arrival and 
               pick < bus_cap):
            cnt += 1
            pick += 1
            passenger_ptr += 1
        result.append([bus_id, cnt])
    
    # Sort by bus_id for output
    result.sort(key=lambda x: x[0])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(M log M + N log N), where M = number of buses, N = number of passengers. Both lists must be sorted by arrival_time.
  The main loop is O(M + N) as each passenger is visited at most once, and each bus is handled once.
- **Space Complexity:** O(M + N) for the sorted copies, pointers, and output. No extra data structures or recursion stack needed.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle passengers who don't board any bus, or report their IDs?
  *Hint: Track which passengers are left after all buses processed.*

- What if buses and passengers arrive in real-time and you must process arrivals as they happen (streaming)?
  *Hint: Use a queue and process events in order of time, tracking capacities and unboarded passengers.*

- How to efficiently answer "Given a passenger_id, which bus did they board?" after processing?
  *Hint: Create a reverse-lookup dictionary while assigning passengers in the main loop.*

### Summary
This problem leverages the two-pointer pattern — sorting both events (arrivals of buses and passengers), and then stepping through both in tandem. The in-order processing ensures optimal assignment of earliest-possible buses to each passenger, while respecting capacity. This solution is a classic greedy queue simulation, applicable in other "assign resource to earliest eligible" scheduling and matching problems.

### Tags
Database(#database)

### Similar Problems
