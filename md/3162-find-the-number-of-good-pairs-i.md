### Leetcode 3162 (Easy): Find the Number of Good Pairs I [Practice](https://leetcode.com/problems/find-the-number-of-good-pairs-i)

### Description  
Given two integer arrays, **nums1** of length n and **nums2** of length m, and a positive integer **k**, find how many pairs (i, j) with 0 ≤ i < n, 0 ≤ j < m are "good".  
A pair is "good" if **nums1[i]** is divisible by **nums2[j] × k** (that is, **nums1[i] % (nums2[j] × k) == 0**).  
Return the total number of such good pairs.

### Examples  

**Example 1:**  
Input: `nums1 = [1,3,4]`, `nums2 = [1,3,4]`, `k = 1`  
Output: `5`  
*Explanation:  
- (0,0): 1 % (1×1) == 0  
- (1,0): 3 % (1×1) == 0  
- (1,1): 3 % (3×1) == 0  
- (2,0): 4 % (1×1) == 0  
- (2,2): 4 % (4×1) == 0*

**Example 2:**  
Input: `nums1 = [1,2,4,12]`, `nums2 = [2,4]`, `k = 3`  
Output: `2`  
*Explanation:  
- (3,0): 12 % (2×3) == 0  
- (3,1): 12 % (4×3) == 0*

**Example 3:**  
Input: `nums1 = [2,3,6]`, `nums2 = [1,2]`, `k = 2`  
Output: `3`  
*Explanation:  
- (0,0): 2 % (1×2) == 0  
- (2,0): 6 % (1×2) == 0  
- (2,1): 6 % (2×2) == 0*

### Thought Process (as if you’re the interviewee)  
A brute-force approach is to check every possible pair (i, j):  
- For each element in nums1, loop through every element in nums2.  
- For each pair, check if nums1[i] is divisible by nums2[j] × k.  
- If yes, increment the count.

While this is O(n×m) time, the constraints (for Easy) likely mean this is acceptable.

Optimizing is possible if needed:  
- Precompute nums2[j] × k and, for each nums1[i], check if it is divisible by any precomputed value (still O(n×m)).  
- For large inputs or restrictions on values, frequency maps or divisor counting could help, but are likely unnecessary for this problem version.

The brute-force solution is simple, readable, and sufficient given problem constraints.

### Corner cases to consider  
- Empty nums1 or nums2: should return 0.
- nums1 or nums2 containing zeros.
- k is 1.
- Duplicates in nums1 or nums2 (pairs with same value multiple times).
- Very large or very small integers in nums1/nums2.

### Solution

```python
def numberOfPairs(nums1, nums2, k):
    # Initialize the count of good pairs
    count = 0
    # Loop through each element in nums1
    for num1 in nums1:
        # Loop through each element in nums2
        for num2 in nums2:
            # Compute the divisor
            divisor = num2 * k
            # Check if num1 is divisible by divisor
            if divisor != 0 and num1 % divisor == 0:
                count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m), where n = len(nums1), m = len(nums2), as we check every possible pair.
- **Space Complexity:** O(1) extra space, since only a counter is used; no extra arrays or recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if both arrays are very large?  
  *Hint: Think about precomputing divisors or using hash maps to count.*

- How would you handle if k could be zero?  
  *Hint: Any multiplication or division by zero should be carefully handled.*

- What if you wanted to return the actual pairs instead of just the count?  
  *Hint: Collect (i, j) indices that satisfy the divisibility test.*

### Summary
This problem exemplifies the classic double for-loop pattern—brute-force pairwise comparison.  
It's commonly applied to problems involving all-pairs checks, such as the "count pairs that satisfy some property" family.  
In more restrictive settings, hashing or divisor tricks might be appropriate, but O(n×m) is clear, robust, and directly answers the question for reasonable array sizes.