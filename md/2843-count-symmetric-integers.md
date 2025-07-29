### Leetcode 2843 (Easy):   Count Symmetric Integers [Practice](https://leetcode.com/problems/count-symmetric-integers)

### Description  
Given two integers, **low** and **high**, return the number of *symmetric integers* between them (inclusive).  
A *symmetric integer* is an integer that:
- Has an **even number of digits**, and
- The sum of the **first half of its digits** equals the sum of the **second half**.

In other words, if you split the digits into two equal halves, their sums should be exactly equal.  
For example, 1230 is symmetric because 1+2 = 3+0, and 11 is symmetric because 1 = 1.

### Examples  

**Example 1:**  
Input: `low = 1, high = 100`  
Output: `9`  
*Explanation: The symmetric integers are: 11, 22, 33, 44, 55, 66, 77, 88, 99. All two-digit numbers with both digits equal.*

**Example 2:**  
Input: `low = 1200, high = 1230`  
Output: `1`  
*Explanation: Only 1221 is symmetric here (1+2 = 2+1).*

**Example 3:**  
Input: `low = 10, high = 11`  
Output: `1`  
*Explanation: Only 11 is symmetric (1=1), as 10 has 1+0≠0+1.*

### Thought Process (as if you’re the interviewee)  
- Start by brute force:  
  Iterate through all numbers from low to high.
  For each number, convert it to a string to easily check its length and split the digits.
  Skip numbers with an odd number of digits since they can't be symmetric.
  For even-digits, sum the first half and second half, and check if they're the same.
- Could also use arithmetic (div/mod) without string, but string manipulation is clearer for interviews and less error-prone.
- In terms of optimization, for small ranges, brute-force is fine (\((high - low)\) is small).
  For huge ranges, could precompute or use digit DP (dynamic programming), but the problem is tagged "Easy" and probably expects brute-force.
- Chose string manipulation for clarity and reliability.

### Corner cases to consider  
- low or high themselves have odd number of digits (should be skipped).
- low and high are the same number.
- Range contains no even-digit numbers.
- Numbers at the boundary: low or high could be the only symmetric integer.
- Leading zeros are not possible, as per integer representation, but keep in mind if the problem context changes.

### Solution

```python
def countSymmetricIntegers(low: int, high: int) -> int:
    # Helper to determine if a number is symmetric
    def is_symmetric(num: int) -> bool:
        s = str(num)
        n = len(s)
        if n % 2 != 0:
            return False
        half = n // 2
        # Compute sum of first half and second half of digits
        sum_first = sum(int(d) for d in s[:half])
        sum_second = sum(int(d) for d in s[half:])
        return sum_first == sum_second

    count = 0
    for num in range(low, high + 1):
        if is_symmetric(num):
            count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N \* D), where N = high - low + 1, D = number of digits (since for each number, we convert to string and sum digits). Each check is O(D).
- **Space Complexity:** O(1) extra (excluding input and output), as we only use counters and temporary variables per number.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if the range was extremely large (e.g., up to 10¹⁸)?
  *Hint: Try digit DP to count all symmetric numbers without checking each individually.*

- Can you generate all the symmetric numbers instead of just counting them?
  *Hint: Use similar splitting and sum generation logic in the candidate number builder.*

- What if negative numbers are allowed?  
  *Hint: Adjust logic to filter or handle signs, or skip negatives depending on requirements.*

### Summary
This is a typical **brute-force/search and validation** problem, best solved by iterating through the range and checking properties using string operations. It demonstrates handling digit splits and sum logic, a common pattern in number property and combinatorics questions. For larger ranges, digit DP or stateful search may be applied, but for the given constraints, brute force is clear and effective.