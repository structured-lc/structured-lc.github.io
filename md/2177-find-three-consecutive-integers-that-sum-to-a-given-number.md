### Leetcode 2177 (Medium): Find Three Consecutive Integers That Sum to a Given Number [Practice](https://leetcode.com/problems/find-three-consecutive-integers-that-sum-to-a-given-number)

### Description  
Given an integer **num**, return **three consecutive integers** (as a sorted list) that sum up to **num**.  
If **num** cannot be written as the sum of three consecutive integers, return an empty list.  
For instance, if **num = 33**, possible output is `[10, 11, 12]` because 10 + 11 + 12 = 33.

### Examples  

**Example 1:**  
Input: `num = 33`  
Output: `[10, 11, 12]`  
*Explanation: 33 = 10 + 11 + 12; these are consecutive integers.*

**Example 2:**  
Input: `num = 4`  
Output: `[]`  
*Explanation: 4 cannot be written as the sum of three consecutive integers. No valid answer.*

**Example 3:**  
Input: `num = 0`  
Output: `[-1, 0, 1]`  
*Explanation: -1 + 0 + 1 = 0; these are consecutive integers.*

### Thought Process (as if you’re the interviewee)  
- The brute-force way is to try all possible triplets of consecutive numbers, but this would be inefficient for large numbers.
- Let's try to derive a formula.
    - Let the three consecutive numbers be `x`, `x+1`, `x+2`.
    - So, **num = x + (x+1) + (x+2) = 3x + 3**
    - Rearranged: `x = num // 3 - 1`
    - This only works if `num` is divisible by 3 (because the sum must break nicely into triplets).
- So:
    - If num % 3 != 0, **return []**, impossible.
    - Otherwise, calculate `mid = num // 3` and the three numbers are `[mid - 1, mid, mid + 1]`.
- O(1) time, O(1) space.  
- Trade-off: This is optimal for both time and space; no better approach exists since the math formula gives a direct answer.

### Corner cases to consider  
- num = 0 (should return [-1, 0, 1])
- num < 3 or very small numbers (beware negatives allowed)
- num is not divisible by 3 (e.g., num = 4, num = 1)
- num is extremely large (up to 10¹⁵; integer handling)
- Check only integer outputs (no floats)

### Solution

```python
def sumOfThree(num: int) -> list[int]:
    # If num is not divisible by 3, return []
    if num % 3 != 0:
        return []
    
    # Compute the middle number
    mid = num // 3
    
    # Return the consecutive numbers: mid - 1, mid, mid + 1
    return [mid - 1, mid, mid + 1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1), since only a few arithmetic operations and one modulo check are performed, regardless of input size.
- **Space Complexity:** O(1), only a constant-sized array is created for the result.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you generalize this to k consecutive numbers that sum to a given num?  
  *Hint: Derive the sum using k, set up the equation, and solve for possible integer solutions.*

- What if you are asked for all possible sets of three consecutive integers that sum to num, say, if negative numbers were not allowed?  
  *Hint: Consider constraints or bounds on x so all numbers are ≥ 0.*

- Would the answer change for negative numbers or if the numbers had to be strictly positive?  
  *Hint: Check the range of values mid would take and filter accordingly.*

### Summary
This problem uses a direct **math equation pattern**: sum of three consecutive integers equals 3x + 3. After rearranging to solve for x, a divisibility check enables a one-liner solution. This pattern is common when asked to find equally-spaced values that sum to a total—seen in arithmetic progression and partitioning problems. The technique generalizes for k consecutive numbers or evenly distributed groupings of sums.