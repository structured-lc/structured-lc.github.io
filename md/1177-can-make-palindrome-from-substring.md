### Leetcode 1177 (Medium): Can Make Palindrome from Substring [Practice](https://leetcode.com/problems/can-make-palindrome-from-substring)

### Description  
Given a string **s** and a list of queries, where each query is an array `[left, right, k]`, determine if the substring `s[left..right]` can be rearranged and changed by replacing up to **k** letters to become a palindrome.  
A palindrome is a string that reads the same forwards and backwards.  
For each query, return `True` if the substring can be transformed into a palindrome with ≤ k replacements, otherwise return `False`.

### Examples  

**Example 1:**  
Input: `s = "abcda"`, `queries = [[0,4,1]]`  
Output: `[True]`  
*Explanation: Substring `"abcda"`. We can replace 'b' with 'd' to get "adcda", which can be rearranged to "adcda" (a palindrome), using only 1 replacement.*

**Example 2:**  
Input: `s = "abcdefg"`, `queries = [[0,6,2]]`  
Output: `[False]`  
*Explanation: `"abcdefg"` has all unique characters. You can only replace 2 of them. After two replacements, there will be more than 1 character occurring an odd number of times, so it's not possible to form a palindrome.*

**Example 3:**  
Input: `s = "abbcabb"`, `queries = [[2,5,0], [0,6,1]]`  
Output: `[True, True]`  
*Explanation:  
1st query: `"bcab"`. No replacements, but can be rearranged as "babc", which with 0 replacements can't form a palindrome. However, "bca b" → after rearrangement "ba cb", 'a' and 'c' occur odd times, can't be palindrome without replacements, so output is False.  
2nd query: `"abbcabb"`. With 1 replacement, you can turn the 'c' into a 'b' to get "abbbbb", which is a palindrome. Output is True.*


### Thought Process (as if you’re the interviewee)  
- **Brute-force approach**  
  For each query, extract the substring and count how many characters appear an odd number of times. To form a palindrome, all characters must have even counts except at most one (for the center in odd-length palindromes). We can change up to k characters, so if the number of odd-count characters divided by 2 (⌊odd_count / 2⌋) ≤ k, it's possible.

- **Optimized approach**  
  Counting character frequencies for every query is inefficient. To optimize, use **prefix sums** for character counts: For each of the 26 lowercase letters, store counts up to each index. For the substring [l, r], character counts = prefix[r+1] - prefix[l].  
  For each query, count the number of letters in the substring that have an odd count.  
  The minimum replacements needed = ⌊odd_count / 2⌋. If this value ≤ k, the answer is True.

- **Why this approach**  
  - Handles multiple queries efficiently (since brute-force would be O(26n) per query).
  - Using prefix sums reduces per-query time to O(26).

### Corner cases to consider  
- Single letter substring (should always be palindrome; 0 or 1 odd chars).
- Large values of k (can always convert to palindrome).
- Substrings with all characters the same.
- Substrings of length zero or one.
- k=0 (no replacements allowed).

### Solution

```python
def canMakePaliQueries(s, queries):
    # Build prefix sum of character counts using 26 bits for mask
    n = len(s)
    prefix = [0] * (n + 1)
    for i in range(n):
        # XOR flips the bit for the current character
        prefix[i+1] = prefix[i] ^ (1 << (ord(s[i]) - ord('a')))

    res = []
    for left, right, k in queries:
        # mask of the substring
        mask = prefix[right + 1] ^ prefix[left]
        # Count how many bits are set (= chars with odd count)
        odd_count = bin(mask).count('1')
        # Minimum required replacements: ⌊odd_count / 2⌋
        need = odd_count // 2
        res.append(need <= k)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Preprocessing the prefix array: O(n)
  - Each query: O(1) (since counting bits in a 26-bit integer is constant time)
  - Total: O(n + q), where n = length of s, q = number of queries
- **Space Complexity:**  
  - O(n) for prefix array

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string contains uppercase or non-English letters?  
  *Hint: How would you generalize the mapping and mask?*

- Can you solve if replacements are not allowed (k=0), but want to count palindromic substrings over many queries?  
  *Hint: Palindrome substring checks relates to Manacher's algorithm or hashing.*

- What if the string and queries are very large? How would you optimize space?  
  *Hint: Bitmasking uses less space than full frequency arrays; can you do better with sparse encoding?*

### Summary
This problem applies a classic "prefix sum" and "bitmask" technique, enabling quick range queries on substring character parities. It’s a common interview pattern for segment queries and is efficient for large numbers of queries. The bitmask representation for odd/even counts is especially powerful for problems focused on character frequency parity and can be reused for palindrome-related queries.


### Flashcard
For each query, count odd-frequency chars in substring; if ⌊odd_count/2⌋ ≤ k, palindrome is possible.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Bit Manipulation(#bit-manipulation), Prefix Sum(#prefix-sum)

### Similar Problems
- Plates Between Candles(plates-between-candles) (Medium)
- Maximize the Number of Partitions After Operations(maximize-the-number-of-partitions-after-operations) (Hard)