### Leetcode 2109 (Medium): Adding Spaces to a String [Practice](https://leetcode.com/problems/adding-spaces-to-a-string)

### Description  
Given a string s and an array of integers spaces, where each value represents an index in s, insert a space character ' ' before each index listed in spaces and return the resulting string.  
Think of this as breaking a long word at given positions to insert spaces, similar to splitting a sentence into words when you know where the boundaries are.  
For example, if s = "LeetCodeIsFun" and spaces = [4, 8], then spaces should be inserted before the 4ⁿᵈ and 8ᵗʰ character to produce "Leet Code IsFun".

### Examples  

**Example 1:**  
Input: `s = "LeetcodeIsFun"`, `spaces = `  
Output: `"Leetcode IsFun"`  
*Explanation: The 8ᵗʰ index is before the 'I' in "IsFun". Insert a space before 'I'.*

**Example 2:**  
Input: `s = "icodeinpython"`, `spaces = [1, 5, 7]`  
Output: `"i code in python"`  
*Explanation:  
- Insert at 1 → `"i codeinpython"`  
- Insert at 5 (after shift) → `"i code inpython"`  
- Insert at 7 (after both shifts) → `"i code in python"`*

**Example 3:**  
Input: `s = "programmingisfun"`, `spaces = [3, 7, 9]`  
Output: `"pro grammi ngis fun"`  
*Explanation:  
- Before 3: "pro grammingisfun"  
- Before 7: "pro grammi ngisfun"  
- Before 9: "pro grammi ngis fun"*

### Thought Process (as if you’re the interviewee)  
First, I need to iterate through the string s and insert spaces at the indices listed in spaces.  
A brute-force approach would be to insert spaces one-by-one, but since string insertions are costly (O(n) per insert because strings are immutable), that would give O(n × k) time complexity where k = len(spaces).  
To optimize, I can use two pointers—one to walk through the string, and the other to track the current space index. When my string index matches spaces[ptr], I insert a space.  
- Build the result using a list (efficient appends) and join at the end  
- Both string and spaces are iterated only once: O(n + k) time.  
- No need for repeated string slicing or insertions.

### Corner cases to consider  
- spaces is empty: output should be identical to input string  
- spaces at the start or end of string (e.g. , [len(s)])  
- duplicate indices in spaces  
- spaces not sorted (per constraints, spaces is sorted, but validate if assumption is always safe)  
- s is an empty string  
- consecutive insertions (e.g. [1,2,3])  
- Maximum possible string or input sizes

### Solution

```python
def addSpaces(s: str, spaces: list[int]) -> str:
    # Prepare a list to build the output efficiently
    ans = []
    # j is index in spaces array
    j = 0
    # Iterate over characters and their indices in s
    for i, c in enumerate(s):
        # If the current index matches a space position, insert space
        if j < len(spaces) and i == spaces[j]:
            ans.append(' ')
            j += 1  # move to next space
        ans.append(c)
    # Combine into a final string
    return ''.join(ans)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + k), where n is the length of s and k is the number of spaces.  
  We iterate through s once and compare against the spaces list, which is also traversed once.
- **Space Complexity:** O(n + k), for storing the answer. We allocate one slot for each character of s and one for each inserted space.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you efficiently handle very large inputs or streaming data?  
  *Hint: Consider processing the data in chunks and avoid materializing large intermediate strings.*

- What if the spaces array isn’t sorted?  
  *Hint: You may need to sort it first or use a set/map for O(1) lookups, at the cost of O(k log k) or O(k) preprocessing.*

- Can you generalize the approach for inserting other substrings, not just spaces?  
  *Hint: Instead of a single character, allow a mapping of index → substring to insert.*

### Summary
This problem uses the "two pointers" pattern to efficiently interleave modifications into a string while traversing it linearly.  
The fundamental coding pattern—single pass over the input with a secondary pointer for tracking modifications—applies broadly to problems involving in-place modifications or merging multiple sources, such as merging sorted arrays, interval insertions, or building output with streaming input.

### Tags
Array(#array), Two Pointers(#two-pointers), String(#string), Simulation(#simulation)

### Similar Problems
