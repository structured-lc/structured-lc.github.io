### Leetcode 3641 (Medium): Longest Semi-Repeating Subarray [Practice](https://leetcode.com/problems/longest-semi-repeating-subarray)

### Description  
Given an array of integers `nums` and an integer `key`, find the length of the longest contiguous subarray in which **at most `key` elements repeat**.  
*“Repeat”* here means a number appears more than once in the subarray.  
Subarrays must be contiguous; for every subarray you consider, the number of numbers that occur more than once is ≤ key.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,2,1,2,3,2,1], key = 2`  
Output: `6`  
*Explanation: Longest such subarray is [3,2,1,2,3,2].  
Inside this subarray, only two numbers (2 and 3) repeat. The length is 6.*

**Example 2:**  
Input: `nums = [4,5,4,5,6,7], key = 1`  
Output: `4`  
*Explanation: Longest such subarray is [4,5,4,5].  
Only one value (either 4 or 5) repeats. Length is 4.*

**Example 3:**  
Input: `nums = [1,2,3,4,5], key = 0`  
Output: `5`  
*Explanation: All values unique, so no repeats; the full array is valid. Length is 5.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For every possible subarray (O(n²)), count the number of elements that repeat (use a frequency map). If repeated numbers ≤ key, update the max length. This is too slow: O(n³) overall.

- **Optimization:**  
  Use a **sliding window (two pointers)** and a frequency counter (hash map) to move through `nums`.  
  - Expand the window by moving the right pointer.  
  - Track counts of each value inside the window.  
  - Also maintain a count of "currently repeating" numbers (those with frequency ≥ 2).  
  - If the count of repeating numbers exceeds `key`, shrink the window from the left until condition is restored.

- **Why this works:**  
  Each element is added/removed from the window at most once, making it O(n).  
  - Trade-off: Need to count "distinct numbers that repeat". Updating this efficiently is key.

### Corner cases to consider  
- Empty array: nums = [], key = any value (should return 0).
- All elements unique, key = 0 (entire array is valid).
- All elements the same, key = 1 or more (length can be whole array).
- key ≥ number of unique repeated values (entire array is valid).
- Single element array.
- key = 0 for array with duplicates (only strictly unique subarrays allowed).
- Negative numbers, zero.

### Solution

```python
def longest_semi_repeating_subarray(nums, key):
    # Map to store frequency of each number in current window
    freq = {}
    # Number of values with frequency >= 2 (i.e. currently repeating)
    repeat_count = 0
    left = 0
    max_len = 0
    
    for right, num in enumerate(nums):
        # Add right element to current window
        freq[num] = freq.get(num, 0) + 1
        # If num becomes repeating (exactly 2)
        if freq[num] == 2:
            repeat_count += 1
        
        # Shrink the window if not satisfying the condition
        while repeat_count > key:
            left_num = nums[left]
            freq[left_num] -= 1
            # If left_num just stopped being repeating
            if freq[left_num] == 1:
                repeat_count -= 1
            left += 1
        
        # Update max length found so far
        max_len = max(max_len, right - left + 1)
    
    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Each number is inserted and removed from the window at most once. All updates in the hash map are O(1) amortized.
- **Space Complexity:** O(u), where u is the number of unique numbers in nums. (For the frequency map.)

### Potential follow-up questions (as if you’re the interviewer)  

- What if you want the number of subarrays (not just the length) that satisfy the semi-repeating property?  
  *Hint: Think about counting, not just max window.*

- How would you adapt the solution if “repeat” was defined as “appearing at least 3 times” rather than twice?  
  *Hint: Generalize the definition and the counting.*

- What if you also wanted to list all starting indices of maximum-length valid subarrays?  
  *Hint: Track window positions whenever you update max_len.*

### Summary
- This uses the classic **sliding window** technique with a hash map for counting, optimized to be O(n).
- This pattern is broadly used for "longest/shortest subarray with at most X property" questions, e.g. longest substring with at most K distinct characters, or with at most K changes.
- Understanding how to efficiently count properties within a moving window (without recomputing for every window) is the key transferable skill.

### Tags

### Similar Problems
