### Leetcode 3146 (Easy): Permutation Difference between Two Strings [Practice](https://leetcode.com/problems/permutation-difference-between-two-strings)

### Description  
Given two strings **s** and **t** of equal length, where each character appears at most once in **s** and **t** (that is, both are permutations of the same set of unique characters), find the **permutation difference** between **s** and **t**. The permutation difference is defined as the sum of the absolute differences between the indices of every character in **s** and the index of the same character in **t**.  
Formally: For all characters c in **s**, sum up |index of c in s − index of c in t|.

### Examples  

**Example 1:**  
Input: `s = "abc", t = "bac"`  
Output: `2`  
*Explanation:  
'a' at index 0 in s, index 1 in t ⇒ |0-1|=1  
'b' at index 1 in s, index 0 in t ⇒ |1-0|=1  
'c' at index 2 in s, index 2 in t ⇒ |2-2|=0  
Total = 1+1+0 = 2*

**Example 2:**  
Input: `s = "abcd", t = "dcba"`  
Output: `8`  
*Explanation:  
'a': 0 in s, 3 in t ⇒ |0-3|=3  
'b': 1 in s, 2 in t ⇒ |1-2|=1  
'c': 2 in s, 1 in t ⇒ |2-1|=1  
'd': 3 in s, 0 in t ⇒ |3-0|=3  
Total = 3+1+1+3 = 8*

**Example 3:**  
Input: `s = "a", t = "a"`  
Output: `0`  
*Explanation:  
'a': 0 in s, 0 in t ⇒ |0-0|=0  
Total = 0*

### Thought Process (as if you’re the interviewee)  
First, I notice that both **s** and **t** are permutations of the same set of unique characters, so each character appears exactly once in both strings.  
- **Brute-force approach:** For every character in **s**, search its index in **t** and sum the absolute index difference. This is O(n²)—inefficient for longer strings.
- **Optimal approach:** Preprocess one of the strings (say, **s**) by storing each character's index in a dictionary. Then, iterate over **t** with its indices: for each character, calculate `abs(index in s - index in t)` using the dictionary for O(1) lookups. Accumulate the total.

This approach is chosen because using a dictionary/map for constant-time index lookup enables us to process both strings in O(n) time.

### Corner cases to consider  
- Empty strings (s = "", t = "") ⇒ should return 0.
- Length 1 input (single character, same in both).
- s and t are identical ⇒ output 0.
- s and t are completely reversed.
- Non-lowercase ASCII (doesn't apply since constraints mention only lowercase and unique characters).
- Already validated input: both are same length, both unique chars and permutations—no need to defensively program for invalid input.

### Solution

```python
def findPermutationDifference(s: str, t: str) -> int:
    # Map each character in s to its index for O(1) lookup
    index_in_s = {}
    for i, c in enumerate(s):
        index_in_s[c] = i

    # Sum the absolute difference of indices for each character in t
    total_difference = 0
    for i, c in enumerate(t):
        total_difference += abs(index_in_s[c] - i)
    return total_difference
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the input strings.
    - Mapping indices for **s**: O(n).
    - Iterating through **t** for index comparison: O(n).
- **Space Complexity:** O(n), for storing the index mapping. For 26 lowercase English letters, can treat as O(1), but generally O(n) if character set is larger.

### Potential follow-up questions (as if you’re the interviewer)  

- What if s and t could have duplicate characters or different lengths?  
  *Hint: How would you validate input and define permutation difference in those cases?*

- Could you compute this "distance" if only a subset of characters appear in t or s?  
  *Hint: Would you use `set` differences or just skip missing?*

- What if s and t could be very large (millions of characters)?  
  *Hint: Can you improve memory further or is this approach optimal?*

### Summary
The problem uses a classic "hash map for index lookup" pattern—constructing an index map for one string and comparing each element from another sequence for efficient O(n) computation. This general approach is widely applicable in problems relating to permutations, character frequency comparison, or reordering problems.

### Tags
Hash Table(#hash-table), String(#string)

### Similar Problems
- Find the Difference(find-the-difference) (Easy)