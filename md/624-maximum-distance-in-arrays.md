### Leetcode 624 (Medium): Maximum Distance in Arrays [Practice](https://leetcode.com/problems/maximum-distance-in-arrays)

### Description  
Given several sorted arrays (ascending order), select one element from each of any two different arrays. The **distance** between the two elements is defined as their absolute difference. Your task: **return the maximum possible distance** by picking elements from two different arrays.

### Examples  

**Example 1:**  
Input: `arrays = [[1,2,3],[4,5],[1,2,3]]`  
Output: `4`  
*Explanation: The largest distance is |1 - 5| = 4. You can choose 1 from the first or third array, and 5 from the second array.*

**Example 2:**  
Input: `arrays = [[1],[1]]`  
Output: `0`  
*Explanation: Both arrays contain only 1. Thus, the only possible distance is 0.*

**Example 3:**  
Input: `arrays = [[1,4],[0,5]]`  
Output: `5`  
*Explanation: Pick 0 from the second array and 5 from the same, but since you must pick from different arrays, valid pairs are (1,5),(4,0). The largest is |0-5| = 5.*

### Thought Process (as if you’re the interviewee)  

Start by considering what’s required:  
- Pick one number each from two *different* arrays.
- Compute their absolute difference, want the maximum.

**Brute-force idea:**  
- For every possible pair of arrays, compute the difference between every element in array i and every element in array j (i ≠ j).  
- Time: Too slow (O(total elements squared)), especially if each array is large.

**Optimization via sorting property:**  
- Arrays are already sorted—means minimum and maximum for each array is at the edges.
- To get the largest difference, try pairing:
  - The min value from any array with the max value from a different array.

**Efficient plan:**  
- Maintain running globalMin and globalMax as you iterate through arrays.
- For each array after the first, consider both:
  - |current_min - globalMax| (take min from current, max from previous)
  - |current_max - globalMin| (take max from current, min from previous)
- After checking, update globalMin and globalMax if the current array has a new min or max.
- This works because pairing the smallest and largest across arrays gives the maximal distance possible.

### Corner cases to consider  
- Only two arrays, both length 1.
- All arrays have the same numbers.
- Negative numbers present.
- Arrays with very large and very small values.
- Arrays of unequal lengths.

### Solution

```python
from typing import List

def maxDistance(arrays: List[List[int]]) -> int:
    # Initialize result, min and max using the first array's endpoints
    result = 0
    cur_min = arrays[0][0]
    cur_max = arrays[0][-1]
    
    # Traverse each array starting with the second one
    for arr in arrays[1:]:
        # Compute the worst-case distances: New min vs old max, New max vs old min
        dist1 = abs(arr[0] - cur_max)
        dist2 = abs(arr[-1] - cur_min)
        result = max(result, dist1, dist2)
        
        # Update running min and max values
        cur_min = min(cur_min, arr[0])
        cur_max = max(cur_max, arr[-1])
    
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m), where m is the number of arrays. Each pass only touches the first and last element of every array, and all other operations are O(1).
- **Space Complexity:** O(1), just a handful of tracking variables, no extra storage or recursion.

### Potential follow-up questions (as if you’re the interviewer)  

- What if arrays weren’t sorted?  
  *Hint: Think about how you’d efficiently find min/max for each array first.*

- What if you need to pick elements from three different arrays for the maximum sum of distances?  
  *Hint: Try extending the idea with more variables or dynamic programming.*

- How would your approach change if you were allowed to pick multiple elements per array?  
  *Hint: Consider greedy algorithms or revisit brute-force feasibility.*

### Summary
This problem uses the **two-pointer** and **greedy** approach, leveraging the array's **sorted** property. You just need to keep track of global min and max across arrays for the largest absolute difference between endpoints from different arrays. The same logic can be applied for a number of "max difference" problems when working with sequences partitioned across sublists.