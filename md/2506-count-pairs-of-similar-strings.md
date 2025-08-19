### Leetcode 2506 (Easy): Count Pairs Of Similar Strings [Practice](https://leetcode.com/problems/count-pairs-of-similar-strings)

### Description  
Given an array of strings, count the number of pairs of indices (i, j) such that `0 ≤ i < j < n` and both strings at those indices use **exactly the same set of unique characters** (order and frequency don't matter).  
Two strings `"aba"` and `"baa"` are considered similar since they use the same unique characters `'a'` and `'b'`, but `"abc"` and `"ab"` are not.


### Examples  

**Example 1:**  
Input: `words = ["aba","aabb","abcd","bac","aabc"]`  
Output: `2`  
*Explanation:  
- "aba" & "aabb" both use "ab" (unique chars), so that's a similar pair.  
- "aba" & "bac" both use "abc": unique chars are a, b, c — that's a similar pair.  
- All other pairs have different unique character sets.*

**Example 2:**  
Input: `words = ["aabb","ab","ba"]`  
Output: `3`  
*Explanation:  
- All 3 pairs ([0,1], [0,2], [1,2]) use the same set "ab".*

**Example 3:**  
Input: `words = ["abc","def","ghi"]`  
Output: `0`  
*Explanation:  
- No pairs share the same set of unique characters.*


### Thought Process (as if you’re the interviewee)  
First, a brute-force approach would compare all possible pairs of words, collect their sets of unique characters, and count if they're equal, which is O(n² × k) where k is the average string length.  
This is slow for large input sizes.

To optimize, notice that two words are similar **if their set of unique characters is the same**. This suggests a hashing or encoding:  
- For each word, encode its **unique character set** as a canonical representation (e.g., a tuple or a bitmask).
- Use a hashmap to count how many words share the same encoding.
- For each encoding that appears c times, there are c × (c - 1) / 2 possible pairs (since order of selection does not matter).

For lowercase letters, representing the unique set as a 26-bit integer is optimal and very fast.  
Iterate over the words:
- For each word, set the corresponding character bit.
- Count frequencies in a hashmap: key=bitmask, value=count.
- At the end, for each value v in hashmap:
  - number of pairs: v × (v - 1) / 2,
  - sum over all keys.

This approach is O(n × k), very fast and easy to implement.

Trade-offs:
- This sacrifices some readability/flexibility for speed, but it's ideal for this string constraint problem.


### Corner cases to consider  
- **Empty array:** Should return 0.
- **One word:** Should return 0.
- **All words distinct:** Should return 0.
- **All words identical:** Choose n × (n-1) / 2 pairs.
- **Large input:** Code must avoid O(n²).
- **Words with only one letter (e.g., "a", "a"):** Should group together.
- **Case sensitivity:** All lowercase letters (per problem); no need for upper/lower case handling.


### Solution

```python
def similarPairs(words):
    # Dictionary to store the frequency of each unique character set
    freq = {}
    for word in words:
        mask = 0
        # For each character, set its bit in the mask
        for c in word:
            mask |= 1 << (ord(c) - ord('a'))
        # Count how many times each mask has occurred
        freq[mask] = freq.get(mask, 0) + 1

    # For each group of same mask, count the number of unique pairs: c × (c-1) // 2
    ans = 0
    for count in freq.values():
        ans += count * (count - 1) // 2
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k), where n = number of words, k = average word length (since we scan each word once and compute a 26-bit integer for unique characters).
- **Space Complexity:** O(u), where u = number of unique character sets in input (max 2²⁶ = 67,108,864, but in practice much less).


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle words with uppercase and lowercase letters (case-insensitive)?
  *Hint: Normalize all letters to lowercase before encoding.*

- If the words can contain unicode or non-ASCII characters, how would you adapt the approach?
  *Hint: Use a hashable representation (sorted tuple of unique chars) instead of a 26-bit mask.*

- What if you need to support dynamic queries: add a word, remove a word, and get similar pairs efficiently?
  *Hint: Use a hash map with incremental update logic; update the pair count when inserting/removing.*

### Summary
This problem is a classic reduction to hashing for grouping identical "character sets", and then counting combinations from group sizes. The **bitmasking** pattern is highly efficient when elements map to a small, fixed alphabet (like lowercase English).  
The **hashmap counting/combinatorics** technique seen here also applies to problems involving "counting pairs/sets" based on equivalence over a transformation (e.g., anagram grouping, similar attribute grouping).

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Bit Manipulation(#bit-manipulation), Counting(#counting)

### Similar Problems
- Sort Characters By Frequency(sort-characters-by-frequency) (Medium)
- Count the Number of Consistent Strings(count-the-number-of-consistent-strings) (Easy)
- Number of Good Paths(number-of-good-paths) (Hard)