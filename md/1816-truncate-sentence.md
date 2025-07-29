### Leetcode 1816 (Easy): Truncate Sentence [Practice](https://leetcode.com/problems/truncate-sentence)

### Description  
Given a sentence as a string `s`, consisting of words separated by single spaces (with no leading/trailing spaces), and an integer `k`, return a new sentence containing only the first `k` words of `s`. Each word consists of just English letters, and words are always separated by a single space.

### Examples  

**Example 1:**  
Input: `s = "Hello how are you", k = 3`  
Output: `"Hello how are"`  
*Explanation: The first 3 words are "Hello", "how", and "are". So, the result is "Hello how are".*

**Example 2:**  
Input: `s = "What is the solution to this problem", k = 4`  
Output: `"What is the solution"`  
*Explanation: The first 4 words are "What", "is", "the", and "solution".*

**Example 3:**  
Input: `s = "chopper is not a tanuki", k = 5`  
Output: `"chopper is not a tanuki"`  
*Explanation: The sentence only has 5 words, which equals `k`. So the output is the original sentence.*

### Thought Process (as if you’re the interviewee)  
The naive idea is to split the string by spaces, take the first `k` words, and join them back with spaces. This is straightforward and readable, but splitting the entire string creates a new array and may use extra space.

An optimized approach is to iterate over the string, count words by detecting spaces, and once we've found `k` words, return the substring up to that point (not including extra trailing spaces). This avoids creating an intermediate array and directly works with the string itself.

Both approaches are efficient for this problem, but the in-place traversal is a common interview expectation due to better space usage for large strings.

### Corner cases to consider  
- k equals the number of words: Output is the original sentence.
- k equals 1: Only the first word gets returned.
- k is larger than the number of words: Output is the original sentence.
- No spaces in the string (sentence is a single word).
- Sentence contains only spaces between words; there are no multiple spaces, and no leading/trailing spaces (by constraint).

### Solution

```python
# Truncate the sentence to the first k words without using split() shortcuts.

def truncateSentence(s: str, k: int) -> str:
    # Counter for spaces found (which separates words).
    count = 0
    length = len(s)
    
    for i in range(length):
        if s[i] == ' ':
            count += 1
            # If we've just seen the kᵗʰ space, end here (i.e., found k words).
            if count == k:
                # Return the substring up to this space.
                return s[:i]
                
    # If there are k or fewer words, return the original sentence.
    return s
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the length of the string. We iterate through the string once, stopping early if possible.
- **Space Complexity:** O(1) extra space (excluding the output, which is required to return the result). No intermediate arrays are created; index variables only.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the function if words could be separated by multiple spaces?
  *Hint: Think about using two pointers or regular expressions to skip additional spaces.*

- How would you handle punctuation and special symbols in the sentence?
  *Hint: Define what counts as a "word" — update your split logic to handle punctuation accordingly.*

- What would you do if the sentence may have leading or trailing spaces?
  *Hint: Consider trimming the string before processing, or handle tricky index boundaries.*

### Summary
This problem demonstrates the "two pointer or scan" pattern for processing substrings efficiently without extra memory overhead. It's commonly useful for string manipulation tasks, e.g., parsing CSV files, breaking text into phrases, or handling log files line by line. While the split-and-join method works for small inputs, being able to write an in-place scan version is a valuable skill in interviews for efficiency.