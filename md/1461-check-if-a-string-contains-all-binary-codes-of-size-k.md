### Leetcode 1461 (Medium): Check If a String Contains All Binary Codes of Size K [Practice](https://leetcode.com/problems/check-if-a-string-contains-all-binary-codes-of-size-k)

### Description  
Given a binary string s and an integer k, determine if every possible binary code of length k appears as a substring in s. A binary code here means every combination of k digits made up of '0's and '1's. Return True if all possible binary codes of length k appear; otherwise, return False.

### Examples  

**Example 1:**  
Input: `s = "00110110", k = 2`  
Output: `True`  
Explanation: The 2-bit codes are "00", "01", "10", and "11". All appear in s as substrings at some index.

**Example 2:**  
Input: `s = "0110", k = 1`  
Output: `True`  
Explanation: The 1-bit codes are "0" and "1". Both are substrings present in s.

**Example 3:**  
Input: `s = "0110", k = 2`  
Output: `False`  
Explanation: The 2-bit code "00" does not appear in s.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Generate all 2ᵏ possible binary codes of size k. For each, search if that substring exists in s. This is very slow (O(n×2ᵏ)), especially for large k.

- **Improve brute-force:**  
  Instead of generating all codes, slide a window of size k over s. Store each seen substring in a set. Finally, check if set size equals 2ᵏ.

- **Optimization:**  
  The above works, but storing actual substrings is a bit heavy; since k ≤ 20, we can convert each substring into an integer (binary representation) and store it in a set for efficient lookup and minimal memory. We can also early-return if we find all substrings before the end.

- **Further optimization (bitmask):**  
  Track seen codes using a boolean array of length 2ᵏ for constant-time marking. Slide the window and update the bitmask using integer arithmetic for optimal speed and space.

- **Trade-offs:**  
  - The sliding window and bitmask technique is fast and uses O(2ᵏ) space.  
  - Can't improve below O(n) time as we need to look at all windows.

### Corner cases to consider  
- k larger than s length (no possible substring)  
- k = 0 (should not occur per constraints, but logic should be robust)  
- s with repeated characters ("111111" or "0000", especially with larger k)  
- s with minimum length (just 1 character)  
- s containing all same substring (should fail if k > 1)  
- Early termination: If s length is too short for all possible substrings, return False immediately

### Solution

```python
def hasAllCodes(s, k):
    # There must be at least 2^k substrings of size k
    need = 1 << k  # Number of distinct binary codes of length k
    found = set()
    
    # Slide a window of length k
    for i in range(len(s) - k + 1):
        code = s[i:i+k]
        if code not in found:
            found.add(code)
            # Early exit: all codes found
            if len(found) == need:
                return True
    return len(found) == need
```

#### Optimized version using bitmasks (efficient if k is not large):

```python
def hasAllCodes(s, k):
    n = len(s)
    need = 1 << k  # Total combinations
    seen = [False] * need
    curr = 0

    if n - k + 1 < need:
        return False  # Too short to contain all codes

    # Initialize first k bits
    for i in range(k):
        curr = (curr << 1) | (ord(s[i]) - ord('0'))
    seen[curr] = True
    count = 1

    mask = need - 1  # Keeps the window to k bits

    for i in range(k, n):
        # Remove leftmost bit, add rightmost bit
        curr = ((curr << 1) & mask) | (ord(s[i]) - ord('0'))
        if not seen[curr]:
            seen[curr] = True
            count += 1
            if count == need:
                return True
    return count == need
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of s, because each window is processed in constant time.
- **Space Complexity:** O(2ᵏ), for storing all possible substrings of length k or a boolean array. Additional O(k) for fixed-length window variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if s is a stream and you cannot store all substrings?
  *Hint: You’d need to process in chunks/sliding window with a rolling hash, but cannot guarantee without storage of seen values.*

- Could you solve this efficiently if s could contain non-binary digits?
  *Hint: How would the code change to support strings with more of an alphabet? What about generalizing to radix n?*

- What if you only need to find *one* missing binary code of length k?
  *Hint: Stop early as soon as you find a missing one, or return any code not seen at the end.*

### Summary
This problem uses the classic **sliding window with a lookup structure** (set/bitmask/boolean array) to efficiently check substring presence. The pattern is common in substring/sequence coverage questions and applies well to other problems requiring detection of all possible patterns of fixed size in a string or stream. Early termination checks and masking techniques are important optimization strategies for optimal runtime and memory usage when k is bounded.