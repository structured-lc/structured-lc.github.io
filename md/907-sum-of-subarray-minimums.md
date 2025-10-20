### Leetcode 907 (Medium): Sum of Subarray Minimums [Practice](https://leetcode.com/problems/sum-of-subarray-minimums)

### Description  
Given an array of integers `arr`, find the sum of the minimum value of every contiguous subarray of `arr`. Return the result modulo 10⁹+7.  
That is: For each contiguous subarray, determine its minimum element and sum all such minimums for every possible subarray.

### Examples  

**Example 1:**  
Input: `[3,1,2,4]`  
Output: `17`  
*Explanation: The minimum of all subarrays: `[3]`→3, `[3,1]`→1, `[3,1,2]`→1, `[3,1,2,4]`→1, `[1]`→1, `[1,2]`→1, `[1,2,4]`→1, `[2]`→2, `[2,4]`→2, `[4]`→4.  
Sum = 3 + 1 + 1 + 1 + 1 + 1 + 1 + 2 + 2 + 4 = 17.*

**Example 2:**  
Input: `[11,81,94,43,3]`  
Output: `444`  
*Explanation: Compute all subarrays, take their minimums, and sum up. For brevity, omitted, but sum of subarray minimums is 444.*

**Example 3:**  
Input: `[2,9,7,8,3,4,6,1]`  
Output: `110`  
*Explanation: For each subarray, find the minimum, sum across all subarrays, and return result modulo 10⁹+7.*

### Thought Process (as if you’re the interviewee)  

- **Brute Force:** Enumerate all possible subarrays, find minimum in each, and sum. There are O(n²) subarrays, and finding the minimum for each takes up to O(n) time. That results in O(n³) overall—clearly too slow for n up to 30,000.
- **Optimization:**  
  Instead of brute forcing, observe that each element arr[i] is the minimum in certain subarrays. Can we quickly count how many subarrays where arr[i] is the minimum?
- **Monotonic Stack:**  
  For each arr[i]:
  - Find previous less element (PLE): nearest index to the left where arr[j] < arr[i], or -1 if none.
  - Find next less element (NLE): nearest index to the right where arr[k] < arr[i], or n if none.
  The number of subarrays where arr[i] is the minimum is (i - PLE) × (NLE - i).  
  Multiply this count by arr[i], sum for all i.
  - We use two passes with a monotonic increasing stack to efficiently obtain PLE and NLE for all elements in O(n) time each.
  - Finally, take result modulo 10⁹+7.
- **Reason for stack approach:**  
  - Achieves O(n) via next/previous less element trick.
  - No need to enumerate all subarrays or minimum searches.

### Corner cases to consider  
- Empty array (though per constraints, array has at least 1 element)
- All elements are the same (e.g. `[2,2,2,2]`)
- Strictly increasing or decreasing sequences
- Single element array `[x]`
- Large values, making sure to use modulo at each sum step
- Array with peak/trough in the middle

### Solution

```python
def sumSubarrayMins(arr):
    MOD = 10**9 + 7
    n = len(arr)
    stack = []
    prev_less = [None] * n
    next_less = [None] * n

    # Previous Less Element for each index
    for i in range(n):
        while stack and arr[stack[-1]] > arr[i]:
            stack.pop()
        prev_less[i] = stack[-1] if stack else -1
        stack.append(i)

    stack.clear()

    # Next Less Element for each index
    for i in range(n-1, -1, -1):
        while stack and arr[stack[-1]] >= arr[i]:
            stack.pop()
        next_less[i] = stack[-1] if stack else n
        stack.append(i)

    result = 0
    for i in range(n):
        count = (i - prev_less[i]) * (next_less[i] - i)
        result = (result + arr[i] * count) % MOD

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Each element is pushed/popped at most once onto each stack (left and right), so two O(n) passes.
- **Space Complexity:** O(n)  
  - Stacks and arrays for prev_less, next_less all use O(n) space.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve for sum of maximums in all subarrays, using a similar efficient approach?  
  *Hint: Try reversing the inequalities in the stack logic.*

- How would you adapt the solution if you wanted the k smallest/largest elements in each subarray?  
  *Hint: The monotonic stack works for minimum/maximum, but for k-th values you’d need a different data structure.*

- Can you extend this logic to multi-dimensional arrays or matrices (for sum of minimum of all rectangles)?  
  *Hint: Consider histogram-based DP or advanced monotonic stack approaches for 2D.*

### Summary
This problem demonstrates a classic use of the **monotonic stack** to efficiently identify previous and next less elements, avoiding brute force. It's a standard pattern in stack interview questions, widely used for histogram, stock span, and range query problems. The approach hinges on counting contributions of each element as the minimum across all subarrays in O(n) time. This reusable trick can be applied whenever a problem asks for aggregate contributions of local minimums or maximums in subarrays or intervals.


### Flashcard
For each arr[i], use a monotonic stack to find how many subarrays it is the minimum in, then sum arr[i] × (#subarrays) for all i.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Stack(#stack), Monotonic Stack(#monotonic-stack)

### Similar Problems
- Sum of Subarray Ranges(sum-of-subarray-ranges) (Medium)
- Sum of Total Strength of Wizards(sum-of-total-strength-of-wizards) (Hard)