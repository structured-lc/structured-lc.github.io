### Leetcode 2767 (Medium): Partition String Into Minimum Beautiful Substrings [Practice](https://leetcode.com/problems/partition-string-into-minimum-beautiful-substrings)

### Description  
Given a binary string s, partition it into the minimum number of contiguous substrings such that **each substring**:
- Does **not** have leading zeros,
- Is a binary representation of a **power of 5** (e.g., 1, 101, 11001... which are 1, 5, 25, ... in decimal).

If it isn't possible to partition s this way, return -1.  
The task is to find such a minimal partition.

### Examples  

**Example 1:**  
Input: `s = "1011"`  
Output: `2`  
Explanation: Partition as ["101", "1"]. "101" (5) and "1" (1) are valid (both are powers of 5 with no leading zeros).

**Example 2:**  
Input: `s = "111"`  
Output: `3`  
Explanation: Partition as ["1", "1", "1"]. Each "1" is 1 (a power of 5). No larger partition possible.

**Example 3:**  
Input: `s = "0"`  
Output: `-1`  
Explanation: "0" cannot represent any power of 5 and fails due to being a leading zero.

### Thought Process (as if you’re the interviewee)  
First, brute-force:
- Consider all ways to split the string into substrings.
- For every possible substring, check if it meets the rules: no leading zeros, is a power of 5 (in binary).
- This would require exploring all partitions (exponential in n), checking each substring.

Optimizing:
- Since s has a small length (1 ≤ s.length ≤ 15), dynamic programming is feasible.
- For each position, try all possible next substrings that start at that position.
- Precompute all powers of 5 up to the maximum possible value (2¹⁵ - 1). Check substrings numerically for "beautiful" property in O(1).
- Use DP: dp[i] = minimum number of partitions on substring s[i:].
- Recursively try every valid "beautiful" substring starting at i, add 1 (for the chosen substring), and take the minimum.

Trade-offs:
- Brute force is too slow at larger sizes.
- DP avoids repeated computation, is very reasonable for n up to 15.
- Backtracking or memoization would be sufficient, both using O(n) stack and O(n) state.

### Corner cases to consider  
- String has only zeros.
- Substrings with leading zeros (e.g., "0101").
- s too short (single character), or all 1's.
- s cannot be fully partitioned into valid substrings (e.g., "1010").
- Multiple ways to partition, but task is to find **minimum** number of partitions.

### Solution

```python
def minimumBeautifulSubstrings(s: str) -> int:
    # Precompute all powers of 5 that can fit within len(s) bits
    beautiful_set = set()
    val = 1
    while val < (1 << len(s)):
        beautiful_set.add(bin(val)[2:])  # Store the binary string
        val *= 5

    # DP memoization
    from functools import lru_cache

    @lru_cache(maxsize=None)
    def dp(i):
        if i == len(s):
            return 0  # No more string left, zero further partitions required
        min_split = float('inf')
        for j in range(i + 1, len(s) + 1):
            sub = s[i:j]
            # Skip if leading zero or not "beautiful"
            if sub[0] == '0' or sub not in beautiful_set:
                continue
            next_split = dp(j)
            if next_split != float('inf'):
                min_split = min(min_split, 1 + next_split)
        return min_split

    ans = dp(0)
    return -1 if ans == float('inf') else ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n²) where n = length of s (≤ 15). For each of n positions, we consider all O(n) substrings and do O(1) "is-beautiful" set lookups.

- **Space Complexity:**  
  O(n) for the recursion stack and O(n) memoization table given by lru_cache. The set of beautiful substrings is also small (O(log₅(2ⁿ)) ≈ 7).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt if the input size were much larger (e.g., n = 1000)?  
  *Hint: Try limiting DP computation, and avoid substring creation.*

- Can you generalize the approach to partitions for binary representations of powers of other bases (e.g., powers of 3 or 7)?  
  *Hint: Parameterize the power, and precalculate the corresponding binary strings.*

- How would you print all possible partitions if more than one exists with the minimum count?  
  *Hint: Store paths during DP; reconstruct with backtracking.*

### Summary
This problem uses the **backtracking + DP (memoization)** pattern over all substring partitions, alongside a precomputed set for fast "beautiful" checks. Such approaches are common for minimum cuts, palindrome partitions, and word break problems, especially when input size is small and properties can be checked quickly using hashing or set membership.

### Tags
Hash Table(#hash-table), String(#string), Dynamic Programming(#dynamic-programming), Backtracking(#backtracking)

### Similar Problems
- Partition Array for Maximum Sum(partition-array-for-maximum-sum) (Medium)
- Minimum Substring Partition of Equal Character Frequency(minimum-substring-partition-of-equal-character-frequency) (Medium)