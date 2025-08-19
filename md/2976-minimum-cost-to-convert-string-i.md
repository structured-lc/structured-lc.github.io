### Leetcode 2976 (Medium): Minimum Cost to Convert String I [Practice](https://leetcode.com/problems/minimum-cost-to-convert-string-i)

### Description  
Given two strings of equal length, **source** and **target**, and three arrays — **original**, **changed**, and **cost** — where each entry represents a possible single-character transformation from original[i] to changed[i] at cost[i], determine the minimum total cost required to convert **source** into **target** (character by character, in order). Each character in source can be changed into another character (possibly via a sequence of steps), and each operation costs as specified. If it is impossible to make the conversion, return -1.

### Examples  

**Example 1:**  
Input:  
source = `"abcd"`,  
target = `"acbe"`,  
original = `["a","b","c","c","e","d"]`,  
changed = `["b","c","b","e","b","e"]`,  
cost = `[2,5,5,1,2,20]`  
Output: `28`  
*Explanation:  
- a→a (no cost)  
- b→c (use b→c, cost 5)  
- c→b (use c→b, cost 5)  
- d→e (use d→e, cost 20)  
Total: 0 + 5 + 5 + 20 = 30  
BUT you can find cheaper paths using intermediate transformations:  
- a→b(cost 2), b→c(cost 5) gives a→c total 7, but a→c is not in original/changed directly.  
The cheapest for each char is:  
- a→a: 0  
- b→c: 5  
- c→b: 5  
- d→e: 20  
Sum: 0 + 5 + 5 + 20 = 30  
However, there are multi-step cheaper conversions (using c→e and e→b etc.), so the minimal cost is 28.*

**Example 2:**  
Input:  
source = `"ab"`,  
target = `"cd"`,  
original = `["a","b"]`,  
changed = `["c","c"]`,  
cost = `[1,2]`  
Output: `-1`  
*Explanation:  
b cannot be converted to d by any sequence, so the overall conversion is impossible.*

**Example 3:**  
Input:  
source = `"xx"`,  
target = `"xy"`,  
original = `["x"]`,  
changed = `["y"]`,  
cost = `[3]`  
Output: `3`  
*Explanation:  
First 'x' remains unchanged, second 'x'→'y' using given transformation with cost 3.*

### Thought Process (as if you’re the interviewee)  
- **First thought**: For each source[i], try to convert it to target[i] using available operations. Naively, for each (s, t) pair, check if a direct operation exists.
- **But:** Multi-step conversions may be possible and sometimes cheaper (e.g., a→b→c).
- **So:** Model the possible transformations as a **directed weighted graph** of 26 (all lowercase) letters. Each transformation is an edge.
- **Main observation:** Need to answer for each character-pair (source[i], target[i]): what is the minimal cost path in this graph?
- **Classic approach:** Use the **Floyd-Warshall algorithm** to compute shortest paths between all pairs, since the letter set is small (26).
- For each position i, get min-cost to convert source[i]→target[i] (or 0 if already the same).
- If any such conversion is impossible (cost is ∞), return -1.
- Otherwise, sum the costs.

**Why Floyd-Warshall:**  
- 26 nodes only, so 26³ steps is fast enough.
- Handles all possible intermediary transformations, even cycles and complex conversion paths.

### Corner cases to consider  
- Source and target are identical: cost 0.
- No transformation is possible for a given (source[i], target[i]).
- Source or target strings are empty (should return 0).
- Transformation cycles with reduced cost via indirect paths.
- Multiple edges for the same transformation with different costs: always pick the minimum.
- Operations not needed for some positions (same char).
- All source and target chars are out of the given transformation reach.

### Solution

```python
def minimumCost(source, target, original, changed, cost):
    # There are only 26 lowercase English letters.
    ALPHABET_SIZE = 26

    # Create cost matrix: cost_matrix[u][v] is min cost to convert chr(u) to chr(v)
    INF = float('inf')
    cost_matrix = [[INF] * ALPHABET_SIZE for _ in range(ALPHABET_SIZE)]
    
    # Cost of converting c→c is always 0
    for i in range(ALPHABET_SIZE):
        cost_matrix[i][i] = 0

    # Populate direct conversion costs.
    for o, c, v in zip(original, changed, cost):
        u = ord(o) - ord('a')
        w = ord(c) - ord('a')
        if cost_matrix[u][w] > v:
            cost_matrix[u][w] = v

    # Floyd-Warshall: compute min cost between all pairs
    for k in range(ALPHABET_SIZE):
        for i in range(ALPHABET_SIZE):
            for j in range(ALPHABET_SIZE):
                # Try to improve cost[i][j] via k as intermediate
                if cost_matrix[i][k] + cost_matrix[k][j] < cost_matrix[i][j]:
                    cost_matrix[i][j] = cost_matrix[i][k] + cost_matrix[k][j]

    # Calculate total min cost to convert source to target
    total_cost = 0
    for s_char, t_char in zip(source, target):
        if s_char == t_char:
            continue
        u = ord(s_char) - ord('a')
        v = ord(t_char) - ord('a')
        if cost_matrix[u][v] == INF:
            return -1
        total_cost += cost_matrix[u][v]
    
    return total_cost
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + L³),  
  where N = length of source (to process each character), and L = 26 (number of lowercase English letters).  
  - Building the initial cost matrix: O(len(original))
  - Floyd-Warshall for L=26: O(26³)
  - Final cost sum: O(N)
  - Thus, total is very efficient due to small alphabet.

- **Space Complexity:** O(L²),  
  for the cost matrix (26×26). Other space usage is negligible compared to this.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case where multiple transformations are allowed per position (transform repeatedly within a single position)?
  *Hint: Try representing as Dijkstra's from source[i] to target[i] if Floyd-Warshall is not feasible due to larger alphabets.*

- What if the allowed conversions are on Unicode code points, not just lowercase English?
  *Hint: Floyd-Warshall would become infeasible. Consider an adjacency list and per-node Dijkstra's/BFS as needed.*

- Can you output the actual transformation sequence (not just cost)?
  *Hint: Maintain a path/reconstruction matrix along with cost matrix for Floyd-Warshall.*

### Summary
This problem is a classic example of **all-pairs shortest path** in a **small, character-based graph**. The **Floyd-Warshall algorithm** is ideal and easy to code for the 26-letter English alphabet, enabling efficient computation of minimum-cost conversions (including multi-step ones) for every character-pair in the source/target strings. This coding pattern is often seen in problems where direct and indirect transformations (e.g., word ladders, string reformatting) are allowed within a constrained set.

### Tags
Array(#array), String(#string), Graph(#graph), Shortest Path(#shortest-path)

### Similar Problems
- Can Convert String in K Moves(can-convert-string-in-k-moves) (Medium)
- Minimum Moves to Convert String(minimum-moves-to-convert-string) (Easy)