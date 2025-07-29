### Leetcode 1655 (Hard): Distribute Repeating Integers [Practice](https://leetcode.com/problems/distribute-repeating-integers)

### Description  
Given an array of integers `nums` (possible duplicates) and an array `quantity` of customer demands, return **true** if it is possible to distribute the `nums` to satisfy every customer in `quantity` (each customer i can only get quantity[i] elements of the same integer, and you can't share an integer instance between customers), false otherwise.
- Each customer must receive a unique set of integers from nums (no two customers share a specific element).
- Each number in nums can be used multiple times, up to its count in nums.
- Distribution can repeat integers; just not same element instance to more than one customer.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,3]`, `quantity = [2,2]`  
Output: `true`  
*Explanation: Give [3,3] to customer 0, [1,2] to customer 1.*

**Example 2:**  
Input: `nums = [1,2,3,4]`, `quantity = [2]`  
Output: `false`  
*Explanation: No integer in nums appears at least twice to satisfy a demand of 2.*

**Example 3:**  
Input: `nums = [1,1,2,2]`, `quantity = [2,2]`  
Output: `true`  
*Explanation: Give [1,1] to customer 0, [2,2] to customer 1.*


### Thought Process (as if you’re the interviewee)  
- The challenge is to match each demand to available integer counts, no sharing between customers, possibly reordering assignment.
- Brute force: Try all assignments. Too slow.
- Optimize: Since customer count is up to 10, can use bitmask DP — try each subset allocation to unique numbers and see if matching is possible.
- Backtrack by sorting demands descending, process high demands first to prune faster.
- For each subset of customers, check if any single number can meet all their combined demand.


### Corner cases to consider  
- nums has only one type of number
- Demands higher than any available count
- Demands can only be satisfied with perfect partitioning
- quantity is empty or nums is empty


### Solution

```python
from typing import List
from collections import Counter

def canDistribute(nums: List[int], quantity: List[int]) -> bool:
    counter = list(Counter(nums).values())
    m, n = len(counter), len(quantity)
    quantity.sort(reverse=True)
    
    def backtrack(i):
        if i == n:
            return True
        for j in range(m):
            if counter[j] >= quantity[i]:
                counter[j] -= quantity[i]
                if backtrack(i+1):
                    return True
                counter[j] += quantity[i]
        return False
    
    return backtrack(0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m^n), m = unique numbers, n = customers. Actually feasible since n ≤ 10, so backtrack is fast enough.
- **Space Complexity:** O(m + n) for counter and recursion stack.


### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize the solution using memoization or DP?  
  *Hint: Use bitmask to cache [index][mask] states.*

- What's the maximum input size this approach can handle efficiently?  
  *Hint: Backtracking or bitmask is feasible for small n only. For bigger n, would need heuristic/greedy.*

- Suppose the demands have to be assigned specific integer values (not any). How would you change your approach?  
  *Hint: Assign directly and check counts, becomes a direct matching problem.*

### Summary
This classic **backtracking/bitmask** allocation problem leverages the small customer count (n ≤ 10). Sorting demands and pruning early speeds up the search. This pattern applies widely to pile/assignment problems with distributable units.