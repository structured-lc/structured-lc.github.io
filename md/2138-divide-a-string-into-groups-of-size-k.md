### Leetcode 2138 (Easy): Divide a String Into Groups of Size k [Practice](https://leetcode.com/problems/divide-a-string-into-groups-of-size-k)

### Description  
Given a string **s**, an integer **k**, and a character **fill**, divide the string **s** into consecutive groups of size **k**. Each group should have exactly **k** characters—except possibly the last, which should be filled with the **fill** character until its length is **k**. The output is a list of all such groups (substrings) in order.

### Examples  

**Example 1:**  
Input: `s = "abcdefghi", k = 3, fill = "x"`  
Output: `["abc", "def", "ghi"]`  
*Explanation: There are three full-sized groups of 3 characters: "abc", "def", "ghi". No filling needed.*

**Example 2:**  
Input: `s = "abcdefghij", k = 3, fill = "z"`  
Output: `["abc", "def", "ghi", "jzz"]`  
*Explanation: The last group "j" has only 1 character, so two "z"s are appended: "jzz".*

**Example 3:**  
Input: `s = "a", k = 2, fill = "x"`  
Output: `["ax"]`  
*Explanation: Only one group can be formed. Since it's only 1 character, one "x" is appended to make it length 2: "ax".*

### Thought Process (as if you’re the interviewee)  
First, break the string **s** into groups of size **k**. The main idea is to iterate over **s** in steps of **k**, taking substrings of length **k** each time.  
If the last group is less than **k** characters, append as many **fill** characters as needed to reach length **k**.

Initial brute-force idea:

- Use a loop to extract each substring of length **k**.
- If the last group is short, pad with **fill**.

Optimized approach:

- This is already efficient (O(n) time, where n = len(s)).
- No extra optimizations needed since the problem is simple and constraints are loose.

Trade-offs:

- This approach is concise and easy to understand.
- No need for advanced data structures.

### Corner cases to consider  
- Empty string (**s = ""**).
- **k** equals 1 (each character is a group).
- **k** longer than the length of **s** (entire string should be padded).
- **fill** could be any character (including one that appears in **s**).
- **s** length is an exact multiple of **k** (last group does not need filling).

### Solution

```python
def divideString(s: str, k: int, fill: str) -> list[str]:
    result = []
    n = len(s)
    # Loop through the string in steps of k
    for i in range(0, n, k):
        group = s[i:i + k]
        if len(group) < k:
            # Pad with fill character to make length k
            group += fill * (k - len(group))
        result.append(group)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the input string. Each character is visited exactly once.
- **Space Complexity:** O(n/k), for storing the resulting list of groups (each of up to k characters), plus O(n) for intermediate string slices in Python.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle Unicode characters or multi-byte/variable-width encoding?  
  *Hint: Think about how Python treats string slicing for multi-byte characters.*

- Can you achieve the same with O(1) additional space?  
  *Hint: Is it possible to process the groups in-place or print them as you go, without storing the entire result?*

- What changes if you needed to handle streams/very large strings?  
  *Hint: Consider using generators instead of lists.*

### Summary
This problem uses the *string slicing* and *simulation* coding patterns. The approach is direct: iterate in steps, slice, and pad as needed. It’s commonly seen in problems involving data grouping, message chunking, or text formatting. This fundamental method is applicable whenever dividing data into fixed-size chunks, handling leftovers with padding or fillers.

### Tags
String(#string), Simulation(#simulation)

### Similar Problems
- Text Justification(text-justification) (Hard)
- Positions of Large Groups(positions-of-large-groups) (Easy)