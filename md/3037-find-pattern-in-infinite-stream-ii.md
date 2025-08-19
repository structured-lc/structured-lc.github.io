### Leetcode 3037 (Hard): Find Pattern in Infinite Stream II [Practice](https://leetcode.com/problems/find-pattern-in-infinite-stream-ii)

### Description  
Given an infinite stream of integers, design a class that supports two operations:
- Add new elements to the stream in order (one at a time—imagine a real-time stream).
- Query if a **given pattern** (an array of integers) is present as a contiguous subarray in the elements observed **so far** (not the entire stream, just up to now).

The class should support efficient checking after each new element—i.e., you may be asked many times "does the current stream end with this pattern?".

Your design must be efficient for large patterns and frequent queries.

### Examples  

**Example 1:**  
Input: `stream = [1,2,3,4,5,6,7,8,9]`, pattern = `[6,7,8]`  
Output: `True`  
*Explanation: After adding 9, the stream so far contains `[1,2,3,4,5,6,7,8,9]`. The subarray `[6,7,8]` appears as a contiguous subarray.*

**Example 2:**  
Input: `stream = [5,1,3,7], pattern = `  
Output: `True`  
*Explanation: The last element is 7, and the pattern `` matches.*

**Example 3:**  
Input: `stream = [1,2,3,4], pattern = [2,4]`  
Output: `False`  
*Explanation: No contiguous subarray `[2,4]` exists in the stream so far.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:** For every query, scan the last ⎣pattern.length⎦ elements of the stream and compare with the pattern. If the stream is very large or queries are frequent, this repeats work and is slow (O(n × m) cumulative, where n is total streamed length and m is pattern length).
- **Optimal Approach:** This is a classic problem for string/pattern matching algorithms such as KMP (Knuth-Morris-Pratt). After adding each new element to the stream, efficiently check whether the latest `pattern.length` elements end with the pattern, using a prefix table precomputed from the pattern (failure function). 
  - Maintain a state variable to track how much of the pattern we have matched so far.
  - Each time a new element arrives, advance or reset the state according to KMP logic.
  - Each `query` can then be answered in O(1) time if we maintain this state.
- **Why this approach:** KMP allows us to avoid unnecessary comparison and only tracks prefix matches intelligently, using O(m) space and O(1) time per new element.

### Corner cases to consider  
- The pattern is of length 1 (single element).
- The stream is shorter than the pattern (cannot possibly contain the pattern yet).
- The pattern occurs more than once, possibly overlapping.
- All elements are the same (e.g. stream = `[7,7,7,7]`, pattern = `[7,7]`).
- Stream or pattern has negative numbers or zeros, not just positives.
- Rapid queries in between additions, or only after additions.

### Solution

```python
class InfiniteStreamPatternFinder:
    def __init__(self, pattern):
        # Store the pattern to match
        self.pattern = pattern
        self.m = len(pattern)
        
        # Build KMP prefix table (failure function)
        self.prefix = [0] * self.m
        j = 0
        for i in range(1, self.m):
            while j > 0 and pattern[i] != pattern[j]:
                j = self.prefix[j - 1]
            if pattern[i] == pattern[j]:
                j += 1
            self.prefix[i] = j
                
        # Buffer to store at most m elements from the end of the stream
        self.window = []
        # Current matched length in KMP
        self.state = 0

    def add(self, num):
        # Add the new number to the stream (maintain only last m elements for analysis)
        self.window.append(num)
        if len(self.window) > self.m:
            self.window.pop(0)  # Not strictly needed for this solution, but keeps buffer small
        
        # KMP advance: Try to extend the current matching prefix
        while self.state > 0 and num != self.pattern[self.state]:
            self.state = self.prefix[self.state - 1]
        if num == self.pattern[self.state]:
            self.state += 1
        # If we matched entire pattern, we can answer True to a query

    def query(self):
        # Return True if the current state equals pattern length
        # i.e., pattern found ending at latest number
        return self.state == self.m

# Usage:
# finder = InfiniteStreamPatternFinder([6,7,8])
# for num in [1,2,3,4,5,6,7,8,9]:
#     finder.add(num)
#     if finder.query():
#         print("Pattern found!")
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - KMP table construction (init): O(m), where m = pattern length.
  - Each `add` operation: O(1) per element, due to prefix table.
  - Each `query`: O(1).

- **Space Complexity:**  
  - O(m) for the pattern, prefix table, and last m elements buffer.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose the pattern can change dynamically. How would you efficiently reset/adjust?
  *Hint: Separate state per pattern, or re-initialize KMP table.*

- How would you adapt if you had many patterns to check in parallel?
  *Hint: Use Aho-Corasick automaton to match multiple patterns efficiently.*

- What if the stream is distributed, or you need to persist state between runs/crashes?
  *Hint: Serialize prefix state and window buffer, checkpoint regularly.*

### Summary
This problem uses the **KMP (Knuth-Morris-Pratt) string matching algorithm**, allowing efficient processing of an infinite or very long stream with fast state updates and constant-time pattern presence checks. This technique is highly reusable for "pattern in stream" and real-time substring/pattern detection scenarios, especially where brute force is too slow.

### Tags
Array(#array), Sliding Window(#sliding-window), Rolling Hash(#rolling-hash), String Matching(#string-matching), Hash Function(#hash-function)

### Similar Problems
- Number of Integers With Popcount-Depth Equal to K I(number-of-integers-with-popcount-depth-equal-to-k-i) (Hard)