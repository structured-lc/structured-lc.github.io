### Leetcode 2501 (Medium): Longest Square Streak in an Array [Practice](https://leetcode.com/problems/longest-square-streak-in-an-array)

### Description  
Given an integer array, find the length of the **longest square streak** in the array.  
A **square streak** is a sequence where each next element is the square of the previous, and all elements of the sequence appear in the array (in any order, and can only use each number once per streak).   
You must return the length of the longest such sequence (must be length ≥ 2), or -1 if none exists.

### Examples  

**Example 1:**  
Input: `nums = [4, 16, 256, 2]`  
Output: `3`  
*Explanation: Possible streak is [2, 4, 16] (since 2²=4, 4²=16). Alternatively, [4, 16, 256] also works. Both have length 3.*

**Example 2:**  
Input: `nums = [2, 3, 5, 7]`  
Output: `-1`  
*Explanation: No two numbers where one is the square of the other exist, so no streak of length ≥ 2.*

**Example 3:**  
Input: `nums = [9, 3, 81, 27, 243, 729]`  
Output: `2`  
*Explanation: [3, 9] (because 3²=9), or [9, 81] (9²=81), or any pair where one is the square of the other, but there’s no longer streak.*

### Thought Process (as if you’re the interviewee)  
First, let’s try to brute-force: for every number, generate all possible streaks by repeatedly squaring and checking if the result exists in the array. This would be very inefficient, especially if numbers get large.

To optimize, I’d:
- Store all numbers in a **set** for O(1) lookup.
- For every number in the array, treat it as a starting point, and repeatedly check if its square is present (e.g., 2 → 4, 4 → 16, etc.).
- For each valid step, increment the streak length.
- Only consider streaks of length ≥ 2.
- Always keep track of the maximum found.

Trade-offs:
- Using a set avoids duplicate lookup work and improves time complexity.
- We only try forward, so no double work.
- Avoiding single-element streaks (length = 1), as per the problem.

This approach is efficient and does not require sorting or advanced data structures.

### Corner cases to consider  
- Array with one element: should return -1.
- All numbers are unique, but no squares.
- Duplicates in the array: should not affect the result, because we only care if the number exists, not how many times.
- Very large numbers; beware integer overflow and squaring limits.
- Numbers not in increasing order (since order doesn't matter).

### Solution

```python
def longestSquareStreak(nums):
    # Convert nums to a set for fast O(1) lookups
    num_set = set(nums)
    max_streak = -1

    for num in nums:
        streak_len = 0
        current = num

        # Each step: check if next square exists; repeat as needed.
        while current in num_set:
            streak_len += 1
            current = current * current  # Square the current number

        # Only update if streak is at least 2 numbers
        if streak_len >= 2:
            max_streak = max(max_streak, streak_len)

    return max_streak
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k), where n = len(nums) and k is the maximum possible depth of squaring before leaving the set. Each number can only generate a short sequence due to squaring growing fast, so this is very efficient in practice.
- **Space Complexity:** O(n), to store the set of numbers for O(1) lookup and a few integers for counters.

### Potential follow-up questions (as if you’re the interviewer)  

- What if negative numbers and zero are allowed?  
  *Hint: What happens if you square negatives or zero repeatedly?*

- Can we reconstruct and return the actual longest streak, not just the length?  
  *Hint: Track which numbers were involved for best sequence.*

- How do you handle very large numbers (e.g. 10¹⁸)?  
  *Hint: What is the upper bound you would consider due to integer overflow?*

### Summary
This problem uses the **hash set / hash map** pattern for fast existence checks and repeated forward chaining.  
It's similar to problems where you extend sequences by some operation (like Consecutive Sequence, or Longest Increasing Subsequence), but here the operation is "square" rather than "+1" or "+k".  
Usefulness: The existence set trick often appears when you need to build custom sequences efficiently.

### Tags
Array(#array), Hash Table(#hash-table), Binary Search(#binary-search), Dynamic Programming(#dynamic-programming), Sorting(#sorting)

### Similar Problems
