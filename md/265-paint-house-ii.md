### Leetcode 265 (Hard): Paint House II [Practice](https://leetcode.com/problems/paint-house-ii)

### Description  
Given *n* houses and *k* colors, you're given a matrix `costs` where `costs[i][j]` is the cost of painting the iᵗʰ house with the jᵗʰ color.  
You must paint every house such that **no two adjacent houses have the same color**, and your goal is to **minimize the total painting cost**.  
Return the minimal total cost.

### Examples  

**Example 1:**  
Input: `costs = [[1,5,3],[2,9,4]]`  
Output: `5`  
*Explanation: House 0: color 0 (cost 1), House 1: color 2 (cost 4), total = 1 + 4 = 5.*

**Example 2:**  
Input: `costs = [[1,3],[2,4]]`  
Output: `5`  
*Explanation: House 0: color 0 (cost 1), House 1: color 1 (cost 4), total = 1 + 4 = 5.*

**Example 3:**  
Input: `costs = [[1]]`  
Output: `1`  
*Explanation: Only one house and one color, select it, total = 1.*

### Thought Process (as if you’re the interviewee)  
Let's start with the brute-force approach:  
- For each house, try every color, while making sure not to repeat the color of the previous house.
- For each possibility, recursively move to the next house and accumulate costs.
- This leads to a time complexity of O(kⁿ), which is only feasible for very small *n*.

To improve, we can use **dynamic programming**.  
Idea:  
- Let `dp[i][j]` be the minimum cost to paint house *i* with color *j*.
- For each `dp[i][j]`, add `costs[i][j]` to the minimum of all costs to paint the previous house using a different color:  
  `dp[i][j] = costs[i][j] + min(dp[i-1][p] for all p ≠ j)`

If we do this naively, it's O(n × k²).  
**Further optimization**: For each row, track the smallest and second smallest costs from the previous row (and their color indices).  
- If the color is different from the min-color, use the min value; if it's the same, use the second-min value.
- This reduces the complexity to O(n × k).

This approach has optimal time complexity and is easy to implement.

### Corner cases to consider  
- Empty input: costs = []
- Only one house, one color
- Only two houses, but more than two colors
- All costs are equal
- n = 1, k > 1
- k = 2 (must alternate colors)
- Large *n* with k = 2

### Solution

```python
def minCostII(costs):
    if not costs:
        return 0
    n, k = len(costs), len(costs[0])
    prev_min = prev_second_min = 0
    prev_min_idx = -1

    for i in range(n):
        curr_min = curr_second_min = float('inf')
        curr_min_idx = -1
        for j in range(k):
            # If using the same color as last house's min, use second min; else, use min
            cost = costs[i][j] + (prev_second_min if j == prev_min_idx else prev_min)
            # Update current row for next iteration
            if cost < curr_min:
                curr_second_min = curr_min
                curr_min = cost
                curr_min_idx = j
            elif cost < curr_second_min:
                curr_second_min = cost
        prev_min = curr_min
        prev_second_min = curr_second_min
        prev_min_idx = curr_min_idx
    return prev_min
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k), as for each house and each color, we do only constant-time updates thanks to tracking min and second min.
- **Space Complexity:** O(1) extra space, since we only keep track of min/second min per row, discarding previous rows (if in-place). Input space: O(n×k).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you wanted to reconstruct the actual assignment of colors to houses?
  *Hint: You'd need to track the path, not just the min cost.*

- How would your solution change if k could be very large (e.g., thousands)?
  *Hint: You may have to optimize finding min/second-min, perhaps with a data structure.*

- Can you solve it in-place without additional memory?
  *Hint: You can update the costs matrix itself.*

### Summary  
The solution uses a **dynamic programming** pattern, with space optimization by storing only the needed information from the previous row. This is a classic **row-by-row DP** with memory tweaks, commonly seen in grid problems and optimization with "previous row"/"current row" rolling arrays. The min/second-min trick is useful in any scenario where repetitive computations of min excluding a particular value are needed.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Product of Array Except Self(product-of-array-except-self) (Medium)
- Sliding Window Maximum(sliding-window-maximum) (Hard)
- Paint House(paint-house) (Medium)
- Paint Fence(paint-fence) (Medium)