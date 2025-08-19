### Leetcode 2865 (Medium): Beautiful Towers I [Practice](https://leetcode.com/problems/beautiful-towers-i)

### Description  
Given a 0-indexed array `maxHeights` of n integers, you want to build n towers along a coordinate line. The iᵗʰ tower is at position i and can have height from 1 up to `maxHeights[i]`. You may remove bricks from any tower (i.e., reduce its height), but not add beyond its maximum. You must choose an arrangement of heights to make the sequence *beautiful*:  
- There is a peak at some index `k` (0 ≤ k < n), so the heights strictly increase or stay the same up to k, and after k, strictly decrease or stay the same.  
- Heights must satisfy: 1 ≤ heights[i] ≤ maxHeights[i] for all i.  
Return the **maximum possible sum of tower heights** in any beautiful configuration.

### Examples  

**Example 1:**  
Input: `maxHeights = [5,3,4,1,1]`  
Output: `13`  
*Explanation: One beautiful configuration is [5,3,3,1,1].  
Heights increase to 5 (peak at i=0), then decrease or stay the same.  
Sum = 5+3+3+1+1 = 13.  
No better sum is possible.*

**Example 2:**  
Input: `maxHeights = [6,5,3,9,2,7]`  
Output: `22`  
*Explanation: Peak at index 3 with height 3.  
Configuration: [3,3,3,3,2,1] gives 3+3+3+3+2+1 = 15.  
But notice you can pick [5,5,3,3,2,1] for peak at 1: sum = 5+5+3+3+2+1 = 19.  
With [6,5,3,3,2,1], sum = 6+5+3+3+2+1 = 20.  
Try the peak at 5: [1,2,3,5,2,7], sum = 1+2+3+5+2+7 = 20.  
Peak at 3, use [3,3,3,9,2,1], sum = 3+3+3+9+2+1 = 21.  
So max sum is 22 for configuration [3,5,3,9,2,0] (but 0 not allowed), so most cases it's [6,5,3,9,2,1] = 26.  
However, we need to observe for the best breakdown (see approach section).*

**Example 3:**  
Input: `maxHeights = [1,1,1]`  
Output: `3`  
*Explanation: Only possible config is [1,1,1]. Any peak position is valid.*

### Thought Process (as if you’re the interviewee)  

First, I’d try a brute-force approach:  
- For every possible peak position k (0 to n-1), create a configuration rising to k and then falling.  
- For i to k (left side including peak), set heights[i] = min( maxHeights[i], heights[i-1] if i > 0 else maxHeights[i] ), not exceeding the previous.  
- For i = k-1 to 0, heights[i] = min(heights[i], heights[i+1])  
- For i = k+1 to n-1 (right side), heights[i] = min( maxHeights[i], heights[i-1] )

But brute-force is too slow since it checks all n possible peaks and for each, traverses the array, so time is O(n²).

Can we do better?  
- For each peak position k, "expand" heights to the left and right greedily:
  - Going left: heights[i] = min(maxHeights[i], heights[i+1]) for i in [k-1,0] (not ascending).
  - Going right: heights[i] = min(maxHeights[i], heights[i-1]) for i in [k+1, n-1] (not ascending).
- This can be done in O(n) for each peak, so O(n²) total.

However, we can precompute left and right contributions using **monotonic stacks**:
- Calculate, for each i, the sum if i is the peak by growing to the right and left.
- Use a stack to ensure as we go left/right, we always stay ≤ previous cell.

Trade-offs:  
- Brute-force is clear but slow.
- Monotonic stack + prefix sums let us do O(n) per direction, so overall O(n) time.

### Corner cases to consider  
- Empty array (not allowed by problem, but check).
- All maxHeights equal.
- Only one tower.
- A tower with value 1 surrounded by higher values.
- Zig-zag values: e.g. [1,5,1,5,1].

### Solution

```python
def maximumSumOfHeights(maxHeights):
    n = len(maxHeights)
    left = [0] * n
    right = [0] * n

    # Compute left sum for each possible peak using monotonic stack
    stack = []
    sum_left = [0] * n
    for i in range(n):
        while stack and maxHeights[stack[-1]] >= maxHeights[i]:
            stack.pop()
        if not stack:
            sum_left[i] = maxHeights[i] * (i+1)
        else:
            j = stack[-1]
            sum_left[i] = sum_left[j] + maxHeights[i] * (i - j)
        stack.append(i)

    # Compute right sum for each possible peak using monotonic stack
    stack = []
    sum_right = [0] * n
    for i in range(n-1, -1, -1):
        while stack and maxHeights[stack[-1]] >= maxHeights[i]:
            stack.pop()
        if not stack:
            sum_right[i] = maxHeights[i] * (n - i)
        else:
            j = stack[-1]
            sum_right[i] = sum_right[j] + maxHeights[i] * (j - i)
        stack.append(i)

    # The total for peak at i is sum_left[i] + sum_right[i] - maxHeights[i] (to avoid double counting peak)
    res = 0
    for i in range(n):
        res = max(res, sum_left[i] + sum_right[i] - maxHeights[i])
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we scan left and right each with a monotonic stack once.
- **Space Complexity:** O(n), arrays for left, right, stacks, and prefix sums.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if the array length is much larger?  
  *Hint: Can you avoid explicitly storing arrays for every possible peak?*

- How would the answer change if the heights needed to strictly increase to the peak (not allow equal)?  
  *Hint: Would change min() to strictly less than previous?*

- What if you could increase heights as well, not just decrease?  
  *Hint: How do constraints now change the min() approach?*

### Summary
This problem is a classic use of **monotonic stacks** and **greedy cascades** for array manipulation under monotonic constraints. The left-right expansion pattern is common in mountain-array, histogram, and DP problems. Efficient prefix-sum-like approaches with monotonic stacks allow O(n) solutions and are valuable for similar "form a shape" optimizations.

### Tags
Array(#array), Stack(#stack), Monotonic Stack(#monotonic-stack)

### Similar Problems
- Valid Mountain Array(valid-mountain-array) (Easy)
- Minimum Number of Removals to Make Mountain Array(minimum-number-of-removals-to-make-mountain-array) (Hard)
- Maximum Number of Books You Can Take(maximum-number-of-books-you-can-take) (Hard)