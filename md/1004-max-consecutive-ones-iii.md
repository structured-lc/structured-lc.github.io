### Leetcode 1004 (Medium): Max Consecutive Ones III [Practice](https://leetcode.com/problems/max-consecutive-ones-iii)

### Description  
Given a binary array (only containing **0**s and **1**s) and an integer **k**, you are allowed to flip at most **k** zeroes to ones. The goal is to find the **maximum number of consecutive 1s** in the array, after flipping at most **k** zeroes. You want to optimally choose which zeroes to flip to get the longest segment of consecutive 1s.

### Examples  

**Example 1:**  
Input: `nums = [1,1,1,0,0,0,1,1,1,1,0]`, `k = 2`  
Output: `6`  
*Explanation: We can flip two zeros at positions 5 and 4 (0-indexed). The array becomes [1,1,1,0,1,1,1,1,1,1,0]. The maximum consecutive 1s is 6 (positions 3 to 8).*

**Example 2:**  
Input: `nums = [0,0,1,1,1,0,0]`, `k = 0`  
Output: `3`  
*Explanation: We can do no flips, so the longest segment of consecutive 1s is three (positions 2 to 4).*

**Example 3:**  
Input: `nums = [1,1,0,1]`, `k = 2`  
Output: `4`  
*Explanation: We can flip both zeros (even though there is only one zero, it's less than k), making the array [1,1,1,1]. The whole array is now consecutive 1s (length 4).*

### Thought Process (as if you’re the interviewee)  
Start by considering the brute-force solution:  
- For each subarray, count the number of 0s, and only keep subarrays with ≤ k zeros. Count the maximum length for such subarrays.  
- For an array of length n, the brute-force approach is **O(n²)**, which is inefficient for large arrays.

**Optimized Approach:**  
- Use the **sliding window** (two pointer) technique.
- Maintain a window \([left, right]\) which represents a candidate subarray.
- As you move `right` pointer, you count the number of zeros in the window.  
- If the number of zeros exceeds **k**, move the left pointer (`left`) to the right until the zero count is ≤ k again.
- Keep track of the maximum width of any valid window.

**Why sliding window?**  
- The optimal interval with at most k zeros is always a window, so we can adjust the window to contain at most k zeros and maximize its length—this greatly reduces time complexity to O(n).

### Corner cases to consider  
- Empty array: input = [], k = any value.
- All ones: input = [1,1,1], k = 0 or nonzero.
- All zeros: input = [0,0,0], k >, < or = array length.
- k = 0: no flips allowed.
- k ≥ length of array: can flip every zero (all 1s).
- One element arrays: input =  or [1].

### Solution

```python
def longestOnes(nums, k):
    # Initialize pointers and result variable
    left = 0
    zeros_flipped = 0
    max_len = 0

    # Use right pointer to expand the window
    for right in range(len(nums)):
        # If this element is a zero, we'll flip it
        if nums[right] == 0:
            zeros_flipped += 1

        # If window has more than k zeros, shrink from the left
        while zeros_flipped > k:
            if nums[left] == 0:
                zeros_flipped -= 1
            left += 1
        
        # Update max_len with the width of the current valid window
        max_len = max(max_len, right - left + 1)
    
    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each pointer (left and right) moves at most n times. All operations within the loop are constant time.

- **Space Complexity:** O(1)  
  Only constant extra space (pointers and counters) is used, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is not binary, but contains arbitrary values?  
  *Hint: How would you generalize the notion of "flip"?*

- How would you modify your algorithm if you want to not only return the length, but also the indices of such a segment?  
  *Hint: Track window boundaries when max is updated.*

- What happens if you have a stream of numbers (cannot keep all in memory)?  
  *Hint: Can the sliding window be implemented in an online fashion?*

### Summary
This problem is a classic example of the **sliding window** (two pointer) technique. It teaches how to optimize from an inefficient brute-force to a linear solution by maintaining a dynamic window with an invariant (at most k zeros). This pattern is also widely used in problems involving subarrays or substrings with constraints, like "Longest Substring with At Most K Distinct Characters" or "Minimum Window Substring".

### Tags
Array(#array), Binary Search(#binary-search), Sliding Window(#sliding-window), Prefix Sum(#prefix-sum)

### Similar Problems
- Longest Substring with At Most K Distinct Characters(longest-substring-with-at-most-k-distinct-characters) (Medium)
- Longest Repeating Character Replacement(longest-repeating-character-replacement) (Medium)
- Max Consecutive Ones(max-consecutive-ones) (Easy)
- Max Consecutive Ones II(max-consecutive-ones-ii) (Medium)
- Longest Subarray of 1's After Deleting One Element(longest-subarray-of-1s-after-deleting-one-element) (Medium)
- Maximize the Confusion of an Exam(maximize-the-confusion-of-an-exam) (Medium)
- Minimum Recolors to Get K Consecutive Black Blocks(minimum-recolors-to-get-k-consecutive-black-blocks) (Easy)
- Longest Nice Subarray(longest-nice-subarray) (Medium)
- Maximum Sum of Distinct Subarrays With Length K(maximum-sum-of-distinct-subarrays-with-length-k) (Medium)
- Maximum Enemy Forts That Can Be Captured(maximum-enemy-forts-that-can-be-captured) (Easy)