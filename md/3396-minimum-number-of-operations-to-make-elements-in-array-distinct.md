### Leetcode 3396 (Easy): Minimum Number of Operations to Make Elements in Array Distinct [Practice](https://leetcode.com/problems/minimum-number-of-operations-to-make-elements-in-array-distinct)

### Description  
Given an integer array **nums**, remove elements from the beginning in groups of 3 (or all, if <3) as many times as needed so that all remaining elements are **distinct**.  
Return the *minimum number* of such operations required to end up with all unique elements (an empty array is always valid).

### Examples  

**Example 1:**  
Input: `[1,2,3,4,2,3,3,5,7]`  
Output: `2`  
*Explanation:  
First remove `[1,2,3]` → `[4,2,3,3,5,7]`  
Second remove `[4,2,3]` → `[3,5,7]` (now all unique).*

**Example 2:**  
Input: `[4,5,6,4,4]`  
Output: `2`  
*Explanation:  
First remove `[4,5,6]` → `[4,4]`  
Second remove `[4,4]` (all) → `[]` (empty, thus valid).*

**Example 3:**  
Input: `[6,7,8,9]`  
Output: `0`  
*Explanation:  
All elements are already unique, no need to remove anything.*

### Thought Process (as if you’re the interviewee)  
To solve this, I need to repeatedly remove the first 3 elements until the rest of the array is all distinct.  
- **Brute-force:** Try removing 0, 1, 2… groups of 3 from the front, and for each case, check if the rest are unique. This is feasible since `n` is small (≤100).
- **Optimized Approach:**  
  Start checking from the *original* array—if unique, return 0.  
  For k = 1,2,… do: remove first 3\*k elements and check uniqueness.  
  As soon as we find a valid subarray, stop: return k.  
  Since array size is small, even the naive approach works in O(n²).

Alternative (single-pass): Traverse from the end to the front, keeping a set of seen elements. If any duplicate is encountered at position i, then all elements up to i must be removed. The minimum operations is ceil((i+1)/3), since we can only remove at most 3 per operation.

I choose the backward traversal with a set because it's efficient (O(n)), easy to code, and works for all constraints.

### Corner cases to consider  
- Array of length 1.
- All elements distinct from the start.
- All elements the same (worst case).
- Array with exactly 3 elements—all same, all distinct, or mix.
- Length not divisible by 3.
- Removing all elements (empty array) is always considered valid.

### Solution

```python
def minimum_operations(nums):
    # Keep a set of elements we've seen while traversing from right.
    seen = set()
    # Process from the last index to the front
    for i in range(len(nums) - 1, -1, -1):
        if nums[i] in seen:
            # Duplicate detected—need to remove up to index i.
            # Return number of operations: ceil((i+1)/3)
            return (i + 3) // 3
        seen.add(nums[i])
    # All elements are already unique
    return 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the array length, because we iterate once from back to front, and set lookups/adds are O(1).
- **Space Complexity:** O(u), where u is the number of unique elements (max 100), so O(1) overall due to constraints.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could remove any k (not just 3) elements from the front?  
  *Hint: How would you generalize the formula for groups of k?*

- What if you could remove from the **end** instead of the front, or from anywhere?  
  *Hint: Does greedy removal still work?*

- How to extend this if elements are objects and uniqueness is by a comparator function?  
  *Hint: How do you maintain/set uniqueness in that situation?*

### Summary
This problem leverages the **set uniqueness** and **sliding window/group removal** pattern. The optimal O(n) idea is to traverse from the end, and the earliest duplicate tells us how many elements we must remove, grouped into ⌈(i+1)/3⌉ operations. This pattern arises in array/window problems where element uniqueness is the property to maintain.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
- Minimum Increment to Make Array Unique(minimum-increment-to-make-array-unique) (Medium)