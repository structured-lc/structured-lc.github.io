### Leetcode 3285 (Easy): Find Indices of Stable Mountains [Practice](https://leetcode.com/problems/find-indices-of-stable-mountains)

### Description  
You are given an array of integers `height` where `height[i]` represents the height of the iᵗʰ mountain in a row. A mountain is called **stable** if the previous mountain (i.e., at index i-1) exists and is strictly taller than a given threshold. Mountain 0 can never be stable since there's no mountain before it. Return the list of all indices i (1 ≤ i < n) where the iᵗʰ mountain is stable.

### Examples  

**Example 1:**  
Input: `height = [1,2,3,4,5], threshold = 2`  
Output: `[3, 4]`  
Explanation:  
height[2] = 3 > threshold (2), so mountain at index 3 is stable.  
height[3] = 4 > threshold (2), so mountain at index 4 is stable.

**Example 2:**  
Input: `height = [10,1,10,1,10], threshold = 3`  
Output: `[1, 3]`  
Explanation:  
height = 10 > 3, so index 1 is stable.  
height[2] = 10 > 3, so index 3 is stable.

**Example 3:**  
Input: `height = [10,1,10,1,10], threshold = 10`  
Output: `[]`  
Explanation:  
No mountain has a previous one strictly taller than the threshold.

### Thought Process (as if you’re the interviewee)  
- The brute-force way is to check for every i from 1 to n-1 if height[i-1] > threshold and collect such i values.
- This is already O(n), as we make one pass from index 1 to n-1, checking a simple condition. There are no further optimizations possible because each element must be checked.
- No need for extra data structures; just a result list to collect indices that satisfy the condition.

### Corner cases to consider  
- Empty array (though by constraints, size is at least 2).
- All values less than or equal to threshold: should return an empty list.
- All values greater than threshold: should include all indices from 1 to n-1.
- threshold equals the max value in the array.
- threshold greater than any height.

### Solution

```python
def stableMountains(height, threshold):
    # Result list to collect stable mountain indices
    result = []
    # Start from index 1 as index 0 cannot be stable
    for i in range(1, len(height)):
        # Check if the previous mountain is strictly taller than threshold
        if height[i - 1] > threshold:
            result.append(i)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — we loop through height array once where n = len(height).
- **Space Complexity:** O(k) — in the worst case (all mountains stable), we store up to n-1 indices in result, otherwise O(1) for constant extra variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt the solution if the definition of “stable” used “≥ threshold” instead of “> threshold”?  
  *Hint: Adjust the comparison operator when checking previous mountain.*

- What if you were to output the heights of the stable mountains instead of their indices?  
  *Hint: Instead of appending indices, append height[i]*

- How would you handle the case where you also need to consider the next mountain, not just previous, for the stable condition?  
  *Hint: Loop and check both neighbors when possible.*

### Summary
This approach uses a single pass and constant extra space (besides the output), representing a classic linear scan and filtering pattern. It’s common in problems where you need to collect indices or elements based on adjacent values and simple comparisons; similar logic applies in local extrema, peak finding, and segment detection problems.

### Tags
Array(#array)

### Similar Problems
- Find in Mountain Array(find-in-mountain-array) (Hard)