### Leetcode 1909 (Easy): Remove One Element to Make the Array Strictly Increasing [Practice](https://leetcode.com/problems/remove-one-element-to-make-the-array-strictly-increasing)

### Description  
Given an array of integers, determine if you can make it *strictly increasing* by removing **exactly one** element. An array is considered strictly increasing if for every index i (1 ≤ i < n), nums[i-1] < nums[i]. If the array is already strictly increasing, return True. If not, check if removing just one element (any one element) would make it strictly increasing.

### Examples  

**Example 1:**  
Input: `[1,2,10,5,7]`  
Output: `True`  
*Explanation: Remove `10` at index 2 to get `[1,2,5,7]`, which is strictly increasing.*

**Example 2:**  
Input: `[2,3,1,2]`  
Output: `False`  
*Explanation:  
Removing index 0: [3,1,2] (not strictly increasing)  
Removing index 1: [2,1,2] (not strictly increasing)  
Removing index 2: [2,3,2] (not strictly increasing)  
Removing index 3: [2,3,1] (not strictly increasing)  
No possible single removal results in a strictly increasing array.*

**Example 3:**  
Input: `[1,1,1]`  
Output: `False`  
*Explanation: Removing any element results in [1,1], which is not strictly increasing.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  Try removing every element one by one and check if the array becomes strictly increasing. This is O(n²) because for each of the n possible removals, we do O(n) work.

- **Optimal Observation:**  
  We only need to check the first **violation** (where nums[i-1] ≥ nums[i]), because removing more than one element is not allowed.  
  At the first violation, try removing either nums[i-1] or nums[i] and check whether the array is strictly increasing after that single removal. If either removal works, return True.  
  Otherwise, if there's a second violation (even after one removal), return False right away.

- **Why this approach:**  
  - Only the first violation needs checking (because fixing a later violation would have required more than one removal).
  - Checking both removal options at the first violation covers all cases.

### Corner cases to consider  
- Arrays that are already strictly increasing (should return True)
- Removal of the first or last element (especially for small arrays)
- Duplicate elements (e.g., [1,1,1] or [1,2,2])
- Arrays of length 2 (always strictly increasing after removing one element)
- Decreasing arrays (e.g., [5,4,3,2,1])
- Two consecutive or separated violations (should return False)

### Solution

```python
def canBeIncreasing(nums):
    n = len(nums)
    removed = 0    # Track how many elements we've "removed"
    for i in range(1, n):
        if nums[i] <= nums[i-1]:
            removed += 1
            if removed > 1:
                return False
            # Decide which element to "remove" for the best chance
            if i == 1 or nums[i] > nums[i-2]:
                # Removing nums[i-1] works
                continue
            else:
                # Must remove nums[i], so update nums[i] to nums[i-1] 
                # Effectively pretend nums[i] equals nums[i-1] so the sequence doesn't "jump"
                nums[i] = nums[i-1]
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) because we only scan through the array once, and all operations inside the loop are O(1).
- **Space Complexity:** O(1) extra space. We only use a few variables for bookkeeping, and modify the input in-place.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you are allowed to remove at *most* one element instead of *exactly* one?
  *Hint: Slightly easier, but similar logic applies. Just allow arrays that are already strictly increasing as well.*

- Can you solve this without modifying the input array?
  *Hint: Instead of editing nums[i], just always compare against previous or two-before values logically, not by assignment.*

- How would the solution change if duplicates were allowed in the target array (i.e., non-decreasing instead of strictly increasing)?
  *Hint: The violation check becomes nums[i] < nums[i-1] instead of nums[i] ≤ nums[i-1].*

### Summary
The core approach is to scan for violations of the strictly increasing property, and at the first violation, try removing either the previous or current element. This "greedy + one pass" pattern is very common in array modification or single-allowed-fault type questions. The pattern is also seen in "Longest Increasing Subsequence with at most one removal" or "Make Array Monotonic" variants.