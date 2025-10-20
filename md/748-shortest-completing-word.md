### Leetcode 748 (Easy): Shortest Completing Word [Practice](https://leetcode.com/problems/shortest-completing-word)

### Description  
Given a string `licensePlate` and an array of strings `words`, find the shortest word in `words` that contains all the letters in `licensePlate` (ignoring numbers and spaces, and treating letters as case-insensitive). Each letter must appear at least as many times in the word as it does in `licensePlate`. If there are multiple possible shortest completing words, return the one that appears first in `words`. It is guaranteed that at least one answer exists.

### Examples  

**Example 1:**  
Input:  
``licensePlate = "1s3 PSt"``, ``words = ["step", "steps", "stripe", "stepple"]``  
Output:  
``"steps"``  
Explanation:  
Cleaned license plate letters: "s", "p", "s", "t".  
"steps" is the shortest word in the list that contains at least two 's', one 'p', and one 't'.  
"step" fails because it only has one 's'.

**Example 2:**  
Input:  
``licensePlate = "1s3 456"``, ``words = ["looks", "pest", "stew", "show"]``  
Output:  
``"pest"``  
Explanation:  
Letters to match: "s".  
Both "pest" and "stew" contain "s", but "pest" comes first and is shortest.

**Example 3:**  
Input:  
``licensePlate = "GrC8950"``, ``words = ["measure","other","every","base","according","level","meeting","none","marriage","rest"]``  
Output:   
``"measure"``  
Explanation:  
Letters to match: "g", "r", "c".  
"measure" is the shortest word that contains all those letters (case-insensitive).

### Thought Process (as if you’re the interviewee)  
First, I would extract the letter counts from the license plate, ignoring non-letters and ignoring case. Then, for each word in `words`, I would count the frequency of each letter.  
To validate a word, I would check if it contains at least as many of each required letter as necessary.  
Keep track of the shortest valid word as we iterate.  
This is brute force, but since word counts are usually limited and word lengths are short (26 letters max), it's reasonable for this use case.

To optimize:  
- Early exit if the current word cannot possibly be the shortest.
- Only compare a word's letter counts up against the needed license plate counts.

### Corner cases to consider  
- Letters in license plate appear multiple times (e.g., licensePlate="PP", words=["pair","supper"]).
- License plate contains only numbers and spaces.
- Capital and lowercase letters should be treated the same.
- Multiple words qualify, need to return the first one in the list.
- Very short word list (one word).
- All words are longer than the minimum required but only one matches exactly.

### Solution

```python
def shortestCompletingWord(licensePlate, words):
    # Helper to count letter frequencies in a string
    def letter_count(s):
        counts = [0] * 26  # 26 lowercase letters
        for ch in s:
            if ch.isalpha():
                counts[ord(ch.lower()) - ord('a')] += 1
        return counts

    # Frequency count needed from licensePlate
    required = letter_count(licensePlate)

    result = None
    min_len = float('inf')

    # For each word, if it fulfills requirements, and is shortest so far, store it
    for word in words:
        wcount = letter_count(word)
        match = True
        for i in range(26):
            if wcount[i] < required[i]:
                match = False
                break
        if match and len(word) < min_len:
            result = word
            min_len = len(word)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N × S), where N is the number of words and S is the maximum length of any word. This is because for each word, we count its letters (O(S)), and compare against the target (constant 26).
- **Space Complexity:** O(1) extra (since letter frequency arrays are always length 26, and not proportional to input), plus storage for the input itself.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you change your solution if the list of words was extremely large (e.g., millions of words)?
  *Hint: Consider preprocessing, indexing, or early pruning.*
- Could you handle Unicode letters, including accented and non-English characters?
  *Hint: What counts as a letter now? Would your array size need to grow?*
- How would you adapt this for real-time streaming input, where new words arrive one at a time?
  *Hint: Maintain shortest-matching candidate on the fly.*

### Summary
This problem uses the **letter frequency counting** technique, a variant of the counting pattern. It's a common problem-solving approach for anagram and subword-contains-type questions.  
This pattern is frequently used in:  
- Checking if one word/phrase can be formed by another (ransom note)
- Permutation or anagram detection
- Scrabble/word-game validation or puzzle-solving  
It is efficient due to bounded alphabet size and scales well for moderate word lists.


### Flashcard
Count letter frequencies in license plate (ignore non-letters/case); check each word has sufficient counts, return shortest valid word.

### Tags
Array(#array), Hash Table(#hash-table), String(#string)

### Similar Problems
