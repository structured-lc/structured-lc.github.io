### Leetcode 824 (Easy): Goat Latin [Practice](https://leetcode.com/problems/goat-latin)

### Description  
Given a sentence containing words composed only of English letters (uppercase or lowercase), transform it to Goat Latin using these rules:
- If a word starts with a **vowel** (a, e, i, o, u — case-insensitive), append "ma" to the word.
- If a word starts with a **consonant**, remove the first letter, append it to the end, and then add "ma".
- Add 'a' to the end of each word according to its position: the first word gets "a", the second "aa", the third "aaa", etc.

### Examples  

**Example 1:**  
Input: `"I speak Goat Latin"`  
Output: `"Imaa peaksmaaa oatGmaaaa atinLmaaaaa"`  
*Explanation:*
- 1st word, "I", starts with vowel → I + ma + a = "Imaa"
- 2nd word, "speak", starts with consonant → "peak" + "s" + ma + aa = "peaksmaaa"
- 3rd word, "Goat", starts with consonant → "oat" + "G" + ma + aaa = "oatGmaaaa"
- 4th word, "Latin", starts with consonant → "atin" + "L" + ma + aaaa = "atinLmaaaaa"

**Example 2:**  
Input: `"Apple is awesome"`  
Output: `"Applemaa ismaaa awesomemaaaa"`  
*Explanation:*
- All words start with vowels, so just append "ma" and a corresponding number of 'a's to each word.

**Example 3:**  
Input: `"The quick brown fox"`  
Output: `"heTmaa uickqmaaa rownbmaaaa oxfmaaaaa"`  
*Explanation:*
- Transform each word as per the rules, shifting consonants, appending "ma" and a's based on word indices.

### Thought Process (as if you’re the interviewee)  
First, I’d split the input string into words with `.split(" ")`. Then, I’d process each word according to its position:
- Check if it starts with a vowel (handle both cases).
- If yes, leave it as-is, add "ma".
- If not, move the first letter to the end and then append "ma".
- Add 'a' multiplied by the word's 1-based index as a suffix.
This can be efficiently done in one pass over the list of words. Enumerate is helpful to keep track of the word’s position.

Optimizations aren’t really needed since each word is transformed in \(O(1)\) time, so just loop and build the result.

### Corner cases to consider  
- Empty sentence – should return empty string.
- Only vowels (e.g., `"E I O U"`) – check case-insensitivity.
- Only consonants.
- One-word sentences.
- Words with uppercase leading letters.
- Multiple spaces (though statement says "separated by spaces", assume always single space between words.)

### Solution

```python
def toGoatLatin(sentence):
    # Set of vowels, both cases
    vowels = set('aeiouAEIOU')
    # Split into words
    words = sentence.split()
    # Process each word
    result = []
    for idx, word in enumerate(words):
        if word[0] in vowels:
            goat_word = word + 'ma'
        else:
            goat_word = word[1:] + word[0] + 'ma'
        # Append 'a' × (index + 1)
        goat_word += 'a' * (idx + 1)
        result.append(goat_word)
    # Combine into a sentence
    return ' '.join(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of characters in the input sentence. Each word is processed and rebuilt once.
- **Space Complexity:** O(n) for the output (since a new string is created with possibly more characters than the input).

### Potential follow-up questions (as if you’re the interviewer)  

- How would this change if you had to support punctuation and maintain original casing/punctuation?
  *Hint: Consider using regular expressions to split and reconstruct words, or check each character.*
- What if the sentence is very long (e.g., streaming input word by word)?
  *Hint: Think about generating output as you process each word without storing the entire result in memory.*
- Could you optimize for in-place processing if allowed?
  *Hint: Consider using mutable structures such as lists for reconstruction.*

### Summary
This problem uses the **string manipulation** pattern, processing each word with simple rules then recombining. It's common for interview questions involving "variants of Pig Latin" and exercises your ability to manage indexes, string slicing, and rule-based transformation. Similar techniques can be applied to sentence and word reversals, encryption transformations, and other token-by-token string problems.


### Flashcard
For each word, move the first letter to the end if not a vowel, add "ma", then append 'a' repeated by word index (1-based).

### Tags
String(#string)

### Similar Problems
