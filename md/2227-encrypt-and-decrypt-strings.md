### Leetcode 2227 (Hard): Encrypt and Decrypt Strings [Practice](https://leetcode.com/problems/encrypt-and-decrypt-strings)

### Description  
You are asked to design a data structure to **encrypt and decrypt strings** using given mappings:

- You are provided three arrays:
  - **keys**: a list of unique characters.
  - **values**: a list of encrypted string representations (each a string of length 2), where values[i] corresponds to keys[i].
  - **dictionary**: a list of valid words (strings) that are allowed as possible original strings (after decryption).

**Encryption**:  
For a given string, replace each character with its mapped 2-letter encrypted value. If a character does not have an entry in keys, you must return an empty string.

**Decryption**:  
Given an encrypted string (a sequence of 2-letter substrings), you need to return the **number of dictionary words** that could have generated this encrypted string. Multiple keys may map to the same value, so there could be multiple possible decodings.

You are to implement an `Encrypter` class with:
- `encrypt(word1: str) -> str`
- `decrypt(word2: str) -> int`  
where encrypt returns the encrypted form or empty string, and decrypt returns the count of dictionary words that map to the encrypted input.

---

### Examples  

**Example 1:**  
Input:  
keys = ['a','b','c','d']  
values = ['ei','zf','ei','am']  
dictionary = ['abcd','acbd','adbc','badc','dacb','cadb','cbda','abad']  
Encrypter(keys, values, dictionary)  
encrypt('abcd')  
decrypt('eizfeiam')

Output:  
encrypt = 'eizfeiam'  
decrypt = 2  
*Explanation:  
- 'a' → 'ei', 'b' → 'zf', 'c' → 'ei', 'd' → 'am' ⇒ "eizfeiam"  
- "eizfeiam" could correspond to 'abcd' and 'acbd' from dictionary.*  

**Example 2:**  
Input:  
encrypt('badc')  
decrypt('eiamzfam')

Output:  
encrypt = 'eiamzfam'  
decrypt = 0  
*Explanation:  
- 'b' → 'zf', 'a' → 'ei', 'd' → 'am', 'c' → 'ei' ⇒ "zfeiam'ei"  
- No dictionary word encrypts to this string, so decrypt returns 0.*  

**Example 3:**  
Input:  
encrypt('abcdx')  
Output:  
encrypt = ''  
*Explanation:  
- 'x' is not in keys, so encryption fails and '' is returned.*  

---

### Thought Process (as if you’re the interviewee)  
First, let's clarify the requirements:
- **Encryption** is straightforward: map each character in the word to its encrypted value, otherwise return empty string if any character is unmapped.
- **Decryption** is more complex: the same encrypted substring (of length 2) may map to multiple possible keys, so for a single encrypted string there could be many valid original strings from the dictionary.

**Brute-force Approach**:
- For decryption: Try *all* possible dictionary words, encrypt them, and see if any match the encrypted string. But this is inefficient, especially if called many times.

**Optimization Idea**:
- Encrypt every dictionary word at construction, make a frequency map from encrypted string to count of dictionary words.
- For `decrypt(word2)`, just look up this map.
- This is efficient, since the number of dictionary words is small and may be preprocessed.

**Why does this work?**
- Since the only valid decrypted words must be in the dictionary, we avoid dealing with combinatorial decoding.
- Tradeoff: Slightly more memory usage (due to the hashmap), but fast O(1) decryption lookups.

---

### Corner cases to consider  
- Input string for encryption has character(s) not in keys – must return empty string.
- Decrypting an encrypted string with no valid dictionary matches – returns 0.
- Values array maps multiple keys to the same value – must allow for this in decryption.
- Empty dictionary – decrypt must always return 0.
- Empty string to encrypt (should be allowed, returns '').
- Case-sensitive matching (input/output).
- Dictionary containing duplicate words (should not affect encryption/decryption count).

---

### Solution

```python
class Encrypter:
    def __init__(self, keys, values, dictionary):
        # Map from character to its encrypted value
        self.k_to_v = {k: v for k, v in zip(keys, values)}
        
        # To speed up decryption, map encrypted string to number of dictionary matches
        # Precompute: For every dictionary word, encrypt it (if possible)
        self.enc_dict_count = {}
        for word in dictionary:
            encrypted = self.encrypt(word)
            if encrypted:
                self.enc_dict_count[encrypted] = self.enc_dict_count.get(encrypted, 0) + 1

    def encrypt(self, word1):
        # Encrypt word: if any char is not in map, return ""
        res = []
        for c in word1:
            if c not in self.k_to_v:
                return ""
            res.append(self.k_to_v[c])
        return "".join(res)

    def decrypt(self, word2):
        # Output count of dictionary words that encrypt to word2
        return self.enc_dict_count.get(word2, 0)
```

---

### Time and Space complexity Analysis  

- **Time Complexity:**
  - **Constructor:** O(D × L) where D is number of words in dictionary, L is average word length (since each word is encrypted once).
  - **encrypt(word1):** O(N), N = len(word1).
  - **decrypt(word2):** O(1), since it’s just a hashmap lookup.

- **Space Complexity:**
  - O(D × L): for storing all precomputed encrypted forms (worst-case, every word is unique).
  - O(K): for maps (K = size of keys).
  - Negligible additional space per call.

---

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if the dictionary was modified frequently at runtime?  
  *Hint: Optimize for incremental dictionary updates, can’t precompute everything.*

- What if you had to return actual decrypted words, not just their count?  
  *Hint: Need to store sets of words for each encrypted string.*

- How would you handle a very large keys/values mapping with billions of possible encrypted strings?  
  *Hint: Discuss Trie-based approaches, streaming decryption, or memory optimizations.*

---

### Summary
This problem uses the **preprocessing with hashmap** pattern to trade one-off preprocessing costs for ultra-fast queries.  
It's common in problems where potential queries are numerous but originate from a bounded set (like a dictionary).  
Similar techniques are useful in **dictionary encoding**, **password management**, or any scenario where reverse-mapping from an obfuscated representation is required and the "search space" is limited by a fixed list.