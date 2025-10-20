### Leetcode 2966 (Medium): Divide Array Into Arrays With Max Difference [Practice](https://leetcode.com/problems/divide-array-into-arrays-with-max-difference)

### Description  
Given an integer array **nums** of size n (where n is a multiple of 3), and a positive integer **k**, divide the array into n ⁄ 3 arrays, each of size 3, such that:
- Every element of **nums** is in exactly one of these groups.
- In each group, the difference between the maximum and minimum element is ≤ k.

Return a 2D array containing these groups, or an empty array if it is impossible. If there are multiple answers, return any one.

### Examples  

**Example 1:**  
Input: `nums = [1,3,4,8,7,9,3,5,1], k = 2`  
Output: `[[1,1,3],[3,4,5],[7,8,9]]`  
*Explanation: After sorting: [1,1,3,3,4,5,7,8,9]. Grouping as [1,1,3], [3,4,5], [7,8,9]; in each group, max - min ≤ 2.*

**Example 2:**  
Input: `nums = [1,3,3,2,7,3], k = 3`  
Output: `[]`  
*Explanation: It's not possible to partition into groups of 3 that all satisfy the max - min ≤ 3 condition.*

**Example 3:**  
Input: `nums = [2,4,2,2,5,2], k = 2`  
Output: `[[2,2,2],[4,5,2]]`  
*Explanation: After sorting: [2,2,2,2,4,5]. Groupings could be [2,2,2] and [2,4,5], both of which have max - min ≤ 2.*

### Thought Process (as if you’re the interviewee)  
My first instinct is to brute-force all possible ways to group the elements, but the input constraints (n up to 10⁵) make that infeasible.

Observing the condition (max - min ≤ k for each group), I realize that **sorting** the array allows us to check this greedily: for any three consecutive elements, if the largest minus the smallest is ≤ k, they can form a valid group.

Approach:
- **Sort** the array.
- Iterate over the sorted array in increments of 3.
- For each window of 3, check if nums[i+2] - nums[i] ≤ k.
- If yes, group them. If not, it's impossible — return [].

This greedy + sorting approach works because any rearrangement won't better "tighten" the difference than the consecutive sorted elements.

If, after grouping, all groups have valid differences, we return the result. Else (if any window doesn't satisfy), return [].

### Corner cases to consider  
- n not a multiple of 3 (though per constraints, it always is).
- Duplicate elements (all elements equal, or high repetition).
- All elements are the same (difference is always 0, so always possible).
- Unsorted input, but the code must not assume sorted.
- Large k (so any grouping is possible).
- Smallest possible k (0): only exact triples work.
- Input already in subgroups that do not satisfy the condition even after sorting.

### Solution

```python
def divideArray(nums, k):
    # Sort the input array to group "close" elements together
    nums.sort()
    n = len(nums)
    result = []
    
    # Check each window of 3 elements
    for i in range(0, n, 3):
        group = nums[i:i+3]
        # If the window length isn't 3, it's invalid (shouldn't happen with constraints)
        if len(group) < 3:
            return []
        # If the current group's max-min > k, problem impossible
        if group[2] - group[0] > k:
            return []
        result.append(group)
    
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n is the number of elements (due to sorting the array). The grouping check after sorting is O(n).
- **Space Complexity:** O(n) for the result array and O(1) additional space if sorting in-place (O(n) extra if not).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the group size is variable (not always size 3)?  
  *Hint: Try to adapt the sliding window or generalize the grouping step.*

- How would you return all possible valid partitions, not just any one?  
  *Hint: The greedy approach won't produce all; need backtracking, which is exponential.*

- What if the grouping must maximize/minimize a different criterion (such as sum)?  
  *Hint: You'll need to change your windowing logic; this might lead to dynamic programming.*

### Summary
This problem is a classic example of the **greedy** + **sorting** pattern. By sorting, we can line up the numbers so that three consecutive elements are as close as possible, and greedily try to build valid groups. This technique is commonly used in problems involving grouping with difference or adjacency constraints — such as forming teams by skill or distributing resources with capacity/difference limitations.


### Flashcard
Sort the array, then group every three consecutive elements if their max - min ≤ k; if any group fails, return empty array.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
