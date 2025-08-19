### Leetcode 244 (Medium): Shortest Word Distance II [Practice](https://leetcode.com/problems/shortest-word-distance-ii)

### Description  
Design a class that efficiently finds the shortest distance between two distinct words in a list, for many repeated queries. You are given a string array of words (wordsDict). Your class should pre-process this list, and then, when given two words (word1 and word2), return the smallest absolute difference between their indices in the array. Assume both words will always exist in the list and are never the same.

### Examples  

**Example 1:**  
Input: `wordsDict = ["practice", "makes", "perfect", "coding", "makes"]`, query: `shortest("coding", "practice")`  
Output: `3`  
Explanation: `"coding"` occurs at index 3, `"practice"` at 0. Distance = |3 - 0| = 3.

**Example 2:**  
Input: `wordsDict = ["practice", "makes", "perfect", "coding", "makes"]`, query: `shortest("makes", "coding")`  
Output: `1`  
Explanation: `"makes"` appears at indices 1 and 4, `"coding"` at 3. The minimum of |1 - 3| and |4 - 3| is 1.

**Example 3:**  
Input: `wordsDict = ["a", "b", "c", "a"]`, query: `shortest("a", "b")`  
Output: `1`  
Explanation: `"a"` is at indices 0 and 3, `"b"` at 1. Closest is min(|0 - 1|, |3 - 1|) = 1.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Iterate through `wordsDict` for every query, recording all positions of `word1` and `word2`, then compute the pair with smallest absolute difference.  
  - This would take O(n) per query (n = length of wordsDict), which is too slow for multiple queries.
- **Optimization:** Pre-process the list. Build a hashmap mapping each word to a list of its indices.
  - For a query, retrieve the two index lists.
  - Use the two-pointer method: start pointers at the beginning of both lists, compute absolute differences, and move the pointer with the smaller index until either list ends. This gives O(L₁ + L₂) per query, where L₁ and L₂ are lengths of positions lists for `word1` and `word2`—much faster for many queries.
- **Why this approach:** Building the hashmap has a one-time O(n) cost. Each query is much faster than scanning the list each time, which is important given the constraints.

### Corner cases to consider  
- Either word happens only once in the list.
- Words occur right next to each other (distance = 1).
- Very long input lists (test for efficiency).
- Query words are at the start and end of the list (maximal distance).
- Query is repeated several times.

### Solution

```python
class WordDistance:
    def __init__(self, wordsDict):
        # Preprocess: map each word to all its indices
        self.word_indices = {}
        for idx, word in enumerate(wordsDict):
            if word not in self.word_indices:
                self.word_indices[word] = []
            self.word_indices[word].append(idx)

    def shortest(self, word1, word2):
        # Retrieve the index lists for both words
        indices1 = self.word_indices[word1]
        indices2 = self.word_indices[word2]
        i = j = 0
        min_dist = float('inf')
        # Two-pointer approach over the sorted index lists
        while i < len(indices1) and j < len(indices2):
            idx1, idx2 = indices1[i], indices2[j]
            min_dist = min(min_dist, abs(idx1 - idx2))
            # Move the pointer with the smaller index
            if idx1 < idx2:
                i += 1
            else:
                j += 1
        return min_dist
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - **Preprocessing:** O(n), where n is the length of wordsDict.  
  - **Each shortest() query:** O(L₁ + L₂), where L₁ and L₂ are the counts of word1 and word2. Fast for repeated queries.
- **Space Complexity:**  
  - O(n): Stores the indices for every word in the dictionary, proportional to the total input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle queries where the two words might be the same?
  *Hint: You'd need to avoid counting the same index for both words and use a sliding window approach on a single list.*

- What if the input list changes (insertions/deletions) between queries?
  *Hint: You’d need a dynamic data structure—e.g., trees, hashmaps with update/remove, or consider re-indexing.*

- What if there are frequent queries for the same pair of words?
  *Hint: You could cache query results, trading off extra space for even faster repeated lookups.*

### Summary
This problem uses the “preprocess indices” and “two-pointer merge” pattern—classic for repeated proximity or distance queries on sequences. The concept is widely applicable for finding minimum distances between repeating elements and can show up in word proximity, merging sorted data, and proximity queries in time series or event logs. Efficient pre-processing plus fast query answer is a frequent code interview expectation for problems with multiple, fast queries on static data.

### Tags
Array(#array), Hash Table(#hash-table), Two Pointers(#two-pointers), String(#string), Design(#design)

### Similar Problems
- Merge Two Sorted Lists(merge-two-sorted-lists) (Easy)
- Shortest Word Distance(shortest-word-distance) (Easy)
- Shortest Word Distance III(shortest-word-distance-iii) (Medium)