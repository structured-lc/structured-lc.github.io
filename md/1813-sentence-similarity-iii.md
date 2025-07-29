### Leetcode 1813 (Medium): Sentence Similarity III [Practice](https://leetcode.com/problems/sentence-similarity-iii)

### Description  
Given two sentences, determine if one sentence can be made equal to the other by inserting a contiguous sequence of words (possibly empty) into any position of the other sentence.  
In other words, are the two sentences similar if we can insert any block of words (including no words) into one to get the other? Words are separated by single spaces and no leading/trailing spaces.

### Examples  

**Example 1:**  
Input: `sentence1 = "My name is Haley"`, `sentence2 = "My Haley"`  
Output: `True`  
*Explanation: "name is" can be inserted between "My" and "Haley" in sentence2 to obtain sentence1.*

**Example 2:**  
Input: `sentence1 = "of"` , `sentence2 = "A lot of words"`  
Output: `True`  
*Explanation: You can insert "A lot of words" before "of" in sentence1 to get sentence2, so they are similar.*

**Example 3:**  
Input: `sentence1 = "Eating right now"`, `sentence2 = "Eating"`  
Output: `True`  
*Explanation: "right now" can be inserted after "Eating" in sentence2 to form sentence1.*

**Example 4:**  
Input: `sentence1 = "Luky"`, `sentence2 = "Lucccky"`  
Output: `False`  
*Explanation: No sequence of insertions can make the sentences equal.*

### Thought Process (as if you’re the interviewee)  
- First, I want to compare the two sentences. If they are already the same, return True.
- Otherwise, split both sentences into lists of words.
- Since only continuous insertions are allowed, the remaining words after matching from the left and right must be consecutive in *one* sentence.  
- I can use two pointers:
    - Start from the left and increment until words differ.
    - Start from the right (end of both lists) and increment until words differ.
    - The gap between these pointers is where the insertion could have happened.
- If I can match all words in the shorter sentence by aligning prefixes and suffixes, then the sentences are similar.
- This approach runs in linear time, O(N), and does not require extra structures.

### Corner cases to consider  
- Both sentences are identical.
- One is empty, the other is not.
- Insert position might be at the start/end (prefix/suffix) or in the middle.
- No overlap at all (completely different words).
- Sentences where word order is different.
- Sentences with only one word.
- Sentences with repeated words.

### Solution

```python
def areSentencesSimilar(sentence1: str, sentence2: str) -> bool:
    # Split both sentences into word lists
    words1 = sentence1.split()
    words2 = sentence2.split()
    
    # Guarantee: words1 is always the longer or equal
    if len(words1) < len(words2):
        words1, words2 = words2, words1
    
    # Two pointers: from start and end
    start = 0
    end = 0
    len1 = len(words1)
    len2 = len(words2)
    
    # Match from the beginning
    while start < len2 and words1[start] == words2[start]:
        start += 1
    
    # Match from the end
    while end < len2 - start and words1[len1 - 1 - end] == words2[len2 - 1 - end]:
        end += 1

    # If we've matched all words in words2 with prefix+suffix,
    # the rest is a single contiguous block in words1
    return start + end == len2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the shorter sentence.  
  We compare at most all words in the shorter sentence from both the start and end.
- **Space Complexity:** O(n), for splitting sentences into word lists (not including input size).  
  No additional structures except simple variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we allow *multiple* insertions of blocks, not just one contiguous insertion?  
  *Hint: Try a more flexible matching, e.g. using subsequence detection or DP.*

- What if the words are separated by multiple spaces or punctuation?  
  *Hint: Think about robust tokenization and normalization.*

- What if sentences are very long and you care about minimizing time and space?  
  *Hint: Can you avoid splitting the entire string? Use pointers or two-pass logic.*

### Summary
This problem uses the **two-pointer** and **array prefix/suffix matching** pattern, which is common for subsequence or merge-type questions. This technique is also effective for problems like checking array similarity under insertion/deletion operations, and for certain string/sequence segmentation problems.