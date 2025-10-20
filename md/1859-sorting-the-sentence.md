### Leetcode 1859 (Easy): Sorting the Sentence [Practice](https://leetcode.com/problems/sorting-the-sentence)

### Description  
Given a string where each word has a number at the end indicating its position (1-based) in the original sentence, reconstruct the original sentence.  
For example, the jumbled sentence `"is2 sentence4 This1 a3"` should be restored to `"This is a sentence"`.  
Each word contains only letters and a single digit from 1–9 at the end (max 9 words). There are no leading/trailing spaces, and words are single-space separated.

### Examples  

**Example 1:**  
Input: `is2 sentence4 This1 a3`  
Output: `This is a sentence`  
*Explanation: Each word's trailing digit tells its position. "This1"→pos 1, "is2"→pos 2, "a3"→pos 3, "sentence4"→pos 4. After sorting: "This is a sentence".*

**Example 2:**  
Input: `Myself2 Me1 I4 and3`  
Output: `Me Myself and I`  
*Explanation: "Me1"→pos 1, "Myself2"→pos 2, "and3"→pos 3, "I4"→pos 4. Sorted: "Me Myself and I".*

**Example 3:**  
Input: `world2 Hello1`  
Output: `Hello world`  
*Explanation: "Hello1"→pos 1, "world2"→pos 2. Sorted: "Hello world".*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Parse each word for its position digit, then place words in their sorted positions in a new array. Concatenate them at the end.
- Since the number of words is small (max 9), even a simple linear scan or sort would work.
- Each word can be split into the actual word (excluding last char) and its position (last char, to int, then subtract 1 for 0-based indexing).
- Build an array of the same size as number of words, where each word sits at its intended index.
- After filling, join with spaces.

**Why this approach?**  
- No unnecessary sorting, just linear O(n) scan is sufficient.
- This is simple, readable, and efficient for the tight constraints.

### Corner cases to consider  
- Input with only one word, e.g., `word1` → output: `word`
- All words already in correct order (trailing digits match position).
- Words out of order (worst scramble).
- Input of minimum or maximum allowed length.
- Repeated word roots but different positions, e.g. `foo2 foo1`.
- No leading or trailing spaces (guaranteed by constraints).

### Solution

```python
def sortSentence(s):
    # Split the input into a list of words
    words = s.split()
    # Prepare a result list of same size
    result = [None] * len(words)
    # Place each word (minus digit) into its correct spot
    for word in words:
        pos = int(word[-1]) - 1  # trailing digit to index
        result[pos] = word[:-1]  # remove the position digit
    # Join and return the reconstructed sentence
    return " ".join(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  (n = number of words). Each word is processed once. No nested loops or sorting.
- **Space Complexity:** O(n)  
  We store a results list one slot per input word; extra space proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve this if the index is not always the last character, but could be anywhere in the word?  
  *Hint: Look for the digit inside each word—how do you extract and separate it?*

- How would you handle the case if there could be more than 9 words, and thus the position numbers could have 2+ digits?  
  *Hint: Positions could be multi-digit trailing numbers—think about how to parse/join correctly.*

- What would you do if the words are separated by multiple spaces, or there are leading/trailing spaces?  
  *Hint: Carefully clean input and output formatting, maybe use regex for robust splitting.*

### Summary
The problem is a classic token parsing and order reconstruction task. The common coding pattern is mapping data (words) to their correct order by indices; it’s a flavor of bucket sort. Similar ideas apply in problems involving tagged data, “restore order” problems, and parse-and-place interview questions. The key: split, extract index, place, and join.


### Flashcard
Parse words for their position digits and sort them accordingly.

### Tags
String(#string), Sorting(#sorting)

### Similar Problems
- Check if Numbers Are Ascending in a Sentence(check-if-numbers-are-ascending-in-a-sentence) (Easy)