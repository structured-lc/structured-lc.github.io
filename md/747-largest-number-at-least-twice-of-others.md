### Leetcode 747 (Easy): Largest Number At Least Twice of Others [Practice](https://leetcode.com/problems/largest-number-at-least-twice-of-others)

### Description  
Given an integer array `nums` where the largest element is guaranteed to be unique, determine if this largest element is **at least twice as large as every other number** in the array.  
If yes, return the **index** of this largest element; otherwise, return **-1**.  
This means: For all other elements x, does `max_num ≥ 2 × x` hold?

### Examples  

**Example 1:**  
Input: `nums = [3,6,1,0]`  
Output: `1`  
*Explanation: Largest is 6 (index 1).  
For the rest: 6 ≥ 2×3, 6 ≥ 2×1, 6 ≥ 2×0 (all true). Return 1.*

**Example 2:**  
Input: `nums = [1,2,3,4]`  
Output: `-1`  
*Explanation: Largest is 4 (index 3).  
Is 4 ≥ 2×3? No (4 < 6).  
Return -1.*

**Example 3:**  
Input: `nums = [0,0,3,2]`  
Output: `-1`  
*Explanation: Largest is 3 (index 2).  
3 ≥ 2×2? 3 < 4, so it's false.  
Return -1.*

### Thought Process (as if you’re the interviewee)  
First, identify the **largest** number and its index.  
Then, check if this number is **at least twice** EVERY other number in the array.

- **Brute-force:** For each index i, check if nums[i] is at least twice every other number. This takes O(n²), which is not necessary.
- **Optimized:** Only the largest number needs to be checked.  
  - **Find max and index in one pass**, and the **second largest** number.  
  - If max ≥ 2 × second_max, return max_index, else -1.

This only needs two variables for max and second_max, so it's quick and clean.

### Corner cases to consider  
- Array of length 2 (e.g., [0, 1])
- All elements but one are 0
- Largest is much larger (e.g., [1, 9, 2, 18])
- Negative numbers? (Not needed, as constraints: 0 ≤ nums[i] ≤ 100)
- Largest number at start, end, or middle
- Repeats (but largest is guaranteed unique)

### Solution

```python
def dominantIndex(nums):
    # Find the largest and second largest values, and the index of the largest
    max_num = -1
    second_max = -1
    max_index = -1

    for i, num in enumerate(nums):
        if num > max_num:
            second_max = max_num    # update runner-up before max_num changes
            max_num = num
            max_index = i
        elif num > second_max:
            second_max = num

    # Check if the largest is at least twice as large as the second largest
    if max_num >= 2 * second_max:
        return max_index
    else:
        return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Need one pass to find max, index, and second max.
- **Space Complexity:** O(1)  
  Constant extra vars, no extra storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the largest is not guaranteed to be unique?  
  *Hint: How would you handle array like [2, 2, 1]?*

- Can you solve it in one pass without using two variables for max and second max?  
  *Hint: Can you update both as you scan?*

- What if the problem allowed negative numbers?  
  *Hint: Will your logic still work, or do you need a change?*

### Summary
This problem uses a **single pass max and runner-up max search**—a frequent pattern for “top-k” or “dominant/majority” style problems.  
It’s efficient (O(n), O(1)) and easy to reason about, and this pattern regularly appears in leaderboards, majority element, and similar “dominant” checks.

### Tags
Array(#array), Sorting(#sorting)

### Similar Problems
- Keep Multiplying Found Values by Two(keep-multiplying-found-values-by-two) (Easy)
- Largest Number After Digit Swaps by Parity(largest-number-after-digit-swaps-by-parity) (Easy)