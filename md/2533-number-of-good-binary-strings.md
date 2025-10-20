### Leetcode 2533 (Medium): Number of Good Binary Strings [Practice](https://leetcode.com/problems/number-of-good-binary-strings)

### Description  
Given four integers: **minLength**, **maxLength**, **oneGroup**, and **zeroGroup**.  
A binary string is considered *good* if:
- It has length in the range [minLength, maxLength] (inclusive).
- Every maximal contiguous block of 1’s has a length that is a multiple of **oneGroup**.
- Every maximal contiguous block of 0’s has a length that is a multiple of **zeroGroup**.
Return the total number of good binary strings possible for the given inputs, modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `minLength=3, maxLength=5, oneGroup=2, zeroGroup=3`  
Output: `2`  
*Explanation: The two good strings are: "110", "001". Both lengths are allowed, and blocks are the correct size multiples.*

**Example 2:**  
Input: `minLength=2, maxLength=2, oneGroup=1, zeroGroup=2`  
Output: `1`  
*Explanation: The only valid string is "00": block of zeros has size 2 (multiple of 2). "11" would also be valid for the ones condition but not for zeros, as it lacks a zero block.*

**Example 3:**  
Input: `minLength=4, maxLength=4, oneGroup=1, zeroGroup=1`  
Output: `6`  
*Explanation: All binary strings of length 4 are valid, as every group of ones and zeros must be multiples of 1 (which is always true for any run length). Count: 2⁴ = 16, but only those with both 1's and 0's blocks of length ≥ 1. List: "0000", "0001", "0010", "0011", "0100", "0101".*

### Thought Process (as if you’re the interviewee)  
First, brute force would generate all possible binary strings from minLength to maxLength, and for each, check both group rules (which would be extremely slow as the string count is exponential).  
To optimize, I noticed the problem is to count compositions of length using blocks of size oneGroup (for 1’s) and zeroGroup (for 0’s).  
This is like tiling a length-l string with tiles of size oneGroup and zeroGroup, starting with either a group of ones or zeros.  
Dynamic programming is effective. Define f[i] = number of ways to form a "good" string of length i.  
We can build up: for each i, if possible, add a block of oneGroup or zeroGroup onto a valid (smaller) string and sum the ways.  
Sum up f[i] for all i from minLength to maxLength for the answer.  
This approach is both time and space efficient (O(maxLength)), and can easily handle the modulus constraint.

### Corner cases to consider  
- minLength = maxLength (edge case: only strings of one length)
- oneGroup = zeroGroup = 1 (all strings valid, test for overflow)
- oneGroup or zeroGroup > maxLength (no "good" blocks possible, expect output 0)
- Very large maxLength (should avoid TLE)
- minLength > maxLength (invalid, answer is 0)

### Solution

```python
def goodBinaryStrings(minLength, maxLength, oneGroup, zeroGroup):
    MOD = 10**9 + 7
    # f[i]: number of good binary strings of length i
    f = [0] * (maxLength + 1)
    f[0] = 1  # base case: one way to make string of length 0 (empty)
    for i in range(1, maxLength + 1):
        if i - oneGroup >= 0:
            f[i] = (f[i] + f[i - oneGroup]) % MOD
        if i - zeroGroup >= 0:
            f[i] = (f[i] + f[i - zeroGroup]) % MOD
    ans = 0
    for length in range(minLength, maxLength + 1):
        ans = (ans + f[length]) % MOD
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(maxLength). We build up the DP array in a single pass, each step has O(1) work.
- **Space Complexity:** O(maxLength). The DP array f uses maxLength+1 entries.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to return not just the count, but generate all such strings for small parameter values?  
  *Hint: Try recursive backtracking or use the DP to reconstruct the strings for small maxLength values.*

- Could you reduce the space complexity further?
  *Hint: All calculations at step i only depend on f[i - oneGroup] and f[i - zeroGroup]. Rolling variables may be possible if you process in place.*

- How would your solution change if the input was a ternary string (digits 0, 1, 2) with three independent group size constraints?  
  *Hint: Extend state transitions to include three types, or model similarly to tiling with three tile types.*

### Summary
This problem uses the classic **dynamic programming on integer compositions** (tiling) pattern. The DP state builds all valid combinations from small to large lengths, using allowed group increments.  
The same technique applies to partitioning problems, tiling, coin change, and block segmentation in many string or array composition scenarios.  
No recursion or advanced libraries are needed—just a 1D DP array and simple iteration.


### Flashcard
Count binary strings of length minLength to maxLength using only blocks of size oneGroup (1’s) and zeroGroup (0’s)—dynamic programming with states for current length and last block type.

### Tags
Dynamic Programming(#dynamic-programming)

### Similar Problems
- Special Binary String(special-binary-string) (Hard)