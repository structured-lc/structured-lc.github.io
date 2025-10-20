### Leetcode 634 (Medium): Find the Derangement of An Array [Practice](https://leetcode.com/problems/find-the-derangement-of-an-array)

### Description  
Given an integer **n**, imagine an array of numbers from 1 to n in ascending order. A **derangement** is a permutation where **no element** stays in its original position (i.e., for all positions i : nums[i] ≠ i+1). Your task is to determine the **number of possible derangements** for the array of size n, and return it modulo 1,000,000,007.  
For example, for n = 3, valid derangements are [2, 3, 1] and [3, 1, 2]; [1, 2, 3] is not valid since each element is in its place.

### Examples  

**Example 1:**  
Input: `n = 3`  
Output: `2`  
*Explanation: The derangements are [2, 3, 1] and [3, 1, 2]. Neither has an element in its original position.*

**Example 2:**  
Input: `n = 2`  
Output: `1`  
*Explanation: Only [2, 1] is a derangement. [1, 2] is not, since both are in their original positions.*

**Example 3:**  
Input: `n = 1`  
Output: `0`  
*Explanation: There is no possible derangement for one element.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  Try to generate all possible permutations and count those where no element is in its original index. This works for very small n (e.g., n ≤ 8), but is **horribly slow** for larger n because the number of permutations is n! (factorial time) which is infeasible for n up to 10⁶.

- **Mathematical/recursive approach:**  
  There exists a classic recurrence for the derangement count, D(n):  
  D(0) = 1 (empty permutation)  
  D(1) = 0  
  For n ≥ 2:  
  D(n) = (n-1) × (D(n-1) + D(n-2))  
  Recurrence arises because, for every placement of the first number, we consider two cases:  
  - Swap back (so now, two indices are occupied wrongly, resolving to D(n-2) solutions),  
  - Or just shift, leading to D(n-1) possibilities.  

- **Optimization (DP):**  
  The recurrence allows us to compute D(n) in O(n) time and O(1) space if we use just two rolling variables.  
  Since n is large (up to 10⁶), **DP with modulo arithmetic** is the safest, fastest way.

### Corner cases to consider  
- n = 1 → output is 0 (no derangement for one element)
- n = 2 → only 1 possible derangement ([2,1])
- n = 0 → should be 1 (typically, one way to permute nothing)
- Large n (e.g., 10⁶): code must be efficient
- Result modulo 10⁹+7 is required at each step

### Solution

```python
def findDerangement(n: int) -> int:
    MOD = 10**9 + 7
    if n == 0:
        return 1
    if n == 1:
        return 0
    # Initialize derangement for 0 and 1
    prev2 = 1  # D(0)
    prev1 = 0  # D(1)
    for i in range(2, n+1):
        curr = (i - 1) * (prev1 + prev2) % MOD
        prev2 = prev1
        prev1 = curr
    return prev1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  One pass from 2 to n; single multiplication/addition/modulo each time.

- **Space Complexity:** O(1)  
  Only two integer variables are needed at any time (rolling DP).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to list all derangements, not just count?  
  *Hint: Try recursive backtracking but be careful of the combinatorial explosion. Prune the search using the "no fixed point" rule.*

- Can you solve this in constant time for any n?  
  *Hint: Use the full closed formula for derangements D(n) = ⌊ n! / e ⌉, but beware of precision/modulo with large n.*

- What modifications would be needed if some positions were already forbidden?  
  *Hint: This leads to the principle of inclusion-exclusion and possibly bitmask DP.*

### Summary

This problem is a classic example of **dynamic programming with combinatorics**. The pattern (D(n) = (n-1) × (D(n-1) + D(n-2))) is typical in derangement and permutation-related problems.  
Efficient rolling DP is the key to fitting within tight time/memory limits for large n.  
The derangement count appears in problems about **permutations with forbidden positions**, **fixed points**, and sometimes in probability/statistics involving random shuffling.


### Flashcard
Derangement count D(n) = (n−1) × (D(n−1) + D(n−2)); use this recurrence for O(n) computation.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming), Combinatorics(#combinatorics)

### Similar Problems
