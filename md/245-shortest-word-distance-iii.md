### Leetcode 245 (Medium): Shortest Word Distance III [Practice](https://leetcode.com/problems/shortest-word-distance-iii)

### Description  
Given an array of strings, `wordsDict`, and two strings, `word1` and `word2`, find the shortest distance between any two occurrences of the two words in the array.  
The twist: **word1 and word2 may be the same word**—in this case, you must find the shortest distance between any two distinct indices where that word occurs.

### Examples  

**Example 1:**  
Input: `wordsDict = ["practice", "makes", "perfect", "coding", "makes"]`, `word1 = "coding"`, `word2 = "practice"`  
Output: `3`  
Explanation: The two words appear at indices 3 and 0. abs(3 - 0) = 3.

**Example 2:**  
Input: `wordsDict = ["practice", "makes", "perfect", "coding", "makes"]`, `word1 = "makes"`, `word2 = "coding"`  
Output: `1`  
Explanation: "makes" appears at index 1 and 4, "coding" at 3. Minimum abs(3 - 4) = 1.

**Example 3:**  
Input: `wordsDict = ["a", "a", "b", "b"]`, `word1 = "a"`, `word2 = "a"`  
Output: `1`  
Explanation: Looking for the minimal distance between two "a"s at different indices. Closest are 0 and 1, abs(1 - 0) = 1.

### Thought Process (as if you’re the interviewee)  

Start with the **brute-force approach**:  
- Loop over all pairs of indices (i, j) such that `wordsDict[i] == word1`, `wordsDict[j] == word2` (and i ≠ j if word1 == word2), and track the minimum abs(i - j).
- This is clearly O(n²) and slow for large inputs.

We can **optimize** using a **single pass with two pointers**:
- Traverse the list.
- Keep track of the most recent index for each word (say, `i` for word1 and `j` for word2).
    - Whenever you see word1 at index k, update `i = k`.  
    - Whenever you see word2 at index k, update `j = k`.
    - Each time both indices have been set, calculate abs(i - j) and update the answer.
- **Special Case**: If the two words are the same, we need to make sure we are taking two distinct indices. Every time we find the word, track the previous occurrence (`prev`), and compute the distance to the last one seen.

This approach is O(n), with O(1) space.

### Corner cases to consider  
- word1 and word2 **are the same** (must check distance between distinct occurrences)
- wordsDict contains only one occurrence of the word
- wordsDict is empty or has only one element
- word1 or word2 is not present in wordsDict
- Multiple minimum distances, e.g. tied answers

### Solution

```python
def shortestWordDistance(wordsDict, word1, word2):
    min_dist = len(wordsDict)
    prev = -1  # Stores previous index of interest

    if word1 == word2:
        # Same word: look for minimal distance between any two occurrences
        for idx, word in enumerate(wordsDict):
            if word == word1:
                if prev != -1:
                    min_dist = min(min_dist, idx - prev)
                prev = idx
    else:
        i, j = -1, -1  # Most recent locations of word1 and word2
        for idx, word in enumerate(wordsDict):
            if word == word1:
                i = idx
                if j != -1:
                    min_dist = min(min_dist, abs(i - j))
            elif word == word2:
                j = idx
                if i != -1:
                    min_dist = min(min_dist, abs(i - j))
    return min_dist
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(wordsDict), since we traverse the list once.
- **Space Complexity:** O(1) — we use a small number of integer variables regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you have **multiple queries** for different pairs of words and want to answer each efficiently?
  *Hint: Can you preprocess and store all word indices?*
- How would you handle the list if it is **mutable** and you need to support updates and queries efficiently?
  *Hint: Consider data structures for dynamic indexing, maybe balanced tree or hash map with lists.*
- Can this be adapted for the case where you must find the **shortest distance between any two different words** in the entire list?
  *Hint: Think of a sliding window and keeping track of all recent positions by word.*

### Summary
This is a **two-pointer/single-pass scan** pattern often used for minimum distance problems or for scanning with state.  
It illustrates careful handling when the two search targets may be identical.  
This type of pattern also appears in string, array, or interval difference problems where you seek the minimum/maximum gap between elements that match certain criteria.


### Flashcard
Track latest indices for both words during single pass; if word1 == word2, avoid comparing same index, always update minimum distance.

### Tags
Array(#array), String(#string)

### Similar Problems
- Shortest Word Distance(shortest-word-distance) (Easy)
- Shortest Word Distance II(shortest-word-distance-ii) (Medium)