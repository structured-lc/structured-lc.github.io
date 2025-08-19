### Leetcode 1088 (Hard): Confusing Number II [Practice](https://leetcode.com/problems/confusing-number-ii)

### Description  
Given a positive integer **N**, count how many numbers in the range **1 ≤ x ≤ N** are *confusing numbers*.  
A **confusing number** is defined as a number that becomes a *different valid* number when each digit is rotated 180 degrees.  
- Only digits 0, 1, 6, 8, 9 are valid under 180-degree rotation.
  - They rotate to: 0 → 0, 1 → 1, 6 → 9, 8 → 8, 9 → 6.
- Digits 2, 3, 4, 5, 7 are not valid upon rotation.
- The rotated number must differ from the original (no “mirrored-palindromes” allowed).
- For example, 6 rotates to 9, 9 rotates to 6, but 11 becomes 11 (not confusing).

**Your task:** Return the number of *confusing numbers* in [1, N].

### Examples  

**Example 1:**  
Input: `20`  
Output: `6`  
Explanation. Confusing numbers are [6, 9, 10, 16, 18, 19].  
- 6 → 9  
- 9 → 6  
- 10 → 01 (1, different from 10)  
- 16 → 91  
- 18 → 81  
- 19 → 61

**Example 2:**  
Input: `100`  
Output: `19`  
Explanation. Confusing numbers are  
[6, 9, 10, 16, 18, 19, 60, 61, 66, 68, 80, 81, 86, 89, 90, 91, 98, 99, 100]

**Example 3:**  
Input: `25`  
Output: `2`  
Explanation. Confusing numbers are [16, 19].  
- 16 → 91  
- 19 → 61

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:** For every x from 1 to N, check if all digits are valid, then rotate and compare.  
    - This is not efficient for large N (up to 10⁹), especially since many numbers use invalid digits.
- **Optimization:**  
    - Only build numbers using valid digits (0,1,6,8,9) via DFS/backtracking.
    - Prune search if number > N.
    - For each candidate: rotate and compare, if different, increment count.
    - **Skip leading zeros**: Don't generate numbers starting with zero (unless zero itself, but 0 is out of range 1..N).
- **Trade-off:**  
    - This “digit DP” or backtracking is far more efficient, since it avoids generating impossible numbers (with invalid digits).

Why use DFS?  
- Because the set of possible numbers is much, much smaller than [1,N] thanks to the digit restriction.
- We can prune entire recursive paths as soon as the partial number gets larger than N.

### Corner cases to consider  
- N < 6 (the smallest confusing number is 6)  
- Numbers with only one digit (should only be 6 and 9)  
- Numbers ending with several zeros (no leading zeros, but zeros inside are fine)  
- Numbers whose rotation equals themselves (not “confusing”)
- Very large N  
- Skipping any number using [2,3,4,5,7], i.e., must not allow these digits ever.

### Solution

```python
# Valid digits: 0, 1, 6, 8, 9
# Their rotations: 0→0, 1→1, 6→9, 8→8, 9→6

def confusingNumberII(N: int) -> int:
    # Mapping for rotation (as dict for O(1) lookups)
    rotate = {0:0, 1:1, 6:9, 8:8, 9:6}
    valid_digits = [0,1,6,8,9]

    result = 0

    def is_confusing(num):
        rot, original = 0, num
        while num > 0:
            d = num % 10
            rot = rot * 10 + rotate[d]
            num //= 10
        return rot != original

    def dfs(curr):
        nonlocal result
        if curr > N:
            return
        if curr != 0 and is_confusing(curr):
            result += 1
        for d in valid_digits:
            # Skip numbers with leading zeros
            if curr == 0 and d == 0:
                continue
            nxt = curr * 10 + d
            if nxt > N:
                break
            dfs(nxt)

    dfs(0)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** 
    - O(K), where K is the *number of numbers* ≤ N constructible with digits [0,1,6,8,9].
    - K is much smaller than N, since for k digits, possible numbers ≈ 5ᵏ (not N).
    - Each constructed number checks for “confusing” in O(log N) per number (since we rotate each digit).
- **Space Complexity:**
    - O(log N) for recursion stack, up to the number of digits of N.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want to generate the list of all such confusing numbers ≤ N instead of just counting?
  *Hint: Instead of just incrementing, append the number to a result list when found.*

- Suppose N is extremely large (e.g., up to 10¹⁸). Is your approach still feasible?
  *Hint: Consider memoization or a digit-DP/bitmask approach to reduce redundant computations.*

- How would you change your code if some digits rotated into each other (e.g., 2↔5), or had a different digit set?
  *Hint: Make your code data-driven with a digit map, and possibly read new rotation rules as input.*

### Summary
This problem applies the *digit-by-digit backtracking* pattern, commonly used on constrainted number-building tasks (similar to “strobogrammatic number”, “confusing number”, and some combinatorial generation problems).
- DFS allows us to prune and only produce possible, valid numbers.
- Checking for the “confusing” property is done only for legal candidates.
- This pattern is powerful for scenarios where not all “numbers” in a range are allowed: it can be used, for example, with “pretty numbers”, “special” digit sets, or constructing numbers with certain properties under transformations.

### Tags
Math(#math), Backtracking(#backtracking)

### Similar Problems
- Confusing Number(confusing-number) (Easy)