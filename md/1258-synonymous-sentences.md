### Leetcode 1258 (Medium): Synonymous Sentences [Practice](https://leetcode.com/problems/synonymous-sentences)

### Description  
Given pairs of synonymous words and a sentence (as a string), generate all possible sentences by replacing every word in the original sentence with any of its synonyms (including itself), for all possible combinations. Return the list of all possible sentences in lexicographical order.

### Examples  
**Example 1:**  
Input: `synonyms = [["happy","joy"],["sad","sorrow"]], text = "I am happy today but was sad yesterday"`  
Output: `["I am happy today but was sad yesterday", "I am happy today but was sorrow yesterday", "I am joy today but was sad yesterday", "I am joy today but was sorrow yesterday"]`  
*Explanation: "happy" and "joy" are synonyms; "sad" and "sorrow" are synonyms.*

**Example 2:**  
Input: `synonyms = [], text = "I am fine"`  
Output: `["I am fine"]`  
*Explanation: No synonyms, output is original text.*

**Example 3:**  
Input: `synonyms = [["run","jog"],["fast","quick"]], text = "I run fast"`  
Output: `["I jog fast", "I jog quick", "I run fast", "I run quick"]`  
*Explanation: Each word can be itself or its synonym.*

### Thought Process (as if you’re the interviewee)  
- Group synonyms using Union-Find (disjoint sets), so each word can be replaced by any word in its group.
- For each word in the sentence, get the full group of synonyms (itself if it has none).
- Generate the cartesian product of possible replacements for all words, build all possible sentences.
- Output must be sorted lex-order, so prepare replacement lists per position, sort, and use itertools.product or custom DFS to build sentences.

### Corner cases to consider  
- Sentence without any synonyms
- Words with multiple levels of synonym chaining
- Empty synonym list
- Duplicates in synonym groups
- Synonyms with overlap

### Solution

```python
from collections import defaultdict

def generateSentences(synonyms, text):
    parent = dict()
    def find(x):
        parent.setdefault(x, x)
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]
    def union(x, y):
        parent[find(x)] = find(y)
    for a, b in synonyms:
        union(a, b)
    groups = defaultdict(set)
    for a, b in synonyms:
        groups[find(a)].add(a)
        groups[find(b)].add(b)
    for group in groups.values():
        for w in group:
            groups[w] = group
    words = text.split()
    res = []
    def dfs(i, path):
        if i == len(words):
            res.append(' '.join(path))
            return
        w = words[i]
        candidates = sorted(groups[w]) if w in groups else [w]
        for cand in candidates:
            dfs(i+1, path + [cand])
    dfs(0, [])
    return sorted(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(S × m) where S is the total number of possible sentences and m is sentence length. Enumerate every possible combination because each synonym group can expand exponentially.
- **Space Complexity:** O(S × m) for storing all output and call stacks, plus O(k) for union-find structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if synonyms can form cycles? How do you ensure no infinite loop?  
  *Hint: Union-Find guarantees every word assigned to root. DFS avoids repeats by group binding.*

- How to optimize for huge synonym groups or highly repetitive sentences?
  *Hint: Memoize partial results, restrict deep synonym expansion, prune early if too expensive.*

- Can you limit number of sentences generated?
  *Hint: Short-circuit or breadth-first enumerate until a count threshold is reached.*

### Summary
Union-find groups synonyms, DFS or product generates all combinations. This is a classical combinatorial sentence construction—a pattern seen in synonym expansions, word ladders, natural language generation.


### Flashcard
Use Union-Find to group synonyms, then generate all sentences by replacing each word with all synonyms in its group and taking the cartesian product.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Backtracking(#backtracking), Sort(#sort), Union Find(#union-find)

### Similar Problems
