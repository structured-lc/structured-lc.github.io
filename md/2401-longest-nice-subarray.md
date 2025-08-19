### Leetcode 2401 (Medium): Longest Nice Subarray [Practice](https://leetcode.com/problems/longest-nice-subarray)

### Description  
Given an array of positive integers, find the length of the longest contiguous subarray such that for every pair of elements at different positions in the subarray, the bitwise AND of the pair is 0.  
In other words, for any indices i ≠ j inside the chosen subarray, (nums[i] & nums[j]) == 0.  
Subarrays must be contiguous. Subarrays of length 1 are always considered nice.


### Examples  

**Example 1:**  
Input: `[1,3,8,48,10]`  
Output: `3`  
*Explanation: The longest nice subarray is `[3,8,48]`.  
- 3 & 8 = 0  
- 3 & 48 = 0  
- 8 & 48 = 0  
No longer nice subarray exists in the input.*

**Example 2:**  
Input: `[3,1,5,11,13]`  
Output: `1`  
*Explanation: Any subarray of length 1 is nice. There is no pair of elements at different indices with AND == 0 for length ≥ 2.*

**Example 3:**  
Input: `[1,2,4,8]`  
Output: `4`  
*Explanation: The subarray `[1,2,4,8]` is nice because  
- 1 & 2 = 0  
- 1 & 4 = 0  
- 1 & 8 = 0  
- 2 & 4 = 0  
- 2 & 8 = 0  
- 4 & 8 = 0*


### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Check all possible subarrays. For each, examine all pairs (i, j) within and verify (nums[i] & nums[j]) == 0.  
  For n elements: O(n³) due to the nested loops — not feasible for large inputs.

- **Optimization via Bitmask/Sliding Window:**  
  Notice:  
  - For no two numbers in the window to overlap on any 1 bits, all set bits in the current window must be at different positions.  
  - Use a bitmask (`current_mask`) representing all set bits in the current window.  
  - Start with two pointers (`start`, `end`).  
  - For each new `nums[end]`, as long as `current_mask & nums[end] != 0` (overlap), move `start` forward and remove `nums[start]` from mask until we can safely add `nums[end]`.  
  - Always update the answer with the current window size.  
  This is similar to a sliding window for substring with unique characters, using bit operations instead.

- **Final Approach:**  
  Use the sliding window technique with a bitmask to track set bits in the window.  
  Tradeoff: O(n) time, O(1) space (mask integer). Allows for a single pass with fast bitwise checks.

### Corner cases to consider  
- Empty array (though constraints say n ≥ 1).
- All elements are the same (only length 1 works).
- All elements are powers of 2 (no set bits overlap, whole array is nice).
- Very large numbers (handle int64 range).
- Mixed small and large elements.

### Solution

```python
def longestNiceSubarray(nums):
    max_len = 0         # Result: track the longest nice length
    current_mask = 0    # Bitmask of all set bits in the current window
    left = 0            # Left boundary of sliding window

    for right in range(len(nums)):
        # If nums[right] shares set bits with current_mask, window is no longer "nice"
        while current_mask & nums[right]:
            # Remove nums[left]'s bits from mask and shrink window
            current_mask ^= nums[left]
            left += 1
        # Add this number's bits to the mask
        current_mask |= nums[right]
        # Update max_len with the window size
        max_len = max(max_len, right - left + 1)

    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since both left and right pointers stop at most n positions, and each bitmask operation is O(1).
- **Space Complexity:** O(1), as all extra memory is for a few integers, regardless of input size.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the input numbers can be negative?
  *Hint: Consider how bitwise AND interacts with negative numbers in two’s complement.*

- Can you return the actual subarray, not just the length?
  *Hint: Track the window boundaries when updating the result.*

- How would you solve this if subarrays did not need to be contiguous?
  *Hint: What standard problems does this become — think about subsets and bitmasks.*

### Summary
This problem reduces to a sliding window with a bitmask. It’s a variant of the classic “longest substring with unique characters” using bitwise constraints.  
Common patterns: Sliding window, two pointers, and bitmasking to enforce non-overlapping bits.  
This pattern appears in substring/subarray problems with uniqueness, mutual exclusion, or disjointness of elements.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation), Sliding Window(#sliding-window)

### Similar Problems
- Longest Substring Without Repeating Characters(longest-substring-without-repeating-characters) (Medium)
- Bitwise AND of Numbers Range(bitwise-and-of-numbers-range) (Medium)
- Bitwise ORs of Subarrays(bitwise-ors-of-subarrays) (Medium)
- Fruit Into Baskets(fruit-into-baskets) (Medium)
- Max Consecutive Ones III(max-consecutive-ones-iii) (Medium)
- Get Equal Substrings Within Budget(get-equal-substrings-within-budget) (Medium)
- Frequency of the Most Frequent Element(frequency-of-the-most-frequent-element) (Medium)
- Longest Substring Of All Vowels in Order(longest-substring-of-all-vowels-in-order) (Medium)
- Maximize the Confusion of an Exam(maximize-the-confusion-of-an-exam) (Medium)
- Maximum Sum of Distinct Subarrays With Length K(maximum-sum-of-distinct-subarrays-with-length-k) (Medium)