### Leetcode 2652 (Easy): Sum Multiples [Practice](https://leetcode.com/problems/sum-multiples)

### Description  
Given a positive integer **n**, find the sum of all integers from 1 to n (inclusive) that are divisible by **3**, **5**, or **7**. Return the sum as an integer.
You must include each number **only once**, even if it is divisible by more than one of these numbers.

### Examples  

**Example 1:**  
Input: `n = 7`  
Output: `21`  
*Explanation: The numbers in [1, 7] divisible by 3, 5, or 7 are 3, 5, 6, 7. Their sum is 3 + 5 + 6 + 7 = 21.*

**Example 2:**  
Input: `n = 10`  
Output: `40`  
*Explanation: The numbers in [1, 10] divisible by 3, 5, or 7 are 3, 5, 6, 7, 9, 10. Their sum is 3 + 5 + 6 + 7 + 9 + 10 = 40.*

**Example 3:**  
Input: `n = 9`  
Output: `30`  
*Explanation: The numbers in [1, 9] divisible by 3, 5, or 7 are 3, 5, 6, 7, 9. Their sum is 3 + 5 + 6 + 7 + 9 = 30.*


### Thought Process (as if you’re the interviewee)  
To tackle this problem, my first idea is the **brute-force approach**:  
- Loop from 1 to n and, for each number, check if it is divisible by 3, 5, or 7.
- If yes, include it in the sum.

However, this gives O(n) time complexity, which is fine for small n, but for large n it could be slow.
To optimize, notice this is a classic **inclusion-exclusion principle** problem:
- For each number (3, 5, 7), sum all its multiples up to n.
- However, if a number is a multiple of both (say 3 and 5), its multiple (15) will be counted twice. So, we subtract the sums of the multiples of 3\*5, 3\*7, 5\*7.
- But for numbers which are multiples of 3, 5, **and** 7 (i.e., 105), we added them in three times, subtracted three times, so we must add them back once.

The final sum is:
- sum(3) + sum(5) + sum(7)
- minus [sum(15), sum(21), sum(35)]
- plus sum(105)

To sum all multiples of k ≤ n:  
- The last multiple is ⌊n/k⌋
- Sum = k × (1 + 2 + ... + ⌊n/k⌋) = k × [⌊n/k⌋ ⨉ (⌊n/k⌋ + 1)] // 2

This way, the logic is O(1) and efficient.

### Corner cases to consider  
- n < 3: should return 0 (no numbers are divisible by 3, 5, or 7)
- n = 3, 5, or 7: should include only those numbers
- Large values of n (e.g., 10⁹): use O(1) approach, avoid looping.
- Check for overlapping divisibility (e.g., n where 15, 21, 35, 105 <= n)
- Make sure not to double-count numbers divisible by more than one (handle with inclusion-exclusion).

### Solution

```python
def sumOfMultiples(n):
    # Helper function: sum of all multiples of k up to n
    def sum_mult(k):
        cnt = n // k     # how many multiples
        # sum = k × (1 + 2 + ... + cnt)
        return k * cnt * (cnt + 1) // 2

    # Inclusion-Exclusion Principle
    total = (
        sum_mult(3) +
        sum_mult(5) +
        sum_mult(7)
        - sum_mult(3 * 5)
        - sum_mult(3 * 7)
        - sum_mult(5 * 7)
        + sum_mult(3 * 5 * 7)
    )
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1), because we perform a constant number of arithmetic operations, regardless of n.
- **Space Complexity:** O(1), no extra storage proportional to input size used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the list of divisors was not fixed (e.g., given as an input array)?
  *Hint: How would you generalize inclusion-exclusion for any list length?*

- Can you efficiently handle very large n (e.g., up to 10¹⁸)?
  *Hint: Avoid iterating, keep all computations as constant-time arithmetic.*

- What if the problem asks for the sum of numbers ∉ divisible by these values, or divisible by "exactly one" of them?
  *Hint: Inclusion-exclusion can be adapted for various count constraints.*

### Summary
This problem is a classic application of the **Inclusion-Exclusion Principle**, a common coding and math pattern for handling overlaps among multiple sets—here, numbers divisible by 3, 5, or 7. The key trick is finding the sum of multiples using arithmetic progression and then correcting for over-counting by subtracting and adding relevant sets. This approach is efficient and broadly applicable for similar "sum of multiples" queries and other combinatorial counting problems.