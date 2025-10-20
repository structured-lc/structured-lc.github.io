### Leetcode 3721 (Hard): Longest Balanced Subarray II [Practice](https://leetcode.com/problems/longest-balanced-subarray-ii)

### Description  
Given an integer array `nums`, a subarray is **balanced** if the number of distinct even integers equals the number of distinct odd integers. You are to find the length of the longest such contiguous subarray.  
- You only count **distinct** integers for even and odd parity in the subarray.
- Return the length of the longest balanced subarray.

### Examples  

**Example 1:**  
Input: `nums = [3, 2, 2, 5, 4]`  
Output: `5`  
*Explanation: Distinct evens: {2, 4}, Distinct odds: {3, 5}. Both counts are 2, so the entire array is balanced.*

**Example 2:**  
Input: `nums = [2, 3, 2, 3, 6, 7, 6, 8]`  
Output: `8`  
*Explanation: Distinct evens: {2, 6, 8}, Distinct odds: {3, 7}. Counts are 3 vs 2, so not fully balanced. But `[2, 3, 2, 3, 6, 7]` (indices 0-5) has 2 distinct evens (2, 6) and 2 odds (3, 7), so length 6. The longest is `[2, 3, 2, 3, 6, 7, 6, 8]` where evens={2,6,8}, odds={3,7}, not balanced. So the longest is 6.*

**Example 3:**  
Input: `nums = [1, 2, 3, 4, 5, 6]`  
Output: `6`  
*Explanation: `{1,3,5}` odd and `{2,4,6}` even — 3 each. The whole array is balanced, so output is 6.*


### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Iterate over every possible subarray, compute the sets of distinct even and odd numbers, and check balance for each.  
  - Time: O(n³) (since for each O(n²) subarray, we need O(n) for set construction).

- **Optimization:**  
  Brute-force is too slow for n up to 10⁵.  
  Let's use the sliding window (two pointers) technique. Maintain sets for evens and odds as we expand the window. If balanced (same size), record length.  
  However, removing elements from the left means we must decrement counts correctly, possibly using dictionaries to track distinct counts.  
  - At each step, insert/remove from sets and check balance.
  - Time: O(n) per insertion, but with efficient bookkeeping (use Counter and only pop when count drops to zero).

- **Trade-off:**  
  Compared to brute-force, sliding window is much faster. With smart bookkeeping, keeping sets updated per window expansion/contraction is efficient.

- **Final Approach:**  
  Use two pointers (left, right) for the window.  
  Track `even_count` and `odd_count` dictionaries for distinct in the window.  
  When moving right, update counts. When moving left, decrement counts when shrinking window.  
  If count of distinct evens equals count of distinct odds, record length.  
  - Time: O(n), since each element is processed a constant number of times.  
  - Space: O(n) for the counts.

### Corner cases to consider  
- Empty array  
- Array with only even or only odd numbers  
- All elements repeated  
- Whole array is already balanced  
- No balanced subarrays  
- Multiple equally optimal answers  
- Single element array

### Solution

```python
def longestBalancedSubarray(nums):
    # Store last seen index for each number (to handle duplicates)
    from collections import Counter

    max_len = 0
    left = 0
    even_count = Counter()
    odd_count = Counter()

    for right, num in enumerate(nums):
        if num % 2 == 0:
            even_count[num] += 1
        else:
            odd_count[num] += 1

        # Shrink window to keep minimum window where even/odd counts differ
        while True:
            even_distinct = len(even_count)
            odd_distinct = len(odd_count)
            # If counts are equal, valid balanced window
            if even_distinct == odd_distinct:
                max_len = max(max_len, right - left + 1)
                break
            # Otherwise, shrink window from left
            remove_num = nums[left]
            if remove_num % 2 == 0:
                even_count[remove_num] -= 1
                if even_count[remove_num] == 0:
                    del even_count[remove_num]
            else:
                odd_count[remove_num] -= 1
                if odd_count[remove_num] == 0:
                    del odd_count[remove_num]
            left += 1

    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n), as each number is added/removed from the window at most once; all other operations (dict/counter update, length check) are O(1).

- **Space Complexity:**  
  O(n) for storing counts of numbers within the window — each number could be distinct.

### Potential follow-up questions (as if you’re the interviewer)  

- What if array elements range up to 10¹⁸?  
  *Hint: Are there issues with the size of dict if all numbers are distinct? Are there lookup optimizations possible?*

- Can you solve with only O(1) extra space if limits allow?  
  *Hint: Is there a mathematical trick for bounded values?*

- How do you output the subarray itself, not just its length?  
  *Hint: Track start index whenever max is updated.*

### Summary  
This problem uses a **sliding window + hashmap/counting** technique to efficiently track distinct parity counts. The pattern is common for longest subarray/substring problems with balance or equality conditions (see: longest subarray with equal numbers, balanced parentheses, etc.). This approach generalizes to other “balanced” subarray/substring type interview questions where state can be encoded and window updated efficiently.

### Tags

### Similar Problems
