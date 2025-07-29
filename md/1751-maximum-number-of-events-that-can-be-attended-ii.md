### Leetcode 1751 (Hard): Maximum Number of Events That Can Be Attended II [Practice](https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended-ii)

### Description  
Given a list of events, where each event is represented as `[startDay, endDay, value]`, you need to choose **at most k events** to attend so that:
- You can attend only **non-overlapping events** (an event fully attended from startDay to endDay inclusive, and you can’t start a new event until the previous one has fully ended).
- The total value earned from attending selected events is maximized.

Return the **maximum sum of values** you can obtain by attending at most k non-overlapping events.

### Examples  

**Example 1:**  
Input: `events = [[1,2,4],[3,4,3],[2,3,1]], k = 2`  
Output: `7`  
*Explanation: Attend event [1,2,4] (value 4) and event [3,4,3] (value 3). Both are non-overlapping, total value = 4 + 3 = 7.*

**Example 2:**  
Input: `events = [[1,2,4],[3,4,3],[2,3,10]], k = 2`  
Output: `10`  
*Explanation: The optimal choice is to attend only event [2,3,10] (value 10) as it overlaps with all others. So total value = 10.*

**Example 3:**  
Input: `events = [[1,1,1],[2,2,2],[3,3,3],[4,4,4]], k = 3`  
Output: `9`  
*Explanation: No overlap in events. Attend any 3 highest-valued events: 1 + 2 + 3 + 4 = 10, but since k = 3, pick top three for 9.*

### Thought Process (as if you’re the interviewee)  
- **Brute force:** Try all possible sets of up to k non-overlapping events. This will let us check all combinations, but is exponential and infeasible for large inputs.
- **Greedy does not work:** Simply picking top-k valued non-overlapping events can miss non-obvious optimal groupings due to overlaps.
- **Optimal approach:** Use **Dynamic Programming + Binary Search**:
  - Sort all events by finish time.
  - For each event and up to k picks, consider:
    - Attending this event: find the last compatible (non-overlapping) event before this (binary search).
    - Not attending: carry over the previous value.
  - Use dp[i][e] as the max value using first i events with at most e events picked.

This approach efficiently finds transitions using binary search, reminiscent of **weighted interval scheduling**.

### Corner cases to consider  
- events is empty → should return 0  
- k is 0 → can’t attend any event, return 0  
- All events overlap, must pick the highest valued one  
- There are fewer than k non-overlapping events  
- Multiple events with the same time windows  
- Large input sizes: performance matters

### Solution

```python
def maxValue(events, k):
    # Sort events by end (to enable binary search for compatible ones)
    events.sort(key=lambda x: x[1])
    n = len(events)
    
    # To enable binary search, prepare the list of end times
    ends = [ev[1] for ev in events]
    
    # dp[i][j]: max value by attending up to j events among first i events
    # Initialize dp table (n+1) x (k+1) with 0
    dp = [[0] * (k + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        start, end, value = events[i-1]
        # Find the rightmost event that ends before current start
        # Using bisect_right to get strict non-overlap (end < current start)
        lo, hi = 0, i - 1
        pre = 0
        left, right = 0, i-1
        while left < right:
            mid = (left + right) // 2
            if ends[mid] < start:
                left = mid + 1
            else:
                right = mid
        pre = left
        if pre < i-1 and ends[pre] >= start:
            pre -= 1
        
        for cnt in range(1, k + 1):
            # Do not attend event i-1; inherit previous state
            dp[i][cnt] = max(dp[i][cnt], dp[i-1][cnt])
            # Attend current event; add its value to the best previous compatible
            if pre >= 0:
                dp[i][cnt] = max(dp[i][cnt],
                                 dp[pre+1][cnt-1] + value)
            else:
                # No compatible previous event
                dp[i][cnt] = max(dp[i][cnt], value)
    return dp[n][k]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k × log n), where n = number of events.  
  - For each event and for each count, we binary search for compatible event (log n).
- **Space Complexity:** O(n × k) for the dp table.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want to output the actual list of events attended?
  *Hint: Add backtracking or store parent pointers in dp to reconstruct the solution.*

- How would you optimize for huge k when k > n?
  *Hint: Realize you cannot attend more than n events; optimize for small n or make k the outer loop.*

- If events can have the same start & end day, can overlapping events be chosen?
  *Hint: Clarify constraints—can only pick one event per day? May require redefining overlap logic.*

### Summary
This problem is a classic example of the weighted interval scheduling dynamic programming pattern. The key trick is combining sorting, dynamic programming, and binary search to efficiently select a maximum-value subset of non-overlapping items. This pattern applies in other scheduling, resource allocation, or selection optimization problems with similar pairing and overlap rules.