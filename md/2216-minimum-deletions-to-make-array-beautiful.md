### Leetcode 2216 (Medium): Minimum Deletions to Make Array Beautiful [Practice](https://leetcode.com/problems/minimum-deletions-to-make-array-beautiful)

### Description  
Given a 0-indexed array of integers `nums`, you want to delete the minimum number of elements to make the array **beautiful**. An array is beautiful if:
- Its length is even.
- For all even indices `i` (i.e., i = 0, 2, ...), `nums[i] ≠ nums[i+1]`.

Whenever you delete an element, the elements to its right shift left by one position. Return the minimum number of deletions needed.

### Examples  

**Example 1:**  
Input: `nums = [1,1,2,3,5]`  
Output: `1`  
Explanation: Delete either index 0 or 1. Result: `[1,2,3,5]` (“even” length and no even index i with nums[i] == nums[i+1]).

**Example 2:**  
Input: `nums = [1,1,2,2,3,3]`  
Output: `2`  
Explanation: Delete index 1 and 4. Result: `[1,2,2,3]`. After deletions: `[1,2,2,3]` is of even length and all even-positioned pairs are different.

**Example 3:**  
Input: `nums = [1,2,2,2,3,4]`  
Output: `1`  
Explanation: One optimal way: delete index 2. Result: `[1,2,2,3,4]` then delete 4 to make length even, or delete another “2” earlier for same effect.


### Thought Process (as if you’re the interviewee)  
First, brute-force: Try every possible subset—this is exponential and impractical.

Next, greedy approach: Iterate through `nums` while constructing a new beautiful array, greedily skip (delete) required elements when the beautiful conditions are about to be violated:
- If the current index is at an even position and current element equals the next, delete the current element.
- After every addition, track what would be the final array length (after deletions), since we finally must ensure the length is even (i.e., if it's odd, one extra deletion).

Why this approach?
- Because each time we want to ensure that no pair at even index is equal, and we want to keep as many as possible to minimize deletions.
- It’s `O(n)` time and `O(1)` space, since we only count and don't construct the actual beautiful array.


### Corner cases to consider  
- Empty array ⇒ Already beautiful (needs 0 deletions).
- Single-element array ⇒ Needs 1 deletion to make it even-length.
- All elements the same, e.g., `[7,7,7,7]`.
- No adjacent pairs ever violate the condition.
- Already beautiful input.
- Array with length already even vs. odd.


### Solution

```python
def minDeletion(nums):
    # Initialize count of deletions needed
    deletions = 0
    # The position (after deletions) we're constructing
    i = 0
    n = len(nums)
    while i < n - 1:
        # For current even index after previous deletions
        real_idx = i - deletions
        # If real_idx is even and nums[i] equals nums[i+1], delete nums[i]
        if nums[i] == nums[i + 1] and real_idx % 2 == 0:
            deletions += 1
            i += 1
        else:
            i += 1
    # After all deletions, check if length is even
    if (n - deletions) % 2 == 1:
        deletions += 1
    return deletions
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Justification: Single pass through the array, incrementing “i” by 1 on each step, sometimes skipping by 2, but never revisiting an element.
- **Space Complexity:** O(1).  
  Justification: No extra array/storage proportional to input, just integer counters.


### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to return the actual beautiful array, not just the minimum number of deletions?  
  *Hint: Build the output array directly while applying the same logic.*

- How to do it **in-place**, with no extra return array?
  *Hint: Overwrite elements in-place as you go, and return the length.*

- What if deletion cost varies per element (given as a "cost" array)?
  *Hint: Use dynamic programming to minimize total cost target, not count.*


### Summary
This problem uses a greedy, one-pass array construction pattern, focusing on minimal deletions by only looking at necessary local pairs and post-process length requirements. This is a classic greedy greedy/array-sweep, similar to “make string valid” or “remove minimal characters for property.” Patterns like this appear in string sanitization and two-pointer array/cursor problems.