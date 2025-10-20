### Leetcode 1950 (Medium): Maximum of Minimum Values in All Subarrays [Practice](https://leetcode.com/problems/maximum-of-minimum-values-in-all-subarrays)

### Description  
Given an array of integers `nums` of length n, for every subarray size k (where 1 ≤ k ≤ n), find the maximum value among all the minimum values from every subarray of size k in `nums`.  
Return an array `ans` where `ans[i]` is the maximum of minimum values of all subarrays of size i+1.

### Examples  

**Example 1:**  
Input: `[0,1,2,4]`  
Output: `[4, 2, 1, 0]`  
*Explanation:*
- Size 1: min()=0, min([1])=1, min([2])=2, min([4])=4 ⇒ max=4
- Size 2: min([0,1])=0, min([1,2])=1, min([2,4])=2 ⇒ max=2
- Size 3: min([0,1,2])=0, min([1,2,4])=1 ⇒ max=1
- Size 4: min([0,1,2,4])=0 ⇒ max=0

**Example 2:**  
Input: `[10,20,50,10]`  
Output: `[50, 20, 10, 10]`  
*Explanation:*
- Size 1: min()=10, min()=20, min()=50, min()=10 ⇒ max=50
- Size 2: min([10,20])=10, min([20,50])=20, min([50,10])=10 ⇒ max=20
- Size 3: min([10,20,50])=10, min([20,50,10])=10 ⇒ max=10
- Size 4: min([10,20,50,10])=10 ⇒ max=10

**Example 3:**  
Input: `[2,2,2,2]`  
Output: `[2, 2, 2, 2]`  
*Explanation:*  
Every subarray (of any size) has minimum value 2; max is always 2.

### Thought Process (as if you’re the interviewee)  
Brute-force would be: For each k from 1 to n, generate all subarrays of size k, compute their minimums, then take the max. This is O(n³), which clearly won't scale for large n.

We realize the min of subarrays is essentially a sliding window minimum problem. For each element, we can find the largest window where it is the minimum element, with the help of monotonic stacks to efficiently compute the left and right boundaries where each element is minimum. The length of this window gives us for which k this value of nums[i] could be a candidate minimum.

So, for each position i, calculate:
- left[i]: the previous index where nums[left[i]] < nums[i]
- right[i]: the next index where nums[right[i]] < nums[i]

The length for which nums[i] is the minimum is (right[i] - left[i] - 1). For this length, nums[i] can be the min; so for window size len, update ans[len-1] = max(ans[len-1], nums[i]).  
Finally, propagate the max from right to left to ensure monotonicity (since ans[k-1] ≥ ans[k]).

This reduces the complexity to O(n).

### Corner cases to consider  
- All elements equal (should return same element n times)
- Strictly increasing or decreasing arrays
- Single element array
- Array with repeating min
- Array size 1

### Solution

```python
def max_of_minimums(nums):
    n = len(nums)
    ans = [0] * n

    # Initialize previous and next smaller element arrays
    left = [-1] * n     # index of previous less element
    right = [n] * n     # index of next less element

    stack = []
    # Find previous less element for each
    for i in range(n):
        while stack and nums[stack[-1]] >= nums[i]:
            stack.pop()
        left[i] = stack[-1] if stack else -1
        stack.append(i)

    stack = []
    # Find next less element for each
    for i in range(n-1, -1, -1):
        while stack and nums[stack[-1]] >= nums[i]:
            stack.pop()
        right[i] = stack[-1] if stack else n
        stack.append(i)

    # Fill answer: for window size w, nums[i] can be the min for length = right[i] - left[i] - 1
    for i in range(n):
        w = right[i] - left[i] - 1
        ans[w-1] = max(ans[w-1], nums[i])

    # Propagate to smaller windows
    for i in range(n-2, -1, -1):
        ans[i] = max(ans[i], ans[i+1])

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because each element is pushed/popped at most once in the monotonic stack traversals and all other work is linear.
- **Space Complexity:** O(n), for the arrays to hold the stack, left/right bounds, and the answer output.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if the data is streaming and you don't know n in advance?  
  *Hint: Can you maintain window minimums on-the-fly, what are the sliding window approaches and their tradeoffs?*

- How can this be extended to 2D arrays (matrices) for queries on submatrices?  
  *Hint: Think about how histograms and monotonic stacks operate in more than one dimension.*

- What if you had to answer this query for only certain values of k, not all 1..n?  
  *Hint: Can you preprocess? If not, can you optimize for only queried sizes?*

### Summary
This problem follows a **monotonic stack** pattern, where for every index we compute the indices of previous and next smaller elements to determine the largest window where an element can be the minimum. Such strategies are common in problems involving "maximum of minimum in range" or "next/previous less/greater element" queries, like Largest Rectangle in Histogram, or Sliding Window Minimum. The approach is efficient and widely applicable to range-based and window-related problems.


### Flashcard
For each element, use a monotonic stack to find the largest window where it is the minimum, then for each window size, set the answer as the maximum such minimum found for that size.

### Tags
Array(#array), Stack(#stack), Monotonic Stack(#monotonic-stack)

### Similar Problems
