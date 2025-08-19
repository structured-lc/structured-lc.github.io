### Leetcode 2457 (Medium): Minimum Addition to Make Integer Beautiful [Practice](https://leetcode.com/problems/minimum-addition-to-make-integer-beautiful)

### Description  
Given positive integers **n** and **target**, return the minimal non-negative integer **x** such that the sum of the digits of **n + x** is less than or equal to **target**.  
An integer is considered _"beautiful"_ if the sum of its digits ≤ target.  
Your goal: Find the smallest **x** such that n + x is "beautiful".

### Examples  

**Example 1:**  
Input: `n = 16, target = 6`  
Output: `4`  
Explanation:  
16 + 4 = 20, sum of digits = 2 + 0 = 2 ≤ 6.  
Adding any smaller number would not make the digit sum ≤ 6.

**Example 2:**  
Input: `n = 467, target = 6`  
Output: `33`  
Explanation:  
- 467 + 33 = 500  
- sum of digits = 5 + 0 + 0 = 5 ≤ 6.  
Trying any value less than 33 keeps the sum of the digits > 6.

**Example 3:**  
Input: `n = 1, target = 1`  
Output: `0`  
Explanation:  
1 already has its digit sum (1) ≤ 1, so no addition needed.

### Thought Process (as if you’re the interviewee)  
First, I would check whether n is already beautiful (digit sum ≤ target).  
A brute-force approach would be to test x = 0, 1, 2, ... until n + x becomes beautiful.  
However, this is very inefficient since for large n, it might take billions of steps.

Looking for a better way, I realize _changing digits on the right has the largest effect on digit sum_.  
To reduce the sum, we want to "round up" n to the nearest number which sets one or more digits to zero, potentially causing carry-over to the higher digits.  
Key steps:
- Check the sum of digits of n. If it's already ≤ target, return 0.
- Otherwise, try incrementing n so that the rightmost digits become zero (simulate a "carry" to the next place), and check after each "carry" if the new number is beautiful.
- Keep increasing the number of rightmost zeros until you reach a beautiful number, tracking the sum added at each step.

This is essentially _greedily_ "rounding up" n to numbers like 10, 100, 1000, etc., and seeing what is the minimal addition to reach a beautiful result.

Tradeoff:  
- Brute-force is O(x) and infeasible.
- This greedy, digit-by-digit rounding is efficient (O(log n)), checking at most once per digit in n.

### Corner cases to consider  
- n already beautiful (digit sum ≤ target): Output 0.
- n with digits where carry-over creates a cascade (e.g. lots of 9s at the end).
- target is very large (much bigger than n: sum always beautiful).
- target is 1 (forces single nonzero digit, possibly after many carries).
- n is a single-digit number.
- Inputs at integer boundaries (very large n).

### Solution

```python
def makeIntegerBeautiful(n: int, target: int) -> int:
    def digit_sum(x):
        total = 0
        while x > 0:
            total += x % 10
            x //= 10
        return total

    add = 0          # How much we need to add to n
    pow10 = 1        # The current power of 10 we're "rounding up" to

    while digit_sum(n + add) > target:
        last_digit = (n + add) % (pow10 * 10)
        # Calculate the minimal amount to round up to the next multiple of pow10*10
        add += (pow10 * 10 - last_digit) % (pow10 * 10)
        pow10 *= 10

    return add
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log₁₀ n)  
  Each loop iteration processes one digit of n (goes up one place value).  
  Summing digits is also O(log n), done up to O(log n) times.
- **Space Complexity:** O(1)  
  No extra storage depending on n; only simple variables used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if n is extremely large (e.g. 10¹⁸)?  
  *Hint: Can you avoid converting to strings or using big integers for digit sum?*

- How would you solve it if the digit sum condition is replaced by another function, say the product of digits?  
  *Hint: Is your "rounding" method still valid with non-monotonic functions?*

- Can you return not just one way but all minimal x that make n + x beautiful (if multiple exist)?  
  *Hint: Are there possible ties? When could that happen?*

### Summary
This problem is a great example of a _greedy round-up and carryover_ technique—resetting digits and pushing the carry leftward digit by digit, minimizing change at each step.  
It is efficient because it acts only where necessary, avoiding brute-force.  
The pattern is useful for any problem where you want to "increase up to the next threshold" for certain digit-based properties, such as "round up to all zeros after k digits", or "minimize additions so a property holds for the new number".  
Similar logic can apply to making arrays palindromic with minimal change, or building numbers with certain divisibility properties.

### Tags
Math(#math), Greedy(#greedy)

### Similar Problems
- Happy Number(happy-number) (Easy)