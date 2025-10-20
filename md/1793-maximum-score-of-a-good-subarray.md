### Leetcode 1793 (Hard): Maximum Score of a Good Subarray [Practice](https://leetcode.com/problems/maximum-score-of-a-good-subarray)

### Description  
Given an integer array nums and an integer k (0-based index), your goal is to find the **maximum score** of any subarray that **must include index k**.  
- The **score** of a subarray nums[i..j] is defined as:  
  **score = min(nums[i..j]) × (j - i + 1)**
- Any subarray you pick must have i ≤ k ≤ j.  
- Return the *maximum possible score* of any such subarray.

### Examples  

**Example 1:**  
Input: `nums = [1,4,3,7,4,5], k = 3`  
Output: `15`  
*Explanation: The best subarray is [3,7,4,5], which covers indices 2..5 (including k=3). The minimum is 3, width is 5-1+1 = 5, so score = 3 × 5 = 15.*

**Example 2:**  
Input: `nums = [5,5,4,5,4,1,1,1], k = 0`  
Output: `8`  
*Explanation: The subarray [5,5] (indices 0..1) includes k=0. Minimum is 5, size 2, score = 5 × 2 = 10. But including more makes minimum drop to 4 or 1, so max is 10.*

**Example 3:**  
Input: `nums = [1], k = 0`  
Output: `1`  
*Explanation: Only one element, score = 1 × 1 = 1.*

### Thought Process (as if you’re the interviewee)  
First, the brute-force solution is to try all subarrays covering k, find their minimum, calculate their score, and return the max.  
- For each i ≤ k, j ≥ k, calculate min(nums[i..j]), then score = min × (j - i + 1).  
- This is O(n²). Since n can be up to 10⁵, brute-force is too slow.

**How to optimize?**  
Notice:  
- The score of a subarray is determined by its minimal value and its width.  
- If you "fix" each value in nums as the minimum, you want to find the largest window containing k where this value is the minimum.  
- This is similar to the "Largest Rectangle in Histogram" pattern. For each position, if you know the nearest position to the left and right where the value is smaller, you know the maximal window for which the value is minimal.

**Optimized approach:**  
- For each index, compute `left[i]`: first index to the left where nums[left[i]] < nums[i] (or -1).
- Compute `right[i]`: first index to the right where nums[right[i]] < nums[i] (or n).
- Using monotonic stack, precompute left and right in O(n).
- For every index i, if left[i] < k < right[i], it means subarray [left[i]+1, right[i]-1] includes k with nums[i] as min. Calculate its score: nums[i] × (right[i]-left[i]-1).
- Maximize this over all i.

**Why does this work?**  
- You consider every candidate minimum; within its window, k must be inside, otherwise skip.
- This is O(n) with stacks.

### Corner cases to consider  
- Array of length 1 (just k)
- k at the start or end
- All elements equal
- Strictly increasing or decreasing arrays
- Very large or very small integer elements
- Cases where subarray can be only element k

### Solution

```python
def maximumScore(nums, k):
    n = len(nums)
    left = [-1] * n  # left[i]: nearest index to the left with value < nums[i]
    right = [n] * n  # right[i]: nearest index to the right with value < nums[i]
    stack = []

    # Populate left[]
    for i in range(n):
        while stack and nums[stack[-1]] >= nums[i]:
            stack.pop()
        if stack:
            left[i] = stack[-1]
        stack.append(i)
    
    # Reset and populate right[]
    stack = []
    for i in range(n - 1, -1, -1):
        while stack and nums[stack[-1]] >= nums[i]:
            stack.pop()
        if stack:
            right[i] = stack[-1]
        stack.append(i)
    
    ans = 0
    for i in range(n):
        # Subarray [left[i] + 1, right[i] - 1] has nums[i] as the minimum
        # Check if this range contains k
        if left[i] < k < right[i]:
            width = right[i] - left[i] - 1
            score = nums[i] * width
            ans = max(ans, score)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  - Two passes for `left` and `right` (monotonic stack), and one pass to compute answer.
- **Space Complexity:** O(n)  
  - Storing `left`, `right`, and `stack` arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if the subarray did *not* have to contain k?  
  *Hint: This is exactly the Largest Rectangle in Histogram problem.*

- What if you had to return all the subarrays achieving the max score, not just the value?  
  *Hint: Track intervals and check equality during max calculation.*

- Can this be done in O(1) space?  
  *Hint: Can you do both passes in-place or with reduced storage?*

### Summary
This solution uses the **monotonic stack pattern** to efficiently find and expand the largest possible interval for each candidate minimum value, which matches the core logic behind the "Largest Rectangle in Histogram" problem.  
The approach is highly efficient (O(n)), exploits the importance of window size and minimum values, and is very reusable for other interval/min-max subarray problems.


### Flashcard
Fix each value as the minimum in a subarray and find the largest window to maximize the score.

### Tags
Array(#array), Two Pointers(#two-pointers), Binary Search(#binary-search), Stack(#stack), Monotonic Stack(#monotonic-stack)

### Similar Problems
- Largest Rectangle in Histogram(largest-rectangle-in-histogram) (Hard)