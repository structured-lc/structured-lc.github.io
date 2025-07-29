### Leetcode 674 (Easy): Longest Continuous Increasing Subsequence [Practice](https://leetcode.com/problems/longest-continuous-increasing-subsequence)

### Description  
Given an unsorted array of integers, you need to find the length of the **longest contiguous (subarray) strictly increasing subsequence**.  
A subsequence is considered continuous if it occupies consecutive positions in the original array, and strictly increasing if every element is larger than its immediate predecessor.  
For example, in the array `[1, 3, 5, 4, 7]`, `[1, 3, 5]` is a valid continuous increasing subsequence, while `[1, 3, 5, 7]` is not considered because the elements are not contiguous (4 separates 5 and 7).  

### Examples  

**Example 1:**  
Input: `[1,3,5,4,7]`  
Output: `3`  
*Explanation: The longest continuous increasing subsequence is `[1,3,5]`, which has length 3. Even though `[1,3,5,7]` is an increasing subsequence, it's not continuous because 4 interrupts between 5 and 7.*

**Example 2:**  
Input: `[2,2,2,2,2]`  
Output: `1`  
*Explanation: All elements are the same, so the longest strictly increasing continuous subsequence is any single element like `[2]`. Its length is 1.*

**Example 3:**  
Input: `[1,2,3,4,5]`  
Output: `5`  
*Explanation: The whole array `[1,2,3,4,5]` is strictly increasing and contiguous, so its length is 5.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea**:  
  For every starting index, expand to the right as long as the sequence is strictly increasing. Track the maximum length found.   
  - This is O(n²) and inefficient for large input.

- **Optimization (Linear scan)**:  
  As we move from left to right, increment a counter (`curLen`) each time the current element is greater than its predecessor.  
  - If it's not, reset the counter to 1 (start new sequence from this element).
  - Keep a running variable (`maxLen`) that records the maximum value of `curLen` so far.
  - This is O(n) time since every element is processed once.

- **Approach choice**:  
  The optimized, single-pass method is best.  
  - It uses constant space.
  - Simple to implement.
  - Handles all edge cases, including arrays with all equal elements or strictly decreasing arrays.

### Corner cases to consider  
- Empty array ⇒ should return 0.
- Array with only 1 element ⇒ answer is 1.
- All elements equal ⇒ answer is 1.
- Strictly decreasing array ⇒ answer is 1.
- Array with multiple equal-length increasing segments.

### Solution

```python
def findLengthOfLCIS(nums):
    # Handle edge case: empty array
    if not nums:
        return 0

    max_len = 1  # Keeps track of the maximum subsequence length
    cur_len = 1  # Length of the current increasing subsequence

    # Start from the second element
    for i in range(1, len(nums)):
        # If current value is greater than the previous, increase length
        if nums[i] > nums[i - 1]:
            cur_len += 1
            max_len = max(max_len, cur_len)
        else:
            # Reset current length if sequence breaks
            cur_len = 1

    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each element is visited exactly once.

- **Space Complexity:** O(1)  
  Only a few integer variables are used for bookkeeping, no extra storage based on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to return the **actual subsequence**, not just its length?  
  *Hint: Track the start and end indices of current and max segments.*

- How would the solution change if the subsequence doesn’t need to be continuous?  
  *Hint: This becomes the "Longest Increasing Subsequence" problem and often needs O(n log n) solutions.*

- How would you modify the solution to compute the longest **decreasing** continuous subsequence?  
  *Hint: Change the comparison to nums[i] < nums[i - 1].*

### Summary
This problem is an example of the **sliding window or counting pattern** on arrays, where you process items in a single pass and keep running counters or bounds. It's a common pattern, especially for problems involving subarrays or consecutive elements.  
Recognizing that the problem requires a continuous subsequence and only needs O(1) extra space greatly simplifies the solution. Similar logic appears in problems like "Longest Substring Without Repeating Characters" and "Maximum Consecutive Ones".