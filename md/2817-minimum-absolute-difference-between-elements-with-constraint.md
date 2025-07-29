### Leetcode 2817 (Medium): Minimum Absolute Difference Between Elements With Constraint [Practice](https://leetcode.com/problems/minimum-absolute-difference-between-elements-with-constraint)

### Description  
Given an integer array **nums** and integer **x**, find the minimum absolute difference between values of any two elements whose indices' difference is at least **x**; in other words, among all pairs (i, j) with |i - j| ≥ x, find min |nums[i] - nums[j]|.  
You want the minimal value difference between such a pair, not their indices. Return that minimum absolute difference.

### Examples  

**Example 1:**  
Input: `nums = [4,3,2,4], x = 2`  
Output: `0`  
*Explanation: We can pair nums=4 and nums[3]=4. |0-3| = 3 ≥ 2, |4-4| = 0 is the minimum possible difference.*

**Example 2:**  
Input: `nums = [5,3,2,10,15], x = 1`  
Output: `1`  
*Explanation: Checking all pairs with index difference ≥ 1, (1,2) gives |3-2| = 1.*

**Example 3:**  
Input: `nums = [1,2,3,4], x = 3`  
Output: `3`  
*Explanation: The only possible pairs at least 3 apart are (0,3): |1-4| = 3.*


### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Check every pair (i, j) with |i - j| ≥ x and compute abs(nums[i] - nums[j]), take the minimum. This is O(n²), which is too slow for large n.

- **Optimized approach:**  
  To improve, for each i, we want to efficiently find the closest nums[j] with j ≤ i - x or j ≥ i + x.  
  We can sweep the array from left to right. For each i ≥ x, keep a sorted set of nums[0...i-x]. For current nums[i], binary search in the set for the closest number, update the answer.  
  Similarly, the reverse sweep is not necessary—doing left-to-right with insertions up to i-x is enough since pair order direction doesn't matter.

- **Why this approach:**  
  The sorted structure (BST or similar; in Python a custom bisect + list) allows O(log n) search and insert, so the complete traversal is O(n log n).

### Corner cases to consider  
- Array of length 1 or less than x+1: No valid pairs possible.
- All elements equal: Answer is 0.
- Negative values, zeros.
- x = 0: Every pair, so becomes "global" minimum difference.
- Large numbers, both positive and negative.

### Solution

```python
def min_absolute_difference(nums, x):
    # For O(log n) search/insert; we implement a sorted list
    import bisect

    n = len(nums)
    ans = float('inf')
    sorted_list = []

    for i in range(x, n):
        # Maintain elements nums[0..i-x]
        bisect.insort(sorted_list, nums[i - x])
        curr = nums[i]

        # Find insertion place for curr (find closest element)
        idx = bisect.bisect_left(sorted_list, curr)
        # Check if idx is in bounds and calculate possible min diff
        if idx < len(sorted_list):
            ans = min(ans, abs(curr - sorted_list[idx]))
        if idx > 0:
            ans = min(ans, abs(curr - sorted_list[idx - 1]))

    return ans if ans != float('inf') else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  Each of the n iterations may do binary insert/search in O(log n) time.
- **Space Complexity:** O(n)  
  Sorted list may grow to at most n elements.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to return the pair of indices (i, j) as well?  
  *Hint: Keep track of values mapped to original indices.*

- Can you do better than O(n log n)?  
  *Hint: Try if there are restrictions on value ranges (e.g., bounded integers with counting sort ideas), else O(n log n) likely optimal.*

- How would you handle the case if updates (insert/delete) to nums are allowed and queries are dynamic?  
  *Hint: Could explore segment trees, order-statistics trees, or other dynamic BSTs.*

### Summary
This problem illustrates the **"sliding window + ordered structure (BST/set with binary search)"** pattern, commonly used for "windowed" minimum/maximum/closest queries with constraints.  
The key insight is: when you need efficient, repeated closest value search **within a moving dynamic range**, keep track of prior relevant window values in a sorted structure, updating as you sweep. This technique applies to median queues, K-diff pairs, or any "nearest" sliding window problem.