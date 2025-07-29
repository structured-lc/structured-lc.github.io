### Leetcode 1087 (Medium): Brace Expansion [Practice](https://leetcode.com/problems/brace-expansion)

### Description  
Given a string representing words that may include groups of characters inside braces, generate all possible combinations of those words. Each character position in the string either represents a single letter or a group of letter options within braces (`{a,b,...}`), where the options inside braces are separated by commas. For example, the input `"a{b,c}"` should return all possible strings formed by choosing one option per position, resulting in `["ab","ac"]`. The task is to return all such combinations in lexicographical (dictionary) order.  
- Braces do not nest.
- Each letter inside braces is unique.

### Examples  

**Example 1:**  
Input: `"{a,b}c{d,e}f"`  
Output: `["acdf", "acef", "bcdf", "bcef"]`  
Explanation: Expand each group: pick 'a' or 'b', 'c', then 'd' or 'e', then 'f'. All possible combinations, sorted.

**Example 2:**  
Input: `"abcd"`  
Output: `["abcd"]`  
Explanation: No braces. Only the original string.

**Example 3:**  
Input: `"a{b,c,d}e"`  
Output: `["abe", "ace", "ade"]`  
Explanation: Pick 'b', 'c', or 'd' for the second character, with 'a' and 'e' fixed.

### Thought Process (as if you’re the interviewee)  
First, I need to parse the input string and extract, for each "slot" in the output word, the possible letter options.  
If a character isn't wrapped in braces, it is a single option. If it is part of a group in `{}`, extract and split by comma, sort the options as required for lex order.  
Once all options by position are collected (a list of option-lists), I can recursively build each combination using DFS or backtracking: at each index, try all choices for that position and recurse for the rest.  
After collecting all words, sort them lexicographically if not already sorted (but if we process options in sorted order, the output will be sorted).

Why not BFS? Since it's a combinatorial explosion but doesn't require level-by-level processing—DFS/backtracking is natural for permutation building.

### Corner cases to consider  
- Only one letter, no braces: `"a"`
- Multiple braces back-to-back: `"{a,b}{c,d}"`
- Input with only braces: `"{a,b}"`
- Empty braces: technically not possible as per constraints
- Minimum string length (1 char)
- Braces at start/end: `"{a,b}c"`, `"a{b,c}"`

### Solution

```python
def expand(s: str):
    # Step 1: Parse the string into a list of options for each position
    options = []
    i = 0
    n = len(s)
    while i < n:
        if s[i] == '{':
            i += 1
            group = []
            while s[i] != '}':
                if s[i] != ',':
                    group.append(s[i])
                i += 1
            group.sort()
            options.append(group)
            i += 1  # Skip the '}'
        else:
            options.append([s[i]])
            i += 1

    res = []
    
    # Step 2: Use backtracking to build all combinations
    def dfs(pos, path):
        if pos == len(options):
            res.append(''.join(path))
            return
        for c in options[pos]:
            path.append(c)
            dfs(pos + 1, path)
            path.pop()
    
    dfs(0, [])
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(∏ₖ nₖ), where nₖ is the number of options at the kᵗʰ position. In the worst case (all positions are full braces), it's O(2ⁿ) or O(3ⁿ), exponential with input length.
- **Space Complexity:** O(∏ₖ nₖ) for the result list, plus O(L) recursion stack (L = length of the options list) and intermediate storage for parsed options.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the braces could nest?
  *Hint: How would your parser need to change? Could you use a stack?*

- What if the resulting list is too big to fit in memory?
  *Hint: Could you use a generator/yield pattern or output results as you generate them?*

- Could you do it iteratively (without recursion)?
  *Hint: Try simulating backtracking with an explicit stack or queue.*

### Summary
This problem is a classic **combinatorial recursion/backtracking** task: parse the structured input into a list of choices, then enumerate all possible outputs by generating one choice per position in a depth-first manner. DFS/backtracking is a common pattern—also applicable to word/number permutations, n-ary cartesian products, and matrix fill problems. Parsing the string carefully to handle brace groups is key. The output is sorted lexicographically by always processing each options group in sorted order.