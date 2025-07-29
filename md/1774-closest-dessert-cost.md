### Leetcode 1774 (Medium): Closest Dessert Cost [Practice](https://leetcode.com/problems/closest-dessert-cost)

### Description  
Given arrays of base dessert costs and topping costs, the goal is to build a dessert by choosing **exactly one base**, and for each topping, you can use 0, 1, or 2 units of it. The objective is to create a dessert whose **total cost is as close as possible** to the target value. If multiple costs are equally close, choose the lower cost.  
For each topping, you can either not use it, use it once, or use it twice.

### Examples  

**Example 1:**  
Input: `baseCosts = [1,7], toppingCosts = [3,4], target = 10`  
Output: `10`  
*Explanation: Use base 7 and topping 3 (once): 7 + 3 = 10. That matches the target exactly.*

**Example 2:**  
Input: `baseCosts = [2,3], toppingCosts = [4,5,100], target = 18`  
Output: `17`  
*Explanation: Use base 3, topping 4 (once), topping 5 (twice): 3 + 4 + 10 = 17. Closest possible to 18, can't reach 18 exactly. 17 is closer than 20, and lower if equidistant.*

**Example 3:**  
Input: `baseCosts = [3,10], toppingCosts = [2,5], target = 9`  
Output: `8`  
*Explanation: Use base 3 and topping 5 (once): 3 + 5 = 8. Or use base 10+0 toppings = 10. 8 and 10 are both 1 away from 9, pick the lower: 8.*

### Thought Process (as if you’re the interviewee)  
Start by noting only **one base** is selected, and each topping is chosen 0-2 times.  
A brute-force approach would generate all possible topping combinations (3ᵐ, where m = length of toppingCosts) for each base, sum the total cost, and check the absolute difference from target. Maintain the closest answer (breaking ties by lower cost).  
This is feasible when m is small (up to about 10), so brute-force/backtracking is acceptable.  
Optimize by  
- Using DFS/backtracking to enumerate topping choices per base.
- Pruning: Stop exploring if cost far exceeds target + current best distance.  
This covers all valid combinations, ensuring the lowest cost if multiple are equally close to target.  
If m is much larger, would need further optimizations like DP or memoization, but for m≤10, backtracking is optimal for code clarity and correctness.

### Corner cases to consider  
- Only one base or one topping.
- No toppings at all (so dessert = base cost).
- All base costs larger than target.
- All topping costs are much larger than target.
- Multiple desserts have the same minimum distance to target (choose the lower cost).
- Topping costs empty (can't add any toppings).
- Target is lower than all possible costs.

### Solution

```python
def closestDessertCost(baseCosts, toppingCosts, target):
    closest = min(baseCosts)  # Start with minimal base
    min_diff = abs(closest - target)
    
    # Helper: Explore all topping combinations for current base.
    def dfs(idx, curr_sum):
        nonlocal closest, min_diff
        # Update result if current combination is better
        curr_diff = abs(curr_sum - target)
        if curr_diff < min_diff or (curr_diff == min_diff and curr_sum < closest):
            closest = curr_sum
            min_diff = curr_diff

        # If all toppings considered, stop.
        if idx == len(toppingCosts):
            return
        
        # Three choices: 0, 1, or 2 of this topping
        for count in range(3):
            next_sum = curr_sum + toppingCosts[idx]*count
            dfs(idx+1, next_sum)

    # Try every base; for each, DFS through topping choices
    for base in baseCosts:
        dfs(0, base)
    return closest
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × 3ᵐ), where n = number of bases and m = number of toppings. For each base, we try all topping combinations (3 choices per topping).
- **Space Complexity:** O(m) for recursion stack during DFS (max depth = number of toppings).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could use each topping unlimited times (not just up to 2)?
  *Hint: DP or using a set to track possible sums is useful.*

- What if there are constraints to minimize exceeding the target, i.e., never to pay more if possible?
  *Hint: Prune paths exceeding the target early when searching for an exact or under-target answer.*

- What changes if baseCosts or toppingCosts can be negative or zero?
  *Hint: Validate negative or zero values and check how it impacts closest calculation and tie breaker rules.*

### Summary
This problem leverages the classic **backtracking subset-sum** pattern, as for each topping we try three choices (0, 1, 2 per topping).  
This “generate all combinations and select the closest” approach is common for problems with small branching factors and bounded set sizes, and can also be used for classic subset sum or combinations problems when the total number of combinations is manageable.