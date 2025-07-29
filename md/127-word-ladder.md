### Leetcode 127 (Hard): Word Ladder [Practice](https://leetcode.com/problems/word-ladder)

### Description  
Given a **beginWord**, an **endWord**, and a dictionary (**wordList**), transform beginWord into endWord by changing only one letter at a time, with the constraint that each intermediate word must exist in wordList. Return the length of the shortest such transformation sequence (including both beginWord and endWord), or 0 if no sequence exists. Only one letter can be changed per transformation; words must be the same length.

### Examples  

**Example 1:**  
Input: `beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]`  
Output: `5`  
*Explanation: "hit" → "hot" → "dot" → "dog" → "cog". Number of words in the sequence is 5.*

**Example 2:**  
Input: `beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]`  
Output: `0`  
*Explanation: "cog" is not in wordList, so transformation is impossible.*

**Example 3:**  
Input: `beginWord = "a", endWord = "c", wordList = ["a","b","c"]`  
Output: `2`  
*Explanation: "a" → "c". Two words in the sequence ("a" and "c").*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:** Try all possible word sequences changing one letter at a time, but this is exponential and inefficient for large word lists.
- **Optimized Approach (BFS):**
  - Treat each word as a node in a graph.
  - Two words are connected if they differ by exactly one letter.
  - Use **Breadth-First Search (BFS)** starting from beginWord. BFS ensures the first time we reach endWord is via the shortest path.
  - For every word, generate all possible single-letter transformations. If a transformed word is in wordList and unvisited, add it to the queue.
  - Use a set for fast lookup of existing words and to track visited words.
  - The queue holds pairs (currentWord, depth/stepsSoFar).

- **Why BFS and not DFS:** BFS naturally finds the shortest path. In DFS, you could traverse a longer path first; that's inefficient for shortest-path search.

### Corner cases to consider  
- beginWord not in wordList (okay, as per the rules).
- endWord not in wordList → return 0 immediately.
- case where beginWord == endWord → should return 1 if endWord is in wordList.
- wordList contains duplicates or extra irrelevant words.
- all words are of length 1 (smallest possible).
- empty wordList.
- cycles in wordList (should not affect BFS with proper visited tracking).

### Solution

```python
from collections import deque

def ladderLength(beginWord, endWord, wordList):
    # Convert word list to a set for O(1) exists checks
    word_set = set(wordList)
    if endWord not in word_set:
        # If endWord is not in the word list, no transformation possible
        return 0

    # Queue for BFS: each entry is (word, step_count)
    queue = deque([(beginWord, 1)])
    # Track visited words to avoid cycles
    visited = set([beginWord])

    while queue:
        current_word, steps = queue.popleft()
        # For each position in the word
        for i in range(len(current_word)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                # Change the iᵗʰ letter to c if it's different
                if c == current_word[i]:
                    continue
                next_word = current_word[:i] + c + current_word[i+1:]
                if next_word == endWord:
                    # Found path to endWord
                    return steps + 1
                if next_word in word_set and next_word not in visited:
                    visited.add(next_word)
                    queue.append((next_word, steps + 1))
    # If no transformation found
    return 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N × L²), where N = number of words in wordList, L = word length. For each word, for every position (L), you try 26 letters, leading to O(26 × L × N) in the worst case.
- **Space Complexity:** O(N × L), due to the word set, visited set, and the BFS queue storing up to N words of length L.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you output the actual transformation sequence, not just its length?  
  *Hint: Keep track of parent/prev states and reconstruct the path from endWord to beginWord at the end.*

- Can you optimize further if wordList is huge and words are very long (e.g., L ≈ 1000)?
  *Hint: Bidirectional BFS, starting simultaneously from beginWord and endWord, can cut search space.*

- What if you want **all** shortest transformation sequences (not just the length)?
  *Hint: Use BFS layers and build a tree of transformations; Word Ladder II (Leetcode 126) asks this specifically.*

### Summary
This problem uses the classic **BFS (Breadth-First Search)** pattern for shortest-path in an unweighted graph, where nodes are words and edges represent a one-letter transformation. The trick is to generate possible neighbors on the fly. This approach is commonly applied to word transformation, puzzle, and unweighted graph shortest-path problems. Bidirectional BFS is a notable optimization for related variants.