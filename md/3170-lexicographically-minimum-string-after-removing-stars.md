### Leetcode 3170 (Medium): Lexicographically Minimum String After Removing Stars [Practice](https://leetcode.com/problems/lexicographically-minimum-string-after-removing-stars)

### Description  
Given a string s containing lowercase letters and star '\*' characters, you must remove all star characters. Each time you remove a star, also remove the smallest lexicographical (alphabetically smallest) **non-star** character to its left (if there are several, remove the rightmost such character). After removing all stars and their associated removals, return the **lexicographically smallest possible string**.

### Examples  

**Example 1:**  
Input: `s = "aab*a"`  
Output: `aab`  
Explanation:  
- The '\*' at index 3 is encountered. The smallest left non-star character is 'a' (at index 2). We remove this 'a' and the '\*', resulting in `'aab'`.

**Example 2:**  
Input: `s = "bc*a"`  
Output: `ba`  
Explanation:  
- The '\*' at index 2 removes the smallest left non-star ('b' at index 0), so remove 'b' and '\*'. Result is `'ca'`.
- There are no more stars. Output is `'ba'` since after all removals, this is lexicographically smaller.

**Example 3:**  
Input: `s = "abc*cba**"`  
Output: `aa`  
Explanation:  
- 1ˢᵗ '\*' at index 3: Left is 'c', 'b', 'a'; 'a' is smallest, rightmost at index 0. Remove 'a' and '\*' → `bc cba**`
- 2ⁿᵈ '\*' at index 6: New left is 'b', 'c', 'c', 'b'; smallest is 'b' at index 1 (rightmost 'b'). Remove 'b' and '\*' → `c cba*`
- 3ʳᵈ '\*' at index 7: Left is 'c', 'c', 'b', 'a'; smallest 'a' at index 7. Remove 'a', '\*' → `ccba`
- No more '\*'. Final string is `'aa'`.

### Thought Process (as if you’re the interviewee)  
- The brute-force approach is, every time we see a '\*', scan left for the smallest non-star character (rightmost such occurrence), remove it and the '\*', and repeat. This is very inefficient for large strings.
- To do better, process the string in **reverse**. Use a stack to keep track of the current result.  
  - When you see a letter, push it to the stack.
  - When you see a '\*', scan the stack for the rightmost smallest character: to be efficient, we must always remove the smallest lexicographically character, but if there are duplicates, remove the one closest to the star (i.e., the top of the stack if it's the minimum so far).
- This stack approach makes removal fast (since the removal is always from the end).
- Greedy and stack are a good fit for this type of "remove left" while keeping the result smallest.

### Corner cases to consider  
- No stars in the input (`s = "abcde"`)
- All stars at the beginning or end (`s = "***abc"`, `s = "abc***"`)
- Multiple consecutive stars
- All letters are the same (`s = "aaa***"`)
- Empty string or string of only stars

### Solution

```python
def lex_min_string_after_removing_stars(s: str) -> str:
    # Stack to hold characters of the final string
    stack = []
    for ch in s:
        if ch != '*':
            stack.append(ch)
        else:
            # Remove the topmost (rightmost) minimum character
            # Find the index from the end of stack with the min char
            if stack:
                # Find the smallest char's index from the end (prefer most recent one)
                min_idx = len(stack) - 1
                for i in range(len(stack)-2, -1, -1):
                    if stack[i] <= stack[min_idx]:
                        min_idx = i
                stack.pop(min_idx)
    return ''.join(stack)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) in the worst case (when every '\*' causes a scan over most of the stack to find rightmost minimum).  
  - However, for real interview/contest input sizes, this will usually run fast enough unless n is very large.
- **Space Complexity:** O(n) for the stack to build the result.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize the search for rightmost minimum so it’s faster than O(n) per star?  
  *Hint: Think about ways to augment the stack with extra information, like running minimums or a monotonic structure.*

- What about unicode or uppercase characters?  
  *Hint: How would this change your comparison logic?*

- How would you handle if instead of removing one minimum, you removed two per star?  
  *Hint: Consider generalizing your function; what would have to change about your data structure?*

### Summary  
- This is a classic **greedy + stack** string parsing problem.
- Stack is used to efficiently access and remove last seen characters.  
- The twist (removing the rightmost minimum for each star) makes this different from basic stack/string problems.
- Patterns and optimizations from this problem appear in parsing, min/max stack/queue, and string reorganization interviews.