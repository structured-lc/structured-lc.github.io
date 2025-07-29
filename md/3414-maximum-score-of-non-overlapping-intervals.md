### Leetcode 3414 (Hard): Maximum Score of Non-overlapping Intervals [Practice](https://leetcode.com/problems/maximum-score-of-non-overlapping-intervals)

### Description  
Given a list of intervals, each with a left endpoint, right endpoint, and a weight, select up to **four** _non-overlapping intervals_ to maximize the **total weight**. "Non-overlapping" means no two chosen intervals share any point. Return the list of **chosen interval indices** (0-based).

### Examples  

**Example 1:**  
Input: `intervals = [[1,3,2],[4,5,2],[1,5,5],[6,9,3],[6,7,1],[8,9,1]]`  
Output: `[2,3]`  
*Explanation: Interval 2 is [1,5] (weight 5), interval 3 is [6,9] (weight 3). They do not overlap, and their total weight (5+3=8) is maximal for any subset of up to 4.*

**Example 2:**  
Input: `intervals = [[5,8,1],[6,7,7],[4,7,3],[9,10,6],[7,8,2],[11,14,3],[3,5,5]]`  
Output: `[1,3,5,6]`  
*Explanation: Choosing intervals 1 ([6,7],7), 3 ([9,10],6), 5 ([11,14],3), 6 ([3,5],5). None overlap; weights sum to 21, which is maximal.*

**Example 3:**  
Input: `intervals = [[1,5,10],[2,6,8],[7,10,7],[11,12,6],[8,11,5]]`  
Output: `[0,2,3]`  
*Explanation: Choosing 0 ([1,5],10), 2 ([7,10],7), 3 ([11,12],6). Total weight is 23, and no intervals overlap.*

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  Try all subsets of up to 4 intervals, check for overlaps, take the sum. For n intervals, this has time O(n⁴ × n) (way too slow).

- **Better idea: DP & sorting:**  
  - Sort intervals by end time, so that checking for overlapping becomes easier.
  - DP state: dp[i][k] = max score using first i intervals, choosing ≤k intervals.
  - Transition: At each i, either:
    - Don't choose i: dp[i][k] = dp[i-1][k]
    - Choose i: find last j before i where rⱼ < lᵢ (j-th interval ends before current starts), then dp[i][k] = dp[j][k-1] + weightᵢ
  - For each position and k=0..4, keep the best score.

- For index reconstruction, we need to track which intervals contributed to optimal score.

- **Final approach**:  
  - Use a sorted list of intervals.
  - Binary search to find the previous non-overlapping interval.
  - Build dp[i][t]: for each interval i, the best score with t intervals chosen up to i.
  - Reconstruct indices with backtracking.

- **Trade-offs:**  
  - O(n log n) for sorting and binary search per interval.
  - Space O(n × k), k ≤ 4; acceptable.

### Corner cases to consider  
- Empty interval list.
- All intervals overlap, so only one can be chosen.
- All intervals have the same endpoints.
- Intervals with weight 0.
- Less than 4 intervals.
- Best answer uses fewer than 4 intervals (maybe 1–3).
- Intervals overlap at a single point (should not both be chosen).

### Solution

```python
def maximumScoreOfNonOverlappingIntervals(intervals):
    # Attach original indices for reconstruction
    intervals = [(*iv, idx) for idx, iv in enumerate(intervals)]
    # Sort by end time for DP transitions
    intervals.sort(key=lambda x: x[1])   # x = (l, r, w, idx)
    n = len(intervals)
    k = 4  # Maximum intervals to select

    # Prepare for binary search: collect ends
    ends = [iv[1] for iv in intervals]

    # DP table: dp[i][t] = (score, from_index)
    # dp[prev][t-1] + weight OR dp[i-1][t]
    dp = [[(0, -1) for _ in range(k+1)] for _ in range(n+1)]  # +1 for 0 intervals

    # prev_idx[i]: the largest j < i such that intervals[j].end < intervals[i].start
    import bisect

    prev_idx = []
    for i in range(n):
        l = intervals[i][0]
        idx = bisect.bisect_right(ends, l-1, 0, i) - 1
        prev_idx.append(idx)

    # Fill DP table
    parent = [[(-1, -1) for _ in range(k+1)] for _ in range(n+1)]

    for i in range(1, n+1):
        l, r, w, orig_idx = intervals[i-1]
        for t in range(1, k+1):
            # Option 1: Take this interval
            prev = prev_idx[i-1] + 1  # Because dp is 1-based
            take_score = dp[prev][t-1][0] + w
            # Option 2: Skip this interval
            skip_score = dp[i-1][t][0]
            if take_score > skip_score:
                dp[i][t] = (take_score, i-1)
                parent[i][t] = (prev, t-1)
            else:
                dp[i][t] = (skip_score, dp[i-1][t][1])
                parent[i][t] = (i-1, t)

    # Recover answer: check dp[n][t] for t = 1..4 and pick max
    result_t = 1
    best = dp[n][1][0]
    for t in range(2, k+1):
        if dp[n][t][0] > best:
            best = dp[n][t][0]
            result_t = t

    # Backtrack indices
    res = []
    i, t = n, result_t
    while i > 0 and t > 0:
        prev_i, prev_t = parent[i][t]
        if prev_i != i-1:
            # This interval was taken
            res.append(intervals[i-1][3])
        i, t = prev_i, prev_t
    res.reverse()
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n).  
  Sorting intervals: O(n log n).  
  For each interval, binary search for last non-overlapping: O(log n).  
  For each k = 1..4, total O(n log n).

- **Space Complexity:** O(n).  
  DP table: O(n \* 4) = O(n).  
  prev_idx and parent arrays: O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could choose any number of intervals, not just 4?  
  *Hint: Generalize DP to k intervals or unbounded case, can you optimize for large k?*

- How would you return the actual intervals rather than just their indices?  
  *Hint: Keep track of index during DP and reconstruct path.*

- Can you solve this if weights can be negative?  
  *Hint: DP logic mostly unchanged but need to ensure no infinite loops due to negative cycles.*

### Summary
This problem leverages the **Weighted Interval Scheduling** DP pattern, extended to selecting up to 4 non-overlapping intervals. By **sorting**, using **binary search** to find non-overlapping transitions, and **DP** to manage optimal subsets, it reflects classic patterns seen in interval DP and knapsack variants. This approach is widely applicable to maximum-weight/score subset selection where non-overlapping or non-conflicting constraints are present.