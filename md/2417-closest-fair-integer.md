### Leetcode 2417 (Medium): Closest Fair Integer [Practice](https://leetcode.com/problems/closest-fair-integer)

### Description  
Given an integer n, find the smallest integer greater than or equal to n that is a **fair integer**.  
A number is called a **fair integer** if its number of even digits is equal to its number of odd digits. For example, for a 4-digit number, being fair means it has 2 even and 2 odd digits.  
If n has an odd number of digits, it’s impossible to be fair—so we must search for the smallest fair integer with an **even** number of digits.

### Examples  

**Example 1:**  
Input: `2`  
Output: `10`  
Explanation:  
- 2 is a single-digit (odd-length), so can't be fair.
- The next integer with two digits is 10. Digits are 1 (odd) and 0 (even). Equal number, so 10 is fair.

**Example 2:**  
Input: `1234`  
Output: `1234`  
Explanation:  
- 1234 has 4 digits, which is even.
- Digits: 1 (odd), 2 (even), 3 (odd), 4 (even). 2 odd, 2 even. It's already fair.

**Example 3:**  
Input: `123`  
Output: `1001`  
Explanation:  
- 123 has 3 digits (odd), so it can't be fair.  
- Next 4-digit number ≥ 123 is 1000, but 1000 has digits: 1(odd), 0(even), 0(even), 0(even): 1 odd, 3 even (not fair).
- Evaluate next numbers. The first 4-digit fair number with equal odd and even digits is 1001 (1,0,0,1: 2 odd, 2 even).

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  For every number x ≥ n, check if the digit count is even, and if so, count odd and even digits. Stop and return the first x with equal odd and even digits. This is slow for large n, especially if n is a large odd-length number (need to check possibly 10⁹ numbers).

- **Optimization:**  
  1. If n has odd number of digits, jump to the smallest number with next even digit count (e.g. if n is 123, start from 1000).
  2. For a number with even digit count 2k, try to construct the smallest possible number ≥ n, with k even digits and k odd digits.
  3. If constructing is hard, fallback: for each candidate, check if fair and return the first. As numbers increase, odd/even digits vary and solution must be brute-forced in worst case, but skip numbers with odd digit counts.

- **Trade-offs:**  
  - Simpler to implement the brute-force idea with optimizations to skip odd-length numbers.
  - Fast enough, as in practice the "jump" dramatically reduces checks.

### Corner cases to consider  
- n is a single digit (e.g. 7)
- n already fair (e.g. 1020)
- n has all even or all odd digits (e.g. 2222, 1111)
- n is a big number with odd number of digits (forces bump to much larger even-length)
- n contains leading zeroes (not possible for int input), but constructing candidate numbers may require consideration

### Solution

```python
def closestFair(n: int) -> int:
    def is_fair(x: int) -> bool:
        odd = even = 0
        for d in str(x):
            if int(d) % 2 == 0:
                even += 1
            else:
                odd += 1
        return odd == even

    digits = len(str(n))
    # If odd number of digits, jump to next even length
    if digits % 2 == 1:
        digits += 1
        n = 10 ** (digits - 1)

    # From n upwards, find the first fair integer
    x = n
    while True:
        if is_fair(x):
            return x
        x += 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** In worst case, O(K × N), where N is the number of numbers checked (could be up to 10ᵏ for k-digit numbers), but in practice very fast due to the jump to the next even digit count and low density of unfair numbers. Checking each number takes O(K) for K digits.
- **Space Complexity:** O(1) extra space (counters and string conversion for each check), no extra data structures needed.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you make the solution faster for very large n (10¹⁵ or bigger)?
  *Hint: Try to construct digits greedily rather than brute-force checking each candidate.*

- How would you count all fair integers up to a given n?
  *Hint: Think recursively and use digit DP (dynamic programming over digits).*

- Can you generalize fair numbers to any ratio, e.g., 2 even and 3 odd out of 5 digits?
  *Hint: Analyze combinations and possible digit permutations for a given template.*

### Summary
This problem is a **digit simulation** and subtle brute-force with optimizations. The main technique is to jump past impossible regions (odd-length numbers), and check only feasible candidates. The approach resembles classic “smallest number x satisfying property ≥ n,” such as next palindrome or next lucky number. The core pattern is useful for digit-based counting, digit DP, and constructing minimal numbers with digit constraints.