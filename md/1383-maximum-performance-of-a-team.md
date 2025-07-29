### Leetcode 1383 (Hard): Maximum Performance of a Team [Practice](https://leetcode.com/problems/maximum-performance-of-a-team)

### Description  
You are given two integer arrays: **speed** and **efficiency** of equal length, and an integer **k**. You want to form a team of at most **k** engineers. The team's **performance** is defined as the sum of their speeds multiplied by the minimum efficiency among them. Return the maximum possible performance of any valid team.

### Examples  

**Example 1:**  
Input: `speed = [2,10,3,1,5,8]`, `efficiency = [5,4,3,9,7,2]`, `k = 2`  
Output: `60`  
*Explanation: Pick engineers with efficiency 5 and 7 (speeds 2 and 5): (2+5) × min(5,7) = 7 × 5 = 35. Better is to pick 10 and 5 (speeds 10,5) with efficiencies 4 and 7: (10+5) × 4 = 60. 60 is the max.*

**Example 2:**  
Input: `speed = [2,10,3,1,5,8]`, `efficiency = [5,4,3,9,7,2]`, `k = 3`  
Output: `68`  
*Explanation: Pick engineers with speeds 2,10,5 and corresponding eff: 5,4,7. Sum=17, min eff=4, performance=17×4=68.*

**Example 3:**  
Input: `speed = [2,10,3,1,5,8]`, `efficiency = [5,4,3,9,7,2]`, `k = 6`  
Output: `72`  
*Explanation: Take all engineers. Sum=29, min eff=2, performance=58.*

### Thought Process (as if you’re the interviewee)  
The brute force approach would be to consider every subset of at most k engineers; this is infeasible (exponential time). To optimize:
- Since performance = sum of chosen speeds × min efficiency, consider each engineer as the bottleneck (minimum efficiency).
- Sort engineers by efficiency *descending*; for each, imagine that engineer setting the minimum efficiency for the team.
- For each step, keep the k-1 largest speeds seen so far (since only k members allowed), maintain the speed sum using a min-heap for speeds.
- For each engineer, include their speed, maintain the sum for top k, and track performance using their efficiency as the minimum.

### Corner cases to consider  
- k = 1 (single engineer)
- All efficiencies/speeds are the same
- Large k (equal to n)
- Efficiency array with distinct extremes

### Solution

```python
import heapq

def maxPerformance(n, speed, efficiency, k):
    MOD = 10**9 + 7
    # Combine engineers and sort by efficiency descending
    engineers = sorted(zip(efficiency, speed), reverse=True)
    max_perf = 0
    speed_heap = []  # min-heap for k speeds
    speed_sum = 0
    for curr_eff, curr_spd in engineers:
        heapq.heappush(speed_heap, curr_spd)
        speed_sum += curr_spd
        # If heap size exceeds k, remove lowest speed
        if len(speed_heap) > k:
            speed_sum -= heapq.heappop(speed_heap)
        # Compute performance with current min efficiency
        perf = speed_sum * curr_eff
        max_perf = max(max_perf, perf)
    return max_perf % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log k), each insertion/removal on the heap is log k, each engineer is processed once.
- **Space Complexity:** O(k), for the speed heap which stores at most k elements.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify your approach if k can be much larger than n?  
  *Hint: What changes if you never remove from the heap?*

- Is there a way to avoid sorting the list?  
  *Hint: Why is sorting by efficiency crucial for correctness?*

- Can you output the list of engineers that form the maximum performance team?  
  *Hint: Save the indices as you push onto the heap!*

### Summary
This solution uses a greedy + min-heap pattern: processing candidates sorted by the factor that limits team performance (efficiency), greedily keep the k highest speeds, and compute performance at every step. This is a classic modern greedy-heap interview approach, applicable wherever subset maximums are defined by a sorted bottleneck + sum constraint.