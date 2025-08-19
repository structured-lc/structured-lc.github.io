### Leetcode 3506 (Hard): Find Time Required to Eliminate Bacterial Strains [Practice](https://leetcode.com/problems/find-time-required-to-eliminate-bacterial-strains)

### Description  
You are given an array **timeReq** where timeReq[i] is the time (in units) needed to eliminate the iᵗʰ bacterial strain, using a white blood cell (WBC). There is one WBC initially, but at any moment, a WBC can split into two, which takes **splitTime** units of time. Multiple splits can occur, but each split applies only to a single cell at a time.  
The goal: **find the minimum total time required to eliminate all bacterial strains** (the strains can be attacked in any order, and the cells can split as needed).  
The total time is determined by the amount of time taken until the last bacteria is eliminated.

### Examples  

**Example 1:**  
Input: `timeReq = [10,4,5]`, `splitTime = 2`  
Output: `12`  
*Explanation:*
- Start with 1 WBC.
- Split at t=0 → Now 2 WBCs at t=2.
- Assign one WBC to kill 10 (t=2+10=12).
- The other WBC splits again at t=2 → t=4, now 2 WBCs.
- These two work on 4 (t=4+4=8), and 5 (t=4+5=9).
- The total time is max(12,8,9)=12.

**Example 2:**  
Input: `timeReq = [10,4]`, `splitTime = 5`  
Output: `15`  
*Explanation:*
- Split at t=0 (now 2 at t=5).
- Each WBC takes a strain: times = 5+10=15 and 5+4=9.
- The max is 15.

**Example 3:**  
Input: `timeReq = [1,2,3,4]`, `splitTime = 1`  
Output: `4`  
*Explanation:*
- Split three times to make four WBCs: split at 0,1,2 (cells after t=3).
- Now assign each cell 1 strain: times = 3+1=4, 3+2=5, 3+3=6, 3+4=7, but you can optimize splits and assignments, choosing best branching.
- Min total time is 4.

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  The naive way is to simulate all possible ways to split and assign strains to WBCs, which is factorial (bad).
- **Observation:**  
  It's a scheduling problem: you pay split cost to increase parallelism.  
  If you have n bacteria, you need ⌊n/2⌋ splits to get n WBCs (from 1 to n).
- **DP Approach:**  
  Define dp(mask) = minimal extra time needed to eliminate all remaining strains in mask, starting from 1 WBC and possibly splitting.  
  But with constraints (n ≤ 10), can do DP by grouping assignments:
    - For a given group of strains and available WBCs,  
      - If WBCs ≥ number of strains: no split needed; just the largest timeReq.
      - Else, split any WBC for splitTime, then distribute strains.

  So, recursively:
    - Try splitting the current WBC (which costs time), recursively calculate all combinations (e.g., how to split set of strains).
    - Memoize overlapping work.

- **Optimal Partition:**  
  Try all ways to partition strains among WBCs at different splitting stages.
- **Final approach:**  
  Use recursion + memoization: For k strains and given current time,  
    - If k=1, assign timeReq[chosen].
    - Else, split into two groups, do recursive call for each group and take max, add splitTime.

### Corner cases to consider  
- Empty array (should not happen as per constraint)
- One element in timeReq
- All timeReq values same
- Large splitTime
- splitTime = 0 (instant split)
- Need more splits than strains

### Solution

```python
def minTimeToEliminateBacteria(timeReq, splitTime):
    from functools import lru_cache

    n = len(timeReq)
    # Precompute all subset sums
    import itertools

    @lru_cache(None)
    def dfs(strains: tuple) -> int:
        strains = tuple(sorted(strains, reverse=True)) # deterministic
        k = len(strains)
        if k == 1:
            return strains[0]
        # If enough WBCs, can do all in parallel
        # But we start with 1, so we need to split

        # Explore all possible ways to partition strains into two non-empty groups
        res = float('inf')
        # To avoid duplicate partitions (since order doesn't matter), enumerate combinations up to half size
        for sz in range(1, k//2 + 1):
            for group in itertools.combinations(range(k), sz):
                groupA = tuple(strains[i] for i in group)
                groupB = tuple(strains[i] for i in range(k) if i not in group)
                tA = dfs(groupA)
                tB = dfs(groupB)
                this_time = splitTime + max(tA, tB)
                if this_time < res:
                    res = this_time
        return res

    return dfs(tuple(timeReq))
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(2ⁿ × poly(n)), since it DFS/memoizes all subsets and partitions on at most 10 elements.
- **Space Complexity:**  
  O(2ⁿ), for the recursion memoization cache (all possible subsets of the timeReq list).

### Potential follow-up questions (as if you’re the interviewer)  

- What if splitTime varies (e.g., different for each split)?
  *Hint: Parameterize splitTime in dfs or pass splitTime sequence.*

- Could you output the full schedule of splits and assignments?
  *Hint: Track choices in your recursion/memoization table for reconstruction.*

- How would you handle cases where there are thousands of strains?
  *Hint: Need a faster approximation or greedy.*

### Summary
This is an instance of a **scheduling DP/partitioning** problem, where splitting increases parallelism at fixed cost. The recursive, memoized solution explores all possible ways to split and assign the workload, minimizing the time for completion.  
This pattern (subset DP and recursive partitioning) appears in hard parallel job scheduling, process tree building, and some optimal binary tree grouping problems.

### Tags
Array(#array), Math(#math), Greedy(#greedy), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- Minimum Time to Build Blocks(minimum-time-to-build-blocks) (Hard)