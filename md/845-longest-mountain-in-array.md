### Leetcode 845 (Medium): Longest Mountain in Array [Practice](https://leetcode.com/problems/longest-mountain-in-array)

### Description  
Given an array of integers, a **mountain** is defined as a subarray of at least length 3, where there exists some index \( i \) (not at the boundaries) such that:
- The elements strictly increase up to the \( i^{th} \) index (the peak).
- Afterwards, elements strictly decrease.
Your task is to find the length of the longest subarray that forms a mountain. If there is no such subarray, return 0.

### Examples  

**Example 1:**  
Input: `[2,1,4,7,3,2,5]`  
Output: `5`  
*Explanation: The largest mountain is [1,4,7,3,2]: elements increase to 7, then decrease. The length is 5.*

**Example 2:**  
Input: `[2,2,2]`  
Output: `0`  
*Explanation: There is no mountain since there is no strictly increasing then strictly decreasing sequence.*

**Example 3:**  
Input: `[0,2,3,4,5,2,1,0]`  
Output: `8`  
*Explanation: The whole array is a mountain: it increases to 5, then strictly decreases to 0. Length is 8.*

### Thought Process (as if you’re the interviewee)  
Start with the brute-force idea: For every possible subarray of length ≥3, check if it's a mountain by validating the strict increasing to a peak, and then decreasing. This would be O(n³).

Optimize:
- Iterate with a single pointer. For each possible peak (not the boundary), expand left to find the start of the increasing sequence, expand right to find the end of the decreasing sequence.
- Only consider an element as a peak if it's strictly greater than its neighbors (arr[i-1] < arr[i] > arr[i+1]).
- Whenever a valid mountain is found, update the answer with its length.
- Move the main pointer beyond the right boundary of the current mountain to avoid re-checking.
- This is O(n), only requiring a constant number of traversals per element.

This single-pass, two-pointer approach is both efficient and easy to implement.

### Corner cases to consider  
- Array too short: length < 3.
- Plateaus: consecutive duplicates (e.g., [2,2,2,2]), not a mountain.
- No decreasing or no increasing sequence.
- Multiple adjacent or overlapping mountains.
- Mountains with peak at the beginning or end (not valid).
- Strictly increasing or decreasing arrays.
- Valleys (decrease then increase), not valid.

### Solution

```python
def longestMountain(arr):
    n = len(arr)
    max_len = 0
    i = 1  # Start from the 1st index, as peak can't be at the edge

    while i < n - 1:
        # Check if arr[i] is a peak
        if arr[i-1] < arr[i] > arr[i+1]:
            # Expand left
            left = i - 1
            while left > 0 and arr[left-1] < arr[left]:
                left -= 1

            # Expand right
            right = i + 1
            while right < n - 1 and arr[right] > arr[right+1]:
                right += 1

            # Update max_len
            mountain_len = right - left + 1
            if mountain_len >= 3:
                max_len = max(max_len, mountain_len)

            # Move to the end of this mountain
            i = right
        else:
            i += 1
    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each element is visited at most twice, once when growing left/right, and once as the main index.
- **Space Complexity:** O(1), only a constant amount of extra space is needed for indices and counters.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve it in a single pass without extra space?  
  *Hint: Use two pointers and track the state for increasing/decreasing directly.*

- How would you adapt the approach to return the **actual subarrays** themselves, not just their length?  
  *Hint: Store the start/end indices whenever a mountain is found.*

- What if the array is streamed, and you can only keep a window of size k at a time?  
  *Hint: Use a fixed-size buffer to check potential mountains within the window.*

### Summary
This problem is a classic application of the **two-pointer** and **state machine** patterns for sequence analysis. Identifying peaks and expanding outwards optimally finds mountains in O(n) time with O(1) space. This mountain pattern is relevant to other "find peak/valley/plateau" sequence problems often discussed in array scanning or sliding window interviews.


### Flashcard
For each possible peak, expand left and right to find increasing and decreasing sequences; update max length if both sides exist.

### Tags
Array(#array), Two Pointers(#two-pointers), Dynamic Programming(#dynamic-programming), Enumeration(#enumeration)

### Similar Problems
- Minimum Number of Removals to Make Mountain Array(minimum-number-of-removals-to-make-mountain-array) (Hard)
- Find Good Days to Rob the Bank(find-good-days-to-rob-the-bank) (Medium)