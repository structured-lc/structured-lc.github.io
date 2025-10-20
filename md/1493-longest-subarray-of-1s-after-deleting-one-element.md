### Leetcode 1493 (Medium): Longest Subarray of 1's After Deleting One Element [Practice](https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element)

### Description  
Given a binary array (**only contains 0’s and 1’s**), you are required to delete exactly **one** element from the array (regardless of whether it is a 0 or 1). After this deletion, return the **length of the longest contiguous subarray** consisting only of 1’s.  
If it's not possible to obtain such a subarray (e.g., the original array had only one element), return 0.  
This problem tests your understanding of subarrays and efficient windowing.

### Examples  

**Example 1:**  
Input: `[1,1,0,1]`  
Output: `3`  
*Explanation: Remove the `0` at index 2, subarray becomes `[1,1,1]` => length 3.*

**Example 2:**  
Input: `[0,1,1,1,0,1,1,0,1]`  
Output: `5`  
*Explanation: Remove the `0` at index 4, array becomes `[0,1,1,1,1,1,0,1]`, the longest subarray of 1’s is `[1,1,1,1,1]` => length 5.*

**Example 3:**  
Input: `[1,1,1]`  
Output: `2`  
*Explanation: Even though all are 1’s, we must delete one element. Removing any 1 splits the array into two 1’s, max subarray is of length 2.*

### Thought Process (as if you’re the interviewee)  
Let me start by describing a brute-force approach:

- For each index, simulate deleting that element.
- For the resulting array, scan for the longest contiguous segment of 1’s.
- This would be \(O(n^2)\), which is not efficient for larger inputs.

I can optimize using a **sliding window** technique. Since we must delete one element, the process is equivalent to finding the **longest window with at most 1 zero** (since we can “remove” a zero by skipping it during window expansion). The catch, however, is that we must guarantee exactly one deletion:

- Use two pointers (`left` and `right`) to define our window.
- Track how many zeros are in the window.
- When the count of zeros exceeds 1, shrink the window from the left until we have at most one zero.
- Always record the window length minus one (because we must delete a single element).
- Special edge: if there’s no zero in the original array, we must still delete something—hence, output should be \( n-1 \).

Advantages: this approach runs in \(O(n)\) time and uses only a few variables.

### Corner cases to consider  
- The input is all 1’s ⇒ the answer is the length minus one, since we must remove an element.
- The input is all 0’s ⇒ after deleting any one, still left with all 0’s, so output should be 0.
- Only one element: cannot form a non-empty subarray after deleting, so output is 0.
- Multiple zeros grouped together.
- Zeros at the start or end.

### Solution

```python
def longestSubarray(nums):
    max_len = 0
    left = 0
    zero_count = 0

    for right in range(len(nums)):
        # Count zeros in current window
        if nums[right] == 0:
            zero_count += 1

        # Shrink window if > 1 zero
        while zero_count > 1:
            if nums[left] == 0:
                zero_count -= 1
            left += 1

        # Update max, but window size minus 1 (we have to delete one element)
        max_len = max(max_len, right - left)  # Not right - left + 1

    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** \(O(n)\) — Each index is visited at most twice (once as `right`, once as `left`), so the approach is linear in the number of elements.
- **Space Complexity:** \(O(1)\) — Only a few integer variables are used, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if you could delete **at most** one element instead of exactly one?  
  *Hint: Consider what happens if the array is all 1’s or if skipping deletion produces a longer subarray.*

- What if you were to generalize the problem to deleting up to **k** elements?  
  *Hint: Can you adapt the sliding window technique to allow up to k zeros inside the window?*

- Could this approach work on streaming data (where the array is too large to fit in RAM)?  
  *Hint: Streaming-compatible logic, think about maintaining a fixed window or just two pointers.*

### Summary
This problem demonstrates a classic **sliding window** pattern for finding the longest subarray with certain constraints—particularly useful when considering “at most k replacements/deletions.” The sliding window technique is broadly applicable for problems dealing with contiguous subarrays and constraints on the window content (like sum, distinct elements, or limited replacements). The core insight in this problem is reducing the exact-delete-one-element constraint to a limited-zero subarray window.


### Flashcard
Use sliding window to find longest subarray with at most one zero (since deleting one element); track window bounds for O(n) solution.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Sliding Window(#sliding-window)

### Similar Problems
- Max Consecutive Ones III(max-consecutive-ones-iii) (Medium)