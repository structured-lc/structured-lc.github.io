### Leetcode 157 (Easy): Read N Characters Given Read4 [Practice](https://leetcode.com/problems/read-n-characters-given-read4)

### Description  
You are given a file, but you can only access its contents using a special API called `read4`, which reads up to 4 consecutive characters from the file each time it is called, and returns the number of actual characters read (could be fewer than 4 if end of file is reached).  
Your task is to implement a function `read(buf, n)` that reads up to **n** characters from the file into `buf` using only the `read4` method.  
You cannot access the file directly or know its content ahead of time; you must rely solely on repeated calls to `read4`.  
`buf` is guaranteed to have enough space to store `n` characters.  
Your function should return the **actual number of characters read** (which may be less than `n` if the file contains fewer characters).

### Examples  

**Example 1:**  
Input: file contains `"abc"`, n=`4`  
Output: `["a","b","c"]`, returns `3`  
*Explanation: Only 3 characters available. `read4` is called once, reads 3, we fill buf to buf[2].*

**Example 2:**  
Input: file contains `"abcdef"`, n=`3`  
Output: `["a","b","c"]`, returns `3`  
*Explanation: `read4` reads `["a", "b", "c", "d"]` but we only copy the first 3 into buf, and return 3.*

**Example 3:**  
Input: file contains `"abcde"`, n=`6`  
Output: `["a","b","c","d","e"]`, returns `5`  
*Explanation: `read4` is called twice: first returns 4 chars `"abcd"`, fill buf[0:4], second returns 1 for `"e"`, fill buf[4], then end of file reached.*


### Thought Process (as if you’re the interviewee)  
First, since I can only read from the file using the `read4` API, I'll need to read in chunks of up to 4 at a time.  
I'll keep a temporary buffer of size 4 for each `read4` call.  
I'll repeatedly call `read4` and copy the read characters into the destination buffer, tracking how many total characters we've copied.  
I'll stop if we've read `n` characters or if `read4` returns fewer than 4 (indicating end of file).  
For each chunk, I only copy up to the remaining number of characters needed (`min(n - total_copied, count_from_read4)`).  
Since there's no state to manage across multiple calls (as per original 157), this is a straightforward loop over the file until done.


### Corner cases to consider  
- File is empty — `read4` always returns 0.
- n = 0 (read nothing).
- File has fewer than n characters.
- File has exactly n characters (hit n and stop).
- File has more than n characters (stop early).
- File length is not a multiple of 4 (e.g., 5, 7).
- n is not a multiple of 4 (e.g., 3, 5, 6).
- One call to read4 suffices vs. needs several calls.


### Solution

```python
# The read4 API is already defined for you.
# def read4(buf4: List[str]) -> int:

def read(buf: List[str], n: int) -> int:
    temp = [''] * 4  # Temporary buffer for read4
    total = 0  # Total characters read so far

    while total < n:
        count = read4(temp)  # Read up to 4 chars into temp, get the number of chars actually read
        if count == 0:
            break  # End of file
        # Copy up to min(n - total, count) chars from temp to buf
        for i in range(min(n - total, count)):
            buf[total] = temp[i]
            total += 1

    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we may have to read up to n characters and each character is read and written at most once.
- **Space Complexity:** O(1), aside from the output buffer, just a small extra temp buffer of size 4, and a few counters.


### Potential follow-up questions (as if you’re the interviewer)  

- What if `read` could be called multiple times and you must retain the unread characters between calls?  
  *Hint: Think about maintaining a queue or buffer for leftover characters from previous read4 operations.*

- How would your implementation change if `read4` could fail or raise IO errors?  
  *Hint: Consider exception handling and how to propagate errors.*

- Could you optimize this for scenarios where n is always huge or always small relative to the file length?  
  *Hint: Do you always need to allocate a temporary buffer of size 4? When is it avoidable?*


### Summary
This approach is a classic application of the **"Read in chunks using buffer, copy to output until done"** pattern, commonly used when interacting with batched or paginated IO APIs.  
The loop structure, temporary buffer, and careful character counting are standard for any file streaming situation where the underlying access method is limited.  
This technique is not only useful for Leetcode "Read4"-style questions, but also for real-world file readers, stream processors, and network packet consumers.

### Tags
Array(#array), Simulation(#simulation), Interactive(#interactive)

### Similar Problems
- Read N Characters Given read4 II - Call Multiple Times(read-n-characters-given-read4-ii-call-multiple-times) (Hard)