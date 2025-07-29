### Leetcode 1460 (Easy): Make Two Arrays Equal by Reversing Subarrays [Practice](https://leetcode.com/problems/make-two-arrays-equal-by-reversing-subarrays)

### Description  
Given two integer arrays of equal length, **target** and **arr**. In one step, you can select any non-empty subarray of arr and reverse it. You are allowed to perform this operation as many times as you want.  
Return **true** if you can make arr equal to target, or **false** otherwise.  
In other words: Can you rearrange arr into target using only subarray reversals?  


### Examples  

**Example 1:**  
Input: `target = [1,2,3,4]`, `arr = [2,4,1,3]`  
Output: `true`  
*Explanation: Reverse [2,4,1] to get [1,4,2,3]; reverse [4,2] to get [1,2,4,3]; reverse [4,3] to get [1,2,3,4]. Multiple ways possible.*

**Example 2:**  
Input: `target = `, `arr = `  
Output: `true`  
*Explanation: arr is already equal to target, so no reverses needed.*

**Example 3:**  
Input: `target = [1,2,2,3]`, `arr = [2,1,3,2]`  
Output: `true`  
*Explanation: Reverse [2,1] to get [1,2,3,2]; reverse [3,2] to get [1,2,2,3]. It matches target.*


### Thought Process (as if you’re the interviewee)  
First, I think about what subarray reversals really allow. If I can reverse any subarray, I should be able to swap any elements—essentially, I can permute the array in any way I want.  
This essentially means I can turn arr into target **if and only if** both arrays have the same elements, with the same frequencies.  
The brute-force idea (actually perform reversals) seems too slow and unnecessary.  
Instead, I can just check:  
- Are the multisets (elements and their counts) of target and arr equal?  
- If yes, return True; otherwise, False.  
This can be done by sorting both arrays or using a frequency count (hash map for each and compare).  
Sorting is simpler and readable for an interview.

### Corner cases to consider  
- Arrays are empty (`[]`).
- Arrays contain duplicate numbers.
- Arrays contain a single element.
- Arrays are already equal.
- Arrays have the same elements but in different counts (should return False).
- Large arrays.

### Solution

```python
def canBeEqual(target, arr):
    # Sort both arrays
    target_sorted = sorted(target)
    arr_sorted = sorted(arr)
    
    # Compare sorted arrays element-wise
    return target_sorted == arr_sorted
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) — Sorting both arrays of length n.
- **Space Complexity:** O(n) — Due to creating sorted copies of the arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if one or both arrays are very large?
  *Hint: Instead of sorting, can you check counts in O(n)?*

- What if numbers are not just integers, but objects or strings?
  *Hint: Think about hashability and equality checks.*

- Can you solve this without sorting, using only O(n) time?
  *Hint: Try using a dictionary to count element frequencies.*

### Summary
This problem is a classic example of the **"Are two multisets equal?"** check, which is often solved using sorting or counting frequencies. The solution doesn't require any actual simulation of the operations, only understanding the implications of those operations.  
Patterns: Sorting for equality, Hash counting, Permutation equivalence.  
This approach applies broadly in checking if two arrays, sets, or strings can be made equal via any sequence of swaps, reversals, or rearrangements.