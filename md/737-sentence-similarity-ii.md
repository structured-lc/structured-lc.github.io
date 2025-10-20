### Leetcode 737 (Medium): Sentence Similarity II [Practice](https://leetcode.com/problems/sentence-similarity-ii)

### Description  
Given two sentences (arrays of strings), determine if they are **similar**. Sentences are similar if, for every position, the words are equal or belong to the same similarity group. A pair of words is provided to define similarity relations, and similarity is **transitive and symmetric**: if "a"~"b" and "b"~"c", then "a"~"c".  
You are to return True if and only if the two sentences are similar word by word according to given pair relations.

### Examples  

**Example 1:**  
Input:  
words1 = `["great", "acting", "skills"]`,  
words2 = `["fine", "drama", "talent"]`,  
pairs = `[["great", "good"], ["fine", "good"], ["acting","drama"], ["skills","talent"]]`  
Output: `True`  
*Explanation:  
"great"~"good"~"fine", so "great" and "fine" are similar; "acting" and "drama" are directly similar; "skills" and "talent" directly similar. Each word matches its counterpart via the similarity graph.*

**Example 2:**  
Input:  
words1 = `["great", "acting", "skills"]`,  
words2 = `["fine", "painting", "talent"]`,  
pairs = `[["great", "good"], ["fine", "good"], ["acting","drama"], ["skills","talent"]]`  
Output: `False`  
*Explanation:  
"acting" and "painting" are not similar (neither directly nor transitively). Thus, sentences are not similar.*

**Example 3:**  
Input:  
words1 = `["a"]`,  
words2 = `["a"]`,  
pairs = `[]`  
Output: `True`  
*Explanation:  
Single word equal, so sentences are trivially similar.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  For each position \(i\), try to search all possible similarity chains between words1[i] and words2[i]. This can be done with DFS from word1 to word2 using the given pairs as undirected graph edges.  
  This approach works but can be *slow* if the number of queries or pairs is large.

- **Optimization - Union Find (Disjoint Set):**  
  Given that similarity is transitive and symmetric, all similar words form an *equivalence class*. Disjoint Set is a perfect fit:  
  - Map every word to its parent, building connected components by unioning all given pairs.
  - For each words1[i] and words2[i], check whether they have the same root.
  - If any pair doesn’t, return False; else, True if all pass.

- **Trade-offs and Choice:**  
  - DFS is conceptually easier but slower for many queries.
  - Union Find is more efficient. With path compression, root lookup is near-constant time (amortized).

### Corner cases to consider  
- Sentences of *different lengths*: Should return False.
- Empty sentences: Considered similar if both are empty.
- Pairs list is empty: Only exact word matches are considered similar.
- Words not in any pairs: Only match to themselves unless found via similarity.
- Self-pairing: Should not be required unless provided explicitly.
- Repeated or duplicate pairs: No effect; idempotent for union-find.

### Solution

```python
def areSentencesSimilarTwo(words1, words2, pairs):
    # Corner case: unequal lengths
    if len(words1) != len(words2):
        return False
    
    # Union-Find helper functions
    parent = dict()

    def find(word):
        # Path compression
        if word not in parent:
            parent[word] = word
        while parent[word] != word:
            parent[word] = parent[parent[word]]  # Compression
            word = parent[word]
        return word

    def union(word1, word2):
        root1 = find(word1)
        root2 = find(word2)
        if root1 != root2:
            parent[root1] = root2

    # Build union sets for all pairs
    for w1, w2 in pairs:
        union(w1, w2)
    
    # Check similarity position-by-position
    for w1, w2 in zip(words1, words2):
        if w1 == w2:
            continue
        # They must either be equivalent or share the same root in union-find
        if find(w1) != find(w2):
            return False

    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + M \* α(N+M)),  
  where N = length of sentences, M = number of pairs, α is the inverse Ackermann function (for union-find).  
  - Build union-find for all pairs: O(M \* α(M)).
  - For each position comparison: O(N \* α(N)).
- **Space Complexity:** O(N + M),  
  since at most every word in sentences and pairs will be present in the parent dictionary.

### Potential follow-up questions (as if you’re the interviewer)  

- What if word similarity is **not transitive**?
  *Hint: Could DFS or BFS still work or would you need to compare only direct pairs?*

- How would you handle **dynamic updates** to the similarity pairs?
  *Hint: Union-Find can be extended with efficient unions for updates. But removals are difficult.*

- Can you support queries like **sub-sentence similarity** (i.e., are subsequences similar)?
  *Hint: You'll need to extend matching logic to align subarrays.*

### Summary
This is a classic **Union Find / Disjoint Set** problem and follows the connectivity pattern in graphs. Similar approaches are used in problems involving connected components, equivalence classes, and "friend circles." It's useful in clustering, accounts merging, and many algorithms that revolve around the concept of "are two things in the same group?"


### Flashcard
Build undirected graph from pairs and use Union-Find (or DFS) to group similar words into equivalence classes; verify all positions belong to same class.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find)

### Similar Problems
- Number of Provinces(number-of-provinces) (Medium)
- Accounts Merge(accounts-merge) (Medium)
- Sentence Similarity(sentence-similarity) (Easy)