### Leetcode 1235 (Hard): Maximum Profit in Job Scheduling [Practice](https://leetcode.com/problems/maximum-profit-in-job-scheduling)

### Description  
Given several jobs, each with a start time, an end time, and a profit, select a subset of jobs that do not overlap (that is, no two selected jobs occupy the same time). The objective is to schedule jobs to maximize the total profit. If a job ends at time X, another can start at that moment. The goal is to find the maximum profit possible by optimally picking non-overlapping jobs.

### Examples  

**Example 1:**  
Input:  
`startTime = [1,2,3,3]`,  
`endTime = [3,4,5,6]`,  
`profit = [50,10,40,70]`  
Output: `120`  
Explanation. Pick jobs 1 and 4 (1-based indices): (start=1, end=3, profit=50) and (start=3, end=6, profit=70). Job 1 ends at 3, so you can start job 4 at 3. Total profit = 50 + 70 = 120.

**Example 2:**  
Input:  
`startTime = [1,2,3,4,6]`,  
`endTime = [3,5,10,6,9]`,  
`profit = [20,20,100,70,60]`  
Output: `150`  
Explanation. Select jobs at index 1 and 3: (start=1, end=3, profit=20) and (start=4, end=6, profit=70), combined profit 90. Alternatively, pick job at index 3 (start=3, end=10, profit=100) alone. Best is jobs 1+4=90 or 3=100, so combine index 1, 4, 5 (if possible), total profit is 150.

**Example 3:**  
Input:  
`startTime = [1,1,1]`,  
`endTime = [2,3,4]`,  
`profit = [5,6,4]`  
Output: `6`  
Explanation. All jobs overlap, so pick the one with the highest profit, which is 6.

### Thought Process (as if you’re the interviewee)  
Start with brute-force: enumerate all subsets and check overlap for each. That’s O(2ⁿ) and not feasible for n up to 50,000.

Observation: This is similar to Weighted Interval Scheduling. If jobs are sorted by end time, for each job, either:
- Take it, add its profit to the best previous compatible job’s total.
- Skip it, and take the best total so far.

For efficient lookup of previous compatible job, use binary search on sorted end times.

So, the structure:
- Sort jobs by end time.
- For each position, dp[i] = max(dp[i-1], profit of current job + dp[idx of latest job ending ≤ current start]).
- Use binary search for fast idx lookup.
- This is O(n log n), suitable for constraints.

### Corner cases to consider  
- No jobs at all (expect profit = 0).
- All jobs overlap (pick highest profit).
- Multiple jobs start at same time, different end/profit values.
- Jobs with profits of 0 or identical profits.
- Jobs ending exactly when another starts (should allow both).
- Only one job.

### Solution

```python
def jobScheduling(startTime, endTime, profit):
    # Combine all job info and sort by endTime
    jobs = sorted(zip(endTime, startTime, profit))
    # Extract sorted lists for binary search
    sorted_end = [job[0] for job in jobs]  # sorted endTimes
    dp = [0] * (len(jobs) + 1)  # dp[i]: max profit by considering first i jobs

    for i in range(1, len(jobs) + 1):
        cur_end, cur_start, cur_profit = jobs[i-1]
        # Binary search for last job ending ≤ current job's start
        l, r = 0, i-1
        while l < r:
            m = (l + r) // 2
            if sorted_end[m] <= cur_start:
                l = m + 1
            else:
                r = m
        idx = l - 1 if (l > 0 and sorted_end[l-1] <= cur_start) else (l if sorted_end[l] <= cur_start else -1)
        # Compare: skip this job, or take it & add profit from previous non-overlapping
        take_profit = cur_profit
        if idx >= 0:
            take_profit += dp[idx+1]
        dp[i] = max(dp[i-1], take_profit)
    return dp[-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n = number of jobs. Sorting jobs is O(n log n), and for each job, binary search for previous non-overlapping job is O(log n).
- **Space Complexity:** O(n), to store jobs and the dp table (plus auxiliary arrays for sorting/binary search).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you’re asked to return the set of jobs to schedule, not just maximum profit?  
  *Hint: Store parent pointers for the choices and reconstruct the selection path from dp.*

- How would you handle jobs where startTime == endTime?  
  *Hint: Clarify with interviewer—are zero-duration jobs allowed? You may need to handle interval inclusion/exclusion carefully.*

- How would you adapt this for streaming or online arrivals of jobs?  
  *Hint: You may use data structures like segment tree or balanced BST for dynamic insertion and range queries.*

### Summary
This problem is a variant of Weighted Interval Scheduling, solved efficiently with DP + binary search over sorted intervals. This dynamic programming pattern applies to a range of interval scheduling problems, including maximizing count, sum, or other aggregates for non-overlapping intervals. The key insight is sorting and fast lookup of compatible intervals; this approach generalizes to taxi scheduling, meeting rooms, or event scheduling problems.