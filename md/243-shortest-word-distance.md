### Leetcode 243 (Easy): Shortest Word Distance [Practice](https://leetcode.com/problems/shortest-word-distance)

### Description  
Given a list of words (`wordsDict`) and two distinct words (`word1` and `word2`), **find the shortest distance between any occurrence of `word1` and `word2` in the list**.  
- Distance is the absolute difference between their indices.
- Both `word1` and `word2` are guaranteed to be present and are different from each other.
- The list can contain multiple occurrences of both words.

### Examples  

**Example 1:**  
Input: `wordsDict = ["practice", "makes", "perfect", "coding", "makes"]`, `word1 = "coding"`, `word2 = "practice"`  
Output: `3`  
*Explanation: "coding" appears at index 3, "practice" at index 0, so distance = |3 - 0| = 3.*

**Example 2:**  
Input: `wordsDict = ["practice", "makes", "perfect", "coding", "makes"]`, `word1 = "makes"`, `word2 = "coding"`  
Output: `1`  
*Explanation: Closest pair is "makes" at index 4, "coding" at index 3, so distance = |4 - 3| = 1.*

**Example 3:**  
Input: `wordsDict = ["a", "b"]`, `word1 = "a"`, `word2 = "b"`  
Output: `1`  
*Explanation: "a" at index 0, "b" at index 1, distance = 1.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:** For every occurrence of `word1`, iterate through every occurrence of `word2` and compute all pairwise distances.  
  - Time Complexity: O(n²) if n is the number of words.  
  - Not efficient for large input.
- **Optimized approach:**  
  - Traverse the list once while keeping track of the *most recent indices* where `word1` and `word2` have occurred.
  - On encountering `word1` or `word2`, compute the new distance to the last seen position of the other word.
  - Update the minimum as you go.
- **Why this method?**  
  - Single pass (O(n)), O(1) space.  
  - No need to store all indices, just the last occurrence for each word.

### Corner cases to consider  
- `word1` and `word2` occur multiple times, potentially even adjacent to each other.
- List with only two words.
- The closest instances of `word1` and `word2` are at the very start and end of the list.
- Consecutive occurrences like `["a","b","a","b"]`.
- The words are always guaranteed to be present; but check behavior anyway if the guarantee changes.

### Solution

```python
def shortestDistance(wordsDict, word1, word2):
    idx1 = idx2 = -1      # Most recent indices
    min_distance = len(wordsDict)
    for i, word in enumerate(wordsDict):
        if word == word1:
            idx1 = i
            if idx2 != -1:
                min_distance = min(min_distance, abs(idx1 - idx2))
        elif word == word2:
            idx2 = i
            if idx1 != -1:
                min_distance = min(min_distance, abs(idx1 - idx2))
    return min_distance
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Where n is the number of words in `wordsDict`, as we scan the list once.
- **Space Complexity:** O(1) — Only a few integer variables are used regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if `word1` and `word2` could be the same word?  
  *Hint: You'd need to avoid using the same occurrence for both and track two most recent distinct positions.*

- What if we want to support repeated queries with different pairs of words efficiently?  
  *Hint: Preprocess into a mapping of word to all indices, then answer each query in O(m+n) where m and n are the count of each word in the list.*

- What if the list becomes extremely large and can't fit in memory—how would you process it in a streaming fashion?  
  *Hint: You can’t look backwards arbitrarily, so you must process sequentially and update minimums as you go.*

### Summary  
This problem uses the **"two pointers / sliding window"** coding pattern on a linear scan, tracking relevant indices.  
It demonstrates reducing brute-force nested loops to a single pass with O(1) auxiliary space by keeping track of minimal needed state.  
This approach appears in other "shortest distance between elements" scenarios, such as shortest distance between two values in an array, processing streams, or in memory-efficient search tasks.

### Tags
Array(#array), String(#string)

### Similar Problems
- Shortest Word Distance II(shortest-word-distance-ii) (Medium)
- Shortest Word Distance III(shortest-word-distance-iii) (Medium)
- Find All K-Distant Indices in an Array(find-all-k-distant-indices-in-an-array) (Easy)