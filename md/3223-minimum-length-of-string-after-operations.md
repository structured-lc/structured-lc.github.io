### Leetcode 3223 (Medium): Minimum Length of String After Operations [Practice](https://leetcode.com/problems/minimum-length-of-string-after-operations)

### Description  
Given a string **s**, you can repeatedly pick an index **i** where there’s at least one character to the left of **i** equal to **s[i]** and one character to the right also equal to **s[i]**. Then, you delete the **closest** equal character on *both* sides (left and right) of **i**. Your goal is to return the minimum length of the string after performing any number of such operations.  
You cannot perform the operation if there aren’t same characters both on the left and right of an index. Only the closest matches to the center are removed at each operation.

### Examples  

**Example 1:**  
Input: `s = "abaacbcbb"`  
Output: `5`  
Explanation:  
- Pick index 2 (`a`): remove the leftmost `a` (index 0) and next `a` (index 3): "bacbcbb"  
- Pick index 3 (`c`): remove closest `c` on left (index 2) and right (index 5): "acbcb"  
Resulting string is `"acbcb"`, length = 5.

**Example 2:**  
Input: `s = "aa"`  
Output: `2`  
Explanation:  
There’s no index with equal `a` on both sides. No operation can be performed. Final length is 2.

**Example 3:**  
Input: `s = "aabbcc"`  
Output: `6`  
Explanation:  
No index has equal chars on both sides. Final length is 6.

### Thought Process (as if you’re the interviewee)  
Brute-force would be:  
- For every possible center, try to find same chars on each side and remove them, repeating for every possible operation, which is extremely inefficient (O(n²\*n) or worse) due to repeated scanning and modifications.

Let’s look for patterns and see if the minimum length can be predicted mathematically.

*Key insight*:
- Each operation targets a character with at least one equal neighbor to the left and right — the process deletes *pairs* of that character.
- If a character appears an odd number of times, at least one must *remain* (since each operation removes 2 of them).
- If a character appears an even number of times, we can always pair them up and possibly remove all, but we can *never* remove *all* occurrences through this process—since operations always need one in the center, and at least one must remain at the boundary.
- After simulation/testing, the **minimum possible length = number of odd-frequency characters, plus 2 for every even-frequency character (but never less than their count)**.

But a closer look + hints from code: In this problem, we cannot delete all the characters for any letter, because the operation always leaves at least the first/last if there are no longer three or more. So for each letter, we cannot reduce its count below min(2, count).

So, **the optimal answer is to make each character's frequency at most 2**. So, the answer = sum(min(2, count)) for all unique letters.

### Corner cases to consider  
- Strings of length 1 (`s = "a"`)
- All letters the same (`s = "aaaaa"`)
- No duplicate letters (`s = "abcdef"`)
- Letters with frequency 2 (`s = "aabbcc"`)
- Strings where one letter is odd count, rest are even (`s = "aabbbcc"`)
- Very long input `s` (use O(1) space track per alphabet)

### Solution

```python
def minimumLength(s: str) -> int:
    # Frequency count for each lowercase letter
    freq = [0] * 26
    for c in s:
        freq[ord(c) - ord('a')] += 1

    min_length = 0
    for count in freq:
        # We cannot remove all occurrences of a character.
        # At minimum, for each letter, its count reduces to at most 2.
        min_length += min(2, count)
    return min_length
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We traverse the string once to count frequencies and again over 26 unique alphabets to sum min(2, count).
- **Space Complexity:** O(1)  
  Only fixed-size array of 26 for English lowercase. No dependency on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would the answer change if the allowed operation didn’t need both left and right, but just two of the same char anywhere?
  *Hint: Think through single-sided removal and grouping.*

- What if the string contained Unicode characters (not just a-z)?
  *Hint: Would fixed-size array be enough for frequencies?*

- What is the minimum number of operations needed (not just the minimum length)?
  *Hint: Track how many times each operation can be performed based on char frequency.*

### Summary
This problem is a *frequency-reduction* pattern, with careful constraint handling. The operation behaves like greedy pair-removal, but you can never delete all occurrences.  
The main coding pattern is *hashing for frequency counting* plus a *mathematical insight* about the reduction rules, commonly seen in string transformation problems.  
Useful pattern to know for problems where restricted pair removals must be optimized globally.


### Flashcard
Use frequency map; for each character, if count ≥ 2, the minimum length contribution is count % 2 (either 1 or 0 chars remain).

### Tags
Hash Table(#hash-table), String(#string), Counting(#counting)

### Similar Problems
