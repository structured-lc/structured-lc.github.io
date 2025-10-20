### Leetcode 1832 (Easy): Check if the Sentence Is Pangram [Practice](https://leetcode.com/problems/check-if-the-sentence-is-pangram)

### Description  
A **pangram** is a sentence where every letter of the English alphabet appears at least once. Given a string `sentence` consisting only of lowercase English letters, determine if it contains every letter from 'a' to 'z' at least once—return `True` if it does, otherwise `False`.  
In other words, you need to decide if the input string touches every letter in the alphabet at least once.


### Examples  

**Example 1:**  
Input: `sentence = "thequickbrownfoxjumpsoverthelazydog"`  
Output: `True`  
*Explanation: Every letter from 'a' to 'z' appears at least once in the sentence, so it is a pangram.*

**Example 2:**  
Input: `sentence = "leetcode"`  
Output: `False`  
*Explanation: Several letters (like 'a', 'b', ... 'z') are missing, so this is not a pangram.*

**Example 3:**  
Input: `sentence = "abcdefghijklmnopqrstuvwxyz"`  
Output: `True`  
*Explanation: The sentence contains each letter of the alphabet exactly once.*


### Thought Process (as if you’re the interviewee)  
First, my brute-force idea is to loop through each letter from 'a' to 'z' and check if it is present in the sentence. If any letter is missing, return `False`; otherwise, return `True` at the end.

But that's inefficient because, for each of the 26 letters, we would do a scan through the sentence, giving O(26 × n) time complexity, where n is the length of the sentence.

Instead, a more optimized approach is to use a set to keep track of all unique letters seen. As I scan each character in the sentence, I add it to the set. If at any point the size of the set reaches 26, I can return `True` immediately since all letters are covered. At the end, if the set’s size is less than 26, return `False`.

Alternatively, I could use a boolean array of size 26 to memorize which letters have appeared, but using a set is cleaner and directly matches the requirement. Both approaches are O(n) in time and O(1) in space since the alphabet set size is constant.

I’ll proceed with the set approach for code clarity and optimality.


### Corner cases to consider  
- Input length less than 26—impossible to be a pangram.
- Repeated letters in the input—should only count unique ones.
- The sentence contains exactly the 26 different letters.
- Input is the same letter multiple times—should return False.
- Extremely long input, but missing one letter—should still return False.
- Lowercase letters only are guaranteed per constraints (so no need to check for case handling or numbers).


### Solution

```python
def checkIfPangram(sentence: str) -> bool:
    # Set to store unique characters from the sentence
    unique_letters = set()
    # Iterate through each character in the sentence
    for ch in sentence:
        unique_letters.add(ch)
        # If we've seen all 26 letters, no need to continue
        if len(unique_letters) == 26:
            return True
    # After processing, check if all 26 letters are present
    return len(unique_letters) == 26
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the input sentence. Each character is processed once and set operations are O(1).
- **Space Complexity:** O(1), as the set can grow to hold at most 26 unique lowercase letters, regardless of input size.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the input can include uppercase and non-letter characters?  
  *Hint: Consider converting to lowercase and filtering out non-alphabetic characters.*

- Can you do this without using extra space for a set or array?  
  *Hint: Try using bit manipulation or a bitmask with 26 bits representing each letter.*

- How would you handle sentences in different languages or Unicode alphabets?  
  *Hint: Customize your mapping from character to index according to the alphabet used.*

### Summary
This problem follows a **hash set (deduplication)** pattern, where the task is to track the unique presence of a bounded set of elements—in this case, all letters a-z. Similar patterns are seen in problems like finding whether all elements of a range are present, or checking for duplicates. This is a foundational technique used in problems involving uniqueness, membership testing, and quick-likelihood checks.


### Flashcard
Use a set to track seen letters; return true if size ≥ 26, else false.

### Tags
Hash Table(#hash-table), String(#string)

### Similar Problems
