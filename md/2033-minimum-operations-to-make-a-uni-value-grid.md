### Leetcode 2033 (Medium): Minimum Operations to Make a Uni-Value Grid [Practice](https://leetcode.com/problems/minimum-operations-to-make-a-uni-value-grid)

### Description  
You are given a 2D grid of integers and an integer x. In one operation, you can add or subtract x to any grid cell. Your task is to make all grid cells have the same value (a uni-value grid) using as few operations as possible. If it's impossible (because some values can never be made equal due to x), return -1.

### Examples  

**Example 1:**  
Input: `grid = [[2,4],[6,8]]`, `x = 2`  
Output: `4`  
*Explanation: All numbers can be made equal to 4:  
2 → 4 (1 operation),  
6 → 4 (1 operation),  
8 → 4 (2 operations).  
Total = 4.*

**Example 2:**  
Input: `grid = [[1,5],[2,3]]`, `x = 1`  
Output: `5`  
*Explanation: All numbers can be made equal to 3:  
1 → 3 (2 steps), 2 → 3 (1 step), 5 → 3 (2 steps).  
Total = 5.*

**Example 3:**  
Input: `grid = [[1,2],[3,4]]`, `x = 2`  
Output: `-1`  
*Explanation: 2 minus 1 = 1, which is not divisible by 2, so it's impossible for all to meet at a single value.*

### Thought Process (as if you’re the interviewee)  

- **Naive Brute Force:**  
  Try all possible uni-values in the grid, compute how many operations to convert each cell, and pick the minimum. However, this is slow (too many options).

- **Key Insight:**  
  For any two values a and b, (a - b) must be divisible by x for it to be possible (the “meeting” value must be reachable with steps of size x).  
  So first flatten the grid and check that all differences with the first value are divisible by x. If not, return -1.

- **Optimization (Median Trick):**  
  Once it's possible, the minimum operations are achieved by moving all values to the median (after mapping all values as “distance in units of x”).  
  1. Flatten and check modulo.  
  2. Convert each cell to “units of x” from a base, i.e., (cell - base) // x.  
  3. For all units, count the minimum steps to the median unit.

- **Why this works:**  
  Choosing the median minimizes the sum of absolute differences, which fits our cost function (minimize total operations).

### Corner cases to consider  
- grid with only one element  
- all elements already equal  
- grid with negative numbers  
- x larger than any possible gap  
- grid cells with differences not divisible by x (impossible case)  
- empty grid (should not occur per constraints, but guard in code)


### Solution

```python
def minOperations(grid, x):
    # Flatten the grid to a list for easy processing
    nums = []
    for row in grid:
        for num in row:
            nums.append(num)

    # Use first number as reference
    base = nums[0]
    # Check if all values can be made equal by x-steps
    for num in nums:
        if (num - base) % x != 0:
            return -1

    # Compute all values as "number of x-steps from base"
    steps = [(num - base) // x for num in nums]
    # Find median step
    steps.sort()
    n = len(steps)
    median = steps[n // 2]

    # Sum absolute distances to median (minimize total moves)
    op_count = sum(abs(step - median) for step in steps)
    return op_count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(mn log(mn))  
  Flatten takes O(mn), checking divisibility O(mn), sorting O(mn log(mn)), overall dominated by sorting.
- **Space Complexity:** O(mn)  
  For the flattened list and steps list. No extra structures used beyond input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the grid is extremely large? How can you optimize space?
  *Hint: Could you avoid storing the flattened grid?*

- Suppose you are only allowed to minimize the maximum operation on any cell, not the total sum?
  *Hint: How does the objective function change (max instead of sum of abs diffs)?*

- Can you generalize this solution for more flexible transforms, e.g., multiply/divide by y?
  *Hint: How does the divisible check or optimal meeting point change?*

### Summary
This is a classic “meeting at the median” pattern for minimizing L₁ distances. We use a mathematical preprocessing step (divisibility/modulo check) followed by reducing the problem to minimizing total moves to the median in a 1D list of step units. This coding pattern applies to many “minimum moves to equalize array/grid” problems with constant step costs.