### Leetcode 1870 (Medium): Minimum Speed to Arrive on Time [Practice](https://leetcode.com/problems/minimum-speed-to-arrive-on-time)

### Description  
Given a list `dist` where `dist[i]` is the distance of the iᵗʰ train ride, and a float `hour` representing the total hours you have to reach your destination, find the **minimum integer speed** (km/h) required to arrive on time.  
- You must take trains **in order**.  
- Trains **depart only at integer hours**, so except for the last ride, you wait until the start of the next integer hour (i.e., you cannot start segment j until the integer hour after you finish segment j-1).  
- If it's impossible to arrive on time, return -1.

### Examples  

**Example 1:**  
Input: `dist = [1,3,2]`, `hour = 6`  
Output: `1`  
*Explanation: With speed=1: trip times = 1, 3, and 2 hrs. Because departures are at integer hours, total = 1 + 3 + 2 = 6. Arrival time = 6 hours.*

**Example 2:**  
Input: `dist = [1,3,2]`, `hour = 2.7`  
Output: `3`  
*Explanation:  
- At speed=3:  
  - First ride: 1/3 = 0.333.. ⇒ wait until 1.0 hr  
  - Second ride: 3/3 = 1.0 ⇒ wait until 2.0 hr  
  - Third (last) ride: 2/3 = 0.666..  
  - Total = 1 (ceil(0.33)) + 1 (ceil(1)) + 0.666... = 2.666... < 2.7 hours (possible)*

**Example 3:**  
Input: `dist = [1,3,2]`, `hour = 1.9`  
Output: `-1`  
*Explanation: Even at maximum speed=10⁷, total trip time > 1.9; impossible to arrive on time.*

### Thought Process (as if you’re the interviewee)  
First, I’d try a brute-force: start from speed=1 and simulate the journey, increment speed until total travel time ≤ hour.  
But dist can be up to 10⁵ and hour up to 10⁷, so brute force would be too slow.

**Key observation:** As speed increases, total journey time decreases—this function is monotonically decreasing.  
So, **binary search** is suitable:
- For a given speed, simulate the trip: for each segment except last, sum ⌈dist[i]/speed⌉, then for last just dist[-1]/speed.
- If total ≤ hour, try a smaller speed; else, try a higher speed.
- If not possible, return -1.

This is efficient (O(n log10⁷)).

### Corner cases to consider  
- hour < dist.length (impossible; need at least 1 hour per train)
- hour very large (minimal speed possible)
- very large distances or very small hour (impossible)
- hour with 0 or many decimals (e.g., hour = 2.01)
- dist has length 1 (no waits, just dist/speed)
- All dist[i] equal
- Minimum speed needed is very high (close to 10⁷)
- Floating point rounding errors

### Solution

```python
def minSpeedOnTime(dist, hour):
    import math
    
    # If too many segments, impossible even at infinite speed
    if hour <= len(dist) - 1:
        return -1
    
    left, right = 1, 10**7
    answer = -1
    
    while left <= right:
        mid = (left + right) // 2
        
        time = 0.0
        n = len(dist)
        
        # Compute total required time at speed=mid
        for i in range(n):
            trip = dist[i] / mid
            if i == n - 1:
                time += trip    # last train: fractional hour allowed
            else:
                time += math.ceil(trip) # ceil for waiting until next hour
                
        if time <= hour:
            answer = mid
            right = mid - 1  # Try lower speed
        else:
            left = mid + 1   # Need higher speed

    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log₁₀⁷) = O(n × 24), since speed is binary searched in [1, 10⁷], and for each candidate speed, O(n) iteration for travel time computation.
- **Space Complexity:** O(1), ignoring input. No extra space except variables for state.

### Potential follow-up questions (as if you’re the interviewer)  

- What if train departures can leave at any fractional time, not just integer hours?  
  *Hint: Think about removing the need to ceil intermediate segments.*

- How to avoid precision issues for very small values of hour or very large values of speed?  
  *Hint: Be careful with floating point summation and comparisons.*

- Can you optimize for the case with a very large number of segments, but when all distances are the same?  
  *Hint: Try to reason about patterns or shortcuts when all segments are equal.*

### Summary
This problem is a classic **binary search on answer** scenario, where the solution space is monotonic—higher speeds lead to lower arrival times. It also uses simulational logic to convert real constraints into a check function for the binary search. This approach is common for "min/max feasible parameter" (e.g., minimum days/capacity/speed/effort) problems and is applicable in scheduling, rate-minimization, and allocation problems.