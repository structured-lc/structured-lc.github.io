### Leetcode 2016 (Easy): Maximum Difference Between Increasing Elements [Practice](https://leetcode.com/problems/maximum-difference-between-increasing-elements)

### Description  
Given an array of integers `nums`, find the **maximum difference** between two elements `nums[j] - nums[i]` such that `0 ≤ i < j < n` and `nums[i] < nums[j]`.  
If there is **no such pair**, return `-1`.  
In other words: among all pairs where the jᵗʰ number comes after the iᵗʰ number, and the iᵗʰ number is strictly smaller, what is the largest possible difference `nums[j] - nums[i]` you can get?

### Examples  

**Example 1:**  
Input: `nums = [7,1,5,4]`  
Output: `4`  
*Explanation: The maximum difference is 5 - 1 = 4 (i = 1, j = 2).*

**Example 2:**  
Input: `nums = [9,4,3,2]`  
Output: `-1`  
*Explanation: No pair (i, j) with i < j and nums[i] < nums[j] exists. Every later value is not greater than any earlier value.*

**Example 3:**  
Input: `nums = [1,5,2,10]`  
Output: `9`  
*Explanation: The maximum difference is 10 - 1 = 9 (i = 0, j = 3).*

### Thought Process (as if you’re the interviewee)  

- **Brute-force Approach:**  
  For every i, check every j with i < j, and if nums[j] > nums[i], keep track of the maximum nums[j] - nums[i]. This is O(n²), which will be too slow for large arrays.

- **Optimized Approach:**  
  Instead of looking at every possible pair, iterate through the array from left to right.  
  - Use a variable to track the *minimum element* found so far (call it `min_so_far`).  
  - For each new number at index j, if it is greater than `min_so_far`, compute the difference and update the answer if it's larger than the previous differences.
  - If current number is smaller than `min_so_far`, update `min_so_far`.  
  This way, for each index, the best i (earlier index) is always the minimum seen so far to its left.  
  This method is O(n) time and O(1) space.

- **Why this approach?**  
  It efficiently narrows the search space by only remembering the smallest number so far, ensuring valid i < j relationship and minimum comparison overhead.

### Corner cases to consider  
- Array length less than 2 (cannot form a pair, should return -1)
- All elements equal (no nums[i] < nums[j], must return -1)
- Array strictly decreasing (no valid pairs)
- Array strictly increasing (should return last - first)
- Duplicates but valid increase present  
- Large or small numbers (for integer overflow test, but Python handles big ints)

### Solution

```python
def maximumDifference(nums):
    # Track the minimum value seen so far as potential i
    min_so_far = nums[0]
    max_diff = -1  # Default value if no valid pair found

    # Start from the 2nd element
    for j in range(1, len(nums)):
        if nums[j] > min_so_far:
            # Calculate the difference and update max_diff if it's larger
            diff = nums[j] - min_so_far
            if diff > max_diff:
                max_diff = diff
        else:
            # Update min_so_far as nums[j] is the new minimum
            min_so_far = nums[j]

    return max_diff
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because we scan the list once, updating `min_so_far` and max_diff on the fly.
- **Space Complexity:** O(1), since only a couple of integer variables are used; no extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you must also return the indices (i, j) of the pair that yields the maximum difference?  
  *Hint: Track i (min_so_far index) and j along with values.*

- How would your approach change if allowed to swap i and j (i can be after j)?  
  *Hint: The problem becomes finding the maximum and minimum in the array, and their difference.*

- Can this problem be solved with divide and conquer or with a segment tree for dynamic queries?  
  *Hint: Consider real-time queries for maximum difference between subarrays.*

### Summary
This problem uses the **one-pass tracking pattern**, maintaining a running minimum and comparing on-the-fly, which is common in maximum subarray or minimum/maximum difference tasks. This approach is efficient (O(n), O(1)) and frequently seen in array scanning, stock-buy-sell type, and sliding window variations.


### Flashcard
Find the maximum difference between increasing elements by tracking the minimum element seen so far.

### Tags
Array(#array)

### Similar Problems
- Best Time to Buy and Sell Stock(best-time-to-buy-and-sell-stock) (Easy)
- Two Furthest Houses With Different Colors(two-furthest-houses-with-different-colors) (Easy)