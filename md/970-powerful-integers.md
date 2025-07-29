### Leetcode 970 (Medium): Powerful Integers [Practice](https://leetcode.com/problems/powerful-integers)

### Description  
Given three integers **x**, **y**, and **bound**, return all *powerful integers* less than or equal to **bound**.  
A *powerful integer* is any integer that can be written as  
**xⁱ + yʲ**, for some non-negative integers i and j.  
Each number must appear at most once in the answer, order does not matter.

### Examples  

**Example 1:**  
Input: `x = 2, y = 3, bound = 10`  
Output: `[2,3,4,5,7,9,10]`  
*Explanation: The possible combinations are:  
2¹ + 3⁰ = 2 + 1 = 3  
2⁰ + 3⁰ = 1 + 1 = 2  
2⁰ + 3¹ = 1 + 3 = 4  
2¹ + 3¹ = 2 + 3 = 5  
2² + 3¹ = 4 + 3 = 7  
2³ + 3⁰ = 8 + 1 = 9  
2⁰ + 3² = 1 + 9 = 10* 

**Example 2:**  
Input: `x = 3, y = 5, bound = 15`  
Output: `[2,4,6,8,10,14]`  
*Explanation: Possible combinations are:  
3⁰ + 5⁰ = 1 + 1 = 2  
3¹ + 5⁰ = 3 + 1 = 4  
3⁰ + 5¹ = 1 + 5 = 6  
3¹ + 5¹ = 3 + 5 = 8  
3² + 5⁰ = 9 + 1 = 10  
3¹ + 5² = 3 + 25 = 28 (>15, ignore)  
3² + 5¹ = 9 + 5 = 14*  

**Example 3:**  
Input: `x = 1, y = 1, bound = 2`  
Output: `[2]`  
*Explanation: The only possible powerful integer is 1 + 1 = 2.*

### Thought Process (as if you’re the interviewee)  
Start by considering what a *powerful integer* is: any value xⁱ + yʲ ≤ bound for i, j ≥ 0.  
The most direct approach is to try every possible i and j such that xⁱ + yʲ ≤ bound.  
 - For each i:  
     - Compute xⁱ (stop if this exceeds bound).
     - For each j:  
         - Compute yʲ.
         - If xⁱ + yʲ ≤ bound, keep the sum.
         - Stop inner loop if sum exceeds bound.
     - Watch out if x or y equals 1 to avoid infinite repetition.
     
Because x and y can be up to 100, but exponents can grow quickly, the number of loops is actually small—usually O(logₓ(bound) × logᵧ(bound)), and in many practical cases, at most 20-100 iterations.  
Duplicates are possible (e.g., 1+1 from multiple exponents), so use a **set** to collect results.  

### Corner cases to consider  
- x or y equals 1 (avoid infinite loop by breaking after first power).
- bound below smallest possible sum (e.g., bound < 2).
- bound is exactly at edge cases.
- handling duplicates correctly.
- negative bound (but constraints: bound ≥ 0).
- very large x/y values; i/j should not unnecessarily iterate to infinity.

### Solution

```python
from typing import List

def powerfulIntegers(x: int, y: int, bound: int) -> List[int]:
    result = set()
    i = 0
    x_pow = 1
    # Loop for all possible powers of x until x_pow exceeds bound
    while x_pow <= bound:
        j = 0
        y_pow = 1
        # Loop for all possible powers of y such that x_pow + y_pow <= bound
        while x_pow + y_pow <= bound:
            result.add(x_pow + y_pow)
            # Only proceed if y > 1 to avoid infinite loop
            if y == 1:
                break
            y_pow *= y
            j += 1
        # Only proceed if x > 1 to avoid infinite loop
        if x == 1:
            break
        x_pow *= x
        i += 1
    return list(result)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(logₓ(bound) × logᵧ(bound)). For each possible i (xⁱ ≤ bound) and j (yʲ ≤ bound), we iterate only while their sum is within bound. Worst-case total iterations are very small (powers grow fast).
- **Space Complexity:** O(N), where N is the number of unique powerful integers collected (at most bound, usually much less).

### Potential follow-up questions (as if you’re the interviewer)  

- Could you return the answer sorted?  
  *Hint: Use sorting the result list before returning.*

- What if x or y is extremely large or bound is very small?  
  *Hint: Recognize that only the initial few computations matter, as exponents grow rapidly.*

- Can you avoid using a set, or could there be a way to generate the answer without duplicate checks?  
  *Hint: With careful math, but brute force is already efficient enough for constraints.*

### Summary
This problem uses the **enumerate all (power)combinations** pattern, leveraging how exponents grow rapidly to keep loops bounded. The solution uses a set for uniqueness and nested loops up to practical limits. This pattern (checking all possible combinations under a bound) appears in sum-of-powers, coin change sums, and product-sum problems, especially when the search space shrinks rapidly.