### Leetcode 2616 (Medium): Minimize the Maximum Difference of Pairs [Practice](https://leetcode.com/problems/minimize-the-maximum-difference-of-pairs)

### Description  
Given an array of integers `nums` and an integer `p`, form `p` pairs such that:
- Each index in `nums` can belong to at most one pair (i.e. all pairs are disjoint).
- For each pair, the difference is the absolute value between the two numbers.
- You want to **minimize the maximum difference** among all selected pairs.

Return the minimal possible value of the maximum difference, after forming exactly `p` disjoint pairs.

### Examples  

**Example 1:**  
Input: `nums = [1,3,6,19,20], p = 2`  
Output: `2`  
*Explanation: Pair (1,3) → 2 and (19,20) → 1. The other possible pair is (3,6) → 3, but the max among all differences is 3, which is worse.  
So, use (1,3) and (19,20). Max difference = 2.*

**Example 2:**  
Input: `nums = [10,1,2,7,1,3], p = 2`  
Output: `1`  
*Explanation: After sorting: [1,1,2,3,7,10]. Pick pairs (1,1) → 0 and (2,3) → 1.  
The maximum difference is 1, which is minimized.*

**Example 3:**  
Input: `nums = [4,2,1,5], p = 1`  
Output: `1`  
*Explanation: After sorting: [1,2,4,5]. Possible pairs: (1,2) → 1, (4,5) → 1.  
Either works, maximum difference = 1.*

### Thought Process (as if you’re the interviewee)  
Start by looking for a brute-force approach:  
Try all ways to pick p disjoint pairs and find the minimal max difference. This quickly explodes in complexity for larger n.

Instead, notice:
- If you sort `nums`, pairing up elements close in value means differences will be smaller.
- Can we efficiently *check* whether it's possible to select p disjoint pairs such that all differences ≤ x, for a given x?
- Use binary search on x: for each candidate max difference x, greedily pair adjacent numbers in sorted order (if their difference ≤ x), and count how many such pairs can be formed.
- This way, minimize the search space for max difference.
- Stop when you find the smallest x that allows at least p pairs.

This combines sorting, greedy pairing, and binary search for an efficient solution.

### Corner cases to consider  
- nums has duplicate elements (difference 0)
- p = 0 (no pair needed)
- nums is empty or has <2 elements
- p > ⌊n/2⌋ (not possible to form enough pairs)
- nums already sorted vs. unsorted input
- All elements identical

### Solution

```python
def minimizeMax(nums, p):
    # Sort nums so that closest values are adjacent
    nums.sort()
    
    def can_form_pairs(max_diff):
        # Greedily try to form as many valid pairs as possible
        count = 0
        i = 1
        n = len(nums)
        while i < n:
            if nums[i] - nums[i-1] <= max_diff:
                count += 1
                i += 2  # use both
            else:
                i += 1  # skip current, check next
        return count >= p
    
    # Binary search over the answer space
    left, right = 0, nums[-1] - nums[0]
    answer = right
    while left <= right:
        mid = (left + right) // 2
        if can_form_pairs(mid):
            answer = mid
            right = mid - 1  # try smaller max difference
        else:
            left = mid + 1   # try larger max difference
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n log n) for sorting + O(n log D) for binary search iterations (D is the range of possible differences).  
  - Each binary search iteration takes O(n) for greedy pairing, total log D iterations.
  - So total: O(n log n + n log D)

- **Space Complexity:**  
  O(1) extra space (aside from sorting, if in-place). No extra data structures based on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to output the actual pairs chosen, not just the minimized maximum difference?  
  *Hint: Store which pairs were selected during greedy pass.*

- How can you optimize it if `nums` is extremely large and can't fit in memory?  
  *Hint: Use external sorting and process in windows—harder, may require approximation.*

- What changes if instead of minimizing the **maximum** difference, you want to minimize the sum of differences?  
  *Hint: Dynamic Programming is needed, this greedy approach doesn't work.*

### Summary
This is a classic use of **greedy with binary search**: sort, check feasibility by greedy pairing, binary search over answer space.  
This "binary search on answer + greedy checker" approach is common in array partition and minimization problems, for example:  
- Minimum Maximum Pair Sum,  
- Split Array Largest Sum,  
- Aggressive Cows (partitioning stalls), etc.  
Very efficient and robust for problems asking "minimize some maximum/minimum over subsets subject to constraints."

### Tags
Array(#array), Binary Search(#binary-search), Dynamic Programming(#dynamic-programming), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Minimum Absolute Difference(minimum-absolute-difference) (Easy)
- Minimum Difference Between Largest and Smallest Value in Three Moves(minimum-difference-between-largest-and-smallest-value-in-three-moves) (Medium)