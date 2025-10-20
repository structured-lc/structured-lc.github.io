### Leetcode 1347 (Medium): Minimum Number of Steps to Make Two Strings Anagram [Practice](https://leetcode.com/problems/minimum-number-of-steps-to-make-two-strings-anagram)

### Description  
Given two equal-length strings s and t, find the **minimum number of steps** required to make t an anagram of s. 
In one step, you can **replace any character in t with another character**. The order of the characters doesn't matter, only their counts (i.e., an anagram).

### Examples  

**Example 1:**  
Input: `s = "bab", t = "aba"`  
Output: `1`  
*Explanation: Replace t ('a') with 'b' to get "bba". Now both have two 'b' and one 'a'.*

**Example 2:**  
Input: `s = "leetcode", t = "practice"`  
Output: `5`  
*Explanation: Change 5 characters in t to match the frequency of each letter in s.*

**Example 3:**  
Input: `s = "anagram", t = "mangaar"`  
Output: `0`  
*Explanation: Both already are anagrams, so no changes needed.*

### Thought Process (as if you’re the interviewee)  
First, count the frequency of each letter in both s and t. For every character, see by how much t is deficient compared to s. Sum all positive differences across all characters; this tells us the least replacements needed in t to match the count in s.

### Corner cases to consider  
- Same string (should return 0)
- No characters in common (all must change)
- Mixed case input (if constraints allow only lowercase, else need to check)
- Strings of length 1

### Solution

```python
# O(n) time, O(1) space, since we only have 26 possible letters
# For each letter, count how many times it appears in s and t; sum positive shortfalls in t.
def minSteps(s: str, t: str) -> int:
    from collections import Counter

    s_count = Counter(s)
    t_count = Counter(t)

    steps = 0
    for letter in s_count:
        # If t lacks letters compared to s, add difference
        diff = s_count[letter] - t_count.get(letter, 0)
        if diff > 0:
            steps += diff
    return steps
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n) – Each Counter takes O(n), and then O(1) for 26 letters.
- **Space Complexity:** O(1) – Only store up to 26 counts per string, not proportional to n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if very large Unicode alphabets?   
  *Hint: Use dictionary instead of array for counts.*

- Can you solve this without using extra mapping structures?   
  *Hint: Mutate an array of 26 ints seen as buckets.*

- What modifications if replacements are only allowed at certain positions?   
  *Hint: Now you must match at those places, not globally.*

### Summary
This is a frequency-difference pattern – compare character frequencies, and sum up how many changes needed. It's a classic anagram difference method, widely used in string and frequency problems.


### Flashcard
Count letter frequencies in s and t; sum positive differences where t is deficient to get minimum replacements needed.

### Tags
Hash Table(#hash-table), String(#string), Counting(#counting)

### Similar Problems
- Determine if Two Strings Are Close(determine-if-two-strings-are-close) (Medium)
- Minimum Number of Steps to Make Two Strings Anagram II(minimum-number-of-steps-to-make-two-strings-anagram-ii) (Medium)
- Minimum Operations to Make Character Frequencies Equal(minimum-operations-to-make-character-frequencies-equal) (Hard)