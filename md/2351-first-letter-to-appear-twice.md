### Leetcode 2351 (Easy): First Letter to Appear Twice [Practice](https://leetcode.com/problems/first-letter-to-appear-twice)

### Description  
Given a string `s` made up of only lowercase English letters, find and return the **first letter that appears twice** as you scan the string from left to right. Here, "first" means the **second occurrence** of that letter comes before the second occurrence of any other character. The string is guaranteed to contain at least one such letter.

---

### Examples  

**Example 1:**  
Input: `s = "abccbaacz"`  
Output: `c`  
*Explanation:*
- Scan: 'a' (new), 'b' (new), 'c' (new), 'c' (**c repeats first at index 3**), so answer is 'c'.

**Example 2:**  
Input: `s = "abcdd"`  
Output: `d`  
*Explanation:*
- Scan: 'a', 'b', 'c', 'd', 'd' (**d repeats first at index 4**).

**Example 3:**  
Input: `s = "aba"`  
Output: `a`  
*Explanation:*
- Scan: 'a' (new), 'b' (new), 'a' (**a repeats first at index 2**).

---

### Thought Process (as if you’re the interviewee)  

- **Brute-force**: For each character, scan the rest of the string to see if it repeats. Return the first character whose second occurrence is earliest. This is inefficient: O(n²) time.

- **Optimized approach**: 
  - Use a set (or a fixed-size boolean list for 26 lowercase letters) to track seen characters.
  - As you scan each character from left to right:
    - If the character is not in the set, add it.
    - If it IS in the set, return it immediately—it’s the first to repeat.
  - This is O(n) time with O(1) auxiliary space, since there are only 26 possible lowercase letters.

- **Why choose this?** Set (or boolean list) lookup is very fast, and space usage is minimal and constant. You immediately exit on finding the first repeat, so no wasted computation.

---

### Corner cases to consider  
- String of length < 2 — Not possible as per constraints; guaranteed at least one repeat.
- Repeat at the very start (e.g., `"aabb"`).
- All characters are the same (e.g., `"aa"`).
- Repeats at the end (e.g., `"abcdefgaa"`).
- Multiple repeating characters — Only the **first double**, in order, is to be returned.

---

### Solution

```python
def first_letter_to_appear_twice(s: str) -> str:
    # Boolean array for a-z (only 26 lowercase letters)
    seen = [False] * 26  
    
    for ch in s:
        idx = ord(ch) - ord('a')
        if seen[idx]:
            return ch  # First character whose second occurrence is found
        seen[idx] = True

    # The problem guarantees there is at least one repeated letter.
    return ''
```

---

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the string length.
  - Each character is visited once. Lookup and update in array is O(1).
- **Space Complexity:** O(1), since the auxiliary array is of fixed size 26 (irrespective of input length).

---

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt this approach if `s` could include uppercase, digits, or other unicode characters?
  *Hint: Consider how to generalize your tracking structure to arbitrary character sets.*

- What if you needed to return the index of the second occurrence, not the character?
  *Hint: What variable(s) or data structures would you track as you scan?*

- Could you extend this logic to solve for the kᵗʰ occurrence of a repeat?
  *Hint: Use a counter per character rather than a boolean.*

---

### Summary
This problem is a classic "first duplicate" scan using a set or boolean array to track **seen characters**. The core pattern is *scanning with memory*—commonly used across problems involving **finding duplicates, single elements,** or **first occurrences**. Because the alphabet is small and fixed, space remains constant. This pattern recurs in various string, array, and hash/set questions.

### Tags
Hash Table(#hash-table), String(#string), Bit Manipulation(#bit-manipulation), Counting(#counting)

### Similar Problems
- Two Sum(two-sum) (Easy)
- First Unique Character in a String(first-unique-character-in-a-string) (Easy)