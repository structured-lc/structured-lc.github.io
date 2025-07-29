### Leetcode 1209 (Medium): Remove All Adjacent Duplicates in String II [Practice](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii)

### Description  
Given a string s and an integer k, remove every group of k adjacent and identical characters in s. Keep removing such groups recursively until no more k-duplicate groups can be removed. Return the final string after all such possible removals.  
Essentially, whenever k consecutive identical characters are present, delete that group, and the adjacent characters are joined. Keep doing this until nothing can be deleted further.

### Examples  

**Example 1:**  
Input: `s = "abcd", k = 2`  
Output: `"abcd"`  
*Explanation: No k=2 adjacent duplicates. Nothing is removed.*

**Example 2:**  
Input: `s = "deeedbbcccbdaa", k = 3`  
Output: `"aa"`  
*Explanation:  
- Remove "eee" → "ddbbcccbdaa"  
- Remove "bbb" → "ddcccbdaa"  
- Remove "ccc" → "ddbdaa"  
- Remove "ddd" (doesn't exist), remove "aaa" (doesn't exist)  
- Final result is `"aa"`.*

**Example 3:**  
Input: `s = "pbbcggttciiippooaais", k = 2`  
Output: `"ps"`  
*Explanation:  
- Remove "bb" → "pcggttciiippooaais"  
- Remove "gg" → "pcttciiippooaais"  
- Remove "tt" → "pcciiippooaais"  
- Remove "cc" → "piiippooaais"  
- Remove "iii" (need k=2, so remove first "ii" → "pippooaais")  
- Continue removing every "pp", "oo", "aa"  
- Final string: `"ps"`.*

### Thought Process (as if you’re the interviewee)  
Brute force would involve scanning the string repeatedly to find k-adjacent duplicates, remove them, and repeat this until no such groups can be found. However, this is inefficient: removing groups causes the string to be rebuilt many times, leading to O(n\*\*2) or worse time.  
Optimized approach:  
- Use a stack to track characters and their consecutive counts.
- For each character, if the top of the stack matches, increase its count; if not, push a new (char,count) pair.
- If the count reaches k, pop that element (this removes k duplicates).
- At the end, reconstruct the string from the stack: each (char,count) pair becomes char×count.
- This approach is much more efficient: each character is processed at most twice (once in push, maybe once in pop), so O(n) time and space.

### Corner cases to consider  
- s is empty: return ""
- k is 1: every character is removed → returns ""
- No k-adjacent duplicates: return s unchanged
- All characters are the same and len(s) is divisible by k: returns ""
- Removal creates new k-adjacent duplicates from previously non-adjacent groups (verify chain reactions)
- s with only one character: either deleted if k==1 or stays

### Solution

```python
def removeDuplicates(s: str, k: int) -> str:
    # Each item on the stack: (char, current consecutive count)
    stack = []
    
    for c in s:
        if stack and stack[-1][0] == c:
            stack[-1][1] += 1
            # If k of the same char: remove them
            if stack[-1][1] == k:
                stack.pop()
        else:
            stack.append([c, 1])
    
    # Rebuild result from stack
    result = ""
    for char, count in stack:
        result += char * count
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). We process each character at most twice: pushing into the stack and, if a group is complete, popping it. n = len(s).
- **Space Complexity:** O(n). In the worst case, if there are no removals, the stack holds all characters.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt this solution if you wanted to preserve the order but only remove *unique* k-length groups (not just identical)?
  *Hint: Consider tracking full substrings, not just one character at a time.*

- What if the characters aren't lowercase letters, but any Unicode character?
  *Hint: The stack approach still works since you aren't assuming anything about the character set.*

- How would you solve this problem in-place if s was very large and string concatenation becomes expensive?
  *Hint: Simulate the stack via an array and overwrite s in place, using two pointers.*

### Summary
This problem uses the **stack pattern** to efficiently manage and remove groups of adjacent duplicate elements—a common technique for problems involving repeated or paired removals (like removing parentheses, decode strings, or repeated elements).  
This approach avoids unnecessary scanning and rebuilding of the string, achieving linear performance. The stack keeps track of the current sequence of characters and their counts, enabling efficient group detection and removal. Variations of this pattern are seen in string parsing, decoding algorithms, and editor simulation questions.