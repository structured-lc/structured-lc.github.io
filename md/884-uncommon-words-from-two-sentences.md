### Leetcode 884 (Easy): Uncommon Words from Two Sentences [Practice](https://leetcode.com/problems/uncommon-words-from-two-sentences)

### Description  
Given two sentences s₁ and s₂ (each a string of words separated by single spaces, all lowercase), an *uncommon* word is defined as a word that appears **exactly once** in one of the sentences and **does not appear** in the other sentence. Your task is to return a list of all such uncommon words. The order of the words in the returned list does not matter.

### Examples  

**Example 1:**  
Input: `s1 = "this apple is sweet", s2 = "this apple is sour"`  
Output: `["sweet", "sour"]`  
*Explanation: "sweet" occurs only in s1, and "sour" occurs only in s2. All other words appear in both, so they aren't uncommon.*

**Example 2:**  
Input: `s1 = "apple apple", s2 = "banana"`  
Output: `["banana"]`  
*Explanation: "banana" appears once in s2 and not in s1. "apple" appears twice in s1 and isn't uncommon.*

**Example 3:**  
Input: `s1 = "a b c d"`, `s2 = "e f g a"`  
Output: `["b", "c", "d", "e", "f", "g"]`  
*Explanation: "a" appears in both and is not uncommon. All others appear once and only in one sentence each, so all of "b", "c", "d", "e", "f", "g" are uncommon.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force**: For each word in both sentences, count how many times it appears in either sentence, then for every word, check if it occurs once *overall* and only appears in one sentence.  
    - Split both sentences into word lists.
    - Use a dictionary (hashmap) to keep count for each word.
    - Go through the dictionary; for every word with count 1, add to the result.
- **Optimization**:  
    - This approach is already quite efficient due to the constraints (short sentences).
    - All that’s needed is one full pass to build counts, then another pass to filter words with count 1.
    - The trade-off is simplicity: we stick with one pass to count, then one pass to filter, using O(N) time and O(N) space, where N is the total number of words.

### Corner cases to consider  
- One or both sentences are empty strings.
- All words are shared between the sentences — output should be empty.
- Words repeat within a sentence (e.g., "apple apple").
- No word repeats across the sentences; all are unique.
- Sentences contain only one word.
- Large input strings with up to 200 characters.

### Solution

```python
def uncommonFromSentences(s1, s2):
    # Split both sentences into word lists
    words1 = s1.strip().split(' ')
    words2 = s2.strip().split(' ')
    
    # Dictionary to count occurrences of each word
    count = {}
    
    # Count words in first sentence
    for w in words1:
        if w in count:
            count[w] += 1
        else:
            count[w] = 1
            
    # Count words in second sentence
    for w in words2:
        if w in count:
            count[w] += 1
        else:
            count[w] = 1

    # Collect words that appear exactly once in total
    result = []
    for word in count:
        if count[word] == 1:
            result.append(word)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N)  
  Where N is the total number of words in s₁ and s₂. We split each sentence (O(N)), count all words (O(N)), and scan the dict (O(N)).
- **Space Complexity:** O(N)  
  Each unique word is stored in the dictionary. There are no additional data structures of significant size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify your solution if the input could include punctuation?
  *Hint: Consider cleaning/purifying tokens when splitting words.*

- How would you solve it if you cannot use extra space?
  *Hint: Think about multi-pass solutions or sorting.*

- What if the sentences are very large and do not fit in memory at once?
  *Hint: Consider streaming word counts or external storage.*

### Summary
This problem demonstrates a classic *hashmap counting* approach. This collection-and-filtering pattern is common for problems involving counting distinctive elements—especially word or character frequency. It's frequently applied in problems like finding unique/non-repeated items, majority voting, or frequency maps in text analytics.

### Tags
Hash Table(#hash-table), String(#string), Counting(#counting)

### Similar Problems
- Count Common Words With One Occurrence(count-common-words-with-one-occurrence) (Easy)