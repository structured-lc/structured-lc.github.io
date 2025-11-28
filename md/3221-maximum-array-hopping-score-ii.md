### Leetcode 3221 (Medium): Maximum Array Hopping Score II [Practice](https://leetcode.com/problems/maximum-array-hopping-score-ii)

### Description  
Given an array of integers **nums**, you are at index 0 and must reach the last index. At each step, you may jump from index *i* to any index *j* > *i*. Each jump gives you a score of (*j* − *i*) × nums[*j*]. Return the **maximum score** you can get when reaching the last index.

### Examples  

**Example 1:**  
Input: `nums = [1,5,8]`,  
Output: `16`  
Explanation:  
- Possible hops:
    - 0 → 1 → 2: (1 − 0) × 5 + (2 − 1) × 8 = 5 + 8 = 13  
    - 0 → 2: (2 − 0) × 8 = 16  
- Best: direct jump 0 → 2 with score 16.

**Example 2:**  
Input: `nums = [4,5,2,8,9,1,3]`,  
Output: `42`  
Explanation:  
- Hop: 0 → 4 → 6  
  - (4 − 0) × 9 = 36  
  - (6 − 4) × 3 = 6  
  - Total score: 36 + 6 = 42

**Example 3:**  
Input: `nums = [3, 2]`,  
Output: `2`  
Explanation:  
- Only hop: 0 → 1: (1 − 0) × 2 = 2

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all possible paths from 0 to n - 1, explore all hops recursively, and keep the maximum score. Inefficient due to exponential time.

- **DP Definition:**  
  Let dp[i] be the maximum score to reach index i.  
  - dp = 0  
  - For all i > 0: dp[i] = max over k < i of (dp[k] + (i − k) × nums[i])

- Since at every step, the optimal hop is to jump from the position that results in the highest accumulated score, we want to efficiently find the best previous dp[k] for every i.

- **Optimized Approach:**  
  Since each hop’s score depends only on (i − k) × nums[i], for small n (constraint n ≤ 105), we can compute each dp[i] efficiently.  
  For this problem, a **reverse greedy observation** reveals that at every index, it is optimal to hop to the next maximum in the remainder of the array.  
  So, we traverse from the end to the start, keeping track of the maximum value in the suffix and accumulate the answer accordingly.

- **Trade-offs:**  
  - Brute-force/DP: O(n²), not feasible for large n.
  - Greedy/reverse accumulation: O(n), optimal due to the problem’s structure.

### Corner cases to consider  
- Array of length 2 (must take single jump)
- All elements equal
- Strictly increasing or strictly decreasing nums
- Large values toward the end
- Maximum score path skips multiple elements
- Negative numbers (if allowed in follow-up)

### Solution

```python
def maxScore(nums):
    # We accumulate the result backwards, always hopping to the largest possible value in the suffix.
    max_suffix = 0
    ans = 0
    n = len(nums)
    # Start at the end and move to the start, accumulating the max as our best next hop
    for i in range(n - 1, 0, -1):
        max_suffix = max(max_suffix, nums[i])
        ans += max_suffix
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), as we make one pass from the end to the start and only compare and sum values.
- **Space Complexity:** O(1), no extra storage other than a few variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if nums can have negative numbers?  
  *Hint: Analyze whether skipping over large negative values could ever be optimal.*

- How would you output not just the score, but also the actual sequence of indices hopped?  
  *Hint: Store the best 'next index' at each step, reconstruct backward.*

- If you could only hop up to k indices ahead (not arbitrarily far), how would you solve it?  
  *Hint: Consider a DP with a sliding window for the best dp value in range [i − k, i − 1].*

### Summary
This problem follows a **reverse greedy** and **dynamic accumulation** pattern, where future optimal decisions only depend on the best possible choice onwards. The coding pattern used is similar to those found in "maximum sum path" problems and can be generalized to array dynamic programming with one-way dependencies. Variants may require windowed maxima (monotonic queue) or reconstructing paths, but the main insight here is that greedy suffix selection is optimal.


### Flashcard
DP where dp[i] = maximum score to reach i; optimize with segment tree or monotonic deque to find best previous position efficiently.

### Tags
Array(#array), Stack(#stack), Greedy(#greedy), Monotonic Stack(#monotonic-stack)

### Similar Problems
