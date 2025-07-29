### Leetcode 982 (Hard): Triples with Bitwise AND Equal To Zero [Practice](https://leetcode.com/problems/triples-with-bitwise-and-equal-to-zero)

### Description  
Given an integer array **nums**, find the total number of triples `(i, j, k)` where all are indices into **nums** (i.e., `0 ≤ i, j, k < n`), such that:
- `nums[i] & nums[j] & nums[k] == 0`
The `&` symbol means the bitwise AND operation. You need to count *all* valid ordered triples, including those where i, j, or k are the same index.

### Examples  

**Example 1:**  
Input: `nums = [2, 1, 3]`  
Output: `12`  
*Explanation: There are 12 valid (i, j, k) triples such that nums[i] & nums[j] & nums[k] == 0. For example, (0, 0, 1): 2 & 2 & 1 = 0; (1, 2, 0): 1 & 3 & 2 = 0; and so on. (All permutations count.)*

**Example 2:**  
Input: `nums = [0, 0, 0]`  
Output: `27`  
*Explanation: Every bitwise AND that involves any zero results in zero, and all 3 indices can take all possible values (since `n = 3`, there are 3×3×3 = 27 triples).*

**Example 3:**  
Input: `nums = [1]`  
Output: `1`  
*Explanation: The only possible triple is (0,0,0): 1 & 1 & 1 = 1 ≠ 0, so actually the output is 0. (If nums = , answer would be 1.)*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Enumerate through all possible triples `(i, j, k)` (total n³). For each, check whether `nums[i] & nums[j] & nums[k] == 0`.  
  This is correct but extremely slow for `n` up to 1000, as it leads to 10⁹ operations.

- **Optimization:**  
  Notice that bitwise AND is both associative and commutative:  
  For each possible pair `(a, b)` in nums, compute the value `nums[a] & nums[b]` and count how often each result occurs.  
  For a given `c` in nums, the triple `(a, b, c)` produces zero iff `nums[a] & nums[b] & nums[c] == 0`  
  ↔ (`nums[a] & nums[b]`) & nums[c] == 0.  
  Thus, for each `nums[c]`, you can look for all pairwise AND results `x` such that `x & nums[c] == 0` and sum their pair counts.

  To do this efficiently:
  - Use a dictionary or array to store the counts for all `nums[i] & nums[j]` results.
  - For each `num` in nums, iterate through all possible 16-bit values (`x in 0..2¹⁶-1`) and for each `x` where `x & num == 0`, add the dictionary count of `x` to the answer.

- **Why this is fast:**  
  The number of possible AND results for 16-bit numbers is capped at 65536.  
  O(n²) to fill the AND pair table, and O(n \* 2¹⁶) to count. Overall, this is feasible for n up to 1000.

### Corner cases to consider  
- nums contains only zeros (maximum number of triples: n³).
- All elements are identical, but not zero.
- Some elements are duplicates.
- nums contains very large numbers (need to ensure all bitmasks fit in a 16-bit integer).
- Empty input (n = 0).
- Single element input (n = 1).

### Solution

```python
def countTriplets(nums):
    from collections import Counter

    # Count all possible nums[i] & nums[j] results
    ab_count = Counter()
    for a in nums:
        for b in nums:
            ab_count[a & b] += 1

    total = 0
    # For each c, sum over all (a & b) pairs compatible with c
    for c in nums:
        for ab, cnt in ab_count.items():
            if ab & c == 0:
                total += cnt
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n² + n \* 2¹⁶):  
  - O(n²): Counting all (a, b) pairs and their ANDs.  
  - O(n \* 2¹⁶): For each `c` (n times), iterate (in practice only over observed ab values, but up to 65536).
- **Space Complexity:**  
  O(2¹⁶): Needed for storing all possible AND combinations (since each is a 16-bit integer).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the numbers can be up to 32 bits?
  *Hint: Consider that the AND mask table would be too big, so you need better pruning or another approach.*

- How would you handle the case where you want unique indices, i ≠ j ≠ k?
  *Hint: Think about avoiding triples with repeated indices during counting.*

- Can you optimize the innermost check (ab & c == 0)?
  *Hint: Bitmask enumeration; maybe using bitwise tries or a recursive subset sum technique.*

### Summary
This problem is a classic use of **bitmask counting** and pre-computation to convert a naïve triple loop into a pair-count and fast lookup. This approach, building a table of pair results and then querying for compatible third values, is widely usable in problems involving combinatoric counting with bitwise relationships. Understanding this pattern is useful for advanced problems in bitmask dynamic programming, geometry with set intersections, and fast subset queries.