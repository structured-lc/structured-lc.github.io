### Leetcode 1094 (Medium): Car Pooling [Practice](https://leetcode.com/problems/car-pooling)

### Description  
You are given a series of trips, where each trip is represented as `[numPassengers, startLocation, endLocation]`. There is a car with a fixed seating `capacity`, and the car only drives eastward (locations are given as non-decreasing integers). For each trip, you must pick up `numPassengers` at `startLocation` and drop them off at `endLocation`. Determine if it is possible to complete all trips without ever exceeding the car's passenger capacity at any point.

### Examples  

**Example 1:**  
Input: `trips = [[2,1,5],[3,3,7]], capacity = 4`  
Output: `False`  
*Explanation: At time/location 3, the car will need to carry 2 (from trip 1) + 3 (from trip 2) = 5 passengers, which exceeds the capacity of 4.*

**Example 2:**  
Input: `trips = [[2,1,5],[3,3,7]], capacity = 5`  
Output: `True`  
*Explanation: The car carries 2 passengers from 1 to 5 and picks up 3 more at 3 (total 5). At 5, the first trip's passengers leave, so only 3 remain till 7. The capacity is never exceeded.*

**Example 3:**  
Input: `trips = [[2,1,5],[3,5,7]], capacity = 3`  
Output: `True`  
*Explanation: The two trips do not overlap; maximum passengers at any time is 3.*

### Thought Process (as if you’re the interviewee)  
First, I considered the brute-force solution: for each unit of time/location, simulate all trips, add up the passengers present at that time, and return False if the sum exceeds capacity. However, because locations can go up to 1000, and there can be many trips, this naive simulation is inefficient.

To optimize, I observed that **all we care about is the net change in passengers at pick-up and drop-off points**. So, for each trip, we can:
- Increment the passenger count at the start location.
- Decrement at the end location.

We can represent this in an array of size 1001 (since locations are in 0–1000). If we keep a running sum of passengers as we “sweep” through all locations, we can check for any point where the number of passengers exceeds capacity.

This is the **difference array (sweep line)** technique, which is much faster and only requires one pass through the array.

### Corner cases to consider  
- Empty `trips` list: should return True (no passengers).
- Non-overlapping trips (should always be OK if individual trip fits in capacity).
- All trips starting or ending at the same location.
- Maximum passengers added or dropped off at the same spot.
- Trips covering the full location range (0 to 1000).
- Single trip that exceeds capacity by itself.

### Solution

```python
def carPooling(trips, capacity):
    # Array to track changes at each location (up to 1000 as per constraints)
    location_deltas = [0] * 1001
    
    # Apply the difference for each trip
    for num_pass, start, end in trips:
        location_deltas[start] += num_pass      # Pick up passengers
        location_deltas[end]   -= num_pass      # Drop off passengers
    
    # Sweep through and check running passenger count
    curr_passengers = 0
    for change in location_deltas:
        curr_passengers += change
        if curr_passengers > capacity:
            return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + L), where N is the number of trips and L is the range of locations (at most 1001). We only loop through the trips once, and sweep once through the location array.
- **Space Complexity:** O(L), for the location_deltas array (maximum size is 1001).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the location range is very large (e.g., up to \(10^9\)) and sparse?  
  *Hint: Can you use a map/dictionary instead of an array?*

- How would you track not just the “yes/no” answer, but the maximal occupancy at any time?  
  *Hint: Track the maximum value of curr_passengers during the sweep.*

- What if each passenger has an individual destination that could be different?  
  *Hint: Think about processing each passenger as a separate drop-off event.*

### Summary
The approach uses the **difference array / sweep line algorithm**, a common and efficient pattern for interval and range update problems. It transforms the problem into tracking net changes at points of interest (pick-up/drop-off), enabling fast and scalable solutions without simulating every movement. This pattern appears in interval covering, calendar scheduling, traffic flow, and range sum problems.

### Tags
Array(#array), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Simulation(#simulation), Prefix Sum(#prefix-sum)

### Similar Problems
- Meeting Rooms II(meeting-rooms-ii) (Medium)