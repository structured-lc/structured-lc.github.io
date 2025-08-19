### Leetcode 2416 (Hard): Sum of Prefix Scores of Strings [Practice](https://leetcode.com/problems/sum-of-prefix-scores-of-strings)

### Description  
Given a list of non-empty strings `words`, for each word compute the sum of scores of all its non-empty prefixes.  
The **score** of a prefix is the number of strings in the list that have that prefix.  
Return an array where the iᵗʰ element is the sum of prefix scores for words[i].  
*A string is considered a prefix of itself.*

### Examples  

**Example 1:**  
Input: `words = ["abc", "ab", "bc", "b"]`  
Output: `[5, 4, 3, 2]`  
Explanation:  
- For "abc":  
  - "a" → appears in "abc", "ab" (2)
  - "ab" → appears in "abc", "ab" (2)
  - "abc" → appears in "abc" (1)  
  Total = 2 + 2 + 1 = 5

- For "ab":  
  - "a" → 2
  - "ab" → 2  
  Total = 2 + 2 = 4

- For "bc":  
  - "b" → "bc", "b" (2)
  - "bc" → "bc" (1)  
  Total = 2 + 1 = 3

- For "b":  
  - "b" → 2

**Example 2:**  
Input: `words = ["abcd"]`  
Output: `[4]`  
Explanation:  
- "a" → 1  
- "ab" → 1  
- "abc" → 1  
- "abcd" → 1  
Total = 1 + 1 + 1 + 1 = 4

**Example 3:**  
Input: `words = ["top","tops","toss","taco","tap"]`  
Output: `[8, 9, 8, 5, 6]`  
Explanation:  
- "top": t (3), to (3), top (2) → 3+3+2=8  
- "tops": t (3), to (3), top (2), tops (1) → 3+3+2+1=9  
- "toss": t (3), to (3), tos (1), toss (1) → 3+3+1+1=8  
- "taco": t (3), ta (2), tac (1), taco (1) → 3+2+1+1=7  
- "tap": t (3), ta (2), tap (1) → 3+2+1=6  


### Thought Process (as if you’re the interviewee)  

- **Brute-force**:  
  For every prefix of every word, count how many words in the array start with that prefix.  
  This would require O(n \* L²) time (n words, up to L prefixes, each checked against n words).
  Not efficient for large n or long words.

- **Optimized (Trie)**:  
  Use a Trie (prefix tree):
  - Insert all words. At each node, keep a counter of how many words share that prefix.
  - For each word, walk the Trie prefix by prefix, summing the counters you traverse.
  - This reduces redundant checks and queries prefix counts in O(L) per word.

- **Why choose Trie?**
  - Efficiently counts all prefix frequencies during insertion.
  - Each query for score becomes O(L), for a total O(n \* L).

- **Trade-offs:**
  - More memory due to the Trie, but huge speedup and avoids repeated prefix counting.


### Corner cases to consider  
- Empty input list (`[]`)  
- List of identical words (`["a", "a", "a"]`)  
- Words of varying lengths  
- Prefix overlapping but not same word (`["a", "ab", "abc"]`)  
- Single word in input  
- All single-character words  
- Words sharing no prefixes at all


### Solution

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.count = 0  # number of words passing this prefix

class Solution:
    def sumPrefixScores(self, words):
        root = TrieNode()
        
        # Build the Trie and record prefix counts
        for word in words:
            node = root
            for ch in word:
                if ch not in node.children:
                    node.children[ch] = TrieNode()
                node = node.children[ch]
                node.count += 1  # increment count for each prefix
        
        # Function to compute the sum for a word
        def score(word):
            node = root
            total = 0
            for ch in word:
                node = node.children[ch]
                total += node.count
            return total

        # Collect results
        return [score(word) for word in words]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Building the Trie: O(N \* L) (N = number of words, L = max word length).
  - Querying scores: O(N \* L).
  - Overall: **O(N \* L)**.

- **Space Complexity:**  
  - Trie storage: O(N \* L) in the worst case (each letter unique).
  - Output array: O(N).


### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if the input words could be very long (e.g., thousands of characters each)?  
  *Hint: Consider space optimizations for Trie, maybe compress paths.*

- Could you handle case-insensitive prefix scores (treat "A" and "a" as the same)?  
  *Hint: Normalize all input (e.g., convert to lower-case) before inserting/searching the Trie.*

- If you had to process millions of queries (dynamic words list), could you batch/parallelize the building or querying?  
  *Hint: Think about thread-safe Trie, and/or batched prefix counting with MapReduce or concurrent structures.*

### Summary
This problem is a classic use-case for the **Trie (prefix tree)** data structure and prefix frequency counting. Building a Trie with counters enables fast (O(L)) queries for prefix scores across potentially huge lists. This pattern shows up in auto-complete, T9 text, prefix-based dictionary lookups, and similar background tally/lookup systems.

### Tags
Array(#array), String(#string), Trie(#trie), Counting(#counting)

### Similar Problems
- Design Add and Search Words Data Structure(design-add-and-search-words-data-structure) (Medium)
- Maximum XOR of Two Numbers in an Array(maximum-xor-of-two-numbers-in-an-array) (Medium)
- Map Sum Pairs(map-sum-pairs) (Medium)