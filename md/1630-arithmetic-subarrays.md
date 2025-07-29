### Leetcode 1630 (Medium): Arithmetic Subarrays [Practice](https://leetcode.com/problems/arithmetic-subarrays)

### Description  
Given nums, and arrays l and r, for each query (lᵢ, rᵢ) check whether the subarray nums[lᵢ: rᵢ+1] can be rearranged to form an **arithmetic sequence** (equal intervals between adjacent sorted nums). Return a list of booleans per query.

### Examples  
**Example 1:**  
Input: `nums = [4,6,5,9,3,7], l = [0,0,2], r = [2,3,5]`  
Output: `[True, False, True]`  
*Explanation: Queries: [4,6,5], [4,6,5,9], [5,9,3,7]. [4,5,6] is arithmetic. [4,5,6,9] is not. [3,5,7,9] is (diff=2).* 

**Example 2:**  
Input: `nums = [-12,-9,-3,-12,-6,15,20,-25,-20,-15,-10], l = [0,1,6,4,8,7], r = [4,4,9,7,9,10]`  
Output: `[False,True,False,False,True,True]`  
*Explanation: Check each subarray; sort and verify equal differences.*

**Example 3:**  
Input: `nums = [1], l = , r = `  
Output: `[True]`  
*Explanation: Single element is trivially arithmetic.*

### Thought Process (as if you’re the interviewee)  
- For each query, extract the subarray, sort it, and check if the difference between adjacent elements is always the same.
- No need to optimize further unless queries are huge.
- Edge checks: size 0 or 1 is always True, since trivially arithmetic.
- Could avoid sort with extra work (hashes, set-based, or max/min + size logic if needed for follow-ups).

### Corner cases to consider  
- Subarrays of size 0 or 1
- All the same numbers
- Negative values
- Multiple queries overlapping or full array

### Solution

```python
from typing import List

def checkArithmeticSubarrays(nums: List[int], l: List[int], r: List[int]) -> List[bool]:
    res = []
    for i in range(len(l)):
        arr = nums[l[i]:r[i]+1]
        arr.sort()
        if len(arr) <= 2:
            res.append(True)
            continue
        d = arr[1] - arr[0]
        res.append(all(arr[j+1] - arr[j] == d for j in range(1, len(arr)-1)))
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(q·m log m), where q=len(queries), m is average subarray length
- **Space Complexity:** O(m) per query for temp arrays

### Potential follow-up questions (as if you’re the interviewer)  
- How would you speed up for large number of queries or very long arrays?  
  *Hint: Try to avoid explicit sort/search for min-max/diff patterns.*

- Could you determine arithmetic property in-place?
  *Hint: Use one pass over min/max and set for size tracking.*

- For multiple queries sharing subarray range, can you cache results?
  *Hint: Use memoization or interval trees.*

### Summary
A simple combination of **array slicing, sorting, and uniform difference check**. The arithmetic property is a classic pattern in questions involving sorted subarrays, intervals, or permutations.