### Leetcode 2567 (Medium): Minimum Score by Changing Two Elements [Practice](https://leetcode.com/problems/minimum-score-by-changing-two-elements)

### Description  
Given an integer array `nums`, the **score** is the sum of:
- The minimum absolute difference between any two elements (low score).
- The maximum absolute difference between any two elements (high score).

You can change at most two elements in `nums` to any values. Find the **minimum score** possible after such changes.

### Examples  

**Example 1:**  
Input: `nums = [1,4,7,8,5]`  
Output: `3`  
*Explanation: Change nums and nums[1] to 6, making [6,6,7,8,5].  
- Minimum difference becomes 0 (6 - 6).  
- Maximum difference is 3 (8 - 5).  
Sum is 3.*

**Example 2:**  
Input: `nums = [1,4,3]`  
Output: `0`  
*Explanation: Change nums[1] and nums[2] to 1, making [1,1,1].  
- All elements are the same, so both min and max difference are 0.*

**Example 3:**  
Input: `nums = [7,2,5,10,9]`  
Output: `5`  
*Explanation: Change nums and nums[4] to 5 and [5,2,5,10,5].  
- Minimum absolute difference is 0 (5 - 5).  
- Maximum is 8 (10 - 2), but after optimal changes, better options may exist.  
Best way is: [2,2,5,5,5]. Maximum: 5 - 2 = 3, minimum: 0. Score = 3.  
But let's walk the steps in code for the best result.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all possible pairs of elements to change (O(n²)), then scan the array for each modified version to compute the score. This is clearly infeasible for n up to 10⁵.

- **Optimization:**  
  The max and min absolute differences are driven by the extremes of the array (largest and smallest values and their neighbors).  
  After sorting, the only way to minimize the 'high' score is to shrink the largest gap, which occurs at the array’s endpoints. Similarly, the minimal-gap pairs (low score) are for neighboring elements after sorting.

  Because we can change two elements, the optimal moves are:
  1. Change both smallest two OR both largest two numbers (to "push in" the endpoints),
  2. Change one smallest and one largest (to "squeeze" together).

  For sorted `nums` as `[a₀, a₁, ..., aₙ₋₁]`, the minimum possible score is computed from:
  - Option 1: Change two largest ⇒ `aₙ₋₃ - a₀`
  - Option 2: Change two smallest ⇒ `aₙ₋₁ - a₂`
  - Option 3: Change largest and smallest ⇒ `aₙ₋₂ - a₁`

  For each, min difference potentially becomes zero (by assigning equal values during the allowed changes).

  We pick the minimal among the three.

### Corner cases to consider  
- Arrays of length 3 (all can be made equal)
- Arrays where all elements are originally the same
- Arrays with already minimal score (e.g., minimal differences already 0)
- Large arrays (performance)
- Arrays with only one unique element

### Solution

```python
def minimizeScore(nums):
    # If there are only 3 elements, all can be changed to be equal
    if len(nums) <= 3:
        return 0

    # Sort the array for easier handling of extremes
    nums.sort()

    n = len(nums)
    # Three key ways to change 2 elements to minimize (high score):
    # (a) Change two smallest
    score1 = nums[n-1] - nums[2]
    # (b) Change two largest
    score2 = nums[n-3] - nums[0]
    # (c) Change one smallest and one largest
    score3 = nums[n-2] - nums[1]

    # The min difference (low score) can always be forced to 0 by making two elements the same
    return min(score1, score2, score3)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), due to sorting the array.
- **Space Complexity:** O(1) extra space, since sort can be in-place and only a few variables stored.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could change k elements instead of 2?  
  *Hint: Try to generalize how moving/removing endpoints affects the result after sorting.*

- Can this be done in O(n) time?  
  *Hint: Is there a way to select min/max endpoints without full sorting?*

- How would you find the indices of the elements to be changed for an in-place solution?  
  *Hint: Keep track of indices while sorting, or pre-scan for min/max elements.*

### Summary
This problem uses the **"Sort and squeeze the ends" pattern**—a common idea for minimizing/maximizing ranges and gaps when restricted changes are allowed. The approach applies to a broad class of problems where moving the extremes has the greatest impact. Recognizing that only the largest and smallest values matter allows an O(n log n) solution, crucial for large input sizes.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
