### Leetcode 1335 (Hard): Minimum Difficulty of a Job Schedule [Practice](https://leetcode.com/problems/minimum-difficulty-of-a-job-schedule)

### Description  
Given a list of jobs in the form of an integer array `jobDifficulty`, where each element represents the difficulty of the iᵗʰ job, and a positive integer `d` for days, schedule these jobs over `d` days in order. The jobs are dependent: you must finish all jobs before i to work on the iᵗʰ job. Each day, you must do at least one job, and all jobs done per day are contiguous. The difficulty of a day is the maximum job difficulty for jobs done that day. The total schedule's difficulty is the sum of the daily difficulties. Your task is to determine the minimum total difficulty needed to schedule all the jobs over `d` days. If it is not possible (because there are fewer jobs than days), return -1.

### Examples  

**Example 1:**  
Input: `jobDifficulty = [6,5,4,3,2,1]`, `d = 2`  
Output: `7`  
*Explanation: One optimal split is: Day 1: jobs [6,5,4,3,2], max=6; Day 2: jobs [1], max=1. Total = 6+1 = 7.*

**Example 2:**  
Input: `jobDifficulty = [9,9,9]`, `d = 4`  
Output: `-1`  
*Explanation: Not enough jobs for 4 days. There must be at least one job per day.*

**Example 3:**  
Input: `jobDifficulty = [7,1,4,5]`, `d = 2`  
Output: `8`  
*Explanation: E.g., Day 1: [7,1,4] (max=7), Day 2: [5] (max=5), total=7+5=12. Try all splits and pick the minimal.*

### Thought Process (as if you’re the interviewee)  
- The brute-force way is to try every way to partition the jobs into `d` contiguous blocks and sum the max of each block. This is exponential and inefficient.
- Instead, use **Dynamic Programming**:
  - Let `dp(i, k)` be the minimum total difficulty for scheduling jobs from index i to the end across days k to d.
  - If `k == d`, take the max from i to end (all jobs must be finished on the last day).
  - Otherwise, try every possible split: assign jobs from i to some j on day k, and recursively compute the cost for `dp(j+1, k+1)`.
  - Memoize `dp(i,k)` to avoid recomputation.
  - If jobs < days, impossible: return -1.
- The challenge is to handle the recursion boundaries and efficiently compute block maxes.
- Use bottom-up or top-down DP; top-down with memoization is intuitive here.

### Corner cases to consider  
- jobs fewer than days (impossible case)
- All job difficulties the same
- Only one day: all jobs must be done on that day
- Only one job: must be performed
- Large `jobDifficulty` lists (check efficiency)
- d = 1 (sum is the max)

### Solution

```python
from typing import List

def minDifficulty(jobDifficulty: List[int], d: int) -> int:
    n = len(jobDifficulty)
    if n < d:
        return -1
    from functools import lru_cache
    
    @lru_cache(maxsize=None)
    def dp(i, day):
        if day == d:
            # Last day: must take all remaining jobs
            return max(jobDifficulty[i:])
        res = float('inf')
        cur_max = 0
        # Ensure at least 1 job per day and enough jobs left for remaining days
        for j in range(i, n - (d - day)):
            cur_max = max(cur_max, jobDifficulty[j])
            next_rest = dp(j + 1, day + 1)
            res = min(res, cur_max + next_rest)
        return res
    
    return dp(0, 1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² × d). For each job start index (up to n), for each day (d), and inner loop (up to n per call).
- **Space Complexity:** O(n × d) for DP memoization (i, day), plus recursion stack up to d depth.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize if max jobDifficulty is small?  
  *Hint: Use precomputed ranges or segment tree for max queries.*

- Can you print the actual schedule achieving the minimum?  
  *Hint: Store the split points as you compute dp.*

- What if jobs can be scheduled out of order (no dependency)?  
  *Hint: Problem becomes easier—consider all permutations or sort the jobs.*

### Summary
This problem is a classic example of interval DP (divide the jobs into contiguous segments) and uses DP with memoization to try all possible valid partitions efficiently, exploiting overlapping subproblems. Somewhat similar DP techniques are seen in problems like matrix chain multiplication or word break. The recurrence pattern occurs anywhere partitioned cost is minimized.