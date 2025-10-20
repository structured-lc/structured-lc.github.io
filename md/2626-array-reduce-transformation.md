### Leetcode 2626 (Easy): Array Reduce Transformation [Practice](https://leetcode.com/problems/array-reduce-transformation)

### Description  
You are given an integer array and a reducer function, along with an initial value. The goal is to apply the reducer function between an accumulated result (starting with the initial value) and each element of the array, from left to right, updating the accumulator each time. At the end, return the final accumulated value. This is a classic "reduce" operation.  
If the given array is empty, return the initial value.  
**Do not use the built-in Array.reduce method.**

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4], fn = sum(accum, curr) = accum + curr, init = 0`  
Output: `10`  
*Explanation: Step-by-step: val = 0+1 = 1, then 1+2 = 3, then 3+3 = 6, then 6+4 = 10. Final result is 10.*

**Example 2:**  
Input: `nums = [1,2,3,4], fn = product(accum, curr) = accum * curr, init = 1`  
Output: `24`  
*Explanation: Step-by-step: val = 1×1 = 1, then 1×2 = 2, 2×3 = 6, 6×4 = 24. Result is 24.*

**Example 3:**  
Input: `nums = [], fn = any function, init = 42`  
Output: `42`  
*Explanation: Since the array is empty, the initial value 42 is returned directly.*

### Thought Process (as if you’re the interviewee)  
- Brute-force approach:  
  - Start with the initial value and loop through the nums array.
  - For each element, update the accumulator by applying fn(accumulator, element).
  - Return the accumulator after the loop.
- There are no significant optimizations needed, as each array element must be visited.  
- This pattern is essentially reimplementing the "reduce" method found in most languages.  
- The only twist is handling the empty array case by explicitly returning the initial value.  
- Avoid any use of built-in reduce or related methods as instructed.

### Corner cases to consider  
- Empty array — should just return `init`.  
- One-element array — fn will run once with init, output should match.  
- Large arrays — make sure not to overflow or run into performance bottlenecks.
- The reducer function itself may have corner cases (e.g., division by zero).
- init is a non-zero or “identity” value (e.g., init = 1 for product, 0 for sum).

### Solution

```python
def reduce(nums, fn, init):
    # Start the result with the initial value
    result = init
    # Loop through each number in the input list
    for num in nums:
        # Apply the reducer function and update result
        result = fn(result, num)
    # Return the final reduced result
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of nums. We loop over each element exactly once.
- **Space Complexity:** O(1), extra space is constant regardless of input size. Only a few variables are used.

### Potential follow-up questions (as if you’re the interviewer)  

- How could you implement a version that supports asynchronous reducer functions?  
  *Hint: What if each fn call returns a promise? Should result be awaited?*

- What happens if fn is not associative or not commutative?  
  *Hint: Order of reduction matters.*

- Extend this to support left-to-right vs right-to-left reduction (reduce vs reduceRight).  
  *Hint: What changes if you process elements from the end instead?*

### Summary
This problem uses the classic **reduction** pattern to collapse an array into a single accumulated value. It highlights array iteration, the accumulator concept, and careful initial value handling. This pattern applies broadly, such as summing arrays, building products, chaining transformations, constructing objects, and beyond. It is a core pattern in data processing, functional programming, and foundational to languages like JavaScript and Python.


### Flashcard
Implement array reduce by iterating through the array, updating an accumulator with a given function, and returning the final accumulator value.

### Tags

### Similar Problems
- Group By(group-by) (Medium)
- Filter Elements from Array(filter-elements-from-array) (Easy)
- Apply Transform Over Each Element in Array(apply-transform-over-each-element-in-array) (Easy)