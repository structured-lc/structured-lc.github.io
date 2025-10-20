### Leetcode 1657 (Medium): Determine if Two Strings Are Close [Practice](https://leetcode.com/problems/determine-if-two-strings-are-close)

### Description  
Given two strings, **determine if you can transform one string into the other using only the following operations**:

- **Swap any two existing characters** in the string (as many times as you like).
- **Transform every occurrence of one existing character into another existing character** (and do the reciprocal transformation for the other character). For example, all `a` to `b` and all `b` to `a`.

You can perform these operations any number of times and in any order on either string. Return **true** if one string can be transformed into the other using these rules, otherwise return **false**.

### Examples  

**Example 1:**  
Input: `word1 = "abc"`, `word2 = "bca"`  
Output: `true`  
*Explanation: First swap 'b' and 'c' in "abc" to get "acb", then swap 'a' and 'b' to get "bca".*

**Example 2:**  
Input: `word1 = "a"`, `word2 = "aa"`  
Output: `false`  
*Explanation: You cannot make two 'a's from a single 'a' using the allowed operations.*

**Example 3:**  
Input: `word1 = "cabbba"`, `word2 = "abbccc"`  
Output: `true`  
*Explanation:  
- "cabbba" -> "caabbb" (swap 'b', 'a')  
- "caabbb" -> "baaccc" (swap all 'a' ↔ 'c')  
- "baaccc" -> "abbccc" (swap one 'a' and 'b')*

### Thought Process (as if you’re the interviewee)  

First, let's clarify the requirements:
- **Swaps** make the order of characters irrelevant — only their frequencies matter.
- **Character transformation** lets us exchange identities between any two existing characters, but only among present letters in the string.

**Brute-force idea:**  
Try all possible character transformations and swaps — not practical due to exponential possibilities.

**Optimization:**  
Let's consider **key properties**:
- Both strings must have the **same set of unique characters**. If a character exists in one string and not the other, it is impossible to match using allowed operations.
- The frequencies with which characters appear can be permuted (via transformations): For example, if in one string some character occurs 4 times, those 4 'slots' can belong to any other character in the other string.
- Therefore, if the **count of unique characters is the same** and the **multiset of character frequencies are the same**, we can transform one into the other.

So, two key checks:
1. The set of unique characters in both strings must be the same.
2. The *frequencies* (as multisets, not specifically which character has which frequency) must be the same.

### Corner cases to consider  
- Empty strings: Both "", should return true.
- Different lengths: Immediate false.
- One string with repeated letters, the other doesn't have them.
- Strings with disjoint character sets, e.g., "abc" vs. "def".
- Only one character present in both strings, different counts.

### Solution

```python
def closeStrings(word1, word2):
    # If lengths differ, it's impossible to transform one into the other
    if len(word1) != len(word2):
        return False

    # Count frequency for each character in both words
    freq1 = [0] * 26
    freq2 = [0] * 26

    for ch in word1:
        freq1[ord(ch) - ord('a')] += 1

    for ch in word2:
        freq2[ord(ch) - ord('a')] += 1

    # Check both words use same set of characters
    for i in range(26):
        if (freq1[i] == 0) != (freq2[i] == 0):
            return False

    # Check that the multisets of frequencies are the same
    return sorted([count for count in freq1 if count > 0]) == sorted([count for count in freq2 if count > 0])
```

### Time and Space complexity Analysis  

- **Time Complexity:** 𝑂(𝑁 + 𝑀 + 26 log 26) where 𝑁, 𝑀 are the lengths of the input strings. Frequency counting is linear, and sorting up to 26 values is constant time in practice.
- **Space Complexity:** 𝑂(1), since frequency arrays are fixed size (26), and only extra space is for the frequency counts — does not grow with input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle Unicode or non-lowercase English letters?  
  *Hint: Would your approach change if strings could have a much larger alphabet or arbitrary Unicode characters?*

- Can this logic be adapted to compare lists (arrays) for "closeness" under similar operations?
  *Hint: Instead of chars, consider integer values.*

- What if only one of the two operations is allowed, but not both?
  *Hint: How do the checks need to change if only swaps or only reciprocal transforms are allowed?*

### Summary
This is a classic example of the **"frequency equivalence" pattern** — using character or value counts and comparing sorted patterns or sets, instead of the direct elements. It highlights that **for certain transformations, only the multiset structure and set membership matter**, not the actual arrangement. This pattern also appears in permutation problems and anagram checks.


### Flashcard
Check if both strings have the same character set and frequency multiset (order and identity don’t matter, just counts).

### Tags
Hash Table(#hash-table), String(#string), Sorting(#sorting), Counting(#counting)

### Similar Problems
- Buddy Strings(buddy-strings) (Easy)
- Minimum Swaps to Make Strings Equal(minimum-swaps-to-make-strings-equal) (Medium)
- Minimum Number of Steps to Make Two Strings Anagram(minimum-number-of-steps-to-make-two-strings-anagram) (Medium)