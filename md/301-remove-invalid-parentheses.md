### Leetcode 301 (Hard): Remove Invalid Parentheses [Practice](https://leetcode.com/problems/remove-invalid-parentheses)

### Description  
Given a string containing **parentheses** and possibly **letters**, remove the minimum number of invalid parentheses to make the input string valid (every '(' matches a ')'). Return all possible results in **any order**. You must consider *all* minimal removals, so if there are multiple valid answers, return them all.  
- The string can contain letters in addition to '(' and ')'.

### Examples  

**Example 1:**  
Input: `s = "()())()"`  
Output: `["()()()", "(())()"]`  
*Explanation: Remove the third ')' or the second '('. Both results are valid and minimal.*

**Example 2:**  
Input: `s = "(a)())()"`  
Output: `["(a)()()", "(a())()"]`  
*Explanation: Remove the extra ')'. Both placements give valid outputs.*

**Example 3:**  
Input: `s = ")("`  
Output: `[""]`  
*Explanation: Both parentheses are unmatched, so minimal removals clear them both.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Try **all removal combinations** of parentheses, check which strings are valid, and find those with the fewest removals.
    - Inefficient, as it generates an exponential number of strings.
- **Optimization:**
    - **Count extras:** Scan s to find the minimum number of extra '(' and ')' to remove.
    - **Backtracking/DFS:** Recursively try removing '(' or ')' only up to those counts, ensuring we don’t remove more than needed.  
    - **Prune duplicates:** Use a set to avoid repeated results.
    - **Validate only minimal removals:** Only collect strings that are valid and have the *exact* numbers of removals.
    - **Why this?**: This method only generates necessary removal combinations, and by pruning, saves space and time compared to brute-force.

### Corner cases to consider  
- Empty string `""`
- String with only letters (no parentheses)
- String already valid (no removals needed)
- All parentheses invalid or mismatched (e.g., only '(' or ')', or alternating mismatched)
- Nested valid parentheses
- String with mix of valid and invalid placements

### Solution

```python
def removeInvalidParentheses(s):
    # First, count extra '(' and ')' to remove
    left = right = 0
    for c in s:
        if c == '(':
            left += 1
        elif c == ')':
            if left > 0:
                left -= 1
            else:
                right += 1

    res = set()

    def dfs(index, path, l_rem, r_rem, open_count):
        # Base case: end of string
        if index == len(s):
            if l_rem == 0 and r_rem == 0 and open_count == 0:
                res.add(path)
            return

        c = s[index]
        if c == '(':
            # Remove '(' if any remain to remove
            if l_rem > 0:
                dfs(index+1, path, l_rem-1, r_rem, open_count)
            # Keep '('
            dfs(index+1, path+c, l_rem, r_rem, open_count+1)
        elif c == ')':
            # Remove ')'
            if r_rem > 0:
                dfs(index+1, path, l_rem, r_rem-1, open_count)
            # Keep ')' if there is a matching '('
            if open_count > 0:
                dfs(index+1, path+c, l_rem, r_rem, open_count-1)
        else:
            # Always keep letters
            dfs(index+1, path+c, l_rem, r_rem, open_count)

    dfs(0, "", left, right, 0)
    return list(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(2ⁿ), since each parenthesis can be included or excluded, but pruning and deduplication (via set) lessen practical cases. For n = string length.
- **Space Complexity:** O(n × num_results), for recursion stack of up to O(n) and storing all possible minimal results.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the code if you also had to remove **letters** to create valid strings?  
  *Hint: Treat letters like parentheses, increase possibilities when removing.*

- Can we **return only one** valid result instead of all?  
  *Hint: Stop recursion when the first valid solution is found ("early return").*

- How would you find the **minimum number of removals** but not generate all answers?  
  *Hint: Just count l_rem + r_rem after the counting scan.*

### Summary
This problem is a classic **DFS/backtracking + pruning + deduplication** challenge. It focuses on minimizing operations (removals) and generating all shortest possible solutions, combining **counting, stateful recursion, and combinatorial exploration**. This coding pattern is seen in problems needing “all optimal solutions” with constraints, and can be adapted for balanced substring problems, bracket matching, and string correction tasks.


### Flashcard
Optimize by counting extra parentheses and using backtracking to remove them, ensuring minimal removals and avoiding duplicates.

### Tags
String(#string), Backtracking(#backtracking), Breadth-First Search(#breadth-first-search)

### Similar Problems
- Valid Parentheses(valid-parentheses) (Easy)
- Minimum Number of Swaps to Make the String Balanced(minimum-number-of-swaps-to-make-the-string-balanced) (Medium)