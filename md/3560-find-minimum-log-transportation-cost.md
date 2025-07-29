### Leetcode 3560 (Easy): Find Minimum Log Transportation Cost [Practice](https://leetcode.com/problems/find-minimum-log-transportation-cost/)

### Description  
You're given three integers: **n**, **m**, **k**—the lengths of two logs (**n** and **m**) and the maximum log length (**k**) one truck can carry.  
There are **three trucks**. Each truck can carry *one* log of at most **k** units.  
You may cut logs into smaller pieces, and **each cut** costs (length₁ × length₂) where length₁ + length₂ = cut log length.  
Find the **minimum total cutting cost** to distribute the logs into the three trucks such that every log fits, or **0** if no cuts are needed.

### Examples  

**Example 1:**  
Input: `n = 6, m = 5, k = 5`  
Output: `5`  
*Explanation: Cut the log of 6 into [1, 5]. Cutting cost is 1×5 = 5. Now the three logs are [1, 5, 5], all fit (≤5).*

**Example 2:**  
Input: `n = 4, m = 4, k = 6`  
Output: `0`  
*Explanation: Both logs (4, 4) ≤ 6. No cuts needed, cost = 0.*

**Example 3:**  
Input: `n = 7, m = 6, k = 5`  
Output: `6`  
*Explanation:  
- Cut 7 into [2, 5] (cost: 2×5 = 10), [2, 5, 6]—but 6 > 5, so need to cut 6.  
- Better: Cut 6 into [1, 5] (cost: 1×5 = 5), and 7 into [2, 5] (cost: 2×5 = 10), get [2, 5, 1, 5]. But we only need three trucks, so best is:  
- Cut 7 into [5, 2] (cost: 10), use 5, 2, 6—but 6 is still too big.  
- Cut 6 into [5, 1] (cost: 5), use 5, 1, 7—but 7 > 5.  
- So try: Cut both: n=7-> [5,2] (cost 10), m=6-> [5,1] (cost 5), now [5,2,5,1], pick three logs ≤5: 5,5,2 (possible).  
- Minimum total cost = 5 (from 6 into 5,1), then three logs: 5,1,7, but 7 doesn't fit, so best splitting is both logs cut: total cost = 10+5=15, but three logs would be 5,5,2, which all fit.  
- But we only need three logs, smallest cost is cutting log 6 to 5,1 (cost 5), then using 5,1,7 (7 too large). Best is cut 7 into [4,3] (4×3=12), now 3,4,6. Cut 6 to [5,1]: (cost 5), so [5,1,3,4]. Pick 5,3,4 (all ≤5).  
But minimum cost is actually 6 by splitting 6 into 3,3 (cost 9), try all possible splits—(leaving as is, needs full code for min cost; see implementation).*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Try all possible ways to cut each log so that each resulting piece ≤ k, and exactly three pieces in total. For each way, calculate the total cost.
- **Optimization:** Since n, m, k are all ≤ 20 (from constraints), the number of possible ways to cut each log is small. We can try all splits for both logs.
- For a log of length L, if L ≤ k, don’t cut. If not, try all possible splits into two pieces (i from 1 to L-1), each cut costing i × (L−i), and recursively split further if necessary.
- Since each truck must carry one log, in the end, we need exactly three pieces, each ≤ k, and all obtained via minimal cost cuts.
- We can try: Cut one log into two, no cuts on the other; or cut both logs, or no cuts at all.
- Choose the approach that gives the **minimum cost**.

### Corner cases to consider  
- Both logs already fit (n ≤ k and m ≤ k).
- The only way is to cut both logs.
- Multiple ways to cut, choosing the cheapest.
- One log just exceeds k by 1.
- k at lower bound (k = 2).
- Max possible sizes (n = m = 2×k).
- Avoid cuts creating a piece > k.
- Not possible to distribute? (The constraint says always possible.)

### Solution

```python
def findMinimumCost(n, m, k):
    # If both logs can fit, no cuts needed
    if n <= k and m <= k:
        return 0

    res = float('inf')
    # Try: cut n into two, so total 3 logs with m
    for i in range(1, n):
        len1, len2 = i, n - i
        if max(len1, len2, m) <= k:
            cost = len1 * len2
            res = min(res, cost)
    # Try: cut m into two, so total 3 logs with n
    for i in range(1, m):
        len1, len2 = i, m - i
        if max(len1, len2, n) <= k:
            cost = len1 * len2
            res = min(res, cost)
    # Try: cut both into two, so we get four pieces, pick any three (all ≤ k)
    cuts_n = []
    for i in range(1, n):
        l1, l2 = i, n - i
        if l1 <= k and l2 <= k:
            cuts_n.append((l1, l2, i * (n - i)))
    cuts_m = []
    for i in range(1, m):
        l1, l2 = i, m - i
        if l1 <= k and l2 <= k:
            cuts_m.append((l1, l2, i * (m - i)))
    for l1n, l2n, costn in cuts_n:
        for l1m, l2m, costm in cuts_m:
            logs = [l1n, l2n, l1m, l2m]
            # Select any 3 logs ≤ k
            from itertools import combinations
            for comb in combinations(logs, 3):
                if max(comb) <= k:
                    res = min(res, costn + costm)
    # By constraints, answer always exists
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k) for each single log split, and O(k²) for double cut case (trying all pairs). Since k ≤ 20, total work is very manageable.
- **Space Complexity:** O(k) to store all splits for each log, overall O(k²) in combined case. But all temp, can be considered O(1) as k's small.

### Potential follow-up questions (as if you’re the interviewer)  

- What if each truck could carry multiple logs, not just one?  
  *Hint: Consider the bin packing or greedy strategies.*

- If the cost to cut is not length₁ × length₂ but something else (e.g., abs(length₁ − length₂)), how would the algorithm change?  
  *Hint: Adapt the cost function and optimize accordingly.*

- What if you had more logs or more trucks (generalization)?  
  *Hint: Consider dynamic programming or recursive partitioning.*

### Summary
This problem tests smart enumeration of possible cuts and combinatorial search to achieve a **minimal cost split**. It uses an **exhaustive search (brute-force) within well-bounded constraints**, which is common in interview problems with small fixed ranges. Patterns here apply to cut-splitting/partitioning, and are also relevant in **bin-packing** and **multiset selection** tasks.