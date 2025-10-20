### Leetcode 1096 (Hard): Brace Expansion II [Practice](https://leetcode.com/problems/brace-expansion-ii)

### Description  
Given a string expression representing a set of words with curly braces (`{}`) and commas, generate all possible words by expanding the braces according to:
- Comma `,` → union (set “or”)
- Implied concatenation (adjacent elements or groups) → set “cartesian product”
- Braces can be nested arbitrarily deep.

For example, `"a{b,c}d"` should expand to `["abd", "acd"]`. The result should be **sorted** and **duplicates removed**.  
In other words: output all distinct words that can be formed by selecting one option from each brace group and concatenating them, in lexicographical order.

### Examples  

**Example 1:**  
Input: `{ {a,z},a{b,c},{ab,z} }`  
Output: `["a","ab","ac","z"]`  
Explanation:  
- The expression expands to `{a, z}, ab, ac, z` (note that duplicates are merged and result is sorted).

**Example 2:**  
Input: `"{a,b}{c,{d,e}}"`  
Output: `["ac","ad","ae","bc","bd","be"]`  
Explanation:  
- First brace `{a,b}`: choose either "a" or "b"
- Second brace: `{c,{d,e}}` expands to "c", "d", or "e"
- Concatenate each from group 1 with each from group 2

**Example 3:**  
Input: `"{a,b}c{d,e}f"`  
Output: `["acdf","acef","bcdf","bcef"]`  
Explanation:  
- Expand first: "a" or "b"
- Then: "c"
- Then: "d" or "e"
- Then: "f"  
So, possible combinations: `"acdf"`, `"acef"`, `"bcdf"`, `"bcef"`

### Thought Process (as if you’re the interviewee)  

First, there are two main operations:
- **Union:** Delimited by commas inside braces (`{a,b,c}` means "a" or "b" or "c")
- **Concatenation:** Implied by juxtaposition (`a{b,c}d` = [a] × [b,c] × [d])

- The key challenge is dealing with **nested braces** and proper parsing.
- **Brute-force idea:** Try to expand all possible braces one at a time recursively, like a parser, and keep combinatorially generating all possibilities, then sort and remove dups.
- This approach can use **recursion** (DFS), always expanding the innermost brace first, splitting its content by commas, and replacing in the string, then recursively expanding again.
- Tradeoff: Ensures all valid combinations are generated, but can lead to repeated computation if not careful.
- **Optimized approach:** Use recursion to handle splitting and concatenation, and always work with sets to auto-remove duplicates.
- Alternatively (more efficient or code-compact): Use an explicit **stack** to simulate the parsing process, handling unions, products, and nesting.

I prefer the recursive DFS parser: it is conceptually clean and adapts well to nested situations. Stack solutions are more like "expression parser" scenarios.

### Corner cases to consider  
- No braces at all, e.g., `"abc"` (should return `["abc"]`)
- Empty string (should return `[""]`)
- Nested braces, e.g., `"{a,{b,c}}"` (should return `["a","b","c"]`)
- Duplicated outputs (e.g., repeated choices)
- Deeply nested, e.g., `"{a,{b,{c,d}}}"`
- Inputs like `"{a,b}{c,d}{e,f}"`, multiple products
- Braces with empty parts: `{,a}`

### Solution

```python
from typing import List

class Solution:
    def braceExpansionII(self, expression: str) -> List[str]:
        # Helper to perform DFS, returns a set of expanded strings for s[l:r+1]
        def dfs(l, r):
            # Holds top-level comma-separated expressions
            res = set()
            bal = 0
            last = l
            found_comma = False
            for i in range(l, r + 1):
                if expression[i] == '{':
                    bal += 1
                elif expression[i] == '}':
                    bal -= 1
                elif expression[i] == ',' and bal == 0:
                    res |= dfs(last, i - 1)
                    last = i + 1
                    found_comma = True
            if found_comma:
                res |= dfs(last, r)
                return res
            # No commas outside braces: parse as concatenation
            ans = ['']
            i = l
            while i <= r:
                if expression[i] == '{':
                    # Find matching }
                    j, cnt = i, 0
                    while j <= r:
                        if expression[j] == '{':
                            cnt += 1
                        elif expression[j] == '}':
                            cnt -= 1
                        if cnt == 0:
                            break
                        j += 1
                    sub = dfs(i + 1, j - 1)
                    ans = [a + b for a in ans for b in sub]
                    i = j + 1
                else:
                    # Read a sequence of letters until next brace/comma
                    j = i
                    while j <= r and expression[j].isalpha():
                        j += 1
                    part = expression[i:j]
                    ans = [a + part for a in ans]
                    i = j
            return set(ans)

        return sorted(dfs(0, len(expression) - 1))
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  In the worst case, every brace can double the output size, yielding O(2ⁿ) combinations where n is the number of components/choices. So time is O(2ⁿ × m), where m is the average length of each result.
- **Space Complexity:**  
  O(2ⁿ × m): all results stored, plus recursion stack at most the nesting depth.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large outputs efficiently?  
  *Hint: Can you generate results in lexicographical order using a generator/yield instead of a full list?*
  
- What if you need to support digits or upper-case letters?  
  *Hint: Can you generalize your parser to support more characters without code duplication?*
  
- Could you design a similar function for arithmetic expression evaluation with nested parentheses?  
  *Hint: Parsing and operator precedence are similar; recursive descent or stack-based parsing patterns are related.*

### Summary
This problem is a classic **"recursive parsing"** challenge involving sets, unions, and cartesian products, and is closely related to expression parsing and evaluation. It uses **DFS** for brace expansion and can be applied in contexts such as arithmetic expression evaluation, regular expression simplification, and template expansion in compilers or interpreters. Using recursion and sets elegantly handles uniqueness and order requirements.


### Flashcard
Recursive parser handling nested braces—union for comma-separated items, Cartesian product for concatenation; at each level, expand braces and combine results, finally sort and deduplicate.

### Tags
Hash Table(#hash-table), String(#string), Backtracking(#backtracking), Stack(#stack), Breadth-First Search(#breadth-first-search), Sorting(#sorting)

### Similar Problems
- Brace Expansion(brace-expansion) (Medium)