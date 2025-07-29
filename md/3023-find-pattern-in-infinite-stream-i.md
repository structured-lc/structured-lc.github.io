### Leetcode 3023 (Medium): Find Pattern in Infinite Stream I [Practice](https://leetcode.com/problems/find-pattern-in-infinite-stream-i)

### Description  
You are given a binary array **pattern** and access to a special object, **InfiniteStream**, which simulates an ongoing, infinite sequence of bits (only 0s and 1s). This stream exposes a `next()` method, returning the next bit in the stream each call.  
Your task: **Find and return the first index (starting from 0) in the stream where a subsequence matches the pattern exactly.**  
That is, starting at which position do the next ⎡pattern.length⎤ bits of the stream match every bit of pattern in order?

### Examples  

**Example 1:**  
Input: `pattern = [1,0,1]`, `stream = [0,1,0,1,0,1,0,1,...]`  
Output: `1`  
*Explanation: Starting at index 1, the next three bits will be [1,0,1], which matches the pattern.*

**Example 2:**  
Input: `pattern = [0,1,1]`, `stream = [1,0,1,1,0,1,1,0,1,1,...]`  
Output: `1`  
*Explanation: At index 1, the next three bits are [0,1,1], matching the pattern.*

**Example 3:**  
Input: `pattern = [1,1,1]`, `stream = [0,0,0,1,1,1,0,1,1,1]`  
Output: `3`  
*Explanation: The first occurrence of three consecutive 1s starts at index 3.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  - For every position in the stream, buffer the last pattern.length bits and compare them to the pattern.
  - After reading each new bit, slide the window forward one position.
  - This method is straightforward but may be inefficient because comparison occurs for every incoming bit and repeated memory shifting.
- **Optimized approach:**  
  - Because the stream is infinite and buffer size is small (the length of the pattern), use a **sliding window** of size equal to the pattern.
  - Represent both pattern and current window as integers (bitmasks). On each new bit read, shift the window left and insert the bit, keeping only the last N bits (masking).
  - Precompute the integer value (bitmask) of the pattern for fast compare.
  - This reduces per-step cost to O(1) and avoids extra array storage/shifting.
- **Why this pattern?**  
  - Since bits are only 0 or 1, treating pattern and window as binary numbers is simple and quick.
  - This is similar to the rolling hash idea in string matching, but with a fixed-size and small alphabet.

### Corner cases to consider  
- The stream may never match the pattern (though by constraints, assume it must exist for this problem).
- Pattern of length 1 (single bit pattern).
- Pattern of all 0s or all 1s.
- Pattern occurs at the very start (index 0).
- Stream contains repeated bits or is periodic.

### Solution

```python
# Definition for InfiniteStream is provided by the platform.
# class InfiniteStream:
#     def next(self) -> int:
#         pass

class Solution:
    def findPattern(self, stream: 'InfiniteStream', pattern: list[int]) -> int:
        m = len(pattern)
        # Compute integer value of pattern
        pat_val = 0
        for bit in pattern:
            pat_val = (pat_val << 1) | bit

        window = 0  # Current window's integer value
        for i in range(m):  # Fill first window
            window = (window << 1) | stream.next()
        # After first window, check for match at index 0
        if window == pat_val:
            return 0

        mask = (1 << m) - 1  # Keep only last m bits
        idx = 1              # Start of window in stream
        while True:
            bit = stream.next()
            # Slide window left, append new bit, mask to keep m bits
            window = ((window << 1) | bit) & mask
            if window == pat_val:
                return idx
            idx += 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the position of the first match. Each stream.next() and comparison are O(1).
- **Space Complexity:** O(1). Uses only integers for window and pattern, no extra storage proportional to pattern/stream.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the pattern can be arbitrary length (e.g., 10000 bits)?
  *Hint: Use efficient rolling hash or bit manipulation to keep memory small.*

- What if the stream can return errors or the pattern is very long?
  *Hint: Consider robust buffering, and process the stream sequentially, still using bitmasks for manageable sizes.*

- Can you find all starting indices where the pattern appears in the first K bits of stream?
  *Hint: Keep checking and storing indices every time the window matches in a finite segment.*

### Summary
This problem is an application of the **fixed-length sliding window** and **bitmask rolling pattern match**.  
It's a variant of the classic substring search using a stream interface; treating bit patterns as integers allows efficient O(1) comparison and O(1) space.  
Commonly appears in problems involving rolling hash, Rabin-Karp for strings, stream processing, and bit manipulation for sliding window detection.