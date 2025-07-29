### Leetcode 2332 (Medium): The Latest Time to Catch a Bus [Practice](https://leetcode.com/problems/the-latest-time-to-catch-a-bus)

### Description  
You are at a bus station with several scheduled buses. Each bus departs at a specific time and can carry up to a set number of passengers. Multiple passengers, each with their own arrival time, are waiting to board. Passengers board buses in order of arrival, and each passenger boards the earliest bus they can. You want to catch the latest possible bus, arriving as late as possible, but you cannot share the same arrival time as any existing passenger. Find the latest time you can arrive at the station and still guarantee catching a bus.

### Examples  

**Example 1:**  
Input: `buses = [10,20]`, `passengers = [2,17,18,19]`, `capacity = 2`  
Output: `16`  
*Explanation:  
Bus 1 leaves at 10. Only passenger 2 boards.  
Bus 2 leaves at 20, capacity is 2. Passengers 17, 18 board. 19 waits.  
Arriving at 19 is not allowed (clashes with another passenger).  
Latest possible arrival without clashing is 16.*

**Example 2:**  
Input: `buses = [20,30,10]`, `passengers = [19,13,26,4,25,11,21]`, `capacity = 2`  
Output: `20`  
*Explanation:  
After sorting, buses = [10,20,30], passengers = [4,11,13,19,21,25,26].  
Bus 1 (10): boards 4, 11.  
Bus 2 (20): boards 13, 19.  
Bus 3 (30): boards 21, 25.  
Arrive at 20 (not in passenger list), can board bus 2 or bus 3.*

**Example 3:**  
Input: `buses = [5]`, `passengers = [5]`, `capacity = 1`  
Output: `4`  
*Explanation:  
There's only one bus (leaves at 5) and one passenger arriving at 5. Can't use 5 to avoid conflict, so answer is 4.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  For every possible time up to the last bus's time, check if it's not a passenger's time and see if arriving then lets us catch a bus. Try all possibilities in reverse.

- **Optimized approach:**  
  Since buses and passengers both work in order, sort both arrays.  
  Use a pointer to simulate the boarding process: for each bus, board as many lowest-arrival passengers as possible, up to capacity.  
  For the last bus, record which passengers board it.  
  The candidate times are:
    - If the last bus has extra space, its departure time (if that time isn't taken by a passenger).
    - If full, try just before the arrival time of the last passenger who boarded the last bus, decrementing until you find a free slot (not occupied by a passenger).
  Keep a set of passenger times for O(1) lookups.
  This guarantees the latest valid time.

- **Why this approach:**  
  - Only need to simulate once in sorted order.
  - Checking for a non-colliding arrival takes O(1) per try.
  - Loop at most across all passengers per bus.

### Corner cases to consider  
- Arriving at the bus's departure time (if not already taken).
- Passengers or buses with duplicate times.
- All passengers arrive before the earliest bus.
- No free time slots before all passengers.
- buses or passengers arrays are empty (constraint violations, but consider in code).
- All passengers have unique arrivals except at the last possible time.
- Bus capacity is larger than the number of waiting passengers.

### Solution

```python
def latestTimeCatchTheBus(buses, passengers, capacity):
    # Sort both buses and passengers for sequential processing
    buses.sort()
    passengers.sort()
    passenger_set = set(passengers)
    
    n = len(passengers)
    m = len(buses)
    j = 0  # pointer for passengers
    
    for bus_time in buses:
        cap = 0
        # Board passengers whose arrival time ≤ bus_time, up to capacity
        while j < n and passengers[j] <= bus_time and cap < capacity:
            cap += 1
            j += 1
        # At the end of the loop, 'j' points to the first passenger NOT boarding this bus
    
    # Now, determine the candidate latest time:
    # If last bus wasn't full, try to take the last bus itself at its departure
    last_bus_time = buses[-1]
    num_last_bus = 0
    index = 0
    # Count how many boarded the last bus
    for idx in range(n):
        if passengers[idx] <= last_bus_time:
            index = idx
            num_last_bus += 1
    # Find first passenger index > last_bus_time
    index = 0
    for idx in range(n):
        if passengers[idx] > last_bus_time:
            break
        index = idx
    
    # Find last K (capacity) passengers who could have boarded last bus
    boarders = []
    i = j-1
    cnt = 0
    while i >= 0 and passengers[i] <= last_bus_time and cnt < capacity:
        boarders.append(passengers[i])
        i -= 1
        cnt += 1
    boarders = boarders[::-1]
    # Candidate latest time: 
    # - If less than capacity on last bus: try last_bus_time (unless taken)
    # - Else, try to pick a time before the last passenger who boarded last bus
    # - In either case, time must NOT coincide with a passenger
    time = last_bus_time
    if len(boarders) < capacity:
        # Try latest possible
        while time in passenger_set:
            time -= 1
    else:
        # last passenger boarded at boarders[-1], try one before
        time = boarders[-1] - 1
        while time in passenger_set:
            time -= 1
    return time
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(N log N + M log M), where N is the number of passengers and M is the number of buses. This is for sorting both lists; the rest is O(N).
- **Space Complexity:**  
  O(N), for the passenger set (faster presence lookups) and possible temporary lists (boarders).

### Potential follow-up questions (as if you’re the interviewer)  

- What would you do if passengers could also leave before boarding?
  *Hint: Think about needing more state if the possibilities for who is present at any time change.*

- How would your algorithm change if the buses did not have fixed departure times, but instead left once a bus filled up?
  *Hint: Sorting by event, simulating the process, possibly greedy.*

- Can you do this in one pass without sorting?
  *Hint: Explore limitations of unsorted data and if online processing is possible.*

### Summary
This problem is a strong example of the **two pointers** and **simulation** coding patterns. Sorting allows efficient step-wise boarding simulation. Using a set for O(1) conflict checks is key. This pattern is broadly applicable to "board in order with capacity" and "find latest/earliest available slot" problems, such as task scheduling, resource allocation with deadlines, or meeting room usage.