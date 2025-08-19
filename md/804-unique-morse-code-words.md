### Leetcode 804 (Easy): Unique Morse Code Words [Practice](https://leetcode.com/problems/unique-morse-code-words)

### Description  
Given a list of lowercase English words, the goal is to determine how many **unique Morse code representations** can be formed from these words.  
Each letter is mapped to a fixed Morse code string (e.g., 'a' = ".-", 'b' = "-...", ..., 'z' = "--..").  
For each word, replace each character with its Morse code equivalent, concatenate them for the word's Morse transformation, and count how many different Morse "words" exist in the list.

### Examples  

**Example 1:**  
Input: `["gin", "zen", "gig", "msg"]`  
Output: `2`  
*Explanation:*
- "gin" → "--...-."
- "zen" → "--...-."
- "gig" → "--...--."
- "msg" → "--...--."
There are 2 unique representations: "--...-." and "--...--."

**Example 2:**  
Input: `["a"]`  
Output: `1`  
*Explanation:*
- "a" → ".-"
Only one unique transformation.

**Example 3:**  
Input: `["no", "on"]`  
Output: `2`  
*Explanation:*
- "no" → "-.---"
- "on" → "---.-"
The two words produce different Morse transformations.

### Thought Process (as if you’re the interviewee)  
I’d start by mapping each of the 26 lowercase English letters to their Morse code representations using a list. For each word, I’d construct its Morse transformation by replacing each character with its Morse code, then concatenate all characters' transformations. To determine uniqueness, I would store all transformations in a set (which guarantees all entries are unique). The answer would be the size of this set.

Initial brute-force (slower) idea:  
- For each word, convert it, store transformations in a list.
- After processing, check for uniqueness with either set conversion or manual comparison.

Optimized and clearer:  
- As we generate each transformation, insert it into a set right away. Sets are fast for this and save space.
- This approach is efficient because each word has length up to 12, and at most 100 words, so the operation count is manageable.

No complex data structures or algorithms are needed since both the data and output spaces are small.

### Corner cases to consider  
- Empty input list (`[]`).
- Words with one letter.
- Words that are Morse-anagrams (different words, same Morse conversion).
- All words are identical.
- No overlapping Morse transformations (every word is unique).
- Max input sizes (to test performance, though not crucial due to problem constraints).

### Solution

```python
def uniqueMorseRepresentations(words):
    # Morse code for 'a' to 'z'
    morse_codes = [
        ".-","-...","-.-.","-..",".","..-.","--.","....",
        "..",".---","-.-",".-..","--","-.","---",".--.",
        "--.-",".-.","...","-","..-","...-",".--","-..-",
        "-.--","--.."
    ]

    # Store unique word transformations
    unique_transformations = set()

    for word in words:
        # Build Morse code for the word
        transformation = ""
        for ch in word:
            idx = ord(ch) - ord('a')  # Find position in alphabet
            transformation += morse_codes[idx]
        unique_transformations.add(transformation)

    # Number of unique transformations
    return len(unique_transformations)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(N \* L), where N is the number of words, and L is the average length of each word.  
  - For each word (N), we process each letter (L): `words` can be up to 100 words and each up to 12 characters.

- **Space Complexity:**  
  O(N \* L) for storing up to N unique transformations, each up to L \* max Morse char length.  
  - The Morse mapping uses O(1) space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input could contain upper and lowercase letters?
  *Hint: Consider normalizing all input to lowercase or extending your Morse code map.*

- How would you adapt this for streaming input, where you don’t know all words in advance?
  *Hint: Store the set of seen Morse codes and update as each word comes in.*

- Could Morse code collisions exist for longer phrases or other alphabet encodings?
  *Hint: Morse for the standard alphabet is unambiguous per letter, but for other alphabets or lack of word separation, there could be ambiguity.*

### Summary
This problem is a classic **hash set / unique transformations by mapping** pattern, where you convert each input into a new "form" based on a fixed mapping for deduplication.  
The set ensures quick lookups and uniqueness. This approach is common in problems where you need to count the number of unique outputs after applying a transformation or normalization to each input.

### Tags
Array(#array), Hash Table(#hash-table), String(#string)

### Similar Problems
