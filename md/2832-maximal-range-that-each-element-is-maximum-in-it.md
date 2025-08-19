### Leetcode 2832 (Medium): Maximal Range That Each Element Is Maximum in It [Practice](https://leetcode.com/problems/maximal-range-that-each-element-is-maximum-in-it)

### Description  
Given a list of distinct integers `nums` (0-indexed), for each index i, find the **maximum length** of a contiguous subarray where `nums[i]` is the **maximum** element in that subarray. Output an array `ans` such that `ans[i]` is the answer for index i.

In other words:  
For every index i, what’s the biggest window centered on i where `nums[i]` stays the maximum?

### Examples  

**Example 1:**  
Input: `nums = [1, 3, 2]`  
Output: `ans = [1, 3, 1]`  
*Explanation:*
- For index 0 (`1`): Only `[1]` since `3` at index 1 is greater.
- For index 1 (`3`): The whole array `[1,3,2]`, length 3.
- For index 2 (`2`): Only `[2]` since `3` is greater to its left.

**Example 2:**  
Input: `nums = [4, 3, 2, 1]`  
Output: `ans = [4, 1, 1, 1]`  
*Explanation:*
- For index 0 (`4`): Entire array, since nothing else is bigger or equal.
- For indices 1–3: Only the element itself, since `4` is to their left.

**Example 3:**  
Input: `nums = [5, 1, 4, 2, 3]`  
Output: `ans = [5, 1, 3, 1, 1]`  
*Explanation:*
- Index 0 (`5`): Whole array `[5,1,4,2,3]` (len=5), since `5` is always the maximum.
- Index 1 (`1`): Only `[1]`, `5` is greater on the left, `4` on the right.
- Index 2 (`4`): Can stretch [`1,4,2`] (indices 1 through 3), since `5` breaks on the left, `4` is max between 1 and 3; length 3.
- Index 3 (`2`) and 4 (`3`): Only themselves, because `4` or `5` blocks expansion.

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  For each i, try all possible subarrays that include i and check if `nums[i]` is the maximum. This leads to O(n³) time, as for each index, you check all subarrays, and for each, you scan for the maximum.

- **Can we do better?**
  Yes. For each i, expand to the left and right until you hit an element greater than `nums[i]` (since all elements are distinct). This gives O(n²) in the worst case.

- **Optimized (Monotonic Stack):**  
  Treating this as a next greater/previous greater problem, for each i:
    - Find the closest previous index `l` with a value **greater** than `nums[i]`
    - Find the closest next index `r` with a value **greater** than `nums[i]`
    - The max window is from (l+1) to (r-1), so its length is `r - l - 1`.
  
  Use a monotonic stack to compute previous and next greater for each index in O(n) time.

- **Tradeoff:**  
  O(n) time and space, which is optimal for this problem.

### Corner cases to consider  
- Empty array (should return empty, but problem statements usually assume n≥1).
- Single element array (answer: [1]).
- Strictly increasing or decreasing arrays.
- All elements except one are much smaller or larger.
- No element repeats (distinct values guaranteed).

### Solution

```python
def maximumLengthOfRanges(nums):
    n = len(nums)
    left = [-1] * n  # index of first greater on the left (or -1)
    right = [n] * n  # index of first greater on the right (or n)

    stack = []
    # Compute previous greater for each index
    for i in range(n):
        while stack and nums[stack[-1]] <= nums[i]:
            stack.pop()
        if stack:
            left[i] = stack[-1]
        stack.append(i)

    stack = []
    # Compute next greater for each index
    for i in range(n - 1, -1, -1):
        while stack and nums[stack[-1]] <= nums[i]:
            stack.pop()
        if stack:
            right[i] = stack[-1]
        stack.append(i)

    # Calculate the answer for each index
    ans = []
    for i in range(n):
        ans.append(right[i] - left[i] - 1)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Each index is pushed/popped at most once in each pass for the monotonic stack.
- **Space Complexity:** O(n).  
  Used for the two arrays (`left`, `right`) and the stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if values can repeat?  
  *Hint: What should counts be if there are equal elements?*  
- How would you solve for maximum/minimum for each subarray instead?  
  *Hint: What’s the sliding window maximum/minimum pattern?*
- Can you modify the code to support dynamic updates (i.e., online queries)?  
  *Hint: Is there a data structure that can do this efficiently? (e.g., segment trees)*

### Summary
The core pattern is **monotonic stack** for finding the next/previous greater element for each index. This is a very common trick in subarray-range queries (like sliding window maximum/minimum, histogram area, etc.), and it lets us solve the range-maximum expansion problem in O(n) time. Recognizing the connection to “boundaries” via stacks is crucial for efficient interview solutions.

### Tags
Array(#array), Stack(#stack), Monotonic Stack(#monotonic-stack)

### Similar Problems
