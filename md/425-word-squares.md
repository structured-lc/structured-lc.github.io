### Leetcode 425 (Hard): Word Squares [Practice](https://leetcode.com/problems/word-squares)

### Description  
Given a list of **unique** words, find all possible *word squares*—sequences of `n` words (where `n` is the length of any word, since all words have the same length) such that the kth row and column read the exact same string. That is, for every possible k (0 ≤ k < n), the letters at row k and column k are the same across the entire n×n arrangement. Words can be reused in different squares but not in the same square multiple times.

For example, using the list `["ball","area","lead","lady"]`, both the rows and corresponding columns read as follows:

```
b a l l
a r e a
l e a d
l a d y
```
The first row and first column are "ball", the second are "area", the third are "lead", and the fourth are "lady"—so it's a **word square**[1][3].

### Examples  

**Example 1:**  
Input: `["area","lead","wall","lady","ball"]`  
Output: `[["wall","area","lead","lady"], ["ball","area","lead","lady"]]`  
*Explanation: Both output squares meet the word square condition—each row and column matches as a word.*

**Example 2:**  
Input: `["abat","baba","atan","atal"]`  
Output: `[["baba","abat","baba","atan"], ["baba","abat","baba","atal"]]`  
*Explanation: Both squares use valid combinations. Each row k is exactly the same as column k for all 0 ≤ k < 4.*

**Example 3:**  
Input: `["abcd","bnrt","crmy","dtye"]`  
Output: `[["abcd","bnrt","crmy","dtye"]]`  
*Explanation: Only one possible word square can be formed from these words as both the rows and columns match exactly.*

### Thought Process (as if you’re the interviewee)  

Start with a brute-force approach:  
- Since a word square must be a list of n words (n = word length), we can try every possible permutation of words.
- However, for each position in the list, the current column so far must align with the rows we’ve picked.
- Brute force is too slow, as most combinations will not lead to valid squares.

**Optimize by pruning:**  
- At position i (the iᵗʰ row), the first i letters of each row must form a prefix of some word in the list.
- After each insertion, check if the columns so far match a prefix for any word.
- To quickly query all words starting with a prefix, build an index:
  - Use a **Trie** (prefix tree) or a hash table that maps each prefix to the list of words starting with that prefix.
- Use **backtracking**: Build the square row by row, and at each step only try words matching the next needed prefix.
- This reduces time wasted on impossible paths and leverages the prefix property efficiently[4].

**Why this approach:**  
- Trie or prefix hash table keeps prefix matching O(1) or O(L) (L = word length).
- The backtracking avoids unnecessary work.
- The solution is flexible and adapts to different input sizes.

### Corner cases to consider  
- Empty word list.
- Words of different lengths (per problem statement, all words will be the same length).
- No possible word squares (output should be []).
- Words where no prefix matches any other (no square forms).
- All words are the same.
- Only one word (should only return a square if len(words)==1 and word length == 1).

### Solution

```python
class Solution:
    def wordSquares(self, words):
        # Build a prefix-to-words map for fast lookup
        from collections import defaultdict
        
        n = len(words[0]) if words else 0
        prefix_map = defaultdict(list)
        for word in words:
            for i in range(n+1):
                prefix = word[:i]
                prefix_map[prefix].append(word)
        
        results = []
        
        def backtrack(square):
            if len(square) == n:
                results.append(square[:])
                return
            # Build the prefix for the next word (= next column's prefix)
            k = len(square)
            prefix = ''.join([word[k] for word in square])
            for candidate in prefix_map.get(prefix, []):
                square.append(candidate)
                backtrack(square)
                square.pop()
        
        for word in words:
            backtrack([word])
        return results
```

### Time and Space complexity Analysis  

- **Time Complexity:** *O(N × 26^L)*  
  - N = number of words; L = word length.
  - Building the prefix map: O(N×L)
  - Backtracking: Worst-case, can try 26 options per layer, L layers deep, and N starting words.
  - In practice, the prefix pruning makes it much faster than brute-force, but exact time depends on word overlap and structure[2].
- **Space Complexity:** *O(N×L + N×L)*  
  - Prefix map or trie: O(N×L).
  - Recursion stack: up to O(L).
  - Results list: O(#output_squares × N × L).

### Potential follow-up questions (as if you’re the interviewer)  

- How do you modify the solution if words can be reused within the same square?
  *Hint: Think about allowing repeats, or removing words from used set.*

- How would you handle inputs where word lengths differ?
  *Hint: Do you filter or preprocess, or can the design adapt?*

- Can you output only one valid word square instead of all?
  *Hint: When do you return, and does that change backtracking?*

### Summary
This problem is a classic **backtracking with prefix pruning**, with a Trie or hashmap optimization for rapid prefix lookup. The core pattern—extending candidates stepwise and pruning illegal paths early—is central to many subsequence and combinatorial search problems, such as word ladders, crossword construction, and recursive puzzle search. The use of prefix data structures enables efficient exploration and is widely applicable.

### Tags
Array(#array), String(#string), Backtracking(#backtracking), Trie(#trie)

### Similar Problems
- Valid Word Square(valid-word-square) (Easy)