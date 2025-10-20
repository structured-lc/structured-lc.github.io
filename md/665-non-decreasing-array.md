### Leetcode 665 (Medium): Non-decreasing Array [Practice](https://leetcode.com/problems/non-decreasing-array)

### Description  
Given an array of integers, determine if it's possible to make the entire array **non-decreasing** by modifying at most **one element**.  
An array is non-decreasing if for every i (0 ≤ i < n-1), nums[i] ≤ nums[i+1].  
You need to return `True` if you can make the array non-decreasing with at most one change, otherwise return `False`.

### Examples  

**Example 1:**  
Input: `[4, 2, 3]`  
Output: `True`  
*Explanation: Change the 4 to 1 (or 2 or 3) to get `[1, 2, 3]`, which is non-decreasing.*

**Example 2:**  
Input: `[4, 2, 1]`  
Output: `False`  
*Explanation: No single change can make the whole array non-decreasing: changing 4→2 or 2→4 or 1→4 fails in each case.*

**Example 3:**  
Input: `[3, 4, 2, 3]`  
Output: `False`  
*Explanation: Multiple places break the rule (4>2 and 2<3), so one change isn't enough.*

### Thought Process (as if you’re the interviewee)  

First, I’d scan through the array and look for any index where the non-decreasing property is violated, i.e., where nums[i] > nums[i+1].

If there are **no such violations**, then the array is already non-decreasing and we return `True`.

If there is **more than one such violation**, then making only one change is impossible, and we return `False`.

When we detect one violation, there are two ways to fix it:
- Lower the value at nums[i] (so nums[i] ≤ nums[i+1]), or
- Increase the value at nums[i+1] (so nums[i] ≤ nums[i+1]).

We have to be careful: fixing nums[i] blindly might cause a new violation with nums[i-1], and fixing nums[i+1] blindly might affect the rest of the array.

If i==0, we can always lower nums.

If i>0:
- If nums[i-1] ≤ nums[i+1], we can safely set nums[i] = nums[i+1].
- Else, set nums[i+1] = nums[i].

Scan the whole array only once, counting violations and handling at most one.

Optimized approach is **O(n)**: one scan, and only keep a small constant of info at each step.

### Corner cases to consider  
- Array of length 1: always True (already non-decreasing)
- Array of length 2: always True (can always change either)
- All elements equal: True
- One dip at the very beginning or end
- Dips in the middle, especially overlapping dips
- All decreasing: at most one dip. Otherwise, False.
- Negative numbers, large positive and negative values

### Solution

```python
def checkPossibility(nums):
    count = 0  # Number of modifications used
    
    for i in range(1, len(nums)):
        if nums[i] < nums[i - 1]:  # Violation found
            count += 1
            if count > 1:
                return False
            # Decide which element to modify
            if i == 1 or nums[i - 2] <= nums[i]:
                # Lower nums[i-1], or it's safe to set nums[i-1] = nums[i]
                nums[i - 1] = nums[i]
            else:
                # Raise nums[i], or it's only safe to set nums[i] = nums[i-1]
                nums[i] = nums[i - 1]
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we make a single pass through the array.
- **Space Complexity:** O(1), since we only use a constant number of extra variables. (If in-place change isn’t allowed, copy the array: O(n))

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could change up to **k** elements, not just one?  
  *Hint: Can you count up to k violations and try to greedily decide which changes to make at each one?*

- What if you want to return the **actual modified array** (with at most 1 change), not just if it’s possible?  
  *Hint: Track the change and reconstruct, or modify in place as above and return.*

- What if the array is **cyclic** (last element connects to first)?  
  *Hint: You need to check and possibly modify at wrap-around.*

### Summary
This is a classic **greedy** pattern, focused on single-pass violation detection and local repair to enforce a global property (non-decreasing).  
It often appears in array adjustment, streaming validation, and competitive problem settings. The logic can also be adapted to **k-change** questions and sequence consistency checks.


### Flashcard
Scan for violations of non-decreasing order; if more than one, return false; if one, check if modifying nums[i] or nums[i+1] can fix it.

### Tags
Array(#array)

### Similar Problems
- Make Array Non-decreasing or Non-increasing(make-array-non-decreasing-or-non-increasing) (Hard)
- Find Good Days to Rob the Bank(find-good-days-to-rob-the-bank) (Medium)
- Count Non-Decreasing Subarrays After K Operations(count-non-decreasing-subarrays-after-k-operations) (Hard)