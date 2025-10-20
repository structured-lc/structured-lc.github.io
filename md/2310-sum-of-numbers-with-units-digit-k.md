### Leetcode 2310 (Medium): Sum of Numbers With Units Digit K [Practice](https://leetcode.com/problems/sum-of-numbers-with-units-digit-k)

### Description  
Given two integers `num` and `k`, find the *smallest* number of positive integers (possibly using duplicates), each having units digit `k`, whose sum equals `num`. If it's impossible, return -1. The sum of an empty set is 0. The units digit is the rightmost digit of the integer.

### Examples  

**Example 1:**  
Input: `num=58`, `k=9`  
Output: `2`  
*Explanation: The set [9,49] sums to 58, and both numbers end in 9. Sets like [19,39] also work, but 2 is the minimum count.*

**Example 2:**  
Input: `num=37`, `k=2`  
Output: `-1`  
*Explanation: There is no way to sum numbers ending in 2 to get exactly 37.*

**Example 3:**  
Input: `num=0`, `k=7`  
Output: `0`  
*Explanation: The sum of an empty set is 0, which matches the requirement.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all combinations of numbers ending in `k` that sum to `num`. This is not feasible due to exponential growth as `num` increases.
- **Observations:**  
  - All numbers used in the sum must have units digit `k`. Hence all numbers are of form `10×x + k` for some integer `x ≥ 0`.
  - If we pick `n` such numbers (allowing duplicates), their sum is `n×k + 10×sum_of_x`. This means `sum = n×k + 10×y` for some integer y.
  - Rearranged: We need to find the smallest n such that there exists integer y with `sum = n×k + 10×y`, i.e., `(num - n×k)` must be a multiple of 10, and of course `num - n×k ≥ 0`.
- **Efficient approach:**  
  Try values of `n = 1` to at most 10 (since the units digit cycles every 10 steps) and check if `num - n×k` is divisible by 10 and non-negative.
  - If no such `n` exists in this range, return -1.
  - Special case: If `num == 0`, return 0 (the empty set is allowed).

- **Why this works:**  
  The possible units digits of `n×k` as n increases modulo 10 must eventually repeat, so searching up to n=10 is enough.

### Corner cases to consider  
- num = 0  
- k = 0  
- num < k  
- num where last digit cannot be reached with any (n×k % 10) for n=1..10  
- num is not a multiple of k (possible to need more than one digit but not possible to sum)
- k = 0, and num has non-zero units digit

### Solution

```python
def minimumNumbers(num: int, k: int) -> int:
    # If num is 0, we can use the empty set
    if num == 0:
        return 0

    # Try n from 1 to 10 (units digits cycle every 10)
    for n in range(1, 11):
        # n*k must not exceed num, and the remainder must be divisible by 10
        if n * k > num:
            break
        if (num - n * k) % 10 == 0:
            return n
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  We only loop at most 10 times, regardless of the size of `num`.
- **Space Complexity:** O(1)  
  Only a constant amount of variables is used, no extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we require all numbers in the set to be distinct?  
  *Hint: Since all numbers are of the form 10×x+k, does the minimum n change if no repeats are allowed?*

- Can you generalize this for numbers whose units digit belong to a set, not just a single digit k?  
  *Hint: What if allowed digits are [k₁,k₂,..]? How would the approach change?*

- What is the maximum possible size of such a set for given num and k?  
  *Hint: Is there some input for which the minimal n is as large as 10?*

### Summary
This problem uses an **enumerative math plus greedy check** approach, taking advantage of properties of the units digit and modular arithmetic.  
The pattern of cycling units digits makes the solution efficient because we only have to search up to 10.  
It’s a classic example of math digit-based enumeration, useful for other digit cycling or residue class problems.


### Flashcard
Find the smallest n where n×k ≤ num and (num - n×k) is divisible by 10, else return -1.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming), Greedy(#greedy), Enumeration(#enumeration)

### Similar Problems
- Digit Count in Range(digit-count-in-range) (Hard)
- Count Integers With Even Digit Sum(count-integers-with-even-digit-sum) (Easy)
- Sum of Number and Its Reverse(sum-of-number-and-its-reverse) (Medium)