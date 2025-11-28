### Leetcode 3234 (Medium): Count the Number of Substrings With Dominant Ones [Practice](https://leetcode.com/problems/count-the-number-of-substrings-with-dominant-ones)

### Description  
Given a binary string **s**, count the number of substrings where the number of 1's is **greater than or equal to** the square of the number of 0's in that substring.  
Formally, for a substring, if `ones ≥ zeros²`, it is called a **dominant ones** substring.

### Examples  

**Example 1:**  
Input: `s = "00011"`  
Output: `5`  
Explanation: Substrings with dominant ones are:  
- `"1"` (ones=1, zeros=0; 1 ≥ 0²)  
- `"1"` (ones=1, zeros=0; 1 ≥ 0²)  
- `"11"` (ones=2, zeros=0; 2 ≥ 0²)  
- `"01"` (ones=1, zeros=1; 1 ≥ 1²)  
- `"011"` (ones=2, zeros=1; 2 ≥ 1²)

**Example 2:**  
Input: `s = "101101"`  
Output: `16`  
Explanation: Many substrings; all single characters are valid, and so are most combinations. The total count is 16.

**Example 3:**  
Input: `s = "1"`  
Output: `1`  
Explanation: Only one substring, which is `"1"` (ones=1, zeros=0; 1 ≥ 0²).

### Thought Process (as if you’re the interviewee)  

**Brute-force approach:**  
Try all substrings `s[i:j]`. For each substring, count number of 1's and 0's, and check if `ones ≥ zeros²`.  
- Time complexity: O(n³) (O(n²) substrings, and O(n) to count ones/zeros for each).

**Can we optimize?**

Yes:
- **Observation:**  
  For zeros=z, to have `ones ≥ z²`, substring must contain at least `z²` ones.
- **Key restriction:**  
  For each possible zeros count `z`, any substring must be big enough to have at least `z²` ones with exactly `z` zeros in it.
  
- For a string of length n:
  - The max meaningful `z` is ⌊√n⌋, or slightly more — since beyond that, `z²` exceeds n.

- Use two pointers (sliding window), for each possible zeros count:
  - Move right pointer r, keep track of number of zeros and ones between l and r.
  - Whenever zeros=z, and ones≥z², count all substrings that end at r and start after last position where the count fails.

- **Why does this work?**
  - For fixed zeros count z, you can vary l and r using two-pointer and maintain counts efficiently.

This reduces the complexity to about O(√n × n), which is fast enough for n ≤ 4×10⁴.

### Corner cases to consider  
- The string consists of all 1's (`"1111"`): all substrings are valid.
- The string consists of all 0's: only substrings of length 1 are valid (since 0 ≥ 1² is false).
- A single character: `"0"` (not valid), `"1"` (valid).
- Long alternations: `"010101..."`

### Solution

```python
def countDominantSubstrings(s):
    import math

    n = len(s)
    ans = 0
    # Max zeros that make sense: z^2 <= n => z <= sqrt(n)
    max_zero = int((-1 + (1 + 4*n)**0.5)//2)

    for zero in range(max_zero + 1):
        l = 0  # left pointer
        count = [0, 0]  # count[0]: zeros, count[1]: ones
        last_invalid = -1

        for r, ch in enumerate(s):
            count[int(ch)] += 1

            # Shrink window: remove extra zeros or reduce ones below zero²
            while l < r:
                # If too many zeros, remove zeros from left
                if s[l] == '0' and count[0] > zero:
                    count[0] -= 1
                    last_invalid = l
                    l += 1
                # If ones - 1 still ≥ zero², can try to remove a one
                elif s[l] == '1' and count[1] - 1 >= zero*zero:
                    count[1] -= 1
                    l += 1
                else:
                    break

            if count[0] == zero and count[1] >= zero*zero:
                # All substrings starting after last_invalid to l (inclusive)
                ans += l - last_invalid

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(√n × n), where n is length of s.  
  For each possible zero count up to O(√n), we iterate over s once.

- **Space Complexity:**  
  O(1) extra (apart from input and output), only a few counters and pointers used per scan.

### Potential follow-up questions (as if you’re the interviewer)  

- How can you return **all the substrings** themselves instead of just the count?  
  *Hint: Use similar window logic, but store pairs (start, end) or substrings.*

- What if s can contain other characters (not just '0' or '1')?  
  *Hint: Add checks to skip/partition the string at non-binary digits.*

- Can you solve it in one pass without fixing the zero count in advance?  
  *Hint: Try to keep a map or prefix-sums of (zeros, ones) but beware constraints.*

### Summary
This problem uses a **windowed scan (sliding window, two pointer)** for each feasible zero-count, counting valid substrings efficiently.  
The root idea is exploiting the mathematical restriction on substring composition: for every possible zeros count, valid substrings must have enough ones to satisfy ones ≥ zeros².  
The windowed two-pointer trick for every zero count keeps this O(√n × n), which is a classic subquadratic method for problems with "special substring" criteria.  
This pattern also works for problems like substring sums in restricted ranges, or substrings with unique frequency counts.

### Tags
String(#string), Enumeration(#enumeration)

### Similar Problems
- Count Binary Substrings(count-binary-substrings) (Easy)