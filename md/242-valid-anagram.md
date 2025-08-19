### Leetcode 242 (Easy): Valid Anagram [Practice](https://leetcode.com/problems/valid-anagram)

### Description  
Given two strings, **s** and **t**, determine if **t** is an *anagram* of **s**. An anagram requires that both strings use *all* original letters *exactly once*, possibly in a different order. So, both must have the same characters with the same frequency. Return `True` if **t** is an anagram of **s**, otherwise return `False`.

### Examples  

**Example 1:**  
Input: `s = "anagram", t = "nagaram"`  
Output: `True`  
*Explanation: Both strings contain the exact same characters (`a`, `n`, `a`, `g`, `r`, `a`, `m`) with the same counts. Their order does not matter.*

**Example 2:**  
Input: `s = "rat", t = "car"`  
Output: `False`  
*Explanation: `t` contains a `c` but `s` does not. They do not have the same letters.*

**Example 3:**  
Input: `s = "a", t = "a"`  
Output: `True`  
*Explanation: Both are single letter `a`, so they are trivially anagrams.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea**: Generate all permutations of `s` and see if `t` matches any one. But this is highly inefficient (factorial time).
- **Sorting solution**: Since anagrams have the same letters and counts, sort both strings and compare. If sorted(s) == sorted(t), they are anagrams. This is simple and has O(n log n) time due to sorting.
- **Hashmap / Array frequency count**: Because we only have lowercase English letters, use an array of size 26 to count each letter’s frequency for both strings. Compare frequency arrays at the end.
    - Better yet: Traverse `s` and increment count for every char, traverse `t` and decrement. If all entries are zero at the end, they are anagrams.
    - This approach is O(n) time and O(1) space (the array is always size 26, regardless of input size). This is the most optimal and interview-friendly[2][3].
- We pick the frequency array approach for its simplicity and optimal performance.

### Corner cases to consider  
- Empty strings: s = "", t = "" → should return True.
- Strings of different lengths: cannot be anagrams.
- Strings with duplicate characters.
- Single-character strings (trivial).
- Only lowercase input is guaranteed (no need for case handling).
- Very long strings: should remain efficient.

### Solution

```python
def isAnagram(s: str, t: str) -> bool:
    # Early exit: if they are not the same length, they can't be anagrams.
    if len(s) != len(t):
        return False

    # Create a fixed-size count array for 'a' to 'z'
    count = [0] * 26  # 26 lowercase English letters

    for i in range(len(s)):
        # Increment for char in s, decrement for char in t
        count[ord(s[i]) - ord('a')] += 1
        count[ord(t[i]) - ord('a')] -= 1

    # If all counts are zero, s and t are anagrams
    for c in count:
        if c != 0:
            return False

    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is length of the input strings. We do a single pass through both strings and a fixed pass through the count array at the end.
- **Space Complexity:** O(1), because the additional storage (count array) is always of size 26, regardless of input.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify this solution if Unicode (non-lowercase or special) characters were allowed?  
  *Hint: Could a general-purpose hashmap be used for counting instead of fixed-size array?*

- Can this be solved in-place if some restrictions are lifted (e.g., you can modify input)?
  *Hint: Sorting in-place might help, but think about time vs. space.*

- How would you handle checking anagrams for very large files or data streams?
  *Hint: Think about one-pass, or memory trade-offs, perhaps by using chunked streaming.*

### Summary
This problem is a classic use of the **hashing/counter pattern** for character frequency comparison—a common pattern in anagram and frequency-matching problems. The fixed-size array (since input is restricted to lowercase English letters) allows for highly efficient O(n) time, O(1) space solution. Variants of this approach can be applied in word groupings, frequency map problems, and even for checking permutations.

### Tags
Hash Table(#hash-table), String(#string), Sorting(#sorting)

### Similar Problems
- Group Anagrams(group-anagrams) (Medium)
- Palindrome Permutation(palindrome-permutation) (Easy)
- Find All Anagrams in a String(find-all-anagrams-in-a-string) (Medium)
- Find Resultant Array After Removing Anagrams(find-resultant-array-after-removing-anagrams) (Easy)