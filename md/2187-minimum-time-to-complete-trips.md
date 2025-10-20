### Leetcode 2187 (Medium): Minimum Time to Complete Trips [Practice](https://leetcode.com/problems/minimum-time-to-complete-trips)

### Description  
Given an array `time` where `time[i]` is the time it takes the iᵗʰ bus to complete one trip, and an integer `totalTrips`, compute the **minimum amount of time** required for all the buses together to complete at least `totalTrips` trips.  
Each bus can run multiple trips consecutively and simultaneously with the others.  
The goal is to find the smallest number T such that:  
sum over all i of ⌊T / time[i]⌋ ≥ `totalTrips`.  
(All buses start at time 0 and can run continuously.)

### Examples  

**Example 1:**  
Input: `time = [1, 2, 3], totalTrips = 5`  
Output: `3`  
*Explanation:*
- At `t=1`: trips=[1,0,0] → 1
- At `t=2`: trips=[2,1,0] → 3
- At `t=3`: trips=[3,1,1] → 5 (Done; minimum time is 3)

**Example 2:**  
Input: `time = [2], totalTrips = 1`  
Output: `2`  
*Explanation:*
- Only one bus, needs 2 units for 1 trip, so answer is 2.

**Example 3:**  
Input: `time = [5,10,10], totalTrips = 9`  
Output: `25`  
*Explanation:*
- At `t=25`: trips = [25 // 5 = 5, 25 // 10 = 2, 25 // 10 = 2] ⇒ 5+2+2=9

### Thought Process (as if you’re the interviewee)  
First, consider brute-force:  
Could we increment the time T from 1 up, and for each T compute the total trips buses can finish? But if totalTrips is large, this is way too slow (T could be up to 10¹⁴).  
Notice the function f(T) = total number of trips possible in T time is non-decreasing. If at T₀ buses can make X trips, then at a later time T₁ ≥ T₀, they'll do at least X trips.  
Therefore, this is a classic **search for minimal T such that f(T) ≥ totalTrips**.  
We can use **binary search**:  
- Lower bound: 1 (minimum time is at least 1)
- Upper bound: min(time) × totalTrips (in worst case, only fastest bus does all trips)  
For each guess mid, compute f(mid) = sum(mid // time[i]) for all i.  
If f(mid) ≥ totalTrips, try smaller time; else, need more time.  
Keep looping until left == right; return left.

### Corner cases to consider  
- Only one bus (`time` has length 1)
- All elements in `time` are equal
- TotalTrips is 1
- Large values in `time` array; test for overflows
- Fast bus (1s) and very slow bus (big integers)
- totalTrips = sum(trips possible in 1 round for all buses)
- time = [very large], totalTrips = 1
- Empty time array (invalid input, but worth noting)

### Solution

```python
from typing import List

def minimumTime(time: List[int], totalTrips: int) -> int:
    # Search for the minimum time T s.t. sum(T // time[i]) >= totalTrips
    
    left = 1
    right = min(time) * totalTrips  # Max time needed if only fastest bus works
    
    while left < right:
        mid = (left + right) // 2
        
        trips = 0
        for t in time:
            trips += mid // t
        
        if trips >= totalTrips:
            right = mid  # Try a smaller T
        else:
            left = mid + 1  # Need more time
        
    return left
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log(min(time) × totalTrips)),  
  Where n = number of buses.  
  - The binary search requires log(min(time) × totalTrips) steps.  
  - For each step, sum over all n buses (O(n)).
- **Space Complexity:** O(1)  
  - Uses only a fixed number of variables regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if a bus is temporarily unavailable (e.g., out of service for part of the time)?  
  *Hint: How can you model unavailability windows or adjust f(T)?*

- Can you optimize for real-time dynamic queries (i.e., totalTrips or time changes)?  
  *Hint: Think about preprocessing or segment trees if time array changes.*

- What if trips must be distributed as evenly as possible among buses?  
  *Hint: Is the round-robin assignment the same as maximizing throughput?*

### Summary
The solution uses a **binary search on answer** technique, common for problems where you have a monotonic condition based on a numeric threshold (here, time). By quickly narrowing the answer space, we avoid slow iteration, even for very large inputs.  
This pattern, "search for minimum/maximum parameter to satisfy a constraint," is crucial in scheduling, production-line, or batching problems—other classic LeetCode problems using it include "Koko Eating Bananas," "Capacity to Ship Packages Within D Days," etc.


### Flashcard
Use binary search on time T; for each T, sum ⌊T/timeᵢ⌋ over all buses and find minimal T with total ≥ totalTrips.

### Tags
Array(#array), Binary Search(#binary-search)

### Similar Problems
- Maximum Candies Allocated to K Children(maximum-candies-allocated-to-k-children) (Medium)
- Minimum Speed to Arrive on Time(minimum-speed-to-arrive-on-time) (Medium)
- Minimized Maximum of Products Distributed to Any Store(minimized-maximum-of-products-distributed-to-any-store) (Medium)
- Maximum Running Time of N Computers(maximum-running-time-of-n-computers) (Hard)
- Maximum Number of Robots Within Budget(maximum-number-of-robots-within-budget) (Hard)
- Minimize Maximum of Array(minimize-maximum-of-array) (Medium)
- Minimum Amount of Damage Dealt to Bob(minimum-amount-of-damage-dealt-to-bob) (Hard)