### Leetcode 269 (Hard): Alien Dictionary [Practice](https://leetcode.com/problems/alien-dictionary)

### Description  
Given a list of words sorted lexicographically according to an unknown language (the "alien language"), determine a possible order of the characters in that language. The alien language uses the English alphabet, but the order of the letters is unknown.  
Your task: infer the ordering of the letters by comparing the provided words.  
If no valid order exists (contradiction or cycle), return an empty string.

### Examples  

**Example 1:**  
Input: `["wrt", "wrf", "er", "ett", "rftt"]`  
Output: `"wertf"`  
*Explanation: Compare pairs of adjacent words and find the first differing character for each to build precedence rules (edges). For example: “wrt” vs “wrf” gives t→f; “wrt” vs “er” gives w→e; repeat for others. Topological sort of the resulting graph produces "wertf".*

**Example 2:**  
Input: `["z", "x"]`  
Output: `"zx"`  
*Explanation: The first letters of "z" and "x" show that z comes before x in the alien language. Only these two unique letters.*

**Example 3:**  
Input: `["z", "x", "z"]`  
Output: `""`  
*Explanation: Comparing "z" and "x" gives z→x. Comparing "x" and "z" gives x→z, which is a cycle, meaning it’s impossible to determine a valid order.*

### Thought Process (as if you’re the interviewee)  
- Clarify the problem: Given a list of lexicographically sorted words in an unknown alphabet, return *any* valid letter order or empty string if impossible.
- Brute-force idea: Try all possible letter permutations and check which is valid by simulating sorting — but this is exponential and impractical.
- Instead, notice that whenever two words differ at a position, all earlier positions are matched, and the first difference gives us a precedence rule (e.g., if "abc" and "abd", then c comes before d).
- Model the problem as a **Directed Graph** where each node is a character, and an edge u→v means "u comes before v".
- Use **topological sorting** to extract an order:
  - Build the graph from adjacent word precedences.
  - Detect cycles: If a cycle exists, ordering is impossible.
  - If not, return a valid topological order.
- Trade-off: Works in O(N*M) where N is number of words and M is max word length. Handles edge cases such as disjoint subgraphs or lack of order constraints robustly.

### Corner cases to consider  
- Words contain only one letter.
- Words that are the same up to a prefix, but shorter word comes later (e.g., ["abc", "ab"]) – contradiction.
- Disconnected letters (letters that never appear in any comparison).
- Cycle in precedence graph (e.g., "abc", "bca", "cab").
- No valid letter order (empty string scenario).
- All words are identical.
- Empty input (should return "" or possibly all letters in any order if specified).

### Solution

```python
def alienOrder(words):
    # Step 1: Build graph and indegree count for each unique character
    from collections import defaultdict, deque

    # Initialize data structures
    graph = defaultdict(set)  # adjacency list: u -> set of v
    indegree = {c: 0 for word in words for c in word}  # all unique chars

    # Step 2: Build the graph
    for i in range(len(words) - 1):
        w1, w2 = words[i], words[i + 1]
        # Edge case: prefix problem
        if len(w1) > len(w2) and w1.startswith(w2):
            return ""
        for c1, c2 in zip(w1, w2):
            if c1 != c2:
                if c2 not in graph[c1]:  # Prevent duplication
                    graph[c1].add(c2)
                    indegree[c2] += 1
                break

    # Step 3: Topological sort using BFS (Kahn's Algorithm)
    queue = deque([c for c in indegree if indegree[c] == 0])
    order = []

    while queue:
        c = queue.popleft()
        order.append(c)
        for nei in graph[c]:
            indegree[nei] -= 1
            if indegree[nei] == 0:
                queue.append(nei)

    # If not all letters are used, there was a cycle
    if len(order) != len(indegree):
        return ""
    return "".join(order)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N × M),  
  where N = number of words, and M = max word length.  
  *Graph construction* compares adjacent words (M per comparison, N words) and *topological sort* visits all unique letters and edges.
- **Space Complexity:** O(1) relative to input alphabet (fixed at 26 for English lowercase), O(N × M) for input storage if considering variable alphabet. Additional O(26+E) for graph and indegree.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the alien dictionary used all unicode characters?
  *Hint: Would your approach scale if characters were unbounded, and how would your data structures change?*

- How would you output all possible valid orders, not just one?
  *Hint: Can you modify topological sort to enumerate all bases (e.g., backtracking with in-degree tracking)?*

- Can you adapt your solution for on-the-fly streaming input, where words arrive one at a time?
  *Hint: Is it possible to incrementally update the graph and ordering, and defer output until enough information is collected?*

### Summary
This problem uses the **Topological Sort** pattern, constructing a directed graph from inferred character precedences and then finding an ordering that satisfies all constraints. Robust cycle detection and edge constraint handling are crucial.  
The same approach and coding pattern can be applied to "course scheduling," "build order," and any task dependency problem where elements must be ordered based on partial information. The key insight: pairwise constraints from input define a precedence graph, which must be acyclic for a solution to exist.


### Flashcard
Alien Dictionary

### Tags
Array(#array), String(#string), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Graph(#graph), Topological Sort(#topological-sort)

### Similar Problems
- Course Schedule II(course-schedule-ii) (Medium)