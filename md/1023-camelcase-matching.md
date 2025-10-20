### Leetcode 1023 (Medium): Camelcase Matching [Practice](https://leetcode.com/problems/camelcase-matching)

### Description  
Given an array of strings **queries** and a string **pattern**, determine for each query whether you can insert any number of lowercase letters into `pattern` to get the query.  
Insertions can occur anywhere (including at the start or end) and any number of times, but **uppercase letters** in the query must match the uppercase pattern order exactly – you cannot delete or add uppercase letters that aren't in `pattern` at that place.  
Return a boolean list where each value corresponds to whether `queries[i]` matches `pattern`.

### Examples  

**Example 1:**  
Input: `queries = ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"]`, `pattern = "FB"`  
Output: `[true, false, true, true, false]`  
*Explanation:*
- "FooBar":  Can insert 'o' between 'F' and 'B' → matches, so `true`
- "FooBarTest":  Extra uppercase 'T', not in pattern → `false`
- "FootBall":  'Foot' (inserted), then "B" is at right place → `true`
- "FrameBuffer":  'Frame' + 'Buffer' → matches "FB", so `true`
- "ForceFeedBack":  Extra uppercase 'F' and 'B' needed → too many, so `false`

**Example 2:**  
Input: `queries = ["CompetitiveProgramming","CounterPick","ControlPanel"]`, `pattern = "CooP"`  
Output: `[false, false, true]`  
*Explanation:*
- Only "ControlPanel" has uppercase C, P in order, and matches the rest with inserts; the others do not.

**Example 3:**  
Input: `queries = ["SoftwareEngineer","SeniorEngineer"]`, `pattern = "SE"`  
Output: `[true, true]`  
*Explanation:*
- Both have uppercase 'S' and 'E' in correct pattern order, rest of letters can be inserted.

### Thought Process (as if you’re the interviewee)  
Start by comparing each query with the pattern using **two pointers**:
- One pointer for the query, one for the pattern.
- Move through the query letter by letter:
  - If the query letter matches the current pattern letter, advance both pointers.
  - If it doesn't match:
    - If the query letter is **lowercase**, skip it (it can be “inserted”);
    - If it’s an **uppercase** letter and it doesn't match pattern, it means you have an uppercase in the wrong spot (or too many), so **return false for this query**.
- After finishing the pattern, if there are leftover letters in the query, ensure none are uppercase.
- If all pattern letters are matched in order in the query, and no extra uppercase remain, return **true**; else, **false**.

This brute force approach is efficient since each query and pattern are compared linearly.

### Corner cases to consider  
- **Empty pattern**: Only queries without uppercase letters match.
- **Pattern longer than query**: Should always return `false`.
- **Query with extra uppercase**: Should return `false`.
- **Pattern or query with only lowercase letters**: All lowercases are allowed to be inserted.
- **Pattern with duplicate uppercase letters**: Has to match in order and frequency.
- **Query or pattern is empty string**: Handled per above.

### Solution

```python
def camelMatch(queries, pattern):
    def matches(query, pattern):
        i = j = 0
        while i < len(query) and j < len(pattern):
            if query[i] == pattern[j]:
                i += 1
                j += 1
            elif query[i].islower():
                i += 1
            else:  # Uppercase that doesn't match pattern
                return False
        # All pattern used? Check the rest of query for stray uppercase
        if j < len(pattern):
            return False
        # Only lowercase can remain after pattern is finished
        while i < len(query):
            if query[i].isupper():
                return False
            i += 1
        return True
    
    return [matches(query, pattern) for query in queries]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(Q × M), where Q is the number of queries and M the average length of each query.
- **Space Complexity:** O(Q), for the output list. The matching function uses O(1) auxiliary space per call (no new data structures that scale with input size).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle *wildcard characters* in the pattern?  
  *Hint: Consider extending the matching logic for special characters.*

- How would you match if both pattern and query could have lowercase “insertions” at any position?  
  *Hint: Consider LCS (longest common subsequence), but with constraints for uppercase.*

- What if *matching must be case-insensitive*?  
  *Hint: Lower-case both and adjust how uppercase matches are handled.*

### Summary
This problem uses the **two pointers** pattern to match a string pattern within another string, allowing "insertion" of lowercase characters but requiring strict order and presence of all uppercase letters.  
This pattern is common for problems where you compare two strings with allowed skips or insertions, such as subsequence problems or pattern matching with wildcards.


### Flashcard
Use two pointers to match query and pattern; skip extra lowercase in query, fail if uppercase mismatch.

### Tags
Array(#array), Two Pointers(#two-pointers), String(#string), Trie(#trie), String Matching(#string-matching)

### Similar Problems
