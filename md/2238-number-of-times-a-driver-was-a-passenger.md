### Leetcode 2238 (Medium): Number of Times a Driver Was a Passenger [Practice](https://leetcode.com/problems/number-of-times-a-driver-was-a-passenger)

### Description  
Given a table of ride records, each ride records the `driver_id` and `passenger_id` for a trip. You need to return, for every unique driver, how many times that driver was a passenger on any other ride. If a driver was never a passenger, that driver's count should be 0. Output a list of each driver's id and their corresponding count.

### Examples  

**Example 1:**  
Input:  
Rides =  
| ride_id | driver_id | passenger_id |
|---------|-----------|--------------|
|   1     |     1     |      2       |
|   2     |     2     |      1       |
|   3     |     1     |      3       |
Output:  
`[[1, 1], [2, 1]]`  
*Explanation: Driver 1 was a passenger once (ride 2), and Driver 2 was a passenger once (ride 1).*

**Example 2:**  
Input:  
Rides =  
| ride_id | driver_id | passenger_id |
|---------|-----------|--------------|
|   1     |     10    |     20       |
|   2     |     10    |     21       |
|   3     |     10    |     20       |
Output:  
`[[10, 0]]`  
*Explanation: Driver 10 was never a passenger, so count is 0.*

**Example 3:**  
Input:  
Rides =  
| ride_id | driver_id | passenger_id |
|---------|-----------|--------------|
|   1     |     5     |      7       |
|   2     |     7     |      6       |
|   3     |     5     |      6       |
|   4     |     6     |      5       |
Output:  
`[[5, 1], [6, 1], [7, 1]]`  
*Explanation: Each driver was a passenger exactly once.*

### Thought Process (as if you’re the interviewee)  
First, I would want to map out the problem in terms of the data I'm given: a list of rides, each with a driver and a passenger. I need, for **each unique driver_id**, to count the number of rides where this driver's id appears as a passenger.

- **Brute-force:** For every unique driver_id, iterate all rides and count where driver_id == passenger_id. This is O(D×N), where D is number of drivers and N is rides. 
- **Optimized Approach:**  
  - First, find all unique driver_ids.
  - Then, iterate once through the rides, counting for each passenger_id how many times it appears.
  - Lastly, for each driver_id, look up how many times they were a passenger. If not present, output 0.

This is preferred because:
- Scanning once to gather unique drivers: O(N)
- Scanning once to count passenger occurrences: O(N)
- Returning results for each driver: O(D)  
Total: O(N) time with O(N) extra space.

### Corner cases to consider  
- Rides = [] (no rides) → Should return []
- Only drivers, never passengers
- Only passengers as drivers (no passenger ever drives)
- Multiple entries with the same (driver, passenger) pair
- Large input (performance)
- Self-rides (driver_id == passenger_id): interpret as valid passenger instance unless question specifies otherwise

### Solution

```python
def num_times_driver_was_passenger(rides):
    # 1. Gather all unique driver_ids
    drivers = set()
    for ride in rides:
        drivers.add(ride['driver_id'])
    
    # 2. Count occurrences of each passenger_id
    passenger_count = {}
    for ride in rides:
        pid = ride['passenger_id']
        passenger_count[pid] = passenger_count.get(pid, 0) + 1
    
    # 3. For each driver, get their count as a passenger (default to 0)
    res = []
    for driver in sorted(drivers):
        count = passenger_count.get(driver, 0)
        res.append([driver, count])
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + D), where N is number of rides and D is number of unique drivers. Both gathering drivers and counting passengers are O(N). Building the output is O(D).
- **Space Complexity:** O(D + P), where D is driver count and P is number of unique passengers (but P ≤ N). Extra storage is small relative to input.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if the data was extremely large and didn’t fit in memory?  
  *Hint: MapReduce style streaming or external sorting.*

- Suppose driver_id and passenger_id could be the same — should those be counted as valid passenger rides?  
  *Hint: Clarify requirements from product or interviewer.*

- How would you handle missing values, or rides where either driver_id or passenger_id is null?  
  *Hint: Add data validation or filtering during iteration.*

### Summary
This problem is a variation of the *group by/count* pattern, common in aggregating and summarizing data. The optimized solution uses **hash maps** to count and lookup in linear time. This pattern is relevant for log analytics, event counting, and data pre-processing in SQL or distributed environments.