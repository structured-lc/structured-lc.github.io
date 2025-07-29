### Leetcode 900 (Medium): RLE Iterator [Practice](https://leetcode.com/problems/rle-iterator)

### Description  
The problem provides a run-length encoded (RLE) sequence represented as a list where elements are paired as `[count, value]`. The task is to implement an iterator that returns the next element in the decoded sequence after consuming `n` elements from the sequence on each call. If fewer than `n` elements remain, it returns `-1`. Essentially, this simulates iterating through the uncompressed sequence without explicitly decompressing it.

### Examples  

**Example 1:**  
Input: encoding = [3,8,0,9,2,5], calls = next(2), next(1), next(1), next(2)  
Output: 8, 8, 5, -1  
*Explanation:*  
The original expanded sequence is [8,8,8,5,5].  
- `next(2)` consumes two 8's, returns 8 (the last value consumed).  
- `next(1)` consumes one more 8, returns 8.  
- `next(1)` consumes one 5, returns 5.  
- `next(2)` tries to consume two 5's, but only one left, so returns -1.  

**Example 2:**  
Input: encoding = [4,2,3,3], calls = next(1), next(3), next(2)  
Output: 2, 2, -1  
*Explanation:*  
The expanded sequence is [2,2,2,2,3,3,3].  
- `next(1)` consumes one 2, returns 2.  
- `next(3)` consumes three 2's, but only three 2's total so returns 2.  
- `next(2)` attempts to consume two 3's, but only three 3's remain, returns -1 if can't consume.  

**Example 3:**  
Input: encoding = [1,10], calls = next(1), next(1)  
Output: 10, -1  
*Explanation:*  
Only one 10 exists. First call consumes and returns 10, second call returns -1 as sequence is exhausted.  

### Thought Process (as if you’re the interviewee)  
First, I understand that decompressing the entire sequence explicitly might be space-inefficient if counts are large, so I'd avoid that. The brute force is decoding the whole sequence and then consuming elements as needed, but that is costly in space and trying to optimize.

Next, I consider maintaining an index pointer over the encoded array. I keep track of how many elements have been consumed from the current run-length segment `(count, value)`. When `next(n)` is called, I consume `n` elements from the current count. If `n` exceeds what current count can offer, subtract and move to the next `(count, value)` pair until `n` is zero or sequence ends.

This approach only requires tracking an index and current residual count for the current segment, executing `next(n)` in amortized O(1) time and O(encoding size) space. The trade-off is simplicity, efficiency, and not using extra memory for expanded sequence.

### Corner cases to consider  
- Encoding with zero counts, e.g., `[0,5,3,2]` (should skip zero count entirely).  
- Calls to `next` with `n` greater than the total remaining elements.  
- Single element encoding, like `[1,10]`.  
- Empty or very large counts in encoding.  
- Multiple consecutive calls to `next` exhausting the current segment, then moving to next.  

### Solution

```python
class RLEIterator:
    def __init__(self, encoding):
        # The run-length encoded array (count, value) pairs
        self.encoding = encoding
        # Current index to the count in encoding (even indices), value is at i+1
        self.i = 0

    def next(self, n):
        # Consume next n elements from the run-length encoded sequence
        while self.i < len(self.encoding):
            count = self.encoding[self.i]
            value = self.encoding[self.i + 1]
            if count >= n:
                # Enough elements remain in current run to consume n
                self.encoding[self.i] -= n
                return value
            else:
                # Consume the whole run and move to next
                n -= count
                self.i += 2
        # If no elements remain or n remains but no runs left, return -1
        return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** Each call to `next(n)` consumes elements and can move index forward. Over the entire lifetime, each run-length segment is visited once, so amortized O(1) per call.  
- **Space Complexity:** O(|encoding|) for storing input runs. No extra space proportional to expanded sequence size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the iterator to support a `peek()` operation?  
  *Hint: Maintain current state without consuming elements on the peek call.*  

- Can you optimize to handle very large counts more efficiently if `next` is frequently called with small increments?  
  *Hint: Consider lazy consumption and batch or binary search for fast skipping.*  

- What if the encoded input is provided as a stream, and you must iterate while consuming streaming input?  
  *Hint: Handle dynamic encoding segments and partial data consumption.*  

### Summary  
This problem is a classic iteration and simulation problem with run-length encoding. It focuses on efficient state tracking instead of decompressing the entire sequence, highlighting a design pattern to simulate lazy iteration over a compressed data set. Such patterns appear in streaming data processing, compressed data handling, and iterator implementation in data structures.