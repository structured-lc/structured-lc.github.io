### Leetcode 3481 (Medium): Apply Substitutions [Practice](https://leetcode.com/problems/apply-substitutions)

### Description  
Given a string `text` that may contain placeholders in the format `%var%`, and a list of replacements where each mapping replaces a placeholder key with a string, replace every placeholder with its corresponding value recursively. Placeholders in the values are also substituted, until the resulting string contains no placeholders. The replacement process should be repeated until all nested and chained substitutions are resolved, resulting in a final string with no `%var%` placeholders.

### Examples  

**Example 1:**  
Input: `replacements = [["a", "x"]], text = "foo%a%bar"`  
Output: `"fooxbar"`  
*Explanation: `%a%` in the input text is mapped to `"x"`, so the final string is `"foo" + "x" + "bar" = "fooxbar"`.*

**Example 2:**  
Input: `replacements = [["a", "b"], ["b", "c"], ["c", "d"]], text = "A%a%Z"`  
Output: `"A d Z"`  
*Explanation:*
- `%a%` → `"b"`
- Then `%b%` → `"c"`
- Then `%c%` → `"d"`
- Substitution is recursive, so the final is `"A" + "d" + "Z" = "AdZ"`.*

**Example 3:**  
Input: `replacements = [["a", "%b%"], ["b", "%c%"], ["c", "z"]], text = "%a%"`  
Output: `"z"`  
*Explanation:*
- `%a%` becomes `%b%`
- `%b%` becomes `%c%`
- `%c%` becomes `"z"`
- So, after all replacements, output is `"z"`.*

### Thought Process (as if you’re the interviewee)  
First, we need to recognize that the text might include multiple layers of placeholders, and the values themselves might carry more placeholders. Brute-force would be to replace all placeholders in the text once, but that doesn't handle recursion. So, we need to:
- Build a dictionary for fast access of placeholder replacements.
- Traverse the text and every time we see `%<var>%`, recursively replace that placeholder with its value, handling the possibility that replacements themselves contain other placeholders.
- Continue replacements until the string contains no more `%<var>%` patterns.
- Careful: cycles (e.g., `%a%` → `%b%`, `%b%` → `%a%`) can cause infinite loops; we assume the input guarantees no cycles.

A recursive DFS approach works best, where for each placeholder we:
- Replace the first encountered `%<var>%` by its mapping (fully resolved by calling the same function on its replacement value).
- Continue this replacement recursively until there's no `%<var>%` substring left in the text.

This is similar in spirit to resolving symbols in logic, or variable expansion in scripting.

### Corner cases to consider  
- Empty text: input text is "".
- No placeholders in text: text contains no `%`.
- Placeholder not present in replacements: key not found.
- Placeholder values resolve to "", make entire output empty.
- Nested placeholders (multiple layers of indirection).
- Placeholders repeated multiple times.
- Chained long substitutions.
- Cycles in replacements (should not be present according to problem).

### Solution

```python
def apply_substitutions(replacements, text):
    # Build mapping from key to replacement string
    mapping = {}
    for key, value in replacements:
        mapping[key] = value

    # Recursive function to resolve all placeholders in a string
    def dfs(s):
        i = s.find('%')
        if i == -1:
            return s
        j = s.find('%', i + 1)
        if j == -1:
            return s  # Unmatched %, treat as literal
        key = s[i+1:j]
        # Lookup replacement (empty if not found)
        replacement = dfs(mapping.get(key, ''))
        # Replace the placeholder with its fully resolved value and recurse
        return s[:i] + replacement + dfs(s[j+1:])

    return dfs(text)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  Each time we replace a placeholder, we might produce a string nearly as large as the input. If there are many nested or repeated placeholders, this becomes quadratic in the worst case.
- **Space Complexity:** O(m + n)  
  Where m = number of replacements, n = length of the text—mapping storage plus recursion stack and any intermediate text.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle cyclic substitutions, e.g. `a` → `%b%`, `b` → `%a%`?  
  *Hint: Keep a visited set (like in cycle detection in graphs).*

- What if the replacements can be huge or deeply nested?  
  *Hint: Could we limit recursion depth, or preprocess all resolutions before substitution?*

- How do you handle the case when a placeholder is not in the replacements list?  
  *Hint: Should it be left as is, replaced with empty string, or trigger an error?*

### Summary
This problem is a textbook example of recursive string replacement with mapping lookup, modeled by DFS pattern. The key coding pattern is recursive substitution, similar to variable expansion in interpreters or macro preprocessors. Recognizing and handling indirect and chained substitutions recursively is crucial. This technique applies to problems like symbolic replacements, template expansion, and configuration file resolution.