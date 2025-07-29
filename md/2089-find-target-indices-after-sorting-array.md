### Leetcode 2089 (Easy): Find Target Indices After Sorting Array [Practice](https://leetcode.com/problems/find-target-indices-after-sorting-array)

### Description  
Given an integer array **nums** and an integer **target**, find all indices where **target** would appear in **nums** after sorting it in non-decreasing (increasing) order.  
Return these indices as a list, sorted in increasing order.  
If **target** does not exist in **nums**, return an empty list.

### Examples  

**Example 1:**  
Input: `nums = [1,2,5,2,3]`, `target = 2`  
Output: `[1, 2]`  
*Explanation: After sorting, nums is [1, 2, 2, 3, 5]. The target 2 appears at indices 1 and 2.*

**Example 2:**  
Input: `nums = [1,2,5,2,3]`, `target = 3`  
Output: `[3]`  
*Explanation: After sorting, nums is [1, 2, 2, 3, 5]. The target 3 appears at index 3.*

**Example 3:**  
Input: `nums = [1,2,5,2,3]`, `target = 5`  
Output: `[4]`  
*Explanation: After sorting, nums is [1, 2, 2, 3, 5]. The target 5 appears at index 4.*

**Example 4:**  
Input: `nums = [1,2,5,2,3]`, `target = 4`  
Output: `[]`  
*Explanation: After sorting, nums is [1, 2, 2, 3, 5]. The target 4 is not present, so return an empty list.*


### Thought Process (as if you’re the interviewee)  
- **Brute-force**:  
  1. Sort the array.
  2. Iterate over the sorted array and collect indices where value == target.

  Time: O(n log n) (sorting), Space: O(n) (possibly due to sort).
  
- **Optimizing further?**  
  Sorting is not strictly necessary for only finding the indices — what if we can deduce the positions without sorting? Specifically:
  - Count the number of elements less than target (`less_than_target`).
  - Count occurrences of target in nums (`count_target`).
  - The `target` values will appear sequentially in the sorted array, starting at `less_than_target` and continuing for `count_target` positions.

  So the indices are: `[less_than_target, less_than_target+1, ..., less_than_target + count_target - 1]`.

  - This avoids sorting and is O(n).

**Chosen solution**:  
Count how many numbers are less than target, and how many are equal to target. Generate the range `[less_than_target, less_than_target + count_target - 1]`.  
Trade-off: Linear time, no sort, low space.

### Corner cases to consider  
- Empty array: `nums=[]`, should return `[]`
- No elements equal to target: return `[]`
- All elements equal to target: the result is `[0, 1, ..., n-1]`
- Only one occurrence of target
- All elements less than or greater than target

### Solution

```python
def find_target_indices(nums, target):
    # Count how many numbers are less than the target
    less_than = 0
    count_target = 0
    for num in nums:
        if num < target:
            less_than += 1
        elif num == target:
            count_target += 1
    
    # If target doesn't exist, return empty list
    if count_target == 0:
        return []
    
    # Target values will be at indices [less_than, less_than+1, ..., less_than+count_target-1]
    return [i for i in range(less_than, less_than + count_target)]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of nums.  
  We do a single pass to count, no sorting is required.
- **Space Complexity:** O(k) for the result list (k = count_target).  
  Only a fixed number of integers for counts, and O(k) for output.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose the input array is very large and you cannot use extra space for sorting. Can you solve it in one pass over nums?
  *Hint: Focus on counting less-than and equal elements.*

- What if you have to return the values, not the indices, after sorting and removing duplicates?
  *Hint: Use a set and sort after.*

- If you must preserve the original indices of the target values in the sorted array, how would you approach it?
  *Hint: Track original indices along with values before sorting.*

### Summary
This is a classic linear-scan counting problem that can be solved using the **Count and Construct** pattern, similar to bucket sort.    
The optimal approach is to count how many numbers are less than and equal to the target, then construct the answer range—no sorting required, so it's both fast and memory-efficient.  
This technique generalizes to problems where you need to find the position/range of elements after “virtual” sorting.