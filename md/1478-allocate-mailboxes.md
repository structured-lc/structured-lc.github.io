### Leetcode 1478 (Hard): Allocate Mailboxes [Practice](https://leetcode.com/problems/allocate-mailboxes)

### Description  
Given a list of houses along a street and an integer k, place k mailboxes such that the sum of distances between each house and its nearest mailbox is minimized. All houses are represented as an integer array (sorted in increasing order), and the distance is the absolute value between locations. Compute the minimum possible sum of distances with exactly k mailboxes.

### Examples  
**Example 1:**  
Input: `houses = [1,4,8,10,20]`, `k = 3`  
Output: `5`  
*Explanation: Place mailboxes at houses=1, houses[1]=4, houses[4]=20. Sum = (0)+(0)+(4)+(6)+(0) = 10; Actually, a better way is (1,4), (8,10), (20); for each interval, median minimizes the sum (e.g. 1,4,8 to mailbox at 4 yields |1-4|+|4-4|+|8-4|=3+0+4=7 ... Min sum is 5 by optimal placement: [1,4]=1, =0, [10,20]=1+0=1; 1+0+1+0+3=5.*

**Example 2:**  
Input: `houses = [2,3,5,12,18]`, `k = 2`  
Output: `9`  
*Explanation: Place at (3) for [2,3,5], and at (15) for [12,18].*

**Example 3:**  
Input: `houses = [7,4,6,1]`, `k = 1`  
Output: `8`  
*Explanation: One mailbox, so pick median for minimal sum: at 6 or 4; total distance = |1-4|+|4-4|+|6-4|+|7-4| = 3+0+2+3 = 8.*

### Thought Process (as if you’re the interviewee)  
- Brute-force: Try every split of houses into k groups and place each mailbox at the optimal position for that group (median). Complexity is exponential.
- Optimize by DP:
  - dp[i][k]: min total distance for first i houses with k mailboxes
  - For each split, try placing the last mailbox between j and i, and calculate median cost.
  - Precompute cost of placing a mailbox for every subarray by median.
  - Fill dp with recurrence: dp[i][k] = min over j < i {dp[j][k-1] + cost[j][i-1]}
  - Space/time optimization by compressing or only storing two rows.
  - Prefer DP with cost precomputation. Trade-offs consider memory and precalculation overhead but gain huge speed vs brute-force.

### Corner cases to consider  
- Single house (houses length = 1)
- K = houses.length (each house gets a mailbox)
- All houses in same position
- Large gaps between houses
- Unsorted house positions (ensure sorted input)

### Solution
```python
# Precompute costs for placing mailbox in each interval
# Use DP to track min cost for each [i][k]

def minDistance(houses, k):
    n = len(houses)
    houses.sort()
    # cost[i][j]: min sum for houses[i..j] with 1 mailbox
    cost = [[0]*n for _ in range(n)]
    for i in range(n):
        for j in range(i, n):
            median = houses[(i+j)//2]
            cost[i][j] = sum(abs(h - median) for h in houses[i:j+1])
    # dp[i][k]: min cost for first i houses, k mailboxes
    dp = [[float('inf')] * (k+1) for _ in range(n+1)]
    dp[0][0] = 0
    for i in range(1, n+1):
        for m in range(1, k+1):
            for j in range(i):
                dp[i][m] = min(dp[i][m], dp[j][m-1] + cost[j][i-1])
    return dp[n][k]
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n³): O(n²) to precompute cost, then O(n²k) for DP. Can be improved with further tricks like monotonic optimization.
- **Space Complexity:** O(n²) for cost matrix, O(nk) for DP table.

### Potential follow-up questions (as if you’re the interviewer)  
- Can you reduce space complexity?
  *Hint: Track only rolling states in DP or compress with 1D arrays.*
- What if houses are not initially sorted?
  *Hint: Always sort houses first - minimal distance relies on order.*
- Can the problem be optimized further for large n, k?
  *Hint: Explore advanced DP optimizations (monotonic queues, Knuth’s optimization).* 

### Summary
This problem exemplifies interval DP and precomputation. The key idea is medians minimize sum of absolute deviations, so group calculations by medians and use DP to track minimal overall costs. This approach appears in problems around optimal partitioning, scheduling, and clustering.


### Flashcard
Use DP where dp[i][k] is min total distance for first i houses with k mailboxes; precompute cost for each group as sum of distances to median, and fill dp by trying all splits.

### Tags
Array(#array), Math(#math), Dynamic Programming(#dynamic-programming), Sorting(#sorting)

### Similar Problems
