### Leetcode 158 (Hard): Read N Characters Given read4 II - Call Multiple Times [Practice](https://leetcode.com/problems/read-n-characters-given-read4-ii-call-multiple-times)

### Description  
You have access only to a `read4(buf4)` API that reads up to 4 characters at a time from a file, writing them into `buf4`, and returns the actual number of characters read (could be less than 4 at end of file).  
Your task is to implement a method `read(buf, n)` that reads up to `n` characters into `buf`. However, unlike the previous version, `read(buf, n)` can be called **multiple times**, so your implementation must remember its position across calls.  
You may not access the file directly, and your class needs to maintain **state** between calls to correctly return the next sequence of characters, not repeat or skip any.

### Examples  

**Example 1:**  
Input:  
First call: n=4 → read(buf, 4)  
Second call: n=2 → read(buf, 2)  
File="abcde"  
Output:  
First call Output=`4`  
Second call Output=`1`  
*Explanation:  
- First call reads 4 chars: ['a', 'b', 'c', 'd']  
- Second call returns 1, since only 'e' left. ['e']*

**Example 2:**  
Input:  
First call: n=3 → read(buf, 3)  
Second call: n=3 → read(buf, 3)  
File="abcdef"  
Output:  
First call Output=`3`  
Second call Output=`3`  
*Explanation:  
- First call: 'a', 'b', 'c'  
- Second call: 'd', 'e', 'f'*

**Example 3:**  
Input:  
First call: n=1 → read(buf, 1)  
Second call: n=4 → read(buf, 4)  
File="xy"  
Output:  
First call Output=`1`  
Second call Output=`1`  
*Explanation:  
- First call reads 'x'  
- Second call reads only 'y' since it's the last character*


### Thought Process (as if you’re the interviewee)  
- **Brute-force**: Every time `read()` is called, call `read4()` as many times as needed without saving state.  
  - This won't work: we'll lose "leftover" characters read by `read4()` that weren't used in previous call, causing loss of data or repeated reads.
- **Key insight**: If `read4()` ever returns extra chars that aren't all consumed (when n is not a multiple of 4), we *must remember* those leftovers for the next call.
- **Stateful Solution**:  
  - Use an internal buffer (`buf4`, size 4) to store extra chars read from `read4()`.
  - Keep pointers:
    - `bufPtr`: current offset in the buffer.
    - `bufCnt`: how many chars are currently valid in the buffer.
  - On each `read()`, consume leftover buffer first, then call `read4()` as needed until n is reached.
- **Why this approach**:  
  - Guarantees no char ever lost or repeated, even with multiple calls.
  - Only O(1) extra space (for buffer and pointers).

### Corner cases to consider  
- File length < requested n (should return only what’s available).  
- Multiple calls where n varies greatly (e.g., first call asks for 1, next for 10).
- File has exactly multiple-of-4 length.
- File shorter than even first call to `read()`.
- Empty file.
- Large n values and multiple consecutive calls.

### Solution

```python
# Assume read4 is provided for you.

class Solution:
    def __init__(self):
        # Buffer to store leftover chars from last read4
        self._buffer = [''] * 4
        self._bufPtr = 0   # pointer to the next unread char in _buffer
        self._bufCnt = 0   # how many chars are valid in _buffer

    def read(self, buf, n):
        """
        :type buf: List[str]
        :type n: int
        :rtype: int
        """
        idx = 0  # points to buf to write next char

        while idx < n:
            if self._bufPtr == self._bufCnt:
                # buffer empty, refill it
                self._bufCnt = read4(self._buffer)
                self._bufPtr = 0
                if self._bufCnt == 0:
                    break  # Reached EOF

            # Copy from internal buffer to output buf
            while idx < n and self._bufPtr < self._bufCnt:
                buf[idx] = self._buffer[self._bufPtr]
                idx += 1
                self._bufPtr += 1

        return idx
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because in the worst case we call read4 ⌈n/4⌉ times and do at most n buffer copies.
- **Space Complexity:** O(1), extra space is only the fixed-size internal buffer of 4 chars and a couple of counters.

### Potential follow-up questions (as if you’re the interviewer)  

- What if `read4()` can return an error or raise an exception (e.g., IO error)?  
  *Hint: Consider try/except blocks or error codes.*

- Can you optimize further if you're guaranteed only one read per file session?  
  *Hint: State storage not needed in that case.*

- How would you modify this solution for a **multi-threaded** environment?  
  *Hint: Think about synchronization of buffer state between threads, or providing a thread-local buffer.*

### Summary
This problem is a classic stateful buffer management question—handle *leftovers* across multiple API calls.  
Key pattern: **internal buffering** with pointers/state, often used in file/stream operations. The same idea is useful in implementing input/output streams, sockets, chunked network reads, and other APIs where "partial reads" can happen.  
Common in parsing, streaming, and producer-consumer designs.


### Flashcard
Use an internal buffer to store leftover chars from read4 between calls, ensuring no data is lost across multiple reads.

### Tags
Array(#array), Simulation(#simulation), Interactive(#interactive)

### Similar Problems
- Read N Characters Given Read4(read-n-characters-given-read4) (Easy)