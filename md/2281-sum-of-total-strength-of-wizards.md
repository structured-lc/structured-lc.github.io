### Leetcode 2281 (Hard): Sum of Total Strength of Wizards [Practice](https://leetcode.com/problems/sum-of-total-strength-of-wizards)

### Description  
Given an array `strength` where `strength[i]` represents the strength of the iᵗʰ wizard, calculate the sum of the *total strengths* for all possible contiguous groups (subarrays) of wizards.  
The total strength for a group is defined as:  
- The minimum strength in the group × the sum of all strengths in the group.

Return the total sum for all groups, modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `strength = [1,3,1,2]`  
Output: `44`  
*Explanation: All possible groups and their total strengths:*  
- [1]: 1 × 1 = 1  
- [3]: 3 × 3 = 9  
- [1]: 1 × 1 = 1  
- [2]: 2 × 2 = 4  
- [1,3]: 1 × 4 = 4  
- [3,1]: 1 × 4 = 4  
- [1,2]: 1 × 3 = 3  
- [1,3,1]: 1 × 5 = 5  
- [3,1,2]: 1 × 6 = 6  
- [1,3,1,2]: 1 × 7 = 7  
Sum: 1+9+1+4+4+4+3+5+6+7=44

**Example 2:**  
Input: `strength = [5,4,6]`  
Output: `213`  
*Explanation:*  
- [5]: 5×5=25  
- [4]: 4×4=16  
- : 6×6=36  
- [5,4]: 4×9=36  
- [4,6]: 4×10=40  
- [5,4,6]: 4×15=60  
Sum: 25+16+36+36+40+60=213

**Example 3:**  
Input: `strength = `  
Output: `64`  
*Explanation:  → 8×8 = 64*

### Thought Process (as if you’re the interviewee)  
First, let's try a brute-force solution:  
- Enumerate all contiguous subarrays (O(n²)), and for each one, find its minimum and sum (O(n)), yielding O(n³) time — too slow for large inputs.

Next, optimize:  
- We need to compute, for each subarray, min × sum.  
- Observe that for each element, we can try to find how many subarrays where it is the minimum (by using monotonically increasing stacks to compute "next less" and "prev less" for each index).
- For each strength[i], we can efficiently compute, using prefix sums, the contribution of all subarrays where strength[i] is the minimum.
- We use stacks to find, for each i:
  - left[i]: the first index left of i where strength is less than or equal to strength[i].
  - right[i]: the first index right of i where strength is strictly less than strength[i].
- Then, we precompute a prefix sum and a prefix of prefix sums so we can query sum of ranges efficiently.
- For each i, calculate its total contributions by combining the left and right boundaries and the sum of strengths in those subarrays using the precomputed prefix sums.

This reduces the time complexity to O(n), using monotonic stacks and prefix sums — a classic competitive programming optimization for range queries and subarray enumeration.

### Corner cases to consider  
- Single element arrays  
- Arrays where all strengths are identical  
- Strictly increasing or decreasing arrays  
- Arrays containing zeros  
- Large arrays (to ensure performance)
- Arrays containing negative values (if allowed by problem constraints)

### Solution

```python
def totalStrength(strength):
    MOD = 10**9 + 7
    n = len(strength)

    # Compute prefix sums and prefix of prefix sums
    prefix = [0] * (n + 1)
    for i in range(n):
        prefix[i+1] = (prefix[i] + strength[i]) % MOD
    prefix_of_prefix = [0] * (n + 2)
    for i in range(n + 1):
        prefix_of_prefix[i+1] = (prefix_of_prefix[i] + prefix[i]) % MOD

    # Find first previous less or equal and next less for each index
    left = [-1] * n
    right = [n] * n
    stack = []
    for i in range(n):
        while stack and strength[stack[-1]] > strength[i]:
            right[stack.pop()] = i
        stack.append(i)
    stack = []
    for i in reversed(range(n)):
        while stack and strength[stack[-1]] >= strength[i]:
            left[stack.pop()] = i
        stack.append(i)

    res = 0
    for i in range(n):
        l, r = left[i], right[i]
        # Count left and right length
        left_len = i - l
        right_len = r - i

        # The sum of all prefix sums in [i+1, r]
        right_sum = (prefix_of_prefix[r+1] - prefix_of_prefix[i+1]) % MOD
        # The sum of all prefix sums in [l+1, i]
        left_sum = (prefix_of_prefix[i+1] - prefix_of_prefix[l+1]) % MOD

        # Each strength[i] is min for all subarrays from l+1..i..r-1
        total = strength[i] * (right_sum * left_len - left_sum * right_len) % MOD
        res = (res + total) % MOD
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since each index is pushed/popped at most once on stacks, and prefix sums are linear.
- **Space Complexity:** O(n), for prefix sums, prefix of prefix sums, and boundary arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array contains negative strengths?
  *Hint: Does the stack logic hold if negative numbers are present?*

- Can this approach be extended to other "min \* function(sum)" types of aggregations for subarrays?
  *Hint: Consider other associative functions as alternatives to sum.*

- What if, instead of the minimum, it’s the maximum or another order-statistic for the group?
  *Hint: Can you adapt the stack logic? What changes for monotonicity?*

### Summary
We use the **monotonic stack** and **prefix sum** pattern here to efficiently iterate over all subarrays where each strength[i] is the minimum, without explicitly enumerating every subarray. This converts a naive O(n³) problem to O(n), a very useful technique anytime you need to count or sum over subarrays constrained by min or max constraints. This pattern also applies to problems such as sum of subarray minimums, largest rectangle in histogram, and others.