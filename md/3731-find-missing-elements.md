# Leetcode 3731 (Easy): Find Missing Elements [Practice](https://leetcode.com/problems/find-missing-elements)

### Description

You are given an integer array `nums` containing unique integers. Originally, this array contained every integer within a certain range, but some integers have gone missing. The smallest and largest integers of the original range are guaranteed to still be present in the array. Your task is to find and return all missing integers in the range [min, max] as a sorted list. If no integers are missing, return an empty list.

### Examples

**Example 1:**
Input: `nums = [1,4,2]`
Output: `[3]`
*Explanation: The range is [1, 4]. The array contains 1, 2, and 4, so 3 is missing.*

**Example 2:**
Input: `nums = [3,0,1]`
Output: `[2]`
*Explanation: The range is [0, 3]. The array contains 0, 1, and 3, so 2 is missing.*

**Example 3:**
Input: `nums = [1,2,3,4,5]`
Output: `[]`
*Explanation: The range is [1, 5]. The array contains all integers in this range, so nothing is missing.*

### Thought Process

The brute-force approach would be to iterate through every number from the minimum to the maximum and check if each number exists in the array by searching linearly each time. This would result in O(n²) time complexity due to repeated linear searches.

The optimized approach is to use a set for constant-time lookups. First, convert the input array into a set. Then, iterate from the minimum value to the maximum value, and for each number, check if it exists in the set. If it doesn't, add it to the result list. Since set membership checks are O(1), the overall time complexity becomes O(n + range), which is linear.

### Corner cases to consider

- Array with only two elements (min and max with no gap)
- All consecutive integers with no missing elements
- Single element array (technically no range, but min equals max)
- Large gaps between min and max with many missing elements
- Negative numbers in the range
- Mixed positive and negative integers

### Solution

```python
def findMissing(nums):
    # Convert to set for O(1) lookups
    num_set = set(nums)
    
    # Find min and max
    min_val = min(nums)
    max_val = max(nums)
    
    # Iterate from min to max and collect missing numbers
    missing = []
    for i in range(min_val, max_val + 1):
        if i not in num_set:
            missing.append(i)
    
    return missing
```

### Time and Space Complexity Analysis

- **Time Complexity:** O(n + r), where n is the length of the input array and r is the range (max - min). We spend O(n) to build the set and O(r) to iterate through the range and check membership.

- **Space Complexity:** O(n) for the set that stores all unique elements from the input array. The result list doesn't count toward auxiliary space as it's part of the output.

### Potential follow-up questions

- What if you couldn't use extra space for a set?
  *Hint: Consider sorting the array first, then compare consecutive elements. This trades space for time (O(n log n) instead of O(n + r)).*

- How would you handle duplicate elements in the array?
  *Hint: Use a set anyway to automatically handle duplicates, or add a check during iteration.*

- What if the range is extremely large but only a few elements are missing?
  *Hint: The current solution is already optimal for this case since we only iterate through the range once.*

### Summary

This problem uses the **set-based lookup pattern** to optimize repeated membership checks. Instead of searching linearly each time, we pre-process the input into a hash set for O(1) access. This transforms the naive O(n²) approach into an efficient O(n + r) solution. This pattern is widely applicable in problems requiring multiple membership queries, such as finding duplicates, intersection of arrays, or detecting missing elements in a range. The trade-off is using O(n) extra space to gain significant time complexity improvements.


### Flashcard
Convert array to a set for O(1) lookups, then iterate from min to max value and count missing elements.

### Tags
Array(#array), Hash Table(#hash-table), Sorting(#sorting)

### Similar Problems
