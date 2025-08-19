### Leetcode 1343 (Medium): Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold [Practice](https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold)

### Description  
Given an array of integers, arr, and two integers k and threshold:  
Count how many contiguous subarrays of arr with length exactly k have an average value ≥ threshold.  
In other words: For every window of size k sliding over arr, if the sum of the k numbers divided by k is ≥ threshold, increment the count.  
Return the final count.

### Examples  

**Example 1:**  
Input: `arr = [2,2,2,2,5,5,5,8]`, `k = 3`, `threshold = 4`  
Output: `3`  
*Explanation: The subarrays of size 3 are: [2,2,2], [2,2,2], [2,2,5], [2,5,5], [5,5,5], [5,5,8].  
Their averages: 2, 2, 3, 4, 5, 6.  
Only [2,5,5], [5,5,5], and [5,5,8] have average ≥ 4 (that is, 4, 5, 6). So the answer is 3.*

**Example 2:**  
Input: `arr = [1,1,1,1,1]`, `k = 1`, `threshold = 0`  
Output: `5`  
*Explanation: Every subarray of size 1 is 1 (average is 1), which is ≥ 0. There are 5 such subarrays.*

**Example 3:**  
Input: `arr = [11,13,17,23,29,31,7,5,2,3]`, `k = 3`, `threshold = 5`  
Output: `6`  
*Explanation: Any window of size 3 has an average far above 5. There are 8 windows in total, and all of them satisfy the condition except the last two ([5,2,3], [2,3]). So, 6 subarrays meet the criterion.*

### Thought Process (as if you’re the interviewee)  
- Brute Force:  
  I could check every possible subarray of size k, sum every element, compute the average, and count if it’s ≥ threshold.  
  For each starting index 0..n-k, sum k elements, which is O(k) work per window, for O((n-k+1)×k) = O(nk) time.  
  This is too slow for large arrays.

- Optimization: Sliding Window:  
  Since each window of size k differs by just one element from the previous, maintain the sum in a variable.  
  For the initial window, sum up the first k elements.  
  Then, for each next window, subtract the element that leaves and add the new one that enters.  
  This makes checking every window O(1) time, so total is O(n).

- Trade-offs:  
  - Sliding window is always better here unless k≈n due to minimal overhead.
  - No extra space needed beyond a few variables.

I’d opt for the sliding window approach for efficiency and simplicity.

### Corner cases to consider  
- k = 1 (single element windows)  
- k equals the length of arr  
- arr contains all equal or all negative numbers  
- arr is empty or k > len(arr) (invalid, but should handle gracefully)  
- threshold larger than any value in arr (maybe 0 matches)  
- threshold smaller than any value in arr (maybe all match)

### Solution

```python
def numOfSubarrays(arr, k, threshold):
    # The required sum for average ≥ threshold is threshold * k
    target_sum = threshold * k
    n = len(arr)
    count = 0
    
    # Compute the sum of the first k elements
    window_sum = sum(arr[:k])
    
    # If the first window meets criteria, increment count
    if window_sum >= target_sum:
        count += 1
    
    # Slide the window through the array
    for i in range(k, n):
        # Subtract the element that just left, add the new one
        window_sum = window_sum - arr[i - k] + arr[i]
        
        if window_sum >= target_sum:
            count += 1
    
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of arr.  
  We visit each element once in the sliding window iteration, each operation is O(1).
- **Space Complexity:** O(1), only a few integer variables are used—no additional data structures proportional to input.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if you had to process a stream of incoming numbers, not a fixed array?  
  *Hint: Consider maintaining a fixed-size queue or circular buffer for the sliding window.*

- What if you needed to support queries for different window sizes k efficiently?  
  *Hint: Precompute prefix sums to allow O(1) range sum queries.*

- How would you adjust your code if negative numbers or floating point values are present?  
  *Hint: Take care with average calculations due to possible precision issues, but logic remains the same.*

### Summary
This solution is a textbook example of the sliding window pattern, a powerful and efficient way to handle problems involving subarrays of fixed size.  
Sliding window avoids redundant work by maintaining state (here, the sum) as you move, turning an O(nk) brute force into O(n).  
This coding pattern is broadly useful for subarray problems involving sums, averages, or maximum/minimum in a fixed-size window—like Maximum Sum Subarray, Minimum Size Subarray Sum, or Moving Average from Data Stream.

### Tags
Array(#array), Sliding Window(#sliding-window)

### Similar Problems
- K Radius Subarray Averages(k-radius-subarray-averages) (Medium)
- Count Subarrays With Median K(count-subarrays-with-median-k) (Hard)
- Apply Operations to Make All Array Elements Equal to Zero(apply-operations-to-make-all-array-elements-equal-to-zero) (Medium)