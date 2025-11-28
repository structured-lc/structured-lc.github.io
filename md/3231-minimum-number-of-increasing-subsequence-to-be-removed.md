### Leetcode 3231 (Hard): Minimum Number of Increasing Subsequence to Be Removed [Practice](https://leetcode.com/problems/minimum-number-of-increasing-subsequence-to-be-removed)

### Description  
Given an array of integers `nums`, you can remove any strictly increasing subsequence in each operation (the subsequence can be any length ≥ 1, doesn't have to be contiguous). Find the minimum number of operations needed to make the whole array empty.  
You must choose the set of removals so that the total number of operations is minimized.

### Examples  

**Example 1:**  
Input: `nums = [5,3,1,4,2]`  
Output: `3`  
*Explanation: Remove subsequences [1, 2], [3, 4], and [5] in any order. Each step removes all elements in the chosen strictly increasing subsequence. After these three operations, the array will be empty.*

**Example 2:**  
Input: `nums = [1,2,3,4,5]`  
Output: `1`  
*Explanation: The whole array is strictly increasing, so remove it in a single operation.*

**Example 3:**  
Input: `nums = [5,4,3,2,1]`  
Output: `5`  
*Explanation: Each element is decreasing, so each can only be removed by itself. Need 5 operations.*

### Thought Process (as if you’re the interviewee)  
Start with a brute-force thought:  
Can I identify and remove the longest strictly increasing subsequence (LIS) in each round, then repeat until empty? Unfortunately, that strategy isn't optimal in all cases because after removing one LIS, the remaining elements may not allow for optimal grouping in subsequent rounds.

A key insight is from Dilworth's Theorem for permutations:  
The minimal number of strictly increasing subsequences you need to partition a sequence equals the length of its longest non-increasing subsequence (LNIS).

Therefore, the minimal operations = length of the longest sequence where elements never increase (could be constant or decreasing).

How do we compute the length of LNIS efficiently?  
- Reverse the sign of all elements (multiply by -1), making the LNIS in the original array the same as the longest increasing subsequence (LIS) in the negated array.
- LIS (and thus LNIS) can be found in O(n log n) time using patience sorting (greedy + binary search).

Trade-off:  
- This avoids multiple passes, and is efficient for large arrays.

### Corner cases to consider  
- Array of length 1 (should return 1)
- All elements equal (LNIS is entire array; need n operations, since strictly increasing subsequence can only be of length 1 for equal items)
- Already strictly increasing (need 1 operation)
- Already strictly decreasing (each element must be removed alone; n operations)
- Array with duplicates

### Solution

```python
def min_number_of_increasing_subseq(nums):
    # We want the length of the longest non-increasing subsequence (LNIS)
    # Transform input to make LIS algorithms work for LNIS.
    # We'll use patience sorting: for each x, find (using bisect_right) the leftmost pile with top ≥ x
    
    import bisect
    piles = []
    for x in nums:
        # Find leftmost pile where the top is ≥ x (since we want non-increasing)
        idx = bisect.bisect_right(piles, -x)
        if idx == len(piles):
            piles.append(-x)
        else:
            piles[idx] = -x
    # The number of piles equals the LNIS
    return len(piles)

# Example usage:
# min_number_of_increasing_subseq([5,3,1,4,2])  # Returns 3
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), with n = len(nums), because for each element, we do a binary search among the piles (subsequences).
- **Space Complexity:** O(n), as in the worst-case, all elements are in separate piles.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if the subsequence had to be contiguous?  
  *Hint: This becomes a classic DP problem, since the greedy method doesn't apply.*

- Can you print the actual subsequences, not just their count?  
  *Hint: You need to track element origins; patience sorting alone only gives count.*

- How would your solution adapt if repeated numbers are allowed in the input?  
  *Hint: Watch for 'strictly' increasing subsequences—duplicates can't be in the same subsequence.*

### Summary
This problem leverages a classic greedy + binary search approach to compute the minimum number of strictly increasing subsequences covering the entire array—by reducing it to computing the length of the longest non-increasing subsequence (LNIS). This is a rare but highly efficient application of patience sorting, which is commonly used for LIS/LNIS, and is a core pattern in advanced sequence partitioning and scheduling problems.


### Flashcard
By Dilworth's Theorem, minimum strictly increasing subsequences needed equals the length of the longest non-increasing subsequence.

### Tags
Array(#array), Binary Search(#binary-search)

### Similar Problems
