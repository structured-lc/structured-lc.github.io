### Leetcode 266 (Easy): Palindrome Permutation [Practice](https://leetcode.com/problems/palindrome-permutation)

### Description  
Given a string, determine if some permutation of the string can form a palindrome.  
A palindrome is a word that reads the same forwards and backwards (e.g., "abba" or "racecar").  
For a word to be rearranged into a palindrome, it must satisfy these conditions:
- Every character must appear an even number of times, except at most one character (which, for odd-length palindromes, will be in the center) [1][5].  
- Return `True` if at least one palindrome permutation exists; otherwise, return `False`.


### Examples  

**Example 1:**  
Input: `"code"`,  
Output: `False`  
*Explanation: Each character appears once (c:1, o:1, d:1, e:1). There are four odd counts; cannot form a palindrome.*

**Example 2:**  
Input: `"aab"`,  
Output: `True`  
*Explanation: 'a' appears twice (even), 'b' once (odd). Can rearrange to "aba".*

**Example 3:**  
Input: `"carerac"`,  
Output: `True`  
*Explanation: c:2, a:2, r:2, e:1. Only 'e' has an odd count; possible arrangement: "racecar".*


### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  Try generating all permutations of the string and check if any is a palindrome. This is clearly inefficient (factorial time), and not feasible for long strings.

- **Optimized approach:**  
  Instead, check the frequency of each character:
  - A palindrome mirrors around the center; so, for even-length strings, all characters must occur an even number of times.
  - For odd-length, exactly one character may appear an odd number of times (center character); all others must appear an even number of times.
  - So, count occurrences for each character, then count how many have odd frequencies.
  - If the number of odd-count characters is at most 1, return `True`. Otherwise, return `False` [1][2][5].

- **Why use this approach?**  
  It's a direct application of palindrome permutation theory, and this check is linear in the string length.


### Corner cases to consider  
- An empty string (should be considered a palindrome permutation)
- A string of all identical characters (e.g., "aaaa")
- A string with one character (e.g., "a")
- Strings where more than one character has odd frequency
- Very long input strings


### Solution

```python
def canPermutePalindrome(s):
    # Build a hash map (dictionary) counting character occurrences
    freq = {}
    for char in s:
        freq[char] = freq.get(char, 0) + 1

    # Count how many characters have an odd count
    odd_count = 0
    for count in freq.values():
        if count % 2 == 1:
            odd_count += 1

    # A palindrome permutation must have at most one odd-count character
    return odd_count <= 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(s), since we scan the string once and the frequency dictionary once.
- **Space Complexity:** O(1) if character set is fixed (e.g., lowercase English), otherwise O(k) where k is the number of unique characters.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the input contains Unicode or non-ASCII characters?  
  *Hint: Consider hash maps and character encoding.*

- How would you modify the solution to return an actual palindrome permutation, instead of just a boolean?  
  *Hint: Use half of each even-count character, then mirror and insert the odd-count char in the middle.*

- How do you solve this if we had a stream of letters rather than a string?  
  *Hint: Can maintain just a parity set (add/remove chars when seen odd/even).*

### Summary
This problem uses the **hash table / frequency counting pattern**: map each character to its count and check a condition derived from palindrome properties.  
This frequency-counting then odd-count-test is common for permutation and anagram related problems, and variants appear in questions involving rearrangements, palindromic substrings, and character pairings.


### Flashcard
Palindrome Permutation

### Tags
Hash Table(#hash-table), String(#string), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Longest Palindromic Substring(longest-palindromic-substring) (Medium)
- Valid Anagram(valid-anagram) (Easy)
- Palindrome Permutation II(palindrome-permutation-ii) (Medium)
- Longest Palindrome(longest-palindrome) (Easy)