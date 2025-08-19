### Leetcode 3483 (Easy): Unique 3-Digit Even Numbers [Practice](https://leetcode.com/problems/unique-3-digit-even-numbers)

### Description  
Given an array of digits, find how many **distinct three-digit even numbers** can be formed using those digits (each copy may be used only once per number).  
- The hundreds digit must **not** be 0 (no leading zeros).
- The units digit must be even (i.e., 0, 2, 4, 6, or 8).
- Each digit in the input can be used at most once for each number.
Return the **number** of such distinct valid numbers.

### Examples  

**Example 1:**  
Input: `digits = [1,2,3,4]`  
Output: `12`  
*Explanation: The 12 distinct 3-digit even numbers are: 124, 132, 134, 142, 214, 234, 312, 314, 324, 342, 412, 432.*

**Example 2:**  
Input: `digits = [0,2,2]`  
Output: `2`  
*Explanation: The only valid numbers are 202 and 220 (since two copies of 2).*

**Example 3:**  
Input: `digits = [6,6,6]`  
Output: `1`  
*Explanation: Only 666 is possible. All digits can only be used once per number.*

**Example 4:**  
Input: `digits = [1,3,5]`  
Output: `0`  
*Explanation: No even digits, so no three-digit even numbers are possible.*

### Thought Process (as if you’re the interviewee)  
First, since the number has to be even, focus on all 3-digit numbers where the **last digit** is even.  
To avoid leading zeros, the **first digit** (hundreds place) cannot be 0.  
We have to form all possible ordered triples using the input digits, making sure no digit is reused within a single number (if a digit occurs twice, it can only be reused if we pick two different indices from the input).  

**Initial Brute-force Idea:**  
- For every ordered triple (i, j, k) with i ≠ j ≠ k, form the number 100 × digits[i] + 10 × digits[j] + digits[k].
- Check:  
  - digits[i] ≠ 0 (no leading zeros).  
  - digits[k] is even.
- Use a set to hold all valid numbers (to avoid duplicates if digits repeat in the input).

**Optimization:**  
- Instead of generating all ordered triples (which is O(n³)), fix the even digit for the units place, then for each possible hundreds and tens digit, generate candidates using available unused digits.
- With n ≤ 10, O(n³) is still acceptable, but filtering early (by only iterating possible even-ending digits) speeds it up a bit.

I’d use a set for results (since duplicates can arise if input has repeating digits) and walk all (i, j, k) triplets as described, applying the two rules (no leading zero, must end even).

### Corner cases to consider  
- `digits` has fewer than 3 elements (problem constraint: always ≥3, but good to note).
- `digits` contains only odd numbers (no even units digit possible).
- Input contains only zeros except for one even digit (wrong leading digits).
- Input contains duplicates (need to ensure we only use each copy of a digit once per number).
- Input is [0,0,0] (cannot create a nonzero three-digit number).

### Solution

```python
def count_unique_even_numbers(digits):
    res = set()
    n = len(digits)
    # Try all ordered triplets (i, j, k) with i ≠ j ≠ k
    for i in range(n):
        # Hundreds place cannot be 0
        if digits[i] == 0:
            continue
        for j in range(n):
            if j == i:
                continue
            for k in range(n):
                if k == i or k == j:
                    continue
                # Units place must be even
                if digits[k] % 2 == 0:
                    num = digits[i] * 100 + digits[j] * 10 + digits[k]
                    res.add(num)
    return len(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n³), since we try all possible ordered triples (i, j, k) with n = length of digits (n ≤ 10).
- **Space Complexity:** O(1) for output (there is a fixed max of 900 possible three-digit numbers). Extra space for the set to store unique numbers, at most O(900).

### Potential follow-up questions (as if you’re the interviewer)  

- If the input array is much larger (say, length 100), how would you optimize?
  *Hint: Try pruning impossible combinations earlier, avoid generating numbers with repeated indices, or use counting–frequency instead of O(n³) brute force.*

- How would you return the actual list of unique numbers (sorted) instead of just their count?
  *Hint: Instead of returning the set’s size, just return sorted(list(res)).*

- What if digits could be reused unlimited times? 
  *Hint: Then, just generate all hundreds/tens/units according to the constraints, for each, and count unique outcomes.*

### Summary
We generate all valid, distinct three-digit even numbers using the input digits, without leading zeros and without reusing the same copy of a digit, by checking all possible ordered triples and using a set for uniqueness.  
This is a typical brute-force with filtering, fits the permutations/combinatorics coding pattern, and applies wherever you need to systematically form numbers obeying constraint rules from a set of digits.

### Tags
Array(#array), Hash Table(#hash-table), Recursion(#recursion), Enumeration(#enumeration)

### Similar Problems
