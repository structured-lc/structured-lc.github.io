### Leetcode 2917 (Easy): Find the K-or of an Array [Practice](https://leetcode.com/problems/find-the-k-or-of-an-array)

### Description  
Given an integer array `nums` and an integer `k`, compute the **K-or** of the array.  
For each bit position \( i \), consider how many elements in `nums` have that bit set (i.e., are 1 at that position). The resultant **K-or** is an integer where the iᵗʰ bit is set if and only if at least **k** elements of `nums` have their iᵗʰ bit set.  
Return this integer.

### Examples  

**Example 1:**  
Input: `nums = [7, 12, 9, 8, 9, 15]`, `k = 4`  
Output: `9`  
*Explanation:*
- Bit 0 is set in nums (=7), nums[2] (=9), nums[4] (=9), nums[5] (=15) → 4 times
- Bit 3 is set in nums[1] (=12), nums[2] (=9), nums[3] (=8), nums[4] (=9), nums[5] (=15) → 5 times
- All other bits < k.
- K-or = 2⁰ + 2³ = 1 + 8 = **9**

**Example 2:**  
Input: `nums = [10, 8, 5, 9, 11, 6, 8]`, `k = 1`  
Output: `15`  
*Explanation:*  
k = 1 means the answer is the normal bitwise OR of the array.  
All bits that are set in at least 1 element must also be set in the result:  
10 | 8 | 5 | 9 | 11 | 6 | 8 = **15**

**Example 3:**  
Input: `nums = [1, 2, 4]`, `k = 3`  
Output: `0`  
*Explanation:*  
Each number has only one distinct bit set, so **no** position is set in all three numbers.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** For each bit position (say 0–30), check all numbers to count how many set that bit. If count ≥ k, set that bit in the answer.
- **Optimizing:** Observe that for each bit, only a linear scan/count across the array is needed (no sorting). Since there are at most 31 bits for standard integer inputs, the total time is very manageable.
- **Trade-offs:** There is no more efficient way (such as using bitwise operators globally), since for each bit we must count the number of times it is present. This is acceptable for n up to 10⁵.

### Corner cases to consider  
- Empty array (`nums=[]`), k = any value → Output = 0
- k > len(nums) → Output = 0 (no bit can be set at least k times)
- k = 1 → Output = standard bitwise OR for array
- All numbers zero → Output = 0
- All elements identical → Output = the element itself (if k ≤ len(nums)), else 0

### Solution

```python
def find_k_or(nums, k):
    # If nums is empty, return 0 directly
    if not nums:
        return 0

    result = 0
    # Check up to 30 for standard 32-bit non-negative integers
    for bit in range(31):
        count = 0
        for num in nums:
            # Check if bit 'bit' is set in num
            if (num >> bit) & 1:
                count += 1
        # If at least k numbers have this bit set, include it in result
        if count >= k:
            result |= (1 << bit)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × 31) = O(n). For each of 31 bits, we scan the whole array of n elements.
- **Space Complexity:** O(1) extra. Only counters and result integer. No significant extra storage is needed (apart from input).

### Potential follow-up questions (as if you’re the interviewer)  

- What if k = 1 always?  
  *Hint: You can use a bitwise OR directly.*

- How would you modify the solution for negative numbers?  
  *Hint: Think about the bit representation of signed integers in Python.*

- Can this be parallelized?  
  *Hint: Each bit’s count can be computed independently.*

### Summary
This problem is a classic example of **bit counting** and manipulation, specifically applied to the "at least k out of n" pattern for setting bits. The main pattern—looping over bits and counting set occurrences—is extremely useful in problems involving majority bits, checking for at least t times set bits, or even advanced voting/aggregation tasks. It's a staple in bitwise manipulation interview questions.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Counting Bits(counting-bits) (Easy)
- Sum of Values at Indices With K Set Bits(sum-of-values-at-indices-with-k-set-bits) (Easy)