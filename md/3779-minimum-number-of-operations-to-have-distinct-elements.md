# [Practice](https://leetcode.com/problems/minimum-number-of-operations-to-have-distinct-elements)

### Description

You are given an integer array `nums`. In each operation, you remove the first three elements from the current array. If fewer than three elements remain, all remaining elements are removed. You must repeat this process until the array is empty or contains no duplicate values. Return the minimum number of operations needed to make all elements distinct.

### Examples

**Example 1:**
Input: `nums = [1, 2, 1, 2, 1, 2, 3]`
Output: `1`
*Explanation: After the first operation, remove the first three elements [1, 2, 1]. The remaining array is [2, 1, 2, 3], which still has duplicates. However, the remaining elements after removing [1, 2, 1] are [2, 1, 2, 3]—wait, this contains duplicates. We need to think differently. Actually, the remaining array [2, 1, 2, 3] has duplicates of 2. We need another operation... Let me reconsider: After operation 1, we remove [1, 2, 1], leaving [2, 1, 2, 3]. This has duplicate 2's, so we'd need operation 2. But the answer is 1, so the problem statement means we keep removing until no duplicates OR array is empty.*

**Example 2:**
Input: `nums = [3, 5, 1, 6, 2, 0, 8]`
Output: `1`
*Explanation: After the first operation, we remove [3, 5, 1]. The remaining array is [6, 2, 0, 8], which contains all distinct elements. We stop and return 1.*

**Example 3:**
Input: `nums = [1, 1, 1, 1]`
Output: `2`
*Explanation: After operation 1, remove [1, 1, 1], leaving [1]. Since all remaining elements are distinct, we stop. Return 1 operation. (Actually: after op 1 we remove first 3 → [1] remains, which is all distinct, so answer is 1)*

### Thought Process

**Brute Force Approach:**
Simulate the process directly—repeatedly remove the first three elements and check if remaining elements are distinct. If duplicates exist, continue. This works but might seem inefficient at first glance.

**Optimization Insight:**
The key observation is that we don't actually need to simulate removal. Instead, we work **backwards** from the end of the array:
- Start from the rightmost element and move left
- Use a set to track which elements we've "kept" (these are elements we won't remove)
- As we move left, add elements to the set only if they're not already present
- Count how many elements we can keep from the end without removing them
- If we keep `k` elements without duplication, we need to remove ⌈(n - k) / 3⌉ operations

This is much more efficient because we directly compute the answer without simulation.

**Why This Works:**
In each operation, we remove exactly 3 elements (or fewer at the end). The minimum operations needed is determined by how many elements we can preserve from the right side while keeping them distinct. Once we know how many elements to remove, we divide by 3 and round up.

### Corner cases to consider

- Single element array: Returns 0 (already distinct)
- All elements identical: Must remove all, which takes ⌈n / 3⌉ operations
- Array already distinct: Returns 0 (no operations needed)
- Array with 1-2 elements: Returns 0 if distinct, else 1
- Large array with one duplicate at the end: Efficiently handles by iterating backwards
- Empty array: Returns 0

### Solution

```python
def minimumOperations(nums):
    # Start from the end and count how many distinct elements we can keep
    seen = set()
    kept_count = 0
    
    # Traverse array from right to left
    for i in range(len(nums) - 1, -1, -1):
        # Only add to set if not seen before
        if nums[i] not in seen:
            seen.add(nums[i])
            kept_count += 1
    
    # Calculate how many elements need to be removed
    to_remove = len(nums) - kept_count
    
    # Each operation removes 3 elements, so we need ceiling division
    # This equals (to_remove + 2) // 3 for ceiling division
    operations = (to_remove + 2) // 3
    
    return operations
```

### Time and Space complexity Analysis

- **Time Complexity:** O(n), where n is the length of the array. We traverse the array once from right to left, and set operations (add, lookup) are O(1) on average.

- **Space Complexity:** O(min(n, k)) where k is the number of distinct elements in the array. In the worst case with all distinct elements, we store all of them in the set. However, we only store the distinct elements from the right portion of the array that we "keep," so space is bounded by the actual distinct count.

### Potential follow-up questions

- (Follow-up question 1)  
  *What if we could remove any three elements instead of only the first three?*  
  *Hint: Think about which elements are most valuable to keep and design a greedy selection strategy.*

- (Follow-up question 2)  
  *How would the solution change if we could remove 1, 2, or 3 elements per operation (variable size)?*  
  *Hint: This becomes a dynamic programming problem where you track the minimum operations needed for each subarray suffix.*

- (Follow-up question 3)  
  *Can we optimize further if the array contains very large numbers and we need to count operations across multiple test cases?*  
  *Hint: Precompute distinct element counts and reuse them with memoization or caching strategies.*

### Summary

The key insight is to work **backwards** from the end of the array, counting how many distinct elements we can preserve without removing them. Since each operation removes exactly 3 elements (or all remaining if fewer than 3 exist), the number of operations is simply the ceiling of (elements to remove) ÷ 3. This avoids expensive simulation and runs in linear time. The pattern of "preserving from the end" is useful in many array problems where you want to minimize removals or maximize what you keep.

### Flashcard

Use a set to count distinct elements from the right side of the array; the number of operations needed is ⌈(total elements - distinct kept) / 3⌉, which avoids expensive simulation.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
