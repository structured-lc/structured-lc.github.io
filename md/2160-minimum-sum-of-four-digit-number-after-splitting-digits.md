### Leetcode 2160 (Easy): Minimum Sum of Four Digit Number After Splitting Digits [Practice](https://leetcode.com/problems/minimum-sum-of-four-digit-number-after-splitting-digits)

### Description  
You are given a **four-digit positive integer**. You must split its digits into **two new integers** (let’s call them `new1` and `new2`) using all the digits exactly once, in any order. Both `new1` and `new2` may have leading zeros. Your task: **minimize** the sum `new1 + new2`.

### Examples  

**Example 1:**  
Input: `num = 2932`  
Output: `52`  
*Explanation: Sort digits: 2, 2, 3, 9. Form 2-digit numbers for smallest sum: 22 + 39 = 61, 23 + 29 = 52. 52 is minimum.*

**Example 2:**  
Input: `num = 4009`  
Output: `13`  
*Explanation: Digits: 0, 0, 4, 9. Arrange as 4 + 9 = 13 (by taking single digits). That's the smallest possible sum.*

**Example 3:**  
Input: `num = 1234`  
Output: `37`  
*Explanation: Digits: 1, 2, 3, 4. Smallest sum is 13 + 24 = 37.*

### Thought Process (as if you’re the interviewee)  
First, if we brute-force all 4! = 24 permutations and partition those into two numbers, it’s not too slow for 4 digits, but it’s not clean.  
Think: what digit placement leads to smallest possible overall sum?  
Since leading zeros allowed, we want the *smallest* digits in the *highest* places (tens place).  
So if we sort the digits: **put the smallest two digits in the tens place**, largest two in the units place.  
For example, for [a, b, c, d] (sorted), try new1 = 10\*a + c, new2 = 10\*b + d.  
This greedy strategy works because it minimizes total contribution from bigger digits.

**Trade-offs:**  
- Brute-force is not more general/efficient here.
- Sorting and combining is clean and optimal.

### Corner cases to consider  
- Digits contain zeros (leading zeros allowed).
- Input includes repeated digits (e.g. 1122).
- All digits are the same (e.g. 1111).
- Digits already sorted.

### Solution

```python
def minimumSum(num: int) -> int:
    # Split the number into its digits
    digits = []
    for _ in range(4):
        digits.append(num % 10)
        num //= 10

    # Sort the digits (smallest first)
    digits.sort()
    
    # Form two numbers: (smallest in tens place)
    new1 = digits[0] * 10 + digits[2]
    new2 = digits[1] * 10 + digits[3]

    # Return their sum
    return new1 + new2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  Always processes 4 digits and sorting fixed size is constant time.

- **Space Complexity:** O(1)  
  Uses a list of size 4 for the digits, and constant extra space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input number can have any number of digits (n ≥ 2) and the goal is to split into two numbers for minimum sum?  
  *Hint: How do you generalize digit assignment for minimal combined value?*

- How would you do this if the number of splits can be more than 2 (e.g. k numbers for minimal sum)?  
  *Hint: Consider distributing digits to minimize each number’s value.*

- Could you solve this without actually sorting, maybe in a single linear pass?  
  *Hint: Use counting sort or digit buckets if speed is critical.*

### Summary
This is a greedy digit-allocation problem: **sort the digits, put smallest in higher places** in both numbers for minimum sum. This digit-placement-by-greedy-order is a recurring trick in similar digit rearrangement or partitioning problems.  
Common in “minimum/maximum value by rearrangement” questions with permutations. Pattern: sorting, then careful positional assignment to optimize sum or difference.

### Tags
Math(#math), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Add Digits(add-digits) (Easy)
- Difference Between Element Sum and Digit Sum of an Array(difference-between-element-sum-and-digit-sum-of-an-array) (Easy)
- Alternating Digit Sum(alternating-digit-sum) (Easy)