### Leetcode 3701 (Easy): Compute Alternating Sum [Practice](https://leetcode.com/problems/compute-alternating-sum)

### Description  
Given an integer array `nums`, compute its **alternating sum** by adding all elements at even indices and subtracting all elements at odd indices.  
The formula is: nums₀ − nums₁ + nums₂ − nums₃ + ... (alternating + and − signs by index).  
Return a single integer, the alternating sum.

### Examples  

**Example 1:**  
Input: `[1, 3, 5, 7]`  
Output: `-4`  
*Explanation: Even indices (0,2): 1 + 5 = 6. Odd indices (1,3): 3 + 7 = 10. Alternating sum: 6 - 10 = -4.*

**Example 2:**  
Input: `[2, 2, 2]`  
Output: `2`  
*Explanation: Index 0: +2, Index 1: -2, Index 2: +2; Alternating sum: 2 - 2 + 2 = 2.*

**Example 3:**  
Input: `[5]`  
Output: `5`  
*Explanation: Only index 0; alternate sum: +5.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Iterate through the entire array using a simple loop. For index `i`, add `nums[i]` if `i` is even; subtract `nums[i]` if `i` is odd.
  Could keep two sums, or directly use a variable and flip sign.

- **Optimized:**  
  Instead of checking whether index is even/odd each time, use a `sign` variable: start at `+1`, then flip between `+1` and `-1` by multiplying by `−1` after every iteration.

- **Final approach:**  
  Loop once through array, update sum as `sum += sign × nums[i]`, and flip sign with `sign = -sign` each iteration.  
  This is `O(n)` time, `O(1)` space, as we only need a few variables.

### Corner cases to consider  
- `nums` has only one element: Result should be that element  
- `nums` is empty: Should return 0 (depending on constraints)  
- All elements are equal  
- Large or small values  
- Negative numbers (not in constraints, but good to check if code is robust)

### Solution

```python
def alternating_sum(nums):
    total = 0
    sign = 1  # Start with + for index 0
    for num in nums:
        total += sign * num
        sign *= -1  # Flip sign for next index
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** `O(n)` (where n is the length of input array). Each element is visited exactly once.
- **Space Complexity:** `O(1)` (uses only fixed number of variables; no extra storage proportional to input size).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input array length is very large (e.g., streaming, or fits in memory barely)?
  *Hint: Could you process the sum iteratively without storing all elements?*

- How would you generalize for a different pattern: e.g., alternating every k elements?
  *Hint: Instead of flip every index, flip signs after every k indices.*

- Can you compute the alternating sum for a 2D grid row-wise, or column-wise?
  *Hint: Apply the logic separately for each row/column.*

### Summary
This is a **classic array scanning problem** with a simple alternating pattern.  
The coding pattern is "accumulate with changing sign based on index parity" and shows up in digit and array problems.  
Understanding how to manage alternating operations (by index or other criteria) is useful in sum, difference, or mixing-type interview challenges.  
Common pattern: running sum with state; easily extended for more complex alternating situations.

### Tags
Array(#array), Simulation(#simulation)

### Similar Problems
- Alternating Digit Sum(alternating-digit-sum) (Easy)