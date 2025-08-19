### Leetcode 1879 (Hard): Minimum XOR Sum of Two Arrays [Practice](https://leetcode.com/problems/minimum-xor-sum-of-two-arrays)

### Description  
Given two integer arrays, **nums1** and **nums2**, each of length n, you must **rearrange** nums2 to minimize the sum:  
(nums1 XOR nums2) + (nums1[1] XOR nums2[1]) + ... + (nums1[n-1] XOR nums2[n-1])  
where XOR is the bitwise exclusive-or. Find and return the minimum possible value of this sum.

In simple terms:  
Pair each element of nums1 with one element from nums2 (permute nums2 as needed), sum up their XORs, and return the lowest total possible.

### Examples  

**Example 1:**  
Input: `nums1 = [1,2]`, `nums2 = [2,3]`  
Output: `2`  
*Explanation:  
All possible arrangements:  
[1,2] and [2,3]: (1⊕2)+(2⊕3)=3  
[1,2] and [3,2]: (1⊕3)+(2⊕2)=2+0=2  
Minimum = 2.*

**Example 2:**  
Input: `nums1 = [3,7,9]`, `nums2 = [1,6,8]`  
Output: `13`  
*Explanation:  
Try permutations.  
If nums2 is [1,6,8]: (3⊕1)+(7⊕6)+(9⊕8)=2+1+1=4  
If nums2 is [1,8,6]: (3⊕1)+(7⊕8)+(9⊕6)=2+15+15=32  
If nums2 is [6,1,8]: (3⊕6)+(7⊕1)+(9⊕8)=5+6+1=12  
But the minimal is [8,1,6]: (3⊕8)+(7⊕1)+(9⊕6)=11+6+15=32  
Minimum found after all attempts is 4. Correction to sample: output here would be 4.*

**Example 3:**  
Input: `nums1 = [1,2,3]`, `nums2 = [3,2,1]`  
Output: `4`  
*Explanation:  
One optimal pairing is: (1⊕3)+(2⊕2)+(3⊕1) = 2+0+2 = 4.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force**: Try all permutations of nums2 (n! possibilities), calculate the sum for each. This is not feasible for n > 8.
- **State space reduction**: At each position i, we can choose any unused index from nums2.  
  Use a **bitmask** to represent which elements have been used in nums2. Let's define dp(i, mask) = minimal sum for the first i elements of nums1, with 'mask' representing which nums2 elements have been selected.
- **Recursion**: For each unchosen j, add (nums1[i]⊕nums2[j]) + dp(i+1, mask | (1<<j)).
- **Memoization**: Store computed states to avoid recomputation.
- **Time complexity**: O(n × 2ⁿ), as there are 2ⁿ possible masks, and for each, up to n transitions.  
- This is *tractable* for n ≤ 14.
- Decided to implement this DP+bitmask approach.

### Corner cases to consider  
- Arrays of length 1 (n=1).
- All elements are the same in one or both arrays.
- All elements are 0.
- Max integer values.
- nums1 and nums2 are already identical or optimally paired.
- Arrays of length up to 14 (to check performance, as n! quickly explodes).

### Solution

```python
def minimumXORSum(nums1, nums2):
    # Number of elements
    n = len(nums1)

    # Memoization cache: maps (mask) -> min sum for that mask
    memo = {}

    def dp(i, mask):
        # If we've paired all elements, return 0
        if i == n:
            return 0
        if mask in memo:
            return memo[mask]
        min_sum = float('inf')
        # Try pairing nums1[i] with each unused nums2[j]
        for j in range(n):
            if not (mask & (1 << j)):
                # Use jᵗʰ element of nums2 if it's not used yet (mask 0 at j)
                pair_sum = (nums1[i] ^ nums2[j]) + dp(i + 1, mask | (1 << j))
                if pair_sum < min_sum:
                    min_sum = pair_sum
        memo[mask] = min_sum
        return min_sum

    return dp(0, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × 2ⁿ). For every mask (2ⁿ total), up to n transitions.  
- **Space Complexity:** O(2ⁿ) for the memoization dictionary, negligible extra stack since n ≤ 14.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this problem if n > 20 (i.e., arrays too large for bitmask DP)?  
  *Hint: Try relaxations, heuristics, or approximation algorithms. Could you use the Hungarian Algorithm for the assignment problem efficiently?*

- Can this solution be parallelized in any way?  
  *Hint: Independent subproblems for different masks, or use iterative DP for large n, or distribute work over clusters.*

- How does the solution scale if the values in the arrays (not just n) are very large?  
  *Hint: The DP approach is not sensitive to actual values, only n matters for complexity.*

### Summary
The core approach is **DP with bitmasking**, a classic technique for *assignment problems* with small n.  
This patterns appears in problems involving pairing or permutation costs, like "Minimum Cost to Make Two Arrays Equal", "Minimum Assignment Cost", and other resource-matching tasks.  
Recognizing subproblem overlap and representing state efficiently with a mask is key.  
This type of problem is also closely related to the Hungarian Algorithm for large-scale assignment problems.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Bit Manipulation(#bit-manipulation), Bitmask(#bitmask)

### Similar Problems
- Fair Distribution of Cookies(fair-distribution-of-cookies) (Medium)
- Choose Numbers From Two Arrays in Range(choose-numbers-from-two-arrays-in-range) (Hard)
- Maximum AND Sum of Array(maximum-and-sum-of-array) (Hard)