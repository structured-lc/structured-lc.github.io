### Leetcode 2090 (Medium): K Radius Subarray Averages [Practice](https://leetcode.com/problems/k-radius-subarray-averages)

### Description  
Given an integer array `nums` and an integer `k`, for every index `i`, compute the average of the subarray centered at `i` with radius `k`, i.e., the subarray from index `i-k` to `i+k` (inclusive). If there are not enough elements before or after index `i` (i.e., if `i-k < 0` or `i+k >= n`), output `-1` for that position. Use integer division to calculate averages (truncate the decimal).

### Examples  

**Example 1:**  
Input: `nums = [7,4,3,9,1,8,5,2,6]`, `k = 3`  
Output: `[-1,-1,-1,5,4,4,-1,-1,-1]`  
*Explanation: Indices 3, 4, 5 are the only positions where both k elements to the left and k elements to the right exist. For index 3: average = (7+4+3+9+1+8+5)//7 = 37//7 = 5. Similarly for others. For positions without enough neighbors, return -1.*

**Example 2:**  
Input: `nums = [100000]`, `k = 0`  
Output: `[100000]`  
*Explanation: For k=0, only the single element subarrays are considered. The average is the element itself.*

**Example 3:**  
Input: `nums = `, `k = 100000`  
Output: `[-1]`  
*Explanation: The radius required exceeds the bounds of the array, so output is -1 for the only element.*

### Thought Process (as if you’re the interviewee)  
First, I’d describe a brute-force method:
- For every index, check if there are at least `k` elements to the left and right.
- If so, sum up all elements from `i-k` to `i+k`, then divide by (2×k+1) and put that in the result.
- This approach is O(n × k), which is inefficient for large k and n.

To optimize, I can use a **sliding window**:
- Calculate the sum of the first valid window (`2×k+1` elements).
- As the window slides forward, subtract the first element of the previous window and add the next new element.
- This gives O(n) time since each element is added and subtracted once.

Finally, handle the case when `k=0` (each element is its own average) and when `2×k+1 > n` (never possible to compute an average, so all `-1`).

### Corner cases to consider  
- Empty array
- Array of length less than 2×k+1
- k=0 (window length is 1)
- Very large k (much larger than array size)
- Negative integers in nums
- All elements the same

### Solution

```python
def getAverages(nums, k):
    n = len(nums)
    res = [-1] * n

    window_size = 2 * k + 1
    if window_size > n:
        return res

    # Use a running sum to maintain the sum of the current window.
    window_sum = sum(nums[:window_size])

    for i in range(k, n - k):
        # Compute the average centered at index i
        res[i] = window_sum // window_size
        # Slide window forward by one, unless at last valid index
        if i + k + 1 < n:
            window_sum += nums[i + k + 1] - nums[i - k]

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Slide the window across the array, each step doing a constant time update.
- **Space Complexity:** O(n)  
  Result array of size n is required; sliding sum is O(1) extra space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is streaming and you can only process elements as they arrive?  
  *Hint: Use a queue or deque to maintain the sliding window and running sum.*

- How would you extend this to compute k-radius *medians* instead of averages?  
  *Hint: Use two heaps (max heap, min heap) to maintain window medians efficiently.*

- What if you are not allowed to use additional O(n) space for the result?  
  *Hint: Mutate the input array in-place where possible, but understand how to handle overlaps carefully.*

### Summary
This problem demonstrates the **sliding window** technique to process subarrays of fixed size efficiently. It's a classic application of keeping a running sum (for averages), similar to moving averages in data streams, substring problems, or stock price summaries. The pattern is useful in any situation requiring aggregate statistics over all subarrays/windows of constant length.


### Flashcard
Use a sliding window of size 2k+1 to compute averages efficiently; if not enough elements on either side, output -1.

### Tags
Array(#array), Sliding Window(#sliding-window)

### Similar Problems
- Minimum Size Subarray Sum(minimum-size-subarray-sum) (Medium)
- Moving Average from Data Stream(moving-average-from-data-stream) (Easy)
- Subarray Sum Equals K(subarray-sum-equals-k) (Medium)
- Maximum Average Subarray I(maximum-average-subarray-i) (Easy)
- Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold(number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold) (Medium)
- Find the Grid of Region Average(find-the-grid-of-region-average) (Medium)