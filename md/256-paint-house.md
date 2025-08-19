### Leetcode 256 (Medium): Paint House [Practice](https://leetcode.com/problems/paint-house)

### Description  
Given a list of n houses, each can be painted one of three colors: red, blue, or green. Each house i has a cost associated with painting it each color, given as costs[i][j] where j = 0 (red), 1 (blue), 2 (green).  
**Constraint:** No two adjacent houses can have the same color.  
**Goal:** Find the minimum total cost to paint all houses.


### Examples  

**Example 1:**  
Input: `costs = [[17,2,17], [16,16,5], [14,3,19]]`  
Output: `10`  
*Explanation: Paint house₀ blue (2), house₁ green (5), house₂ blue (3). Total = 2 + 5 + 3 = 10.*

**Example 2:**  
Input: `costs = []`  
Output: `0`  
*Explanation: No houses, so total cost is 0.*

**Example 3:**  
Input: `costs = [[7,6,2]]`  
Output: `2`  
*Explanation: Only one house. Minimum cost = 2 (green).*


### Thought Process (as if you’re the interviewee)  

- **Brute-force approach:**  
  Try every combination of colors for each house, making sure no two adjacent houses use the same color. For n houses, each with 3 color choices, the number of possibilities is 3ⁿ. This is not practical for n up to 100.

- **DP approach:**  
  Notice the overlapping subproblems: The choice for houseₖ depends only on which color you chose for houseₖ₋₁.  
  - Define dp[i][j] as the min cost to paint houses up to i, where houseᵢ has color j.
  - Recurrence:  
    dp[i][j] = costs[i][j] + min(dp[i-1][k]) for all k ≠ j
  - Base case: dp[j] = costs[j]

- **Space optimization:**  
  Since each dp[i][*] depends only on dp[i-1][*], we can keep just one rolling array of size 3.

- **Trade-off:**  
  - Brute-force: Exponential time, not feasible.
  - DP: Linear time and space (can optimize to O(1) space), works for all practical inputs.


### Corner cases to consider  
- No houses: costs = [], expect 0.
- All costs are equal.
- Only one house.
- Large costs.
- All costs for one color are much larger than the others.
- Input length mismatch or missing rows (not valid per constraints).


### Solution

```python
def minCost(costs):
    if not costs:
        return 0

    # Initialize cost of painting last house with each color
    prev_r, prev_b, prev_g = costs[0]

    # For each subsequent house
    for i in range(1, len(costs)):
        r = costs[i][0] + min(prev_b, prev_g)
        b = costs[i][1] + min(prev_r, prev_g)
        g = costs[i][2] + min(prev_r, prev_b)
        prev_r, prev_b, prev_g = r, b, g

    # Minimum cost to paint all houses
    return min(prev_r, prev_b, prev_g)
```


### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - We visit each house once, and for each house, compute 3 values (constant time).  
- **Space Complexity:** O(1)  
  - We use only variables to keep previous results (no extra arrays).


### Potential follow-up questions (as if you’re the interviewer)  

- If there are k colors instead of 3, how would you adapt the solution?  
  *Hint: Use a dp array of size k. For each color, take min(dp[i-1][other_color]) as transition.*

- Can you reconstruct the color sequence, not just the min cost?  
  *Hint: Track the choice (color index) for each house via a parent array.*

- What if painting a house the same color as two houses before (i-2) is also not allowed?  
  *Hint: The DP transition needs to track colors for previous two houses.*


### Summary

This problem uses the **dynamic programming** pattern, similar to "House Robber" and "Delete and Earn". The key is modeling overlapping subproblems and optimizing via rolling arrays for space.  
The space-optimized DP technique here can be applied to other problems requiring consecutive-element constraints, such as "Sticker Robber" and "Minimum Falling Path Sum".

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- House Robber(house-robber) (Medium)
- House Robber II(house-robber-ii) (Medium)
- Paint House II(paint-house-ii) (Hard)
- Paint Fence(paint-fence) (Medium)
- Minimum Path Cost in a Grid(minimum-path-cost-in-a-grid) (Medium)