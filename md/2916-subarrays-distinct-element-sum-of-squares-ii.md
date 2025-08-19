### Leetcode 2916 (Hard): Subarrays Distinct Element Sum of Squares II [Practice](https://leetcode.com/problems/subarrays-distinct-element-sum-of-squares-ii)

### Description  
Given an array of integers, you are to find the sum over all subarrays of the square of the count of distinct elements in each subarray.  
For every possible contiguous subarray, count how many unique elements it contains, square that count, and add that value to the total.  
Return that total sum.

### Examples  

**Example 1:**  
Input: `nums = [1,2,1]`  
Output: `15`  
*Explanation: The subarrays and their distinct element counts:  
[1] → 1 unique → 1² = 1   
[2] → 1 unique → 1² = 1  
[1] → 1 unique → 1² = 1  
[1,2] → 2 uniques → 2² = 4  
[2,1] → 2 uniques → 2² = 4  
[1,2,1] → 2 uniques → 2² = 4  
Total: 1 + 1 + 1 + 4 + 4 + 4 = 15*

**Example 2:**  
Input: `nums = [1,2,3]`  
Output: `21`  
*Explanation:  
[1] → 1²=1  
[2] → 1²=1  
[3] → 1²=1  
[1,2] → 2²=4  
[2,3] → 2²=4  
[1,2,3] → 3²=9  
Total: 1+1+1+4+4+9 = 21*

**Example 3:**  
Input: `nums = [2,2,2]`  
Output: `9`  
*Explanation:  
All subarrays have only 1 unique element: each subarray's count squared is 1.  
There are 6 subarrays, so total = 6 × 1 = 6.*

### Thought Process (as if you’re the interviewee)  
First, let's clarify the brute-force approach:  
For every subarray, count the number of unique elements, square it, and sum for all subarrays.  
This naive approach is O(n³):  
- O(n²) subarrays (all ranges [i, j])  
- O(n) to count unique elements in each subarray  

But that's too slow for large n (typical hard LeetCode problem expects O(n log n) or O(n²) at most).

The optimization idea is:  
- For each subarray, we can try to keep track of the distinct count efficiently, maybe using a hash map.
- Sliding window with two pointers can help count the number of subarrays with k unique elements (but the problem wants the sum of squares of distinct counts, not just “at least k” or “exactly k”).

Observation:  
- Each occurrence of an element uniquely contributes to subarrays containing it, possibly enabling advanced combinatorial or Mo’s algorithm techniques.

A better approach is to think in terms of contribution:  
- For each occurrence of each element, how many subarrays have it as a distinct element?  
- Or, can we do DP or inclusion-exclusion with prefix/suffix data structures?  
- Some high-level solutions suggest using segment trees, Mo's algorithm, or optimized two-pointer maps with state rollback.

Since this is “II”, it's likely we must handle larger inputs efficiently—so O(n²) or better with careful optimization is needed.  
One semi-optimal but interview-acceptable approach:  
- For each left index, move the right boundary with a hashmap that counts element frequencies.  
- As we move right, increment the unique count when seeing a new value, decrement if leaving one behind.  
- For each right, add (current unique count)² to answer.  
- Reset hashmap/counts at next left step.

This solution is O(n²), but with low constant—acceptable for n up to 2–3k.

### Corner cases to consider  
- Empty array (should be 0, or invalid input)
- Array of all the same element  
- Array of all unique elements  
- Array with alternating pattern, e.g., [1,2,1,2,1]  
- Single-element array  
- Arrays with negative numbers

### Solution

```python
def sum_of_squares_of_distinct_counts(nums):
    n = len(nums)
    total = 0

    for left in range(n):
        freq = {}
        unique = 0
        for right in range(left, n):
            val = nums[right]
            # If first time seeing, increase unique count
            if freq.get(val, 0) == 0:
                unique += 1
            freq[val] = freq.get(val, 0) + 1
            # For subarray nums[left:right+1], add square of unique count
            total += unique * unique

    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), as you consider every subarray by varying the left and right indices. The map operations are amortized O(1), so inner loop is O(n).
- **Space Complexity:** O(n), for the frequency hashmap per outer iteration.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you devise an O(n log n) or O(n) algorithm?  
  *Hint: Think about merging intervals efficiently or exploiting repeated patterns with advanced data structures.*

- What if you want to find the sum of cubes, not squares?  
  *Hint: Consider how the contribution principle might generalize for higher powers.*

- Can you process dynamic updates (add/remove an element) efficiently?  
  *Hint: Investigate data structures for dynamic frequency tracking, e.g., segment trees or Mo’s.*

### Summary
The brute-force approach considers all subarrays and counts the unique numbers in O(n) per subarray, leading to O(n²) time.  
It uses the **hashmap + two pointers** pattern, common for sliding window subarray uniqueness/count problems.  
More advanced approaches (for very large arrays) may involve segment trees, Mo’s algorithm, or contribution techniques—but for interview and practical competitive code this pattern is highly adaptable for substring/subarray distinct element statistics.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Binary Indexed Tree(#binary-indexed-tree), Segment Tree(#segment-tree)

### Similar Problems
