### Leetcode 1061 (Medium): Lexicographically Smallest Equivalent String [Practice](https://leetcode.com/problems/lexicographically-smallest-equivalent-string)

### Description  
Given three strings **s1**, **s2**, and **baseStr** (all consisting of lowercase letters), **s1** and **s2** define a set of equivalence relationships: for each index 0 ≤ i < len(s1), **s1[i]** is equivalent to **s2[i]**. This equivalence is reflexive, symmetric, and transitive, so entire groups of characters may be considered equivalent. The goal is to transform **baseStr** by replacing each character with the **smallest lexicographical character** in its equivalence group, constructing the smallest possible string according to dictionary order.

### Examples  

**Example 1:**  
Input: `s1 = "parker"`, `s2 = "morris"`, `baseStr = "parser"`  
Output: `makkek`  
Explanation: `m < p`, `a < o`, `k < r/s`, `e < i`. Groups: [m,p], [a,o], [k,r,s], [e,i]. Replace using the smallest in each group.

**Example 2:**  
Input: `s1 = "hello"`, `s2 = "world"`, `baseStr = "hold"`  
Output: `hdld`  
Explanation: 'h' not equivalent to others, 'o' and 'e' equivalent, 'l' and 'r' equivalent, 'd' no mapping. Replace each character accordingly.

**Example 3:**  
Input: `s1 = "abc"`, `s2 = "cde"`, `baseStr = "eed"`  
Output: `aab`  
Explanation: Groups: [a,c,e], [b,d]. For 'e', use 'a'; for 'd', use 'b'.

### Thought Process (as if you’re the interviewee)  

Start by modeling each **character equivalency** as a group, combining characters transitively. Since only 26 lowercase letters are used, this is manageable with a **Union Find / Disjoint Set** structure:

- Each letter has a parent pointer, initially itself.
- For each pair of equivalent letters (from **s1** and **s2**), perform a union so their groups merge.
- Always union towards the **smallest lexicographical character** as the root of the group, ensuring it's easy to find the correct replacement for each character.
- Finally, for each character in **baseStr**, replace it with its group's lexicographical minimum.

Brute force would require repeatedly checking all equivalencies for each character—inefficient, especially with chained equivalence. The **Union Find** approach is much better in both clarity and performance for 26 letters.

### Corner cases to consider  
- One or more strings are empty.
- Characters in **baseStr** have no equivalence in **s1** or **s2**.
- Multiple equivalence chains merging (e.g., 'a' == 'b', 'b' == 'c', etc.).
- All characters are already minimal.
- Characters mapping onto themselves.

### Solution

```python
def smallestEquivalentString(s1: str, s2: str, baseStr: str) -> str:
    # Helper: Find with path compression, always mapping to lex smallest
    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    # Helper: Union, always keeping smaller root as representative
    def union(x, y):
        px, py = find(x), find(y)
        if px != py:
            if px < py:
                parent[py] = px
            else:
                parent[px] = py

    # Only lowercase letters, use their ordinals for indices
    parent = [i for i in range(26)]  # 0:'a', 25:'z'

    for a, b in zip(s1, s2):
        union(ord(a) - ord('a'), ord(b) - ord('a'))

    result = []
    for c in baseStr:
        min_char_idx = find(ord(c) - ord('a'))
        result.append(chr(min_char_idx + ord('a')))
    return ''.join(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + M), where N = len(s1) (doing unions for each pair), and M = len(baseStr) (lookups). Each Union-Find operation is nearly constant (`O(1)` amortized for 26 elements).
- **Space Complexity:** O(1), since parent array is always size 26 (constant), and result uses extra O(M) for building the output string.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the characters came from an extended alphabet (e.g., Unicode)?  
  *Hint: Would you still use a 26-size array? How would you scale Union Find?*

- How do you handle dynamically adding or removing equivalency relationships?  
  *Hint: Is DSU always efficient for such operations? What trade-offs arise?*

- If each replacement had a non-uniform cost, how would you adjust the approach?  
  *Hint: Could you adapt Dijkstra or a shortest-path algorithm?*

### Summary
This problem uses the **Union Find / Disjoint Set Union (DSU)** pattern for efficiently managing equivalence groups and enforcing lexicographical parent/root choice. This approach is common for grouping with transitive closure (e.g., friend circles, minimum equivalence classes, network grouping), and is powerful whenever you need to dynamically combine and query subsets or groups.


### Flashcard
Use Union Find to group equivalent characters, always linking to the smallest letter, then build the result by mapping each character to its group's root.

### Tags
String(#string), Union Find(#union-find)

### Similar Problems
- Lexicographically Smallest Generated String(lexicographically-smallest-generated-string) (Hard)