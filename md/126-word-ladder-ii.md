### Leetcode 126 (Hard): Word Ladder II [Practice](https://leetcode.com/problems/word-ladder-ii)

### Description  
You are given two words, **beginWord** and **endWord**, and a list of words called **wordList**. Your task is to find all **shortest sequences** of transformations from beginWord to endWord, where:  
- Each transformation can only change a single letter in the current word.
- Each transformed word must exist in wordList (beginWord does _not_ need to).
- The sequence starts with beginWord and ends with endWord.
- Only the shortest transformation sequences should be returned.  
If no sequence exists, return an empty list.

### Examples  

**Example 1:**  
Input:  
`beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]`  
Output:  
`[["hit","hot","dot","dog","cog"], ["hit","hot","lot","log","cog"]]`  
*Explanation: Each sequence changes one letter at a time and all intermediate words exist in the wordList. Both paths are of the shortest possible length.*

**Example 2:**  
Input:  
`beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]`  
Output:  
`[]`  
*Explanation: "cog" is not in wordList, so no sequence is possible.*

**Example 3:**  
Input:  
`beginWord = "a", endWord = "c", wordList = ["a","b","c"]`  
Output:  
`[["a","c"]]`  
*Explanation: The shortest transformation is direct, since both "a" and "c" are in the wordList and only differ by one letter.*

### Thought Process (as if you’re the interviewee)  
My first thought is brute-force: try all possible paths from beginWord to endWord where at each step we only change one letter and check if the new word exists in wordList. But this is essentially trying all possible paths in an exponential-size graph, so it will be far too slow, especially since we care about only the shortest paths.

To optimize, notice that the problem is naturally a graph one:  
- Each word is a node.
- There is an edge between two words if they are the same length and differ by only one letter.

To find the shortest path(s), we can use **Breadth-First Search (BFS)**, which guarantees to find paths of minimum length.  
However, since we need **all** shortest transformation sequences (not just one), we'll:
- Run BFS from beginWord to build the shortest-path "layers"—track for each word the words from which it was reached (parent pointers).
- Then, use backtracking (DFS) from endWord back to beginWord, reconstructing all shortest sequences by recursively following parent links.

This approach is efficient because BFS guarantees we only explore minimal-distance paths, and the backtrack phase only reconstructs sequences of this minimum length.

Trade-offs:
- Using BFS+DFS is necessary to avoid Memory Limit Exceeded/LTE issues from storing all paths in the BFS phase.
- Need to be careful with visited-set management (to avoid cycles and ensure paths are truly shortest).

### Corner cases to consider  
- beginWord == endWord.
- endWord not in wordList (spec says in that case, output is empty list).
- wordList contains duplicates or is empty.
- All words have length 1.
- Multiple shortest paths exist.
- No possible transformation.
- Large input where naive DFS/BFS would TLE.

### Solution

```python
def findLadders(beginWord, endWord, wordList):
    from collections import defaultdict, deque

    wordSet = set(wordList)
    if endWord not in wordSet:
        return []

    # BFS step: Find all shortest paths, tracking parent links for reconstruction.
    parents = defaultdict(set)
    level = {beginWord}
    visited = set()
    found = False

    while level and not found:
        next_level = set()
        for word in level:
            visited.add(word)
        for word in level:
            for i in range(len(word)):
                for c in "abcdefghijklmnopqrstuvwxyz":
                    if c == word[i]:
                        continue
                    candidate = word[:i] + c + word[i+1:]
                    if candidate in wordSet and candidate not in visited:
                        if candidate == endWord:
                            found = True
                        next_level.add(candidate)
                        parents[candidate].add(word)
        level = next_level

    # DFS (backtrack) step: Reconstruct all paths from endWord to beginWord
    def dfs(word):
        if word == beginWord:
            return [[beginWord]]
        res = []
        for parent in parents[word]:
            for path in dfs(parent):
                res.append(path + [word])
        return res

    return dfs(endWord) if found else []
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Assume N = size of wordList, L = word length.
  - BFS visits each word at most once, and each step checks 26×L possibilities per word: O(N × L × 26) ≈ O(N × L).
  - Backtracking phase reconstructs all shortest paths, possibly exponential in worst-case, but only as many as exist for the shortest length.
- **Space Complexity:**  
  - Storing parent links: O(N × shortest path branching).
  - Visited sets, queues, etc.: O(N).
  - Recursive stack for backtracking: up to O(N) depth per path.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you only want the number of shortest paths instead of the actual sequences?  
  *Hint: During BFS, maintain a count of ways to reach each word instead of parent links.*

- How would you adapt the solution if you need the minimal-length path but not all the sequences?  
  *Hint: Early exit in BFS when endWord is first reached, return a single path.*

- If words are very long (length 100+), how would you optimize neighbor lookups?  
  *Hint: Precompute all wildcard patterns; index wordList by slots with a missing letter.*

### Summary
The problem uses a **BFS for layer/path discovery** followed by **backtracking (DFS) for reconstruction of all shortest sequences**.  
This pattern—BFS for minimum-length paths in unweighted graphs, combined with backtracking for result reconstruction—is common in many shortest-path and "find all minimum solutions" problems, such as: All shortest paths in undirected graphs, solving word-morph games, and minimum-step state transitions.

### Tags
Hash Table(#hash-table), String(#string), Backtracking(#backtracking), Breadth-First Search(#breadth-first-search)

### Similar Problems
- Word Ladder(word-ladder) (Hard)
- Groups of Strings(groups-of-strings) (Hard)