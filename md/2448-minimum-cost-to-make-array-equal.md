### Leetcode 2448 (Hard): Minimum Cost to Make Array Equal [Practice](https://leetcode.com/problems/minimum-cost-to-make-array-equal)

### Description  
Given two integer arrays, **nums** and **cost**, both of length n, you can perform any number of increment or decrement operations on the elements of **nums**. Changing nums[i] by 1 costs cost[i]. Your goal is to make all elements of **nums** equal, using any number of such operations, at the minimum total cost.  
Return the minimum cost required.

### Examples  

**Example 1:**  
Input: `nums=[1,3,5,2], cost=[2,3,1,14]`  
Output: `8`  
*Explanation: The minimum cost is achieved by making all elements equal to 2.  
Cost = |1-2|×2 + |3-2|×3 + |5-2|×1 + |2-2|×14 = 2×1 + 3×1 + 1×3 + 0×14 = 2 + 3 + 3 + 0 = 8.*

**Example 2:**  
Input: `nums=[2,2,2], cost=[4,2,8]`  
Output: `0`  
*Explanation: All elements are already equal. No operations are needed, so the cost is 0.*

**Example 3:**  
Input: `nums=[1,2,3], cost=[10,100,1000]`  
Output: `120`  
*Explanation: Making all elements equal to 2:
Cost = |1-2|×10 + |2-2|×100 + |3-2|×1000 = 10 + 0 + 1000 = 1010.
But making all equal to 3:
Cost = |1-3|×10 + |2-3|×100 + |3-3|×1000 = 20 + 100 + 0 = 120.
So, making all elements equal to 3 costs less.*

### Thought Process (as if you’re the interviewee)  

- Consider a **brute-force approach**: For each possible target \(k\) between min(nums) and max(nums), calculate the total cost to make every nums[i] equal to k with its per-step cost. Pick the k with minimum total cost. This takes O((max-min) \* n) — not feasible for large ranges.
- Notice that the cost function is **convex**: as k increases, the cost first decreases then increases. We can use properties of convexity to optimize.
- Since changing an element by 1 costs cost[i], the total cost for a target k is sum over i of |nums[i] - k| × cost[i].
- The problem is similar to "weighted median": the optimal target should be the value where the cumulative cost weight crosses half the total cost.
- **Efficient solution**: Pair nums with costs, sort them, and compute prefix sums. Move towards the weighted median, or use binary search (ternary search or similar works because of convex function). For any k=\(nums[i]\), we can compute the cost using prefix sums, which gets us O(n log n).
- This approach is preferred for performance and correctness.

### Corner cases to consider  
- Empty input arrays (not allowed by constraints but should return 0 or raise error).
- All nums already equal: cost should be 0.
- cost contains very large or very small numbers.
- nums contains negative, zero, or very large numbers.
- Many nums, but all costs zero (should be 0).
- cost contains zeros (those elements can be changed freely).
- nums has duplicates and/or costs have duplicates.

### Solution

```python
def minCost(nums, cost):
    # Pair nums and cost together and sort by nums
    arr = sorted(zip(nums, cost))
    nums_sorted = [x for x, _ in arr]
    cost_sorted = [y for _, y in arr]
    n = len(nums)
    
    # Find the total weight (total cost sum)
    total = sum(cost_sorted)
    
    # Find weighted median: cumulative sum crosses half of total
    acc = 0
    median = 0
    for i, c in enumerate(cost_sorted):
        acc += c
        if acc >= (total + 1) // 2:
            median = nums_sorted[i]
            break
            
    # Compute total cost to make all nums equal to weighted median
    res = 0
    for i in range(n):
        res += abs(nums[i] - median) * cost[i]
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)   
  Sorting nums and cost dominates. Prefix and cumulative computation is O(n).
- **Space Complexity:** O(n)  
  For holding the sorted array and related lists.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the cost is the same for each index?  
  *Hint: The answer reduces to finding the median of nums (classic median minimization).*

- Can you handle real numbers instead of integers for nums?  
  *Hint: Weighted median can be on any real number, but cost function convexity still applies.*

- How would you return all possible k that could achieve minimum cost?  
  *Hint: There may be more than one k where the cumulative weight crosses half. Return the range.*

### Summary
This problem is a **weighted median** application, which appears in scenarios where the optimal shared value minimizes a cost-weighted distance sum.  
The process leverages sorting with prefix sums and cumulative logic, a common and powerful coding interview pattern for minimizing costs or distances with per-element weights.  
This pattern is highly reusable in other problems involving total cost minimization with weighted moves, like minimizing array move costs, fair schedules, or equitable distributions.