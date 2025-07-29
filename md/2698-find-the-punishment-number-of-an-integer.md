### Leetcode 2698 (Medium): Find the Punishment Number of an Integer [Practice](https://leetcode.com/problems/find-the-punishment-number-of-an-integer)

### Description  
Given a positive integer n, compute the "**punishment number**" as follows:  
For each integer i with 1 ≤ i ≤ n, consider i². If you can partition the decimal digits of i² into contiguous substrings whose integer values sum to i (you must use all the digits, order preserved), then add i² to the punishment number sum. The final result is the total sum of all such i².

### Examples  

**Example 1:**  
Input: `n = 10`  
Output: `82`  
*Explanation: Only i = 1 (1² = "1") and i = 9 (9² = "81") meet the condition:  
- For i = 1: 1 → [1] → sum = 1  
- For i = 9: 81 → [8, 1] → sum = 8 + 1 = 9  
So, punishment number = 1 + 81 = 82.*

**Example 2:**  
Input: `n = 37`  
Output: `1478`  
*Explanation: For i = 1, 9, 10, 13, 36 and 37, the sum of their squares is 1 + 81 + 100 + 169 + 1296 + 1369 = 1478.*  

**Example 3:**  
Input: `n = 1`  
Output: `1`  
*Explanation: Only i = 1: 1² = "1" → [1] → sum = 1.*

### Thought Process (as if you’re the interviewee)  

Starting from the problem description, my first brute-force approach is:
- For each i from 1 to n:
    - Compute i².
    - Try every possible way to partition the string digits of i² such that the sum of numbers formed equals i.
    - If such a partition exists, add i² to the answer.

Directly, this sounds like a recursive/backtracking substring partitioning problem:  
- For each possible prefix split, recursively try to partition the rest.  
- Base case: If we've used all digits and total == i.

Optimization:
- Prune recursion: If the current sum exceeds i, we can backtrack early.
- Use string conversion only once per square.
- Since n ≤ 1000 (as per constraints in some problems), performance is tractable with this approach.

No fancy data structures are required; basic strings and recursion suffice.  
It is possible to precompute valid i's up to a practical limit, making repeated queries super-fast.

I would stick to the recursive substring partitioning, since partitioning is the crux. Tradeoff: more readable and less error-prone; memoization isn’t required because the search space per i is small.

### Corner cases to consider  
- n = 1: minimal input
- i² with leading zeros in a split, e.g., '100' → [1, 0, 0]; must treat '0' splits as valid (leading zeros only appear as '0')
- Multiple partitions possible: need only one to succeed.
- n is large, e.g., 1000: recursive stack and performance.
- All i for which no partition exists: should not be included.

### Solution

```python
def punishmentNumber(n):
    # Helper function to check if s (string of i²) can be partitioned to sum to target (i)
    def can_partition(s, idx, curr_sum):
        if idx == len(s):
            return curr_sum == target
        for l in range(1, len(s) - idx + 1):
            val = int(s[idx:idx + l])
            # Prune if curr_sum + val is too large
            if curr_sum + val > target:
                continue
            if can_partition(s, idx + l, curr_sum + val):
                return True
        return False

    ans = 0
    for i in range(1, n + 1):
        sq = str(i * i)
        target = i
        if can_partition(sq, 0, 0):
            ans += i * i
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × 2ᴰ), where D is the max digit length of n² (at most 7 when n ≤ 1000).   
  For each i (up to n), we try all substring partitions of i², which is less than 2ᴰ. n is at most 1000, so total time is acceptable.
- **Space Complexity:** O(D) for recursion stack per call; O(1) extra storage, as we process one i at a time.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize if n is very large (e.g., 10⁶)?
  *Hint: Precompute valid i or use dynamic programming/memoization.*

- Can you modify your solution to output not only the punishment number but also list which i are valid?
  *Hint: Store all valid i in a result list during the sum.*

- What if there are additional constraints on the kind of splits allowed (e.g., no part is ‘0’ or must use exactly k parts)?
  *Hint: Adjust the recursion parameters and constraints to enforce such requirements.*

### Summary

This problem is a classic recursion/backtracking partitioning problem with pruning.  
The pattern—partition a string and sum the parts to hit a target—is seen in numbers-and-strings problems and certain dynamic programming problems like word break and palindrome partitioning.  
The approach of recursive substring splits with sum check can be applied in coding tasks involving arithmetic on string digits and combinatorial splits.