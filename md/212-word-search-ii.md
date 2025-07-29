### Leetcode 212 (Hard): Word Search II [Practice](https://leetcode.com/problems/word-search-ii)

### Description  
Given a 2D board of letters and a list of words, find all words from the list that can be constructed by connecting **adjacent** (horizontally/vertically neighboring) letters on the board. The **same cell cannot be used more than once** in each word. The goal is to return all such words that exist in the board.

### Examples  

**Example 1:**  
Input:  
``board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]``  
``words = ["oath","pea","eat","rain"]``  
Output:  
``["eat","oath"]``  
*Explanation: "eat" and "oath" can both be found in the board by traversing adjacent cells. "pea" and "rain" cannot be formed.*

**Example 2:**  
Input:  
``board = [["a","b"],["c","d"]]``  
``words = ["abcb"]``  
Output:  
``[]``  
*Explanation: "abcb" cannot be formed because you cannot reuse the cell "b".*

**Example 3:**  
Input:  
``board = [["a"]]``  
``words = ["a","aa","aaa"]``  
Output:  
``["a"]``  
*Explanation: Only "a" is present; longer words require reusing cells, which isn't allowed.*

### Thought Process (as if you’re the interviewee)  
Start by thinking how to handle one word:  
- Use depth-first search (DFS) from each cell that matches the first letter, and explore up/down/left/right recursively while marking cells as visited to avoid reuse.

Brute force for each word:  
- For every word, perform DFS from every cell, check every path.  
- This is extremely slow, especially if the number of words and the board size is large.

**Optimization:**  
- Many words share prefixes. If we try to match them separately, we do redundant work.
- Build a **Trie (prefix tree)** of all target words. For each cell, use DFS to check if its character is a prefix/path in the Trie.
- As we search, prune dead-ends early, drastically reducing unnecessary searches.

Why Trie + Backtracking is better:  
- Avoids redundant checks for overlapping prefixes.
- Allows marking found words to avoid duplicates.

Trade-offs:  
- Building the Trie adds memory overhead but greatly reduces time by pruning impossible search branches.
- The approach is much faster for a large dictionary and grid.

### Corner cases to consider  
- Board or words list is empty  
- Multiple words share the same prefix  
- Words longer than total board size  
- Single cell board  
- Duplicate words in input  
- Words that cannot possibly fit (due to blocked letters or required cycles)  
- Words that use all cells (maximum depth scenario)

### Solution

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.word = None  # Stores full word at terminal node

def build_trie(words):
    root = TrieNode()
    for word in words:
        node = root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.word = word  # Mark the end of a word
    return root

def findWords(board, words):
    def dfs(node, i, j):
        letter = board[i][j]
        if letter not in node.children:
            return

        next_node = node.children[letter]
        if next_node.word:
            res.add(next_node.word)
            next_node.word = None  # To avoid duplicates

        board[i][j] = "#"  # Mark visited
        for dx, dy in [(-1,0),(1,0),(0,-1),(0,1)]:
            ni, nj = i + dx, j + dy
            if 0 <= ni < m and 0 <= nj < n and board[ni][nj] != "#":
                dfs(next_node, ni, nj)
        board[i][j] = letter  # Unmark

    # Initialize
    m, n = len(board), len(board[0]) if board else 0
    root = build_trie(words)
    res = set()

    for i in range(m):
        for j in range(n):
            dfs(root, i, j)

    return list(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Building Trie: O(W × L) where W = number of words, L = average word length.  
  For the search: Each DFS can explore up to 4 directions from any cell, but pruning keeps it manageable. In worst-case, it's O(M × N × 4ˡ) per letter, but Trie pruning usually reduces this.  
- **Space Complexity:**  
  Trie: O(W × L) for all characters in the words.  
  Recursion stack: up to O(L) for the deepest possible word length.  
  Marking the board in-place uses O(1) extra space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the board is very large, but the number of words is small?  
  *Hint: Search the board for each word rather than building a Trie, since redundancy is low.*

- How would you adapt the solution if diagonal moves were allowed?  
  *Hint: Update the DFS directions to include all 8 directions.*

- What if you needed to return the path for each word as well (not just the words found)?  
  *Hint: Track the current path with cell coordinates during DFS and store with the result.*

### Summary
This problem is a classic use of the **backtracking + Trie (prefix tree)** coding pattern. The Trie accelerates search for overlapping word prefixes, while DFS handles board traversal with state management for visited cells. This pattern appears in various **pattern-matching**, **word games**, and **grid search** problems, especially wherever prefix pruning or efficient lookup is helpful.