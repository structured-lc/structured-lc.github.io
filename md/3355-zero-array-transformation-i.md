### Leetcode 3355 (Medium): Zero Array Transformation I [Practice](https://leetcode.com/problems/zero-array-transformation-i)

### Description  
Given an integer array **nums** of length n, and a list of queries where each query is `[l, r]`, you can (for each query) pick any subset of indices between `l` and `r`, and decrement their value by 1.  
Return **true** if after performing all the queries in order, you can make **every** element in `nums` zero; otherwise return **false**.  
At each query, you are not required to select all indices in the range—just *some* subset (could be empty or all).

### Examples  

**Example 1:**  
Input: `nums = [1,0,1]`, `queries = [[0,2]]`  
Output: `True`  
*Explanation: The query covers indices 0‒2. Select indices 0 and 2; decrement them by 1, resulting in [0,0,0]. All zero, so return True.*

**Example 2:**  
Input: `nums = [4,3,2,1]`, `queries = [[1,3],[0,2]]`  
Output: `True`  
*Explanation:  
- First query [1,3]: You can pick 1,2,3 as needed. To zero things, plan best: perform [1,3] three times for 3,2,1, leaving [4,0,0,0].  
- Second query [0,2]: Pick indices 0, zero it out (needs to run 4 times), ending at [0,0,0,0]. All zero, so True.*

**Example 3:**  
Input: `nums = [1,1,1]`, `queries = [[1,2]]`  
Output: `False`  
*Explanation: The only query covers indices 1–2, but index 0 can never be decremented. After query, index 0 remains 1. So, cannot make array zero. Return False.*

### Thought Process (as if you’re the interviewee)  
Start by considering how to zero each element with the given queries.  
Brute-force: For each query, try all subsets of indices, but this is clearly not scalable (exponential).  
Better: We notice that if some index is completely *uncovered* by the queries, and it's not already 0, it's impossible to zero it.  
How many times does each index get the "opportunity" to be decremented? If we could count how many times each index is covered, in total, across all queries, and if that is < nums[i], it's impossible to zero nums[i]; if it's ≥, it's possible by picking that index in enough queries to match nums[i].  
This is a classic **difference array**/prefix sum scenario—efficiently track how many times each index is covered by intervals.  
So, build a coverage array using difference array logic: for each query [l, r], add 1 at l, subtract 1 at r+1. Prefix sum over the array gives coverage count per index.  
Finally, check: for each index, coverage[i] ≥ nums[i]? If not, return False. Otherwise, return True.

### Corner cases to consider  
- Empty `nums` (should return True trivially).
- Queries that don't cover the entire array.
- Elements in `nums` already zero.
- Multiple queries with overlapping intervals.
- One-element `nums` and empty `queries`.
- nums with negative values (should not occur by constraints, but worth confirming).

### Solution

```python
from typing import List

class Solution:
    def isZeroArray(self, nums: List[int], queries: List[List[int]]) -> bool:
        n = len(nums)
        diff = [0] * (n + 1)  # Difference array for range additions

        for l, r in queries:
            diff[l] += 1
            if r + 1 < n:
                diff[r + 1] -= 1

        cover = [0] * n
        curr = 0
        for i in range(n):
            curr += diff[i]
            cover[i] = curr

        for i in range(n):
            if cover[i] < nums[i]:
                return False
        return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + q), where n = len(nums), q = number of queries. Filling the diff array and prefix sums both take O(n), and processing all queries is O(q).
- **Space Complexity:** O(n), for the diff array and the cover array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if each decrement had to be done **at the same time** for all selected indices in a query (cannot choose subset)?
  *Hint: In each query, all indices in range must be decremented together: is the solution different?*

- If queries can be done **in any order**, does that change the answer?
  *Hint: Does the existence of a solution depend on query order, or is order-independent?*

- How would the solution change if array values can be **negative**?
  *Hint: Consider: can we "over-decrement," and what if negative values are allowed?*

### Summary
We use the **difference array** (also known as prefix-sum range frequency trick) to efficiently count how many times each index can be decremented by queries. We then check whether each value in nums can be reduced to zero with the allowed decrements, achieving an O(n + q) solution. This pattern recurs in range-update/range-query problems, and is especially common in sweep-line and interval coverage scenarios.

### Tags
Array(#array), Prefix Sum(#prefix-sum)

### Similar Problems
- Zero Array Transformation IV(zero-array-transformation-iv) (Medium)