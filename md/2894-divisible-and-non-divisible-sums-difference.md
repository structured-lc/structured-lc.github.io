### Leetcode 2894 (Easy): Divisible and Non-divisible Sums Difference [Practice](https://leetcode.com/problems/divisible-and-non-divisible-sums-difference)

### Description  
Given two positive integers **n** and **m**, find the difference between:
- The sum of all integers in the range \[1, n\] that are **not divisible** by **m** (`num₁`)
- The sum of all integers in the range \[1, n\] that are **divisible** by **m** (`num₂`)

Return `num₁ - num₂`.

### Examples  

**Example 1:**  
Input: `n = 10, m = 3`  
Output: `19`  
*Explanation: Numbers not divisible by 3: \[1,2,4,5,7,8,10\] (sum=37).  
Numbers divisible by 3: \[3,6,9\] (sum=18).  
Result: 37 - 18 = 19.*

**Example 2:**  
Input: `n = 5, m = 2`  
Output: `3`  
*Explanation: Numbers not divisible by 2: \[1,3,5\] (sum=9).  
Numbers divisible by 2: \[2,4\] (sum=6).  
Result: 9 - 6 = 3.*

**Example 3:**  
Input: `n = 12, m = 4`  
Output: `36`  
*Explanation: Numbers not divisible by 4: \[1,2,3,5,6,7,9,10,11\] (sum=54).  
Numbers divisible by 4: \[4,8,12\] (sum=18).  
Result: 54 - 18 = 36.*

### Thought Process (as if you’re the interviewee)  
- **Naive approach:** Iterate through 1 to n, sum numbers divisible by m (for num₂) and those not divisible (for num₁).  
    - Time: O(n), easy, but not optimal for large n.
- **Optimize:**  
    - The sum of all numbers from 1 to n is: total_sum = n × (n+1) / 2.
    - The numbers divisible by m in 1 to n can be formulated: they are m, 2m, 3m, ..., km where k = ⌊n/m⌋.
    - The sum of these is: m × (1 + 2 + ... + k) = m × k × (k+1) / 2.
    - Numbers not divisible by m sum = total_sum - sum_divisible
    - Final answer: (total_sum - sum_divisible) - sum_divisible = total_sum - 2 × sum_divisible
- **Conclusion:** This can be done in constant time with some arithmetic; no need to loop.

### Corner cases to consider  
- n < m (no numbers divisible by m)
- n = 1, m = 1 (special: all numbers divisible)
- m = 1 (all numbers divisible)
- m = n
- n ≪ m (very small n)
- Extremely large n

### Solution

```python
def differenceOfSums(n: int, m: int) -> int:
    # Sum of numbers from 1 to n
    total_sum = n * (n + 1) // 2
    
    # Count of multiples of m in 1..n (k)
    k = n // m
    
    # Sum of numbers divisible by m: m × (1 + 2 + ... + k) = m × k × (k+1) // 2
    sum_divisible = m * k * (k + 1) // 2

    # Difference: (total_sum - sum_divisible) - sum_divisible = total_sum - 2 × sum_divisible
    return total_sum - 2 * sum_divisible
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) — All operations are simple arithmetic, independent of n and m.
- **Space Complexity:** O(1) — No extra space beyond variables for calculations.

### Potential follow-up questions (as if you’re the interviewer)  

- What if instead of sum, I want the difference of counts of divisible and non-divisible numbers?  
  *Hint: Use floor division and subtraction to count and compare.*

- What if the range was arbitrary, i.e., from a to b instead of 1 to n?  
  *Hint: Use formula for sum of arithmetic series from a to b and adjust the divisible interval.*

- How would you output the actual numbers as a list, not just the difference in the sums?  
  *Hint: Consider list iteration or generator expressions to extract.*

### Summary
The approach demonstrates a classic application of **arithmetic progression formulas** and difference calculation, reducing an O(n) task to O(1) time. This pattern reappears in problems dealing with the sum of filtered numerical ranges, divisibility, and regular intervals. Recognizing these mathematical properties is key to optimizing performance in similar coding interviews.

### Tags
Math(#math)

### Similar Problems
