### Leetcode 2221 (Medium): Find Triangular Sum of an Array [Practice](https://leetcode.com/problems/find-triangular-sum-of-an-array)

### Description  
Given a **0-indexed** array of digits (each from 0 to 9), repeatedly form a new array by summing every two consecutive elements and taking the result modulo 10, until only one element remains. The result is called the **triangular sum**.

At each step, for all i, set newNums[i] = (nums[i] + nums[i+1]) mod 10. Replace nums with newNums, and repeat until only a single element remains. Return that value.

### Examples  

**Example 1:**  
Input: `[1,2,3,4,5]`  
Output: `8`  
*Explanation: Steps:
- [1,2,3,4,5] → [3,5,7,9] (since 1+2=3, 2+3=5, 3+4=7, 4+5=9)
- [3,5,7,9] → [8,2,6]     (since 3+5=8, 5+7=12→2, 7+9=16→6)
- [8,2,6] → [0,8]        (8+2=10→0, 2+6=8)
- [0,8] → 
- Only one element left, answer is 8.*

**Example 2:**  
Input: `[5]`  
Output: `5`  
*Explanation: Only one element present, so the answer is 5.*

**Example 3:**  
Input: `[0,9,2]`  
Output: `1`  
*Explanation:
- [0,9,2] → [9,1] (0+9=9, 9+2=11→1)
- [9,1] →      (9+1=10→0)
- Only one element left, answer is 0.*

### Thought Process (as if you’re the interviewee)  
First thought: simulate the process directly as described. Keep shrinking the array by calculating all pair-wise sums modulo 10, until size 1. This brute-force approach has a time complexity of O(n²).

Optimally, since all operations are local and each step reduces the array size by 1, an in-place simulation of the process can be done, always working from the start of the list. Despite some combinatorial formulas existing for similar "reduction" problems (like using binomial coefficients for similar stepwise sum reductions), modulo 10 here makes direct simulation more practical.

Trade-offs:  
- Brute force is acceptable for small n (n ≤ 1000), as time is O(n²).
- In-place simulation keeps space at O(n).

### Corner cases to consider  
- Array with only one element (should return that element).
- Array with all 0s (should return 0).
- Array with largest and smallest digits (test modulo operation).
- Array already at length 2.

### Solution

```python
def triangularSum(nums):
    # Simulate the reduction until only one element remains
    n = len(nums)
    # Iterate for n-1 rounds; after each, the array shrinks by 1
    for size in range(n, 1, -1):
        for i in range(size - 1):
            # Update nums[i] in-place with the sum mod 10 of current and next
            nums[i] = (nums[i] + nums[i + 1]) % 10
    # The answer is now at nums[0]
    return nums[0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²).  
  There are n-1 reduction rounds, each with a decreasing number of operations (n-1, n-2, ..., 1), which sums to n(n-1)/2 = O(n²).
- **Space Complexity:** O(1) extra.  
  The calculations are done in-place; no extra space apart from the input array.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize time for very large n using mathematical patterns?
  *Hint: Consider properties of binomial coefficients and modulus arithmetic.*

- What if the modulo base is not 10, but an arbitrary k?
  *Hint: Carefully generalize the step logic and consider wrap-arounds for any base.*

- Can you return the entire triangle (all intermediate arrays) instead of just the sum?
  *Hint: Collect each layer as you generate it and store in a list of lists.*

### Summary
This approach is a classic **in-place simulation** of a reduction operation, shrinking an array stepwise according to a given rule. This pattern is similar to the Pascal's Triangle or cumulative reductions, but because of the modulo operation and requirements, a direct iterative reduction is both clear and efficient for reasonable n. This coding style is also common for problems involving "local" transformations and cumulative state reductions.

### Tags
Array(#array), Math(#math), Simulation(#simulation), Combinatorics(#combinatorics)

### Similar Problems
- Pascal's Triangle II(pascals-triangle-ii) (Easy)
- Calculate Digit Sum of a String(calculate-digit-sum-of-a-string) (Easy)
- Min Max Game(min-max-game) (Easy)