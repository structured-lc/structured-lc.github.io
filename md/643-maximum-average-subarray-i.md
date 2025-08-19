### Leetcode 643 (Easy): Maximum Average Subarray I [Practice](https://leetcode.com/problems/maximum-average-subarray-i)

### Description  
Given an integer array `nums` and an integer `k`, find the **maximum average value** among all contiguous subarrays of length `k`.  
Return this maximum average as a float.  
(In other words, out of all contiguous subarrays of length exactly `k`, find the one with the highest mean, and return that mean.)

### Examples  

**Example 1:**  
Input: `nums = [1, 12, -5, -6, 50, 3]`, `k = 4`  
Output: `12.75`  
*Explanation: The contiguous subarrays of length 4 are:  
[1, 12, -5, -6] → average = 0.5  
[12, -5, -6, 50] → average = 12.75 (maximum)  
[-5, -6, 50, 3] → average = 10.5*

**Example 2:**  
Input: `nums = [5]`, `k = 1`  
Output: `5.0`  
*Explanation: Only one possible subarray ([5]), so return 5.0*

**Example 3:**  
Input: `nums = [0,4,0,3,2]`, `k = 1`  
Output: `4.0`  
*Explanation: Each element forms a subarray of length 1; maximum is 4.0*

### Thought Process (as if you’re the interviewee)  
To begin, the brute-force approach would be to examine every possible subarray of length `k`, compute its sum, and keep track of the maximum sum seen. For an array of length `n`, that results in \(O(nk)\) time because there are \(n-k+1\) subarrays to check, each of which takes \(O(k)\) time to sum.

However, this can be optimized by using a **sliding window** technique. Compute the sum of the first `k` elements, then for each new subarray, subtract the element that is leaving the window and add the new element entering the window. This means each new window's sum can be computed in constant time, leading to \(O(n)\) total time.  
We track the maximum sum as we slide, then divide by `k` at the end to convert the maximum sum to an average.

This approach is efficient and easy to implement.

### Corner cases to consider  
- Array has only one element (`k = 1`)
- All elements are equal  
- All elements are negative  
- Large negative and positive values mixed  
- `k` equal to the length of the array  
- Array length is less than `k` (should not occur per constraints, but worth considering)

### Solution

```python
def findMaxAverage(nums, k):
    # Calculate sum of the first window of size k
    current_sum = sum(nums[:k])
    max_sum = current_sum
    
    # Slide the window through the rest of the array
    for i in range(k, len(nums)):
        # Add the next element, remove the element leaving the window
        current_sum += nums[i] - nums[i - k]
        # Update the max_sum if we found a new maximum
        if current_sum > max_sum:
            max_sum = current_sum
    
    # Return the average, not the sum
    return max_sum / k
```

### Time and Space complexity Analysis  

- **Time Complexity:** \(O(n)\). We build the first window in \(O(k)\), and then process \((n-k)\) additional windows, all in constant time per window, so \(O(n)\) overall.
- **Space Complexity:** \(O(1)\), since only a few variables are used for tracking sums and maximum; no extra storage based on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is very large and doesn’t fit in memory?  
  *Hint: Could you process the input as a stream, maybe with a fixed-size queue?*

- What if you needed to find the maximum average of any length, not just a fixed length \(k\)?  
  *Hint: How would you efficiently choose subarrays of varying lengths?*

- Can you also return the indices of the subarray achieving the maximum average?  
  *Hint: Track where the maximum window starts as you compute.*

### Summary
This problem is a **classic fixed-length sliding window**, which allows us to efficiently compute rolling sums (or averages) in \(O(n)\) time with \(O(1)\) space.  
The sliding window approach is broadly applicable to problems involving contiguous subarrays, such as maximum sum/average/minimum, and appears frequently in coding interviews and algorithmic practices.

### Tags
Array(#array), Sliding Window(#sliding-window)

### Similar Problems
- Maximum Average Subarray II(maximum-average-subarray-ii) (Hard)
- K Radius Subarray Averages(k-radius-subarray-averages) (Medium)