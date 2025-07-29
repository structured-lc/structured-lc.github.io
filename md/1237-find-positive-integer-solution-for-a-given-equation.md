### Leetcode 1237 (Medium): Find Positive Integer Solution for a Given Equation [Practice](https://leetcode.com/problems/find-positive-integer-solution-for-a-given-equation)

### Description  
Given a special callable function `f(x, y)` (whose formula is *hidden*), and a target positive integer `z`, your task is to find **all positive integer pairs** (x, y) such that `f(x, y) == z`.  
The only information you're given about `f` is:
- `f` is **monotonically increasing** in both arguments.  
  That is, increasing x or y always increases f(x, y):  
  - f(x, y) < f(x+1, y)
  - f(x, y) < f(x, y+1)

You can only use the provided `f` interface (not the formula directly) to test values.

### Examples  

**Example 1:**  
Input: `f(x, y)` (hidden, monotonic), z=5  
Output: `[[1,4], [2,3], [3,2], [4,1]]`  
*Explanation: If f(x, y) = x + y (one possible function), all pairs of positive integers that sum to 5.*

**Example 2:**  
Input: `f(x, y)` (hidden, monotonic), z=9  
Output: `[[1,8], [2,7], [3,6], [4,5], [5,4], [6,3], [7,2], [8,1]]`  
*Explanation: Again, if f(x, y) = x + y.*

**Example 3:**  
Input: `f(x, y)` (hidden, monotonic), z=11  
Output: `[[2,3]]`  
*Explanation: If f(x, y) = x * y, only (2,3) and (3,2) for f(x, y) = 6 don’t fit, but for 11, (1,11) and (11,1) if possible.*

### Thought Process (as if you’re the interviewee)  

First, I need to find all (x, y) with 1 ≤ x, y ≤ some upper limit, such that f(x, y) == z.

- **Brute-force idea:**  
  Try all reasonable x, y in the range 1 to, say, 1000 (since the problem often says x, y ≤ 1000), call f(x, y) for every pair, and collect those where f(x, y) == z.
  - Very inefficient: Up to 10⁶ calls even for small ranges.

- **Use monotonicity:**  
  Since f is monotonically increasing in both x and y:
  - Fix x, and for each x, Y can only *decrease* as x increases (for a given z).
  - Given that, I can use a **two pointers** approach:
    - Set x = 1, y = upper bound (e.g., 1000).
    - While x ≤ 1000 and y ≥ 1:
      1. Compute val = f(x, y)
      2. If val == z, record (x, y), then move both pointers (since increasing x or decreasing y will not find a duplicate).
      3. If val < z, increment x (increase val).
      4. If val > z, decrement y (decrease val).

- **Why two pointers work:**  
  Because of monotonicity, if f(x, y) < z, increasing x will make f bigger; if f(x, y) > z, decreasing y will make f smaller. This is similar to searching for a value in a sorted 2D matrix.

- **Trade-off:**  
  Reduces calls from O(n²) to O(n), much more efficient for interviewer to accept.

### Corner cases to consider  
- No solution exists for any (x, y) such that f(x, y) == z.
- Multiple solutions with different (x, y) pairs.
- Only one solution (e.g., small z).
- f(x, y) returns big numbers, overflow concern (handle whatever custom function allows).
- Unusual monotonic functions, e.g. f(x, y) = x² + y² (still monotonic).
- Do not check negative or zero values for x or y.

### Solution

```python
# This solution uses the two pointers method leveraging monotonicity.
# 'customfunction' is an object with method .f(x, y) that takes two positive ints.

# For the real LeetCode problem, the signature is:
# class Solution:
#     def findSolution(self, customfunction: 'CustomFunction', z: int) -> List[List[int]]:

def findSolution(customfunction, z):
    results = []
    x, y = 1, 1000  # Per problem, x, y ≤ 1000
    while x <= 1000 and y >= 1:
        val = customfunction.f(x, y)
        if val == z:
            results.append([x, y])
            x += 1
            y -= 1
        elif val < z:
            x += 1
        else:
            y -= 1
    return results
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(N), where N is the upper bound for x or y (here, N = 1000). Each movement of either x or y reduces the search space; at most, 2N steps are performed.
- **Space Complexity:**  
  O(K), where K is the number of solutions found, since only the answer list is stored. Otherwise, constant extra space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if `f` was **not** monotonic?
  *Hint: Would brute-force or enumeration be the only way? Can you optimize with extra info?*

- What if the allowed domain was **much larger** (e.g., up to 1e9)?
  *Hint: Can you use binary search instead of two pointers due to monotonicity?*

- What if you can **batch** or **cache** calls to `f(x, y)` to minimize interaction cost?
  *Hint: Any strategy using memoization or parallel queries?*

### Summary
This problem is a **matrix search** or **two-pointer monotonic search** pattern, commonly used when working with strictly increasing/decreasing 2D or sorted arrays. The ability to cut the search space efficiently comes from leveraging the monotonicity of the function. This approach generalizes to problems like searching in a sorted matrix, and can be adapted for more complex binary search in similar “hidden function” settings.