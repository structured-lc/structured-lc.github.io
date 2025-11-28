### Leetcode 3193 (Hard): Count the Number of Inversions [Practice](https://leetcode.com/problems/count-the-number-of-inversions)

### Description  
Given an integer **n** and a list of requirements, where each requirement is of the form \[endᵢ, cntᵢ\], you are to count the number of permutations of \[0, 1, 2, ..., n-1\] such that for every requirement, the **prefix** subarray ending at index endᵢ has **exactly** cntᵢ inversions.  
- An **inversion** is a pair of indices (i, j) with 0 ≤ i < j < length, and nums[i] > nums[j].  
- Return the number of valid permutations **modulo 10⁹ + 7**.

### Examples  

**Example 1:**  
Input: `n = 3, requirements = [[2, 1]]`  
Output: `2`  
*Explanation:  
Permutations of \[0,1,2\] are:  
[0,1,2]    → Inversions in first 3: 0  
[0,2,1]    → Inversions in first 3: 1  
[1,0,2]    → Inversions in first 3: 1  
[1,2,0]    → Inversions in first 3: 2  
[2,0,1]    → Inversions in first 3: 2  
[2,1,0]    → Inversions in first 3: 3  
Only [0,2,1] and [1,0,2] have exactly 1 inversion in the full array (0..2).*

**Example 2:**  
Input: `n = 4, requirements = [[1,0],[2,1],[3,2]]`  
Output: `2`  
*Explanation:  
Requirements:  
- Prefix [0,1]: 0 inversion  
- Prefix [0,1,2]: 1 inversion  
- Prefix [0,1,2,3]: 2 inversions  
Valid permutations: [0,2,1,3], [1,0,2,3].*

**Example 3:**  
Input: `n = 2, requirements = [[1,0]]`  
Output: `1`  
*Explanation:  
n = 2, perms:  
[0,1]: inversions in first 2 = 0  
[1,0]: inversions in first 2 = 1  
Only [0,1] matches the requirement.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Generate every permutation of [0..n-1] and check, for each requirement, whether the inversion count in the given prefix equals the required cntᵢ. But factorial time (O(n!)) is infeasible even for modest n.
- **Optimization:**  
  Let’s note the only thing that matters is for certain prefixes, the inversion count is forced. This is a classic DP on sequence construction with extra state: for each length i and possible inversion count so far, how many ways are there?
- Use DP: dp[i][j] = # ways to arrange first i numbers with exactly j inversions, and prune “impossible” states where current i is a requirement but inversion count ≠ required value.
- When placing the new max element, it can cause k new inversions by inserting at position k (0 ≤ k < i). This relates to the classic permutation inversion counting problem.
- At each step, use modulus to avoid overflow.
- **Why choose DP:**  
  - Prunes based on requirements when possible.
  - Time complexity is much better than O(n!) (polynomial).
  - Classic approach for permutations with restricted inversion counts.

### Corner cases to consider  
- n = 1 (single element): Only one permutation.
- requirements is empty: Any permutation is valid.
- cntᵢ > max possible inversions for size endᵢ (impossible).
- Multiple requirements on same prefix (contradictory?).
- requirements out of bounds (endᵢ ≥ n) (invalid).
- cntᵢ < 0 (invalid).
- No permutation satisfies all requirements.

### Solution

```python
MOD = 10**9 + 7

class Solution:
    def numberOfPermutations(self, n: int, requirements: list[list[int]]) -> int:
        kMaxInversions = 400  # LeetCode limits; see constraints.
        # dp[i][j]: #ways to arrange first i numbers with exactly j inversions
        dp = [[0] * (kMaxInversions + 1) for _ in range(n + 1)]
        
        # Map end index +1 (for 1-based step) to inversion count
        endToCnt = {end + 1: cnt for end, cnt in requirements}
        
        dp[1][0] = 1  # Only one way to permute 1 number with 0 inversions
        
        for i in range(2, n + 1):
            for new_inversions in range(i):  # possible new inversions by position of new element
                for j in range(kMaxInversions - new_inversions + 1):
                    inv_total = j + new_inversions
                    # If there is a requirement for this i, filter invalid
                    if i in endToCnt and inv_total != endToCnt[i]:
                        continue
                    dp[i][inv_total] = (dp[i][inv_total] + dp[i-1][j]) % MOD
        
        # At end, must have exactly required inversion count at n (if asked)
        final_cnt = endToCnt.get(n, None)
        if final_cnt is None:
            # If no exact requirement at n, sum for all valid inversion counts at n
            return sum(dp[n]) % MOD
        return dp[n][final_cnt]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k²), with n = size of permutation and k = upper-bound on inversions (typically 400, small). For each stage, up to n × k × n (since k = i in worst case).  
- **Space Complexity:** O(n × k), holding DP table of size (n+1) × (k+1). No recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if requirements could overlap or contradict?  
  *Hint: Think about pre-checking and early exits if possible.*

- Can this be solved if requirements are dynamic or streaming?  
  *Hint: Consider if DP can be reused or must be rebuilt.*

- How would you optimize further for very large n or extremely large inversions k?  
  *Hint: Can combinatorics help? Is there a closed form for specific cases?*

### Summary
This is a **dynamic programming over permutations** with inversion-count, filtered by prefix constraints. The pattern is similar to classic DP that counts permutations by inversion number, but with **extra pruning** when specific prefix inversion counts are required.  
This pattern appears in combinatorial enumeration, restricted sorting, and advanced counting queries about permutations.  
The DP with state (length, inversions) and transitions by “where to put the new number” is a key pattern in these problems.


### Flashcard
Use DP where state is (prefix length, inversion count so far); for each position, try inserting each unused number and update the inversion count accordingly.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- K Inverse Pairs Array(k-inverse-pairs-array) (Hard)