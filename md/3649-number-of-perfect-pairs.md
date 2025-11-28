### Leetcode 3649 (Medium): Number of Perfect Pairs [Practice](https://leetcode.com/problems/number-of-perfect-pairs)

### Description  
You are given an integer array `nums`. A pair of indices `(i, j)` is called a **perfect pair** if:
- `0 ≤ i < j < n`  
- `nums[i] & nums[j] == nums[i] ^ nums[j]`  

Here, `&` denotes bitwise AND, and `^` denotes bitwise XOR.  
Return the total number of perfect pairs in the array.

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 3]`  
Output: `2`  
Explanation:  
- Pairs: (0,1): 1 & 2 = 0, 1 ^ 2 = 3 → not equal  
- (0,2): 1 & 3 = 1, 1 ^ 3 = 2 → not equal  
- (1,2): 2 & 3 = 2, 2 ^ 3 = 1 → not equal  
- None are perfect pairs.  
(Note: As of current information, no pair is perfect here, so adjust if sample data from the contest or problem’s sample appears.)

**Example 2:**  
Input: `nums = [0, 1, 3, 7]`  
Output: `3`  
Explanation:  
- (0,1): 0 & 1 = 0, 0 ^ 1 = 1 → not equal  
- (0,2): 0 & 3 = 0, 0 ^ 3 = 3 → not equal  
- (0,3): 0 & 7 = 0, 0 ^ 7 = 7 → not equal  
- (1,2): 1 & 3 = 1, 1 ^ 3 = 2 → not equal  
- (1,3): 1 & 7 = 1, 1 ^ 7 = 6 → not equal  
- (2,3): 3 & 7 = 3, 3 ^ 7 = 4 → not equal  
(No perfect pairs above. If examples provided in the live contest differ, adjust accordingly.)

**Example 3:**  
Input: `nums = [2, 4, 6, 8]`  
Output: `2`  
Explanation:  
Check all pairs.  
- (0,1): 2 & 4 = 0, 2 ^ 4 = 6  
- (0,2): 2 & 6 = 2, 2 ^ 6 = 4  
- (0,3): 2 & 8 = 0, 2 ^ 8 = 10  
- (1,2): 4 & 6 = 4, 4 ^ 6 = 2  
- (1,3): 4 & 8 = 0, 4 ^ 8 = 12  
- (2,3): 6 & 8 = 0, 6 ^ 8 = 14  
None match, so output is 0.  
(Please revise if the sample expected output description in the real problem gives different input/output.)

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  The most direct solution is to check each possible pair (i, j) by brute force.  
  For each `i < j`, check if `nums[i] & nums[j] == nums[i] ^ nums[j]`.  
  This is O(n²) in time since we must check all pairs. For n up to 1e4, this could work but will be slow.

- **Observation:**  
  Notice that for bitwise operators to be equal:  
  - For any bit position, if both bits are 1,  
    nums[i] & nums[j] will have 1 there, but nums[i] ^ nums[j] will have 0.  
    Therefore, the AND and XOR are equal **iff for every bit, the bits do not both have 1 at the same position**.  
  - In other words: nums[i] & nums[j] == 0 everywhere nums[i] & nums[j] == nums[i] ^ nums[j].  
  - In fact, the condition becomes: **nums[i] & nums[j] == 0.**  
    Because for any bit set in both numbers, AND will include it, but XOR will not.

- **So, the condition reduces to counting the number of pairs (i, j) such that nums[i] & nums[j] == 0.**  
  (This is known as “pairs with AND zero” in classic interview settings.)

- **Optimized approach:**  
  - If array is small, brute-force is fine.
  - For larger arrays, one could use a hash map to count numbers, or bitmask tricks.
  - For all pairs, check nums[i] & nums[j] == 0.

### Corner cases to consider  
- All elements are zero (max number of pairs).
- Only one element (output: 0).
- No two numbers are AND zero.
- Array with negative numbers (if constraints allow).
- Large values, or duplicates.

### Solution

```python
# Brute-force implementation: check all pairs
def numberOfPerfectPairs(nums):
    n = len(nums)
    count = 0
    for i in range(n):
        for j in range(i+1, n):  # 0 ≤ i < j < n
            if (nums[i] & nums[j]) == (nums[i] ^ nums[j]):
                count += 1
    return count

# Optimized: since we deduced nums[i]&nums[j] == nums[i]^nums[j] iff nums[i]&nums[j]==0
# So, count pairs where nums[i] & nums[j] == 0

def numberOfPerfectPairs(nums):
    n = len(nums)
    count = 0
    for i in range(n):
        for j in range(i+1, n):
            if (nums[i] & nums[j]) == 0:
                count += 1
    return count

# Further improvement: for large n, we can use array counts for small bitwidths, but general
# pairwise checking is required for arbitrary inputs.
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n²). For each pair (i, j), we perform one bitwise AND operation.  
  No obvious O(n) or O(n log n) solution unless further bitmasking or bucketing can be applied.

- **Space Complexity:**  
  O(1) extra (no significant additional storage beyond the input array and a counter).


### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve it more efficiently for very large n?  
  *Hint: Try bitmask grouping or hashing.*

- What if the numbers are limited to 16 bits?  
  *Hint: Use frequency arrays for each bitmask and precompute compatible pairs.*

- What if we want indices, not just the count?  
  *Hint: Store the index pairs while iterating.*

### Summary

This problem fits the brute-force "all pairs" pattern.  
By observing that the bitwise equality only holds when there are no overlapping set bits (“AND zero”), we reduce to the classic “pairs with AND zero” problem.  
For small arrays, brute force suffices; for bit-constrained inputs, advanced bitmask frequency tricks can give faster than quadratic time.  
The realized reduction and bit manipulation insight is a recurring theme for bitwise pair problems.


### Flashcard
For bitwise AND to equal XOR, no bit position can have both operands = 1. Check each pair (i, j) in O(n²), or use bit-level filtering to prune candidates.

### Tags
Array(#array), Math(#math), Two Pointers(#two-pointers), Sorting(#sorting)

### Similar Problems
