### Leetcode 275 (Medium): H-Index II [Practice](https://leetcode.com/problems/h-index-ii)

### Description  
Given a sorted array `citations` (ascending) where `citations[i]` is the number of citations for a researcher’s iᵗʰ paper, determine the researcher's **h-index**. The h-index is the largest number **h** such that the researcher has at least **h** papers with ≥ **h** citations each.  
Your task is to return the h-index in **O(log n)** time.

### Examples  

**Example 1:**  
Input: `citations = [0, 1, 3, 5, 6]`  
Output: `3`  
*Explanation: There are 3 papers with at least 3 citations (papers with 3, 5, 6 citations), but not 4.*

**Example 2:**  
Input: `citations = [0, 2, 4, 6, 8, 10]`  
Output: `4`  
*Explanation: There are 4 papers with 4 or more citations (4, 6, 8, 10). But there are not 5 with at least 5.*

**Example 3:**  
Input: `citations = [0, 0, 0, 1]`  
Output: `1`  
*Explanation: Only 1 paper has ≥1 citation.*

### Thought Process (as if you’re the interviewee)  
- First, I recall the **h-index**: the largest h so that at least h papers have ≥ h citations. Naive linear scan works in O(n): for each i, count how many papers have citations ≥ citations[i], but that’s not fast enough for big input.
- Since the array is sorted, I can binary search. For a given index mid: there are n - mid papers with at least citations[mid] citations.
- If citations[mid] ≥ n - mid, it's possible that h = n - mid, but we need to see if there's a bigger h on the left. If citations[mid] < n - mid, h must be smaller, so move to the right.
- Ultimately, when the search ends (`left > right`), h-index is n - left, giving the maximum h where at least h papers have at least h citations.
- This binary search is **O(log n)**, optimal for this scenario.

### Corner cases to consider  
- Empty array (`[]`) — h-index is 0
- All zeros (`[0,0,0]`) — h-index is 0
- All papers have high citations (`[10, 12, 13]`) — h-index is n
- Papers with equal citations (`[2,2,2,2]`)
- Single element (`[1]` or ``)
- Strictly increasing citations but none matching h-index cutoff

### Solution

```python
from typing import List

def hIndex(citations: List[int]) -> int:
    n = len(citations)
    left, right = 0, n - 1

    while left <= right:
        mid = left + (right - left) // 2
        # Number of papers with at least citations[mid] citations
        h = n - mid
        if citations[mid] >= h:
            # Try to find a larger h to the left
            right = mid - 1
        else:
            # Not enough high-cited papers, go right
            left = mid + 1
    # h-index is n - left (number of papers with at least n - left citations)
    return n - left
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n), since each binary search iteration halves the search space.
- **Space Complexity:** O(1), as we use only a few variables (no extra data structures or recursion).

### Potential follow-up questions (as if you’re the interviewer)  

- What changes if the array isn’t sorted?  
  *Hint: Can you still solve it better than O(n²)?*

- Could this run on extremely large datasets in external storage?  
  *Hint: Can you perform the binary search without loading the entire array in memory?*

- How would you design a function to update citations and support efficient h-index queries?  
  *Hint: Think about using balanced search trees or advanced data structures.*

### Summary
This problem is a template use-case for **binary search** on a sorted array with custom logic, leveraging monotonic properties. This same paradigm can be used for finding left/right boundaries, min/max satisfying certain conditions, or other search-on-answer patterns elsewhere in interview questions. Very common in searching for optimal thresholds over sorted input.