### Leetcode 354 (Hard): Russian Doll Envelopes [Practice](https://leetcode.com/problems/russian-doll-envelopes)


### Description  
You are given a list of envelopes, each represented as a pair of integers \([w, h]\) where \(w\) is the width and \(h\) is the height. Your task is to find the maximum number of envelopes that can be nested one inside another ("Russian doll" style). One envelope can fit into another if and only if both its width and height are strictly less than those of the other envelope. Envelopes cannot be rotated; their dimensions must be used as given.


### Examples  

**Example 1:**  
Input: `envelopes = [[5,4],[6,4],[6,7],[2,3]]`  
Output: `3`  
*Explanation:  
We can nest [2,3] → [5,4] → [6,7]. So the maximum number is 3.*

**Example 2:**  
Input: `envelopes = [[1,1],[1,1],[1,1]]`  
Output: `1`  
*Explanation:  
All envelopes are identical, so you can only pick one.*

**Example 3:**  
Input: `envelopes = [[4,5],[4,6],[6,7],[2,3],[1,1]]`  
Output: `4`  
*Explanation:  
The nesting can be [1,1] → [2,3] → [4,6] → [6,7]. Steps: [1,1] fits into [2,3], which fits into [4,6], which fits into [6,7].*


### Thought Process (as if you’re the interviewee)  

First, the brute-force approach would be to try all possible sequences and check which envelopes can nest into each other. However, this results in a time complexity of O(2ⁿ), which is not feasible for large inputs.

We notice that the problem boils down to finding the maximum number of envelopes that can be nested, with the strict requirement that both width and height must be strictly increasing. This is similar to the Longest Increasing Subsequence (LIS) problem but in two dimensions.

To convert this into a classic LIS problem:
- **Step 1:** Sort the envelopes by width in ascending order. For heights of envelopes with equal width, sort those in **descending** order. This second part is crucial—it prevents choosing envelopes of equal width for LIS, as an envelope can't fit into another if the width is the same.
- **Step 2:** Extract the heights and run LIS on this 1D list. Since widths are strictly increasing (because of sorting), finding the LIS in heights ensures both dimensions are handled.

The LIS can be efficiently computed in O(n log n) time with binary search.

**Why not DP O(n²)?**  
A classic DP approach would check every preceding envelope for nesting possibility, leading to O(n²), which works for small n but doesn't scale to the problem's constraints.

### Corner cases to consider  
- An empty list of envelopes.  
- All envelopes have identical dimensions.  
- Only one envelope in the input.  
- Only one dimension increases (the other stays the same).  
- Non-nestable envelopes (no two can be nested).  
- Large input with random dimensions and possible duplicates.

### Solution

```python
def maxEnvelopes(envelopes):
    # Sort envelopes: increasing width, and for same width, decreasing height
    envelopes.sort(key=lambda x: (x[0], -x[1]))
    # Extract heights for LIS
    heights = [h for w, h in envelopes]
    # Helper array for LIS (contains the smallest tail for all increasing subsequences of length i+1)
    import bisect
    lis = []
    for h in heights:
        idx = bisect.bisect_left(lis, h)
        if idx == len(lis):
            lis.append(h)
        else:
            lis[idx] = h
    return len(lis)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n is the number of envelopes:  
  - Sorting: O(n log n).  
  - LIS with binary search: O(n log n).
- **Space Complexity:** O(n) for the LIS array and for storing sorted envelopes and heights.

### Potential follow-up questions (as if you’re the interviewer)  

- What if rotating envelopes was allowed?
  *Hint: You’d need to consider both (w, h) and (h, w) for each envelope.*
- What if you also need to reconstruct the sequence of nested envelopes?
  *Hint: Track parent indices during LIS formation, then backtrace to reconstruct.*
- How would you handle millions of envelopes if memory is limited?
  *Hint: Consider stream processing or external sorting strategies.*

### Summary
This problem uses the "Longest Increasing Subsequence" coding pattern, but adapted to two dimensions (width, height) via careful sorting and LIS application. Sorting by width (and descending by height for ties) ensures correctness and avoids conflicts. The O(n log n) LIS with binary search is a standard but powerful optimization in competitive programming and interviews. This approach applies to other multi-dimensional sequencing problems where ordering across multiple attributes is required.

### Tags
Array(#array), Binary Search(#binary-search), Dynamic Programming(#dynamic-programming), Sorting(#sorting)

### Similar Problems
- Longest Increasing Subsequence(longest-increasing-subsequence) (Medium)
- The Number of Weak Characters in the Game(the-number-of-weak-characters-in-the-game) (Medium)
- Longest Non-decreasing Subarray From Two Arrays(longest-non-decreasing-subarray-from-two-arrays) (Medium)