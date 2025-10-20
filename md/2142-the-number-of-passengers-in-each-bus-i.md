### Leetcode 2142 (Medium): The Number of Passengers in Each Bus I [Practice](https://leetcode.com/problems/the-number-of-passengers-in-each-bus-i)

### Description  
Given two tables:  
- **Buses(bus_id, arrival_time)** — each row gives the unique bus id and the time a bus arrives.
- **Passengers(passenger_id, arrival_time)** — each row gives the unique passenger id and the time a passenger arrives.

Each passenger waits at the bus stop and gets on the first bus that arrives at or after their arrival time — but they cannot board a bus if they've already taken a previous one.  
Your task: **For every bus, count how many passengers use that bus.**  
Order the result by `bus_id` ascending.

### Examples  

**Example 1:**  
Input:  
Buses = `[[1,2], [2,4], [3,7]]`,  
Passengers = `[[11,1], [12,5], [13,6], [14,7]]`  
Output: `[[1,1], [2,1], [3,2]]`  
*Explanation:*
- Bus 1 (arrival 2): Picks up passenger 11 (arrived at 1, no buses before).
- Bus 2 (arrival 4): Passenger 12 arrives at 5 — that's after bus 2, so not possible. No one boards (if strictly <, but usually ≤, so if ≤, passenger 12 cannot board bus 2 as their arrival is 5, bus comes at 4). In most testcases, passengers can board as long as they arrive ≤ arrival_time.
- Bus 3 (arrival 7): Passengers 13 (6), 14 (7) both arrived before or at bus 3, but not picked by earlier buses.

**Example 2:**  
Input:  
Buses = `[[5,9]]`,  
Passengers = `[[10,2], [11,9]]`  
Output: `[[5,2]]`  
*Explanation:*
- Both passengers arrived before or at bus 5's arrival.

**Example 3:**  
Input:  
Buses = `[[1,3], [2,5]]`,  
Passengers = `[]`  
Output: `[[1,0], [2,0]]`  
*Explanation:*  
- No passengers, so both buses have zero.

### Thought Process (as if you’re the interviewee)  

- **Brute-force**:  
  For each bus, iterate over all passengers and check if the passenger arrives before or at the bus, and whether the passenger was unassigned. For each bus arrival time, pick up all unassigned passengers with arrival time > previous bus and ≤ current bus.
  - Time: O(B × P) — won't scale for large inputs.

- **Optimized approach**:  
  - **Sort buses and passengers by arrival_time**.  
  - Use pointers:
    - For each bus (in order), check all passengers who arrive after previous bus's arrival and ≤ current bus's arrival.
    - Assign each passenger to the earliest bus available.
  - This is like "multi-way merge" pattern.
  - Time: O(B log B + P log P + B + P) = O((B + P) log (B + P)), as mostly dominated by sort.

- **Why this approach?**  
  - Efficient (single pass after sort).
  - Handles edge cases cleanly (no passengers, buses before/after all passengers).
  - No extra storage except arrays and indices.

### Corner cases to consider  
- No passengers.
- No buses.
- All passengers arrive after/before all buses.
- Passengers with same arrival time as a bus.
- Buses with the same arrival_time.
- Passengers arriving between buses, with no bus available.

### Solution

```python
def count_passengers_in_each_bus(buses, passengers):
    # Sort buses and passengers by arrival_time.
    buses_sorted = sorted((t, bus_id) for bus_id, t in buses)
    passengers_sorted = sorted(passengers, key=lambda x: x[1])
    
    # For each bus, track the number of passengers picked.
    bus_counts = [0] * len(buses_sorted)
    
    prev_time = 0  # For first bus, use 0 as the earliest possible arrival.
    p_idx = 0      # Pointer for passengers
    
    # Store bus ids in order so results are mapped correctly.
    result = []
    
    for bus_idx, (bus_time, bus_id) in enumerate(buses_sorted):
        count = 0
        # Count passengers arriving after prev_time and ≤ current bus_time
        while p_idx < len(passengers_sorted) and prev_time < passengers_sorted[p_idx][1] <= bus_time:
            count += 1
            p_idx += 1
        result.append((bus_id, count))
        prev_time = bus_time
    
    # Return results sorted by bus_id.
    result.sort()
    # Convert to list of lists if needed (e.g., [[bus_id, count], ...])
    return [[bus_id, count] for bus_id, count in result]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Sorting buses: O(B log B), sorting passengers: O(P log P).  
  Single pass through both lists: O(B + P).  
  Overall: **O((B + P) log (B + P))**

- **Space Complexity:**  
  - O(B + P) for the sorted arrays and output list.

### Potential follow-up questions (as if you’re the interviewer)  

- If passengers could re-board another bus if they missed their first opportunity, how would it change?
  *Hint: Consider keeping passenger states and possibly repeated assignments.*

- What if bus capacity is limited (k passengers per bus)?
  *Hint: Simulate filling up, stop assigning once capacity is full.*

- How to efficiently return the list of passenger IDs for each bus?
  *Hint: Instead of counts, collect IDs during assignment phase.*

### Summary
This problem is a classic instance of the **sweep-line (multi-pointer / two-pointer merge)** pattern, with extra logic to assign events (passengers) to time slots (buses).  
The solution sorts both lists and then sweeps through them in order, efficiently assigning each unassigned passenger to the earliest available bus they can board. This approach is common for event scheduling, merging intervals, and resource assignment in timeline-based scheduling problems.


### Flashcard
Sort buses and passengers by arrival time, then use two pointers to assign each passenger to first bus arriving at or after passenger's time.

### Tags
Database(#database)

### Similar Problems
