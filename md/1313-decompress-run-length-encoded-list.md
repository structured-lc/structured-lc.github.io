### Leetcode 1313 (Easy): Decompress Run-Length Encoded List [Practice](https://leetcode.com/problems/decompress-run-length-encoded-list)

### Description  
Given a run-length encoded list, where numbers are given as pairs: the first in each pair is a frequency (the number of times to repeat), and the second is the value to be repeated. Given the compressed list, decompress it into a flat list with the values expanded by their frequency.  
For example, if the input is `[2,3,1,4]`, it represents “two 3s and one 4”, so the output should be `[3,3,4]`.

### Examples  

**Example 1:**  
Input: `[1,2,3,4]`,  
Output: `[2,4,4,4]`  
*Explanation: The pairs are [1,2] (one 2) and [3,4] (three 4s). Combine: [2] + [4,4,4] = [2,4,4,4].*

**Example 2:**  
Input: `[2,5,3,6]`,  
Output: `[5,5,6,6,6]`  
*Explanation: Pairs are [2,5] (two 5s) and [3,6] (three 6s). [5,5] + [6,6,6] = [5,5,6,6,6].*

**Example 3:**  
Input: `[4,7]`,  
Output: `[7,7,7,7]`  
*Explanation: Only one pair [4,7]: four 7s, so output [7,7,7,7].*

### Thought Process (as if you’re the interviewee)  
- I need to process the input in pairs (frequency, value).  
- For each pair, I’ll repeat the value frequency times and add to the result list.  
- Brute-force: Use a for loop to iterate in steps of 2, extract freq and val, and extend the result by freq copies of val.  
- There’s not much to optimize—this is O(n) since we have to output each value.  
- I’ll avoid list comprehensions with Python builtins in an interview; instead, I’ll use explicit loops for clarity and interview readiness.

### Corner cases to consider  
- Input is empty: return empty list.  
- Pair with freq = 0: that value is not included at all.  
- freq or val are negative? (Assume per problem that neither is negative; if allowed, handle accordingly.)  
- Input has odd length or is malformed (invalid per constraints, but worth a check).  
- freq = 1 (single occurrence, still needs to work.)  

### Solution

```python
def decompressRLElist(nums):
    # Initialize result list to store decompressed values
    result = []
    # Iterate in steps of 2: nums[i] = freq, nums[i+1] = val
    for i in range(0, len(nums), 2):
        freq = nums[i]
        val = nums[i + 1]
        # Add 'val' to result 'freq' times
        for _ in range(freq):
            result.append(val)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the length of the final decompressed output.  
  Each value is appended exactly as many times as needed; input list is scanned in O(len(nums) / 2) steps.
- **Space Complexity:** O(N), because we need to store each expanded value in the result list. Input array is read-only; all extra storage is proportional to result size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input list is very large and can’t fit in memory after decompressing?  
  *Hint: Can you write an iterator/generator version which decompresses one value at a time?*

- Can you handle malformed input if the list length is odd?  
  *Hint: Add input checks before iterating*  

- What if freq or val can be negative?  
  *Hint: Consider constraints, and how to handle unexpected inputs.*

### Summary
This problem demonstrates a direct mapping between a run-length encoded representation and the expanded form, using simple iteration.  
It’s a classic use of the **two-pointer** / **pair grouping** coding pattern, and the process of "expand compressed data" is common in text decompression, bitmap processing, and many parser-type interview problems.  
The core idea applies whenever you take a (count, value) compressed list and have to output a list with counts of each value in sequence.


### Flashcard
For each (freq, val) pair in the input, append val to the result freq times; process input in steps of 2.

### Tags
Array(#array)

### Similar Problems
- String Compression(string-compression) (Medium)