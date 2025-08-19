### Leetcode 1387 (Medium): Sort Integers by The Power Value [Practice](https://leetcode.com/problems/sort-integers-by-the-power-value)

### Description  
Given integers **lo**, **hi**, and **k**, return the kᵗʰ integer in the range [lo, hi] sorted by "power value". The power value of an integer x is the number of steps to transform x to 1 using:
- If x is even, x = x / 2
- If x is odd, x = 3 × x + 1
- Repeat until x == 1. Sort numbers first by power value, breaking ties by natural order. Find the kᵗʰ such number.

### Examples  
**Example 1:**  
Input: `lo=12, hi=15, k=2`  
Output: `13`  
*Explanation: Powers are: 12→9, 13→9, 14→17, 15→17. Sorted: [12, 13, 14, 15]. Second is 13.*

**Example 2:**  
Input: `lo=7, hi=11, k=4`  
Output: `9`  
*Explanation: Compute power values, sort, and return the 4ᵗʰ number.*

**Example 3:**  
Input: `lo=1, hi=1, k=1`  
Output: `1`  
*Explanation: Only one number; its power is 0.*

### Thought Process (as if you’re the interviewee)  
First, for each number in [lo, hi], calculate its "power value" with the defined sequence. Then, we need to sort all these numbers: first by their power value ascending, and then by value for ties. Brute force is to calculate each power value naively, but because intermediate values can repeat, we can use memoization/DP to cache previously computed powers (like a recursive function with a dict).

Sort all numbers in [lo, hi] by (power value, value), then return the value at index k-1.

### Corner cases to consider  
- Only one number in range (lo == hi)
- All numbers have different power values
- Multiple numbers share the same power value, check order by value
- Large ranges (check for memoization efficiency)
- k > hi-lo+1 (invalid, but not in constraints)

### Solution

```python
class Solution:
    def getKth(self, lo: int, hi: int, k: int) -> int:
        from functools import lru_cache
        
        @lru_cache(maxsize=None)
        def power(n):
            if n == 1:
                return 0
            if n % 2 == 0:
                return 1 + power(n // 2)
            else:
                return 1 + power(n * 3 + 1)
        
        arr = [(power(i), i) for i in range(lo, hi + 1)]
        arr.sort()  # sorts by power value, then by value
        return arr[k - 1][1]
```

### Time and Space complexity Analysis  
- **Time Complexity:** O((hi - lo + 1) × log(hi - lo + 1)) for sorting, power calculations are amortized faster due to memoization
- **Space Complexity:** O(hi - lo + memoization cache size) for storing tuples and memoization

### Potential follow-up questions (as if you’re the interviewer)  
- How would you improve the efficiency if the range [lo, hi] is very large?
  *Hint: Use bottom-up DP or iterative memoization to avoid recursion limits*

- What if the power value function changes (e.g., different operations)?
  *Hint: Abstract the computation into a callable passed as a parameter*

- Can you retrieve the top k elements efficiently, rather than sorting the whole range?
  *Hint: Use a min-heap of size k*

### Summary
This is a classic sort-by-derived-key problem, which uses memoization/DP for speed. The overall coding pattern is mapping + sorting by tuple keys, and can be applied in leaderboard-type rankings and transformation-based sorting.

### Tags
Dynamic Programming(#dynamic-programming), Memoization(#memoization), Sorting(#sorting)

### Similar Problems
- Find Score of an Array After Marking All Elements(find-score-of-an-array-after-marking-all-elements) (Medium)