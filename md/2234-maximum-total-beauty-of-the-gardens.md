### Leetcode 2234 (Hard): Maximum Total Beauty of the Gardens [Practice](https://leetcode.com/problems/maximum-total-beauty-of-the-gardens)

### Description  
Alice is managing **n** gardens, each with an initial number of flowers given in the array `flowers`. She can plant at most `newFlowers` extra flowers overall (distributed as she likes across gardens). A garden is "complete" if it has at least `target` flowers. The **total beauty** is computed as:

- (number of complete gardens) × full
- plus (minimum flowers among all incomplete gardens) × partial (if at least one incomplete garden exists; otherwise, add 0).

Alice wants to maximize the total beauty after planting at most `newFlowers` flowers.

### Examples  

**Example 1:**  
Input: `flowers = [2,4,5,3], newFlowers = 10, target = 5, full = 2, partial = 6`  
Output: `30`  
*Explanation:  
- Alice plants 3 in garden 0, 0 in garden 1, 0 in garden 2, 2 in garden 3: final = [5,4,5,5]  
- 3 gardens are complete (gardens 0,2,3).  
- One incomplete garden (garden 1) has 4 flowers (minimum among incomplete).  
- Beauty = 3 × 2 + 4 × 6 = 6 + 24 = 30.  
- If she makes all gardens complete, she gets lower beauty (4 × 2 = 8 < 30).*

**Example 2:**  
Input: `flowers = [1,2,3], newFlowers = 3, target = 4, full = 5, partial = 2`  
Output: `11`  
*Explanation:  
- Use 3 flowers (e.g. 3rd garden: +1, 2nd: +1, 1st: +1) → [2,3,4] or make only 3rd complete.  
- Best: [2,3,4]. 1 complete garden, rest have 2,3 flowers.  
- min of incomplete = 2.  
- Beauty = 1 × 5 + 2 × 2 = 5 + 4 = 9.  
- Alternatively, make 1st garden complete and rest up as high as possible → [4,3,3]: 1 complete, incomplete min = 3.  
- Beauty = 1 × 5 + 3 × 2 = 5 + 6 = 11 (higher, so output is 11).*

**Example 3:**  
Input: `flowers = [5,5,5,5], newFlowers = 0, target = 5, full = 10, partial = 1`  
Output: `40`  
*Explanation:  
- All are already complete.  
- No incomplete.  
- Beauty = 4 × 10 = 40.*

### Thought Process (as if you’re the interviewee)  
Starting brute-force:  
- Try every distribution of `newFlowers` over `n` gardens — not feasible (exponential).  

Optimizing:  
- Since only the min of incomplete gardens matters, and "completeness" is at `target`, let's 
  - Sort `flowers`
  - For each possible number `x` of complete gardens (from 0 to n):
    - Use flowers to make last `x` gardens complete (`flowers[-x:]` ≥ target).
    - Calculate flowers left, fill incomplete gardens as high as possible (up to `target - 1` per), to **maximize their minimum**.
    - For each choice, compute total beauty: `x × full + min_incomplete × partial`.

Key optimizations:
- Use sorting for efficient computations.
- Use prefix sums for quick flower counting.
- Use binary search to maximize minimum among incomplete by distributing remaining flowers.

Main trade-off:  
- Time efficiency (O(n log n) sorts/binary search rather than brute force), and correctness by iterating possible complete garden counts and optimizing the incomplete ones at each step.

### Corner cases to consider  
- All gardens already complete.
- No newFlowers.
- target = 1 (all gardens instantly complete, so partial score never counts).
- full = 0, partial = 0.
- Only one garden.
- All but one garden are complete.
- Large `newFlowers`, enough to make all complete (then partial score = 0).
- No incomplete gardens (so add 0 to partial).

### Solution

```python
def maximumBeauty(flowers, newFlowers, target, full, partial):
    n = len(flowers)
    # Cap all values at target (no point in exceeding)
    A = [min(x, target) for x in flowers]
    A.sort()
    # Early exit: if all are already complete
    if A[0] >= target:
        return full * n
    
    # Prefix sum for quick flower counting
    presum = [0]
    for v in A:
        presum.append(presum[-1] + v)
        
    max_beauty = 0
    
    # Try for x = 0 (none complete) up to n (all complete)
    # done = how many complete from back
    # i runs from n down to 0
    complete_gardens = 0
    for complete_gardens in range(n + 1):
        # Cost to complete last `complete_gardens`
        need = 0
        if complete_gardens > 0:
            need = max(0, target * complete_gardens - sum(A[-complete_gardens:]))
        if need > newFlowers:
            break
        rest = newFlowers - need
        
        # For incomplete: A[:n-complete_gardens]
        if n - complete_gardens == 0:
            # All complete, partial = 0
            max_beauty = max(max_beauty, full * complete_gardens)
            continue
        # Binary search maximum min(x) we can achieve, x < target
        l, r = A[0], target - 1
        while l < r:
            mid = (l + r + 1) // 2
            # Cost to bring all incomplete gardens up to mid
            idx = n - complete_gardens
            cost = mid * idx - presum[idx]
            if cost <= rest:
                l = mid
            else:
                r = mid - 1
        total = full * complete_gardens + l * partial
        max_beauty = max(max_beauty, total)
    return max_beauty
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) (sort) + O(n log target) (for each possible number of complete gardens (n), binary search up to target per case)
- **Space Complexity:** O(n) for arrays and prefix sums

### Potential follow-up questions (as if you’re the interviewer)  

- What if partial or full scores are negative?  
  *Hint: Is the strategy still always valid? What if it’s optimal to avoid making a garden complete?*

- How would you optimize if target or flower values can exceed 10⁹?  
  *Hint: Does the current approach scale with very large values, or only with sorting?*

- Can you output the actual distribution of new flowers (not just the max beauty)?  
  *Hint: How would you reconstruct the planting plan?*

### Summary
This approach uses **greedy reasoning + sorting + binary search** (a common combo for maximizing statistics under constraints). It mirrors patterns like "maximize minimum" with fixed resources, which is recurrent in resource allocation and "minimizing the maximum" problems (e.g., LeetCode 1283, 875). The technique of prefix sums plus binary search for value upgrade under budget is also broadly applicable.