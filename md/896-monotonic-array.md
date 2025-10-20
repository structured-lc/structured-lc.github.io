### Leetcode 896 (Easy): Monotonic Array [Practice](https://leetcode.com/problems/monotonic-array)

### Description  
Given an integer array, determine if it is **monotonic**—that is, its elements are entirely non-increasing or non-decreasing. An array is monotonic increasing if every element is greater than or equal to the previous one throughout, and monotonic decreasing if every element is less than or equal to the previous one throughout. Arrays that only stay the same (all equal elements) are considered monotonic.

### Examples  

**Example 1:**  
Input: `[1,2,2,3]`  
Output: `True`  
*Explanation: Each element is greater than or equal to the one before it. The array never decreases.*

**Example 2:**  
Input: `[6,5,4,4]`  
Output: `True`  
*Explanation: Each element is less than or equal to the previous; the array is not increasing anywhere.*

**Example 3:**  
Input: `[1,3,2]`  
Output: `False`  
*Explanation: The sequence increases from 1→3, but then drops from 3→2. It's neither fully increasing nor fully decreasing.*

### Thought Process (as if you’re the interviewee)  
- First, let's clarify: a **monotonic array** stays entirely non-decreasing or non-increasing. Equal adjacent values are valid.
- **Brute Force:** Check for both possibilities separately:
  - Check if it ever decreases (for monotonic increasing).
  - Check if it ever increases (for monotonic decreasing).
  - If either test passes, the array is monotonic.
- **Optimized approach:**  
  - Traverse once, track whether any increasing and any decreasing pairs are found.
  - If both an increase and a decrease are found, immediately return False.
  - Finish traversal: if only one of the flags (`isIncreasing` or `isDecreasing`) is set, the array is monotonic.

### Corner cases to consider  
- Empty array (`[]`) or one element (e.g. `[5]`): always monotonic (trivially true).
- All equal elements (e.g. `[3,3,3,3]`): monotonic.
- An array with just a single change breaking monotonicity (e.g. `[2,2,3,2]`).
- Input with negative numbers or large/small values.

### Solution

```python
def isMonotonic(nums):
    # Initialize two flags to track increasing and decreasing
    is_increasing = False
    is_decreasing = False
    for i in range(1, len(nums)):
        if nums[i] > nums[i-1]:
            is_increasing = True
        elif nums[i] < nums[i-1]:
            is_decreasing = True
        # If we see both a rise and a fall, it's not monotonic
        if is_increasing and is_decreasing:
            return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = length of the array. We traverse the array once, comparing each adjacent pair.
- **Space Complexity:** O(1), only constant extra space for two boolean flags, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input is a linked list instead of an array?  
  *Hint: You can iterate through nodes and compare current with previous.*

- How would you check for strictly increasing or strictly decreasing arrays?  
  *Hint: Replace `>=` with `>` and `<=` with `<`.*

- Can you return whether it's monotonic increasing, decreasing, or both (e.g. all elements equal)?  
  *Hint: Track which flag is set, or tally separately.*

### Summary
This is a **single pass two-pointer pattern**, commonly used for array monotonicity, sortedness, and sequence evaluation. The pattern generalizes to problems that involve comparing adjacent elements under various constraints, such as consecutive duplicates, peaks/valleys, or plateau detection. The "track-two-flags" trick is a frequently recurring technique for verifying properties that could go in either direction.


### Flashcard
Check if the array is entirely non-decreasing or non-increasing by scanning once for both trends.

### Tags
Array(#array)

### Similar Problems
- Count Hills and Valleys in an Array(count-hills-and-valleys-in-an-array) (Easy)
- Find the Count of Monotonic Pairs I(find-the-count-of-monotonic-pairs-i) (Hard)