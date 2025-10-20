### Leetcode 2744 (Easy): Find Maximum Number of String Pairs [Practice](https://leetcode.com/problems/find-maximum-number-of-string-pairs)

### Description  
Given an array of strings, count the maximum number of pairs (i, j) such that 0 ≤ i < j < n and one string is the reverse of the other. Each string can only be used in at most one pair. For example, if "ab" and "ba" are present, they make one pair; after pairing, both cannot be reused for other matches.

### Examples  

**Example 1:**  
Input: `["cd","ac","dc","ca","zz"]`  
Output: `2`  
Explanation:  
- "cd" and "dc" form a pair (since "dc" is the reverse of "cd").  
- "ac" and "ca" form a pair.  
- "zz" is left unmatched.

**Example 2:**  
Input: `["ab","ba","cc"]`  
Output: `1`  
Explanation:  
- "ab" and "ba" can be paired, "cc" unused.

**Example 3:**  
Input: `["aa","ab"]`  
Output: `0`  
Explanation:  
- "aa" reversed is "aa", but there's only one occurrence, so it can't be paired. "ab" has no reversed match.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  I could check all pairs, for each word look for every other word that is its reverse. But that's O(n²), which could be slow for large n.

- **Optimized approach:**  
  Instead, I'll use a set to remember all the words I've seen so far that haven't been paired. For each word in the list:
  - Check if its reverse is in the set.  
  - If yes, I've formed a pair; remove the reverse from the set—since both are now used.
  - If not, add this word to the set.
  - This way, every string is used in at most one pair.

- **Why this trade-off works:**  
  We're only storing unpaired words, looping through the list once—so time and space are much better than brute-force.

### Corner cases to consider  
- Empty array: should return 0.
- No possible pairs: e.g. all strings are unique and not reverses.
- Self-palindromes: e.g. "aa" only counts as a pair if there are two "aa".
- All words have reverses: e.g. ["ab", "ba", "cd", "dc"] → two pairs.

### Solution

```python
def maximumNumberOfStringPairs(words):
    # Set to store unpaired words
    unpaired = set()
    pairs = 0

    for word in words:
        rev = word[::-1]  # reverse the string
        if rev in unpaired:
            pairs += 1
            unpaired.remove(rev)  # Remove matched reverse to prevent reuse
        else:
            unpaired.add(word)  # No match, store for later
    return pairs
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of words.  
  We iterate over the list once; each set operation is O(1) (average).
- **Space Complexity:** O(n) in the worst case (if there’s no pairing at all), but for this problem (words of constrained length), space may be considered O(1) since the total number of possible words of 2 letters is small.

### Potential follow-up questions (as if you’re the interviewer)  

- What if strings can be longer than 2 letters (not just length-2)?
  *Hint: Does your logic need change for arbitrary-length strings?*

- What if you want to return the actual pairs, not just the count?
  *Hint: You’ll need to store indices or words forming pairs.*

- What if the strings are not guaranteed to be unique?
  *Hint: How would you track and pair up multiple occurrences?*

### Summary
In this problem, a **hash set** enables efficient pairing with only O(n) time and space. This is a classic example of the hashing/caching pattern, often seen when we need to quickly find complementary or matching items (e.g., Two Sum, matching parentheses). The approach demonstrates efficient use of lookup structures and pair-matching without double-counting or skipping candidates.


### Flashcard
Use a set to track unpaired words; for each word, check if its reverse is in the set to form a pair.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Simulation(#simulation)

### Similar Problems
- Group Shifted Strings(group-shifted-strings) (Medium)
- Palindrome Pairs(palindrome-pairs) (Hard)