### Leetcode 2696 (Easy): Minimum String Length After Removing Substrings [Practice](https://leetcode.com/problems/minimum-string-length-after-removing-substrings)

### Description  
Given a string **s** consisting of only uppercase English letters, you are allowed to repeatedly remove any occurrence of the substrings "AB" or "CD".  
After each removal, the string concatenates so new "AB" or "CD" substrings may form and can also be removed.  
Return the minimum possible length of the resulting string after applying all such possible operations.  

*Think of it as: repeatedly look for "AB" or "CD" in the string, remove them wherever they appear, and keep doing this until you can't remove anymore. Return how short the string can get.*

### Examples  

**Example 1:**  
Input: `s = "ABFCACDB"`  
Output: `2`  
*Explanation:  
Remove "AB" → "FCACDB"  
Remove "CD" → "FCAB"  
Remove "AB" → "FC"  
No more "AB" or "CD" left; final length = 2.*

**Example 2:**  
Input: `s = "ACBBCD"`  
Output: `1`  
*Explanation:  
Remove "CD" (at end): "ACBB"  
No "AB" immediately, but not over!  
From "ACBB", check "BB" (no), so we're done. But if "AB" appears, we keep going. Here, only one character ('A'), so answer is 1 (see follow-up for edge cases involving multiple passes).*

**Example 3:**  
Input: `s = "CABCD"`  
Output: `1`  
*Explanation:  
Remove "CD": "CAB"  
Remove "AB": "C"  
Done. Only 'C' remains. Length = 1.*

### Thought Process (as if you’re the interviewee)
- **Brute force idea:**  
  We could repeatedly scan the string for "AB" and "CD", remove them, and repeat until no more can be found.  
  This would require rescanning the whole string each time, taking O(n²) time in the worst case.

- **Optimized approach:**  
  Since only pairs "AB" and "CD" need to be removed, we can use a **stack**.  
  - Iterate through the string, push each character to a stack.
  - If the current character can pair with the previous one (i.e., stack top), pop both:  
    - If stack top is 'A' and current is 'B', pop 'A' (remove "AB").  
    - If stack top is 'C' and current is 'D', pop 'C' (remove "CD").  
  - Otherwise, push the character.
  - At the end, the stack size is the minimum possible length.

  **Rationale**:  
  Since removals only affect adjacent elements and shifting may form new removable pairs, this greedy left-to-right stack scan always catches all possible reductions in a single pass.

  **Trade-offs**:  
  - Time: O(n) (since each letter is pushed or popped at most once)
  - Space: O(n) (in case no removals happen)

### Corner cases to consider  
- Empty string `""`
- String without any "AB" or "CD" e.g., `"EEEE"`
- String that reduces to empty, e.g., `"ABCDABCD"` → repeatedly removes until nothing remains
- Overlapping potential, e.g., `"ABCDBA"`  
- Strings consisting of only 'A' and 'B' or only 'C' and 'D'
- Single character strings

### Solution

```python
def minLength(s: str) -> int:
    # Stack to keep remaining characters
    stack = []

    for c in s:
        if stack:
            # If the last character was 'A' and current 'B', remove both ("AB")
            if stack[-1] == 'A' and c == 'B':
                stack.pop()
                continue
            # If the last character was 'C' and current 'D', remove both ("CD")
            if stack[-1] == 'C' and c == 'D':
                stack.pop()
                continue
        # Otherwise, keep the character
        stack.append(c)

    # The number of characters left is the answer
    return len(stack)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each letter is pushed and possibly popped once; the algorithm only takes a single pass through the string.

- **Space Complexity:** O(n)  
  In the worst case (no pairs can be removed), all characters stay on the stack.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this to more removeable substrings (not just "AB" or "CD")?  
  *Hint: Generalize the check using a dictionary of removable pairs, or allow removal of substrings of arbitrary length.*

- Can it be done in-place with O(1) extra memory?  
  *Hint: Simulate the stack using the input array and two pointers.*

- What if "AB" and "CD" overlap, or at least one character in a pair can be part of another pair?  
  *Hint: Explain why greedy left-to-right with stack is or isn't still correct.*

### Summary
This problem uses the **stack** pattern, where you process elements and cancel out adjacent pairs matching certain patterns. It's commonly seen in problems involving reductions, adjacent deletions, or nested structure checks (like parentheses matching).  
The approach guarantees optimality since every qualifying pair is greedily removed as soon as possible, and the stack efficiently keeps track of potential new pairs formed by adjacent shifts. This technique is widely applicable to symbol reduction and parsing problems.


### Flashcard
Use stack to track characters; for each char, if it pairs with stack top ("AB" or "CD"), pop stack, else push char; final stack size is minimum length after all removals.

### Tags
String(#string), Stack(#stack), Simulation(#simulation)

### Similar Problems
