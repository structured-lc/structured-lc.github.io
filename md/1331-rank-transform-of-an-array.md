### Leetcode 1331 (Easy): Rank Transform of an Array [Practice](https://leetcode.com/problems/rank-transform-of-an-array)

### Description  
Given an array of integers arr, return a new array where each element arr[i] is replaced by its **rank** in the array (rank starts at 1). Rank is the sorted order position (with ties getting the same rank, and ranks increased for later distinct numbers).

### Examples  
**Example 1:**  
Input: `arr = [40,10,20,30]`  
Output: `[4,1,2,3]`  
*Explanation: Sorted unique values are [10,20,30,40]. Assign ranks: 10→1, 20→2, 30→3, 40→4. Map arr to [4,1,2,3].*

**Example 2:**  
Input: `arr = [100,100,100]`  
Output: `[1,1,1]`  
*Explanation: All values are the same, so all get rank 1.*

**Example 3:**  
Input: `arr = [37,12,28,9,100,56,80,5,12]`  
Output: `[5,3,4,2,8,6,7,1,3]`  
*Explanation: Sorted unique values: [5,9,12,28,37,56,80,100]. Rank mapping: 5→1, 9→2, 12→3, 28→4, 37→5, 56→6, 80→7, 100→8. Map arr to output.*

### Thought Process (as if you’re the interviewee)  
- The rank is determined by the sorted order of the unique values.
- To do this efficiently: get sorted list of unique values. Map each value to its rank (dictionary), then replace every original arr[i] with its rank.

### Corner cases to consider  
- All values the same.
- Array is already sorted.
- Array is in decreasing order.
- Negative values or mixed positive/negative/zero.
- Large input size.

### Solution

```python
from typing import List

def arrayRankTransform(arr: List[int]) -> List[int]:
    # Get sorted list of unique elements
    sorted_unique = sorted(set(arr))
    # Map each value to its rank
    rank = {val: i+1 for i, val in enumerate(sorted_unique)}
    # Replace each element with its rank
    return [rank[x] for x in arr]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) due to sorting (set and sort).
- **Space Complexity:** O(n) for storing unique values and rank mapping.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you must preserve relative order when values are equal?  
  *Hint: Same logic, but ensure stable mapping of ranks.*

- Can you perform the transformation in-place?  
  *Hint: You need external mapping; in-place for small value range possible.*

- Suppose values are in a huge range, but only few unique: space vs time trade-offs?  
  *Hint: Mapping only unique entries, so space is O(unique values).*  

### Summary
This problem is a classic **coordinate compression** application and ranking pattern — sort unique values, map to ranks, then transform the original array accordingly. Common in problems involving normalization or value discretization.

### Tags
Array(#array), Hash Table(#hash-table), Sorting(#sorting)

### Similar Problems
- Rank Transform of a Matrix(rank-transform-of-a-matrix) (Hard)
- Find Target Indices After Sorting Array(find-target-indices-after-sorting-array) (Easy)