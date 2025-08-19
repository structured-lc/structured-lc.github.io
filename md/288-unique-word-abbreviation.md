### Leetcode 288 (Medium): Unique Word Abbreviation [Practice](https://leetcode.com/problems/unique-word-abbreviation)

### Description  
Given a dictionary of words, design a class that allows you to check if a given word’s abbreviation is unique in that dictionary.

The abbreviation format:
- For words longer than 2, it’s the first letter + the count of characters between the first and last + the last letter (e.g., "dog" → "d1g", "internationalization" → "i18n").
- For words of length ≤2, the abbreviation is the word itself.

A word’s abbreviation is unique if no other word in the dictionary shares that abbreviation, or if the only dictionary word sharing the abbreviation is the word itself.

You must support:
- Initialization with a word list (the dictionary).
- A method, isUnique(word), to check this uniqueness property efficiently.

### Examples  

**Example 1:**  
Input:  
dictionary = `["deer", "door", "cake", "card"]`  
isUnique("dear")  
Output: `False`  
*Explanation: "dear" → "d2r". Both "deer" and "door" are also "d2r" but not the same word, so "dear" is not unique.*

**Example 2:**  
Input:  
dictionary = `["deer", "door", "cake", "card"]`  
isUnique("cart")  
Output: `True`  
*Explanation: "cart" → "c2t". No other word in the dictionary shares this abbreviation, so it's unique.*

**Example 3:**  
Input:  
dictionary = `["deer", "door", "cake", "card"]`  
isUnique("cane")  
Output: `False`  
*Explanation: "cane" → "c2e". Both "cake" and "card" have different abbreviations, but if "cake" and "cane" both existed, "cane" would not be unique.*

### Thought Process (as if you’re the interviewee)  
First, I’d clarify the rules for abbreviation and uniqueness.  
A brute-force solution would check every word in the dictionary every time isUnique is called, but this would be too slow.

To optimize, I would preprocess the dictionary during initialization, generating a mapping from each abbreviation to all words sharing it (e.g., using a hashmap: abbr → set of words).  
- When isUnique(word) is called, I would:
  - Generate the word’s abbreviation.
  - If no dictionary word shares this abbreviation, return True.
  - If only the word itself is in the set, return True.
  - Otherwise, return False.

This way, initialization is O(nw) (n = word count, w = word length for abbreviation), and each uniqueness check is O(1).

### Corner cases to consider  
- Repeated words in the original dictionary (should not affect uniqueness)
- Words of length 1 or 2 (abbreviation is the word itself)
- Checking isUnique for a word not in the original dictionary
- Abbreviations shared by multiple distinct words
- Empty dictionary
- Dictionary contains all possible abbreviations for a word (worst case)

### Solution

```python
class ValidWordAbbr:
    def __init__(self, dictionary):
        # Preprocess: map abbreviation to set of original words
        self.abbr_dict = {}
        for word in set(dictionary):  # Remove duplicates
            abbr = self.abbreviate(word)
            if abbr not in self.abbr_dict:
                self.abbr_dict[abbr] = set()
            self.abbr_dict[abbr].add(word)

    def abbreviate(self, word):
        if len(word) <= 2:
            return word
        return word[0] + str(len(word)-2) + word[-1]

    def isUnique(self, word):
        abbr = self.abbreviate(word)
        if abbr not in self.abbr_dict:
            return True
        # Uniqueness: abbr only maps back to the same word (possibly repeated)
        word_set = self.abbr_dict[abbr]
        return word_set == {word}
```

### Time and Space complexity Analysis  

- **Time Complexity:**
  - Initialization: O(n × w), where n is the number of dictionary words, and w is the average word length (for abbreviation-building).
  - isUnique: O(1), as it performs only hash lookups and set comparisons.

- **Space Complexity:**
  - O(n × w) for the mapping of abbreviations to sets of words — potentially each word gets its own set.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle large dictionaries, where abbreviations may become less unique?
  *Hint: Try optimizing space by only tracking uniqueness or collisions, instead of full sets.*

- Can you design the structure to support online updates (adding/removing dictionary words) efficiently?
  *Hint: Consider efficient insert/delete support in your mapping.*

- What if abbreviations must meet custom requirements (e.g., minimum number of inner characters, alternate formats)?
  *Hint: Make the abbreviation-generation logic modular and configurable.*

### Summary
This problem is a classic use of the **hashmap (dictionary) pattern** to preprocess and quickly look up the uniqueness property. Storing an abbreviation-to-set-of-words mapping leads to constant-time queries after an initial preprocessing step, balancing time and space. Similar patterns apply in problems with word lookups, grouping by signature (e.g., anagrams), and prefix/suffix matching.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Design(#design)

### Similar Problems
- Two Sum III - Data structure design(two-sum-iii-data-structure-design) (Easy)
- Generalized Abbreviation(generalized-abbreviation) (Medium)