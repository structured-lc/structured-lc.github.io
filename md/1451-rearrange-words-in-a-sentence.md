### Leetcode 1451 (Medium): Rearrange Words in a Sentence [Practice](https://leetcode.com/problems/rearrange-words-in-a-sentence)

### Description  
You are given a sentence as a string, where the **first letter is uppercase** and the rest is lower or mixed. Each word is separated by a single space. Rearrange the sentence so that **words are ordered by increasing length** while preserving the order of words of the same length. The final sentence should retain the formatting: the first letter is capitalized and the rest are lowercase (except for words that originally had uppercase letters after the first word).

### Examples  

**Example 1:**  
Input: `Leetcode is cool`  
Output: `Is cool leetcode`  
*Explanation: Words split: ["Leetcode","is","cool"]. Lowercase: ["leetcode","is","cool"]. Sort by length: ["is","cool","leetcode"]. Re-capitalize first word: "Is".*

**Example 2:**  
Input: `Keep calm and code on`  
Output: `On and keep calm code`  
*Explanation: Split: ["Keep","calm","and","code","on"] ⇒ lowercase: ["keep","calm","and","code","on"]. Sorted: ["on","and","keep","calm","code"]. Re-capitalize: "On and keep calm code".*

**Example 3:**  
Input: `To be or not to be`  
Output: `To be or to be not`  
*Explanation: Split: ["To","be","or","not","to","be"] ⇒ lowercase: ["to","be","or","not","to","be"]. Sorted: ["to","be","or","to","be","not"].*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  - Split the sentence into words.
  - Lowercase the first word so sorting isn’t impacted by capitalization.
  - Sort words by length. Python’s sort is stable, so equal-length words keep their input order.
  - After sorting, capitalize the first character of the resulting sentence, leaving the rest lowercase (unless the original word was uppercase internally).
- **Optimizations:**  
  - Sorting by length with stable sort is sufficient; no need for complex data structures.  
- **Trade-offs:**  
  - Sorting is O(n log n) and stable, which retains order for equally-sized words—this matches constraints.

### Corner cases to consider  
- Input is a single word.
- All words of equal length.
- Input already sorted by word lengths.
- Words with punctuation (if allowed by problem).
- Words with internal uppercase letters (preserve except first word, per spec).
- Empty string (likely disallowed by constraints).

### Solution

```python
def arrangeWords(text: str) -> str:
    # Split input into list of words
    words = text.split()
    # Lowercase first word for consistent sorting
    words[0] = words[0].lower()
    # Sort words by length (stable sort preserves order for equal lengths)
    words.sort(key=len)
    # Capitalize first word in the result
    words[0] = words[0].capitalize()
    # Join words into a sentence
    return ' '.join(words)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n is the number of words. Splitting and joining words is O(n), sorting dominates.
- **Space Complexity:** O(n). Extra space for the list of words and storing the sorted result.

### Potential follow-up questions (as if you’re the interviewer)  

- What if sorting must be done in-place with O(1) extra space?
  *Hint: Consider if list modification in-place is allowed in Python (it is, but in-place sorting still allocates some memory for sorting algorithms in general).*

- How would you modify your solution if words could have leading or trailing punctuation?  
  *Hint: Preprocess each word to handle punctuation, possibly using regex.*

- If input can be extremely long (gigabytes), how could you handle this?  
  *Hint: Use streaming/iterative approaches—process chunks instead of holding all words in memory.*

### Summary  
This problem is a classic **sorting by custom key** with formatting/cleanup constraints: split string to words, make a stable sort on word length, and reconstruct the string with formatting. The pattern is widely used for tasks like sentence normalization, text formatting, and stable sorts for “bucket/group by” categories. The critical insight is Python’s stable sort and simple string manipulation.


### Flashcard
Split sentence into words, sort by length (stable sort), then join and capitalize the first letter for the result.

### Tags
String(#string), Sorting(#sorting)

### Similar Problems
