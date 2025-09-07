### Leetcode 3674 (Easy): Minimum Operations to Equalize Array [Practice](https://leetcode.com/problems/minimum-operations-to-equalize-array)

### Description  
Given an integer array, you can perform an operation where you choose any subarray and replace **all** its elements with the bitwise AND of that subarray. The goal is to make **all elements equal** with the minimum number of such operations.  
Return the **minimum number of operations required** to make the entire array equal.  
(Effectively, you are allowed, per operation, to pick any range and overwrite it with a single value via bitwise AND.  
How many operations are necessary to make every number the same?)

### Examples  

**Example 1:**  
Input: `[1,2]`  
Output: `1`  
Explanation: Select the whole array. The bitwise AND of 1 and 2 is 0. Replace both with 0. Now the array is `[0,0]` (all elements equal).

**Example 2:**  
Input: `[7,7,7]`  
Output: `0`  
Explanation: All elements are already the same. No operation needed.

**Example 3:**  
Input: `[5,7,3,7]`  
Output: `1`  
Explanation: Select the whole array. The bitwise AND of all elements is 1. Replace all with 1. Now the array is `[1,1,1,1]`.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try all possible subarray combinations. For each, do the operation, then recursively solve for the new configuration. But the state space explodes quickly and is unnecessary.  

- **Optimization:**  
  Notice that, in a single operation, you can choose the entire array as the subarray and set all elements to the same value (the bitwise AND of the whole array).  
  - If all elements are **already equal**, no operation is needed.  
  - Otherwise, doing the operation on the entire array suffices to make all entries equal (they become the AND of the whole array).  
  - Doing more than one operation never helps: once all are equal, you’re done.  

- **Conclusion:**  
  - If all values in the array are equal, return 0.  
  - Otherwise, return 1.

### Corner cases to consider  
- Empty array (should always return 0, but depends on problem constraints)
- Array of one element
- All elements are already equal (any size)
- Array with all different elements
- Array containing negative values or zero
- Large input sizes

### Solution

```python
def minimum_operations(nums):
    """
    Returns the minimum number of operations needed to make all elements in the array equal
    using the specified bitwise AND operation on any subarray.
    """
    # Check if all elements are already equal
    first = nums[0]
    all_equal = True
    for num in nums:
        if num != first:
            all_equal = False
            break
    
    if all_equal:
        return 0
    else:
        return 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  (Need to scan the array to check if all elements are already the same.)
- **Space Complexity:** O(1)  
  (No extra storage beyond a few variables.)

### Potential follow-up questions (as if you’re the interviewer)  

- What if you are restricted to only subarrays of length ≤ k?  
  *Hint: Think how many distinct values/groups you may need to process.*

- If the operation allowed is bitwise OR instead of AND, how does that change the answer?  
  *Hint: The OR operation may increase values, consider what the maximum possible uniform value is.*

- Suppose you want to minimize the value all elements become equal to, not just any equal value.  
  *Hint: Try setting all to the AND of the entire array, is that optimal?*

### Summary
This is a simple **array scanning** and **property-check question**: all elements can be set to the same value using the offered operation.  
If all elements are already equal, return 0; otherwise, 1 operation suffices by acting on the entire array.  
This is a common pattern of "can we do this in one step?" and "check if already satisfied," seen in equalization, majority voting, and trivial game/array manipulation problems.

### Tags


### Similar Problems
