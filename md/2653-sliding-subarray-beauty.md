### Leetcode 2653 (Medium): Sliding Subarray Beauty [Practice](https://leetcode.com/problems/sliding-subarray-beauty)

### Description  
Given an integer array `nums`, and two integers `k` and `x`:  
For every contiguous subarray of length `k`, find its "beauty" defined as the xᵗʰ smallest negative integer in the subarray (counting only *negative* numbers).  
- If there are less than `x` negative numbers in the subarray, record beauty as `0`.  
- Return an array containing the beauty for each such window, moving from left to right.

Think: For each window of size `k`, look at all negative numbers in the window, and if there are at least `x`, choose the xᵗʰ smallest among negatives — else, output `0`.

### Examples  

**Example 1:**  
Input: `nums=[1, -1, -3, -2, 3, -2], k=3, x=2`  
Output: `[-1, -2, -2, -2]`  
*Explanation:*
- [1, -1, -3]: negatives = [-1, -3], x=2, so answer is second smallest = -1
- [-1, -3, -2]: negatives = [-1, -3, -2], 2ⁿᵈ smallest = -2
- [-3, -2, 3]: negatives = [-3, -2], 2ⁿᵈ smallest = -2
- [-2, 3, -2]: negatives = [-2, -2], 2ⁿᵈ smallest = -2

**Example 2:**  
Input: `nums=[-2, -3, 0], k=2, x=1`  
Output: `[-3, -3]`  
*Explanation:*
- [-2, -3]: negatives = [-2, -3], 1ˢᵗ smallest = -3
- [-3, 0]: negatives = [-3], 1ˢᵗ smallest = -3

**Example 3:**  
Input: `nums=[3, -1, -1, -1, 2, 3], k=3, x=3`  
Output: `[0, -1, -1, 0]`  
*Explanation:*
- [3, -1, -1]: negatives = [-1, -1], not enough for x=3 ⇒ 0
- [-1, -1, -1]: negatives = [-1, -1, -1], 3ʳᵈ smallest = -1
- [-1, -1, 2]: negatives = [-1, -1], not enough ⇒ 0

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  For every subarray of length `k`, filter the negatives, sort them, and pick the xᵗʰ smallest (if it exists).  
  Time: O(nk log k) — not efficient for large arrays.
- **Optimize:**  
  Since the value range for negatives is small (–50 to –1), use a frequency array of size 50.  
  As the window slides:
  - Add new negative number as it enters, remove one as it leaves (maintain count).
  - At each step, iterate from most negative (–50) upward, sum counts, and once you hit count ≥ x, you have found the xᵗʰ smallest negative.
  - If not found, output 0.

- This turns the above suboptimal solution into O(n × 50) = O(n) time, acceptable for constraints.
- Trade-off:  
  This approach is simple due to the small fixed range of negative values and ability to use "counting sort" ideas efficiently within the sliding window.

### Corner cases to consider  
- Arrays with no negative numbers at all (output 0’s).
- Windows where number of negatives is less than x (output 0).
- All numbers are negative.
- k > len(nums), should handle gracefully (could return empty array).
- Duplicates among negatives.
- nums with zeroes and positives only.
- x = 1 (need only smallest negative per window).

### Solution

```python
def getSubarrayBeauty(nums, k, x):
    # freq[i]: frequency of number -(i+1) in current window (for -1 to -50)
    freq = [0] * 50
    result = []
    n = len(nums)
    
    for i in range(n):
        # Add entering element to freq (if negative)
        if nums[i] < 0:
            freq[abs(nums[i]) - 1] += 1
        # Remove exiting element if window size exceeded k
        if i >= k and nums[i - k] < 0:
            freq[abs(nums[i - k]) - 1] -= 1
        
        # Once we hit window size k, check for xᵗʰ smallest negative
        if i >= k - 1:
            count = 0
            for mag in range(49, -1, -1):  # from -50 to -1
                count += freq[mag]
                if count >= x:
                    result.append(-(mag + 1))
                    break
            else:
                result.append(0)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n \* 50) = O(n)  
  - For each of n steps, possible 50 iterations for counting negatives within the small range.
- **Space Complexity:** O(1) (ignoring the output array), since freq array is fixed at size 50, regardless of input; output array O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if negatives could be in a wider value range, say up to –10⁶?  
  *Hint: Think of using balanced BST/multiset or heap for dynamic window queries.*

- Can you return not just the xᵗʰ negative, but the xᵗʰ element regardless of sign?  
  *Hint: Need to store non-negatives too; general sliding window order statistics problem.*

- What if the window size k can change dynamically while processing?  
  *Hint: Data structure and frequency update methods need to be dynamic, or reinitialize as window size changes.*

### Summary
This is a classic **fixed-size sliding window with order-statistics** in a bounded integer range, optimized by using a counting array (like counting sort bucket).  
Commonly appears when value range is fixed/small, enabling O(1) or O(r) updates per window rather than O(k log k) sorts.  
Pattern generalizes to: Sliding window median, k-th largest/smallest in window problems, especially when values are bounded.  
Key insight: **Count array instead of sort or BST when value range is small.**

### Tags
Array(#array), Hash Table(#hash-table), Sliding Window(#sliding-window)

### Similar Problems
