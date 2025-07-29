### Leetcode 1063 (Hard): Number of Valid Subarrays [Practice](https://leetcode.com/problems/number-of-valid-subarrays)

### Description  
Given an array of integers `nums`, your goal is to count the number of non-empty contiguous subarrays where for each subarray, **the leftmost element is not larger than any other element in that subarray**.  
In other words, for every subarray, the first element should be less than or equal to all of its elements. You need to output the total number of such subarrays.

### Examples  

**Example 1:**  
Input: `nums = [1,4,2,5,3]`  
Output: `11`  
Explanation:  
Valid subarrays are: `[1]`, `[1,4]`, `[1,4,2]`, `[1,4,2,5]`, `[1,4,2,5,3]`, `[4]`, `[2]`, `[2,5]`, `[2,5,3]`, `[5]`, `[3]`.

**Example 2:**  
Input: `nums = [3,2,1]`  
Output: `3`  
Explanation:  
Valid subarrays: `[3]`, `[2]`, `[1]`.  
Every element is only valid as a subarray by itself since the next element is smaller and would violate the condition.

**Example 3:**  
Input: `nums = [2,2,2]`  
Output: `6`  
Explanation:  
Valid subarrays: `[2]`, `[2]`, `[2]`, `[2,2]`, `[2,2]`, `[2,2,2]`.  
Every subarray starting at each element and extending to the right will have all elements ≥ the leftmost, so all are valid.

### Thought Process (as if you’re the interviewee)  

Let’s try to break this down:

- **Brute-force approach:** For every possible starting index in the array, expand the subarray to the right as long as all subsequent elements are greater than or equal to the starting one. Count all such subarrays.  
- **Complexity:** This is O(n²), which is too slow for large arrays (up to 5⋅10⁴ elements).

- **Optimized approach:**  
  - Let’s try a more efficient way.  
  - The key insight: For each position i, how far right can I extend my subarray before I hit a number smaller than nums[i]?  
  - If for each i we could quickly find the first index j ≥ i such that nums[j] < nums[i], then every subarray `[i, i+1, ..., j-1]` would be valid and would contribute `(j - i)` subarrays.
  - This is a classic scenario for a **monotonic stack**: traverse the array, maintaining a stack of indices such that their corresponding values are increasing.  
  - We can process from left to right, and for each index, as long as current nums[i] < stack top's value, pop from the stack. For each pop, record how many subarrays are validated by that index.
  - Alternatively, for each element, use the stack to find the next element to the right that is strictly less.

- **Why monotonic stack is efficient here:** Every index is pushed and popped at most once, so total time remains O(n).

### Corner cases to consider  
- Single-element arrays
- All elements equal (longest chains)
- Strictly decreasing array (each element only valid alone)
- Strictly increasing array (each prefix valid)
- Arrays with zeros or large numbers
- Empty array (though constraints say at least 1 element)

### Solution

```python
def validSubarrays(nums):
    # Stack for indices. We'll find for each i the furthest index j where nums[j] >= nums[i]
    stack = []
    count = 0
    n = len(nums)
    
    # We'll go from left to right
    for i in range(n):
        # While the stack is not empty AND the top of the stack is greater than nums[i],
        # pop those indices and for each, count how many subarrays end there.
        while stack and nums[i] < nums[stack[-1]]:
            idx = stack.pop()
            # The interval of subarrays starting at idx ends at i-1
            count += i - idx
        stack.append(i)
    
    # For anything left in the stack, their valid suffix goes until the very end
    while stack:
        idx = stack.pop()
        count += n - idx
        
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each index is pushed and popped at most once, and all operations inside the loop are O(1).
- **Space Complexity:** O(n)  
  At most n indices are on the stack at any time.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose you want to **output all valid subarrays** instead of just counting — how would you approach this?  
  *Hint: What data would you need to store for each valid range? Could you represent them efficiently?*

- Could you **solve the problem if the comparison required strictly increasing subarrays starting at the leftmost element?**  
  *Hint: How would you change your monotonic stack? Where is the comparison different?*

- How would your solution change if **the minimum had to be at the rightmost position** instead?  
  *Hint: Try reversing the logic and the order of traversal.*

### Summary
This problem uses the **monotonic stack pattern**, a common tool for dealing with **next/previous greater/smaller element** problems in arrays.  
This is highly efficient for problems where you scan linearly but need retroactive knowledge about order (like histogram largest rectangle, daily temperatures, etc.).  
Understanding this pattern is extremely valuable for a range of subarray and range-query questions.