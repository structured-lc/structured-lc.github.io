### Leetcode 3191 (Medium): Minimum Operations to Make Binary Array Elements Equal to One I [Practice](https://leetcode.com/problems/minimum-operations-to-make-binary-array-elements-equal-to-one-i)

### Description  
Given a binary array `nums`, you can select any three consecutive elements and flip them (change 0 → 1 and 1 → 0) in one operation. Your task is to find the **minimum number of operations** required to make every element in `nums` equal to 1. If it's impossible, return -1.

### Examples  

**Example 1:**  
Input: `nums = [0,1,1,1,0,0]`  
Output: `3`  
*Explanation:*
- Flip the first 3: `[1,0,0,1,0,0]`
- Flip from index 1: `[1,1,1,0,0,0]`
- Flip last window: `[1,1,1,1,1,1]`

**Example 2:**  
Input: `nums = [0,1,1,1]`  
Output: `-1`  
*Explanation:*  
- After flipping from index 0: `[1,0,0,1]`
- Now, there's no way to reach all 1's—remaining zeros cannot be flipped (need a window of 3).

**Example 3:**  
Input: `nums = [1,1,1]`  
Output: `0`  
*Explanation:*  
- No flip needed since all are already 1.

### Thought Process (as if you’re the interviewee)  
- Start by considering brute-force: try all possible flip sequences, but this is exponential (not acceptable for large n).
- Notice that each flip impacts 3 elements. If we always flip at the leftmost 0, that zero gets turned to 1 immediately.
- For each index from left to n-3, whenever a 0 is found, flip the window starting there.  
- After reaching the last two elements, if any 0 remains, it's impossible (since no window of size 3 can start there).
- This greedy sequential approach guarantees minimal operations because we always "fix" the leftmost 0 as early as possible, minimizing overlap and unnecessary flips.

### Corner cases to consider  
- Array is already all 1's.
- Array has a length less than 3 and contains any zeros.
- Multiple zeros stacked at the end not within a flippable window.
- Empty array (trivially returns 0).
- Flips creating new zeros—ensure logic always processes in left-to-right so these newly created zeros are handled.

### Solution

```python
def minOperations(nums):
    n = len(nums)
    ops = 0
    for i in range(n - 2):
        # If current is zero, need to flip window starting at i
        if nums[i] == 0:
            # Flip nums[i], nums[i+1], nums[i+2]
            nums[i] ^= 1
            nums[i + 1] ^= 1
            nums[i + 2] ^= 1
            ops += 1
    # Check last two positions (cannot flip anymore)
    if nums[-2] == 0 or nums[-1] == 0:
        return -1
    return ops
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each element is visited once, and each flip operation is constant time.

- **Space Complexity:** O(1)  
  Only a few variables are used.  
  Note: This modifies the input array in-place; if not allowed, make a copy (O(n) space).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the allowed window size was different (e.g., 2, 4, k)?
  *Hint: How would the coverage of flipping change? What if the array's length isn't divisible by k?*

- Can you solve it without modifying the original array?
  *Hint: Simulate flips using extra storage, perhaps prefix-sums or flip counting.*

- If the array was extremely large (streaming), is there a way to solve in O(1) extra space?
  *Hint: Think about in-place marking, and constraints on the streaming model.*

### Summary
This is a classic greedy, window sliding, or simulation problem. The key is always "handle the leftmost zero as soon as possible." This ensures global minimal operations, relying on the property that flipping three consecutive values can fix zeros in a propagating fashion. The technique is broadly useful in bit-manipulation, simulation, and "minimum moves to uniform array" type questions.