### Leetcode 2269 (Easy): Find the K-Beauty of a Number [Practice](https://leetcode.com/problems/find-the-k-beauty-of-a-number)

### Description  
Given an integer `num` and integer `k`, the **k-beauty** of `num` is the count of all substrings of length `k` within the decimal representation of `num` such that:
- Each substring, when converted to an integer, is **non-zero** and **divides `num` evenly** (i.e., `num % substring == 0`).
- Substrings may have leading zeros (e.g., "01" is valid if k=2).
Return the k-beauty count for the given `num`.  
(Treat the number as a string for extracting substrings, but check division with its integer value.)  


### Examples  

**Example 1:**  
Input: `num = 240, k = 2`  
Output: `2`  
*Explanation: All substrings of length 2: "24" (240 % 24 == 0), "40" (240 % 40 == 0). Both are divisors. K-beauty is 2.*

**Example 2:**  
Input: `num = 430043, k = 2`  
Output: `2`  
*Explanation: Substrings: "43", "30", "00", "04", "43". "43" (430043 % 43 == 0); "43" again (430043 % 43 == 0); others not valid or divisible. K-beauty is 2.*

**Example 3:**  
Input: `num = 1005, k = 2`  
Output: `1`  
*Explanation: Substrings: "10", "00", "05". Only "10" is non-zero and divides 1005 evenly (1005 % 10 == 5, so not 0), "05" = 5 (1005 % 5 == 0). So, only one valid: "05".*


### Thought Process (as if you’re the interviewee)  
- Brute-force approach: Convert `num` to a string, generate all substrings of length `k`, for each:
  - Skip if substring is "00" or "0..."
  - Cast substring to integer, skip if 0
  - Check if it divides `num` (num % val == 0)
- For each valid divisor, increment count.
- This approach is O(n * k), where n ≈ number of digits in num. Acceptable here since `num` is at most 10⁹ (≤ 10 digits).
- No further optimization is needed (no fancy data structures: it's a direct implementation).
- Double-check that substrings can have leading zeros: it's OK per the problem.
- Final approach: Slide a fixed-size window (of length k) over the string, convert the window to int, check for conditions above.


### Corner cases to consider  
- `num` is a single digit, k=1
- Substrings include "0" (skip these)
- Substrings with leading zeros ("01", "00", etc.)
- No valid divisors (return 0)
- Repeated divisors (should count each occurrence)
- num divisible by its own digits (e.g., including substring equal to the whole number)
- Large input values (should not exceed O(n))


### Solution

```python
def divisorSubstrings(num: int, k: int) -> int:
    # Convert the number to string to extract substrings
    s = str(num)
    n = len(s)
    count = 0

    # Slide a window of length k
    for i in range(n - k + 1):
        substring = s[i:i+k]
        value = int(substring)
        
        # Exclude substrings that are zero
        if value == 0:
            continue
        # Check divisibility
        if num % value == 0:
            count += 1

    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n \* k) — For each sliding window (length ⌊n - k + 1⌋), converting substrings to int takes O(k). Worst-case n ≈ 10 (for 32-bit int), but acceptable for any reasonable input.
- **Space Complexity:** O(n) — Storing string representation of number, plus O(1) for other variables. No recursion or auxiliary data structures needed.


### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve the problem without converting `num` to a string?
  *Hint: Use integer math to extract digit windows instead of string slicing.*

- What if `k` is very large, or `num` is provided as a string of length up to 10⁶?
  *Hint: Optimize substring extraction and avoid repeated conversions.*

- Can you use a rolling hash / window to further optimize?
  *Hint: Precompute powers of 10 to avoid repeated work extracting substrings.*


### Summary
This problem uses the **fixed-size sliding window** pattern, commonly seen with substring or subarray computations. The iterative, direct approach efficiently handles the typical constraints. The key trick is careful handling of leading zeros and checking substrings for eligibility (nonzero, division). This pattern comes up in digit-based dynamic programming, subarray problems, and related "number manipulation by window" tasks.

### Tags
Math(#math), String(#string), Sliding Window(#sliding-window)

### Similar Problems
