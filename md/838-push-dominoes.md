### Leetcode 838 (Medium): Push Dominoes [Practice](https://leetcode.com/problems/push-dominoes)

### Description  
You are given a string representing dominoes placed in a line, where each character is either `'L'` (pushed to the left), `'R'` (pushed to the right), or `'.'` (standing upright). At the same time, all pushed dominoes begin to fall in their direction and can push adjacent upright dominoes. Each second, any domino falling will push its immediate neighbor that is upright. If a domino receives a push from both directions in the same second, it remains upright. Return a string representing the final state after all dominoes have fallen.

### Examples  

**Example 1:**  
Input: `".L.R...LR..L.."`  
Output: `"LL.RR.LLRRLL.."`  
*Explanation: Dominoes are affected in phases: leftmost `L` turns those before it left, `R` pushes right, opposing forces leave some upright, and so on.*

**Example 2:**  
Input: `"RR.L"`  
Output: `"RR.L"`  
*Explanation: The dominoes to the left of `L` remain unaffected because right pushes stop before `L`. No dominoes clash in the middle.*

**Example 3:**  
Input: `".R..L."`  
Output: `".RRLL."`  
*Explanation: `R` pushes right and `L` pushes left. The domino in the middle gets equal pushes from both sides at the same time and remains upright.*

### Thought Process (as if you’re the interviewee)  
First, a **brute-force simulation** would check every domino each second, update based on neighbors, and repeat until no changes. But that's inefficient: O(n²).

A better way is to realize each domino will only be affected by its nearest influential `L` or `R`.  
Let's scan left-to-right, marking distance to last `R`, then right-to-left for last `L`:

- For each `'.'`, compare distances to the nearest `L` and `R`. 
- If they're equally close, it stays `'.'`.
- If closer to `R` (and no opposing `L`), it becomes `R`.
- If closer to `L` (and no opposing `R`), it becomes `L`.

However, an even cleaner approach (see code below) is to scan once, tracking positions of last seen `L` and `R`, and directly update final state using these rules. When an `R` is followed by an `L`, all dominoes between them fall inward until they meet or cross[2][3].

This approach is O(n) and avoids repeated updates.

### Corner cases to consider  
- Input is an empty string
- No `L` or no `R` present
- Only one domino
- Long sequences of dots between pushes
- Multiple opposing pushes with equal gap

### Solution

```python
def pushDominoes(dominoes: str) -> str:
    n = len(dominoes)
    ans = list(dominoes)
    L = -1  # Last seen L position
    R = -1  # Last seen R position
    
    for i in range(n + 1):
        ch = dominoes[i] if i < n else 'R'  # Sentinel to flush any remaining 'R's
        if ch == 'R':
            if R > L:
                # Fill all . with 'R' from R to i-1
                for j in range(R + 1, i):
                    ans[j] = 'R'
            R = i
        elif ch == 'L':
            if R > L:
                # Fill inward from both ends (R...L)
                l, r = R + 1, i - 1
                while l < r:
                    ans[l] = 'R'
                    ans[r] = 'L'
                    l += 1
                    r -= 1
                # Leave middle '.' alone if odd gap
            else:
                # Fill all . with 'L' from L+1 to i-1
                for j in range(L + 1, i):
                    ans[j] = 'L'
            L = i
    return ''.join(ans)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We process each domino at most twice.
- **Space Complexity:** O(n) — For the output array holding the final state.

### Potential follow-up questions (as if you’re the interviewer)  

- What if each domino could only fall once, even if pushed again later?  
  *Hint: Only the very first force should count per domino.*

- How would you handle multiple dominoes being initially pushed at once, or different speeds?  
  *Hint: Could adapt BFS or record timestamps for each push.*

- Can you generate the step-by-step intermediate states instead of only the final one?  
  *Hint: Simulate second by second, updating all at each time step.*

### Summary
This problem uses a **two-pointer and segment update pattern**. It avoids brute-force simulation by recording the last seen pushes and resolving stretches in a single scan. This efficient “fall toward each other” logic appears in other string transform, propagation, and spread problems. The technique is useful anywhere “nearest influence” is the main factor, and especially in 1-D chain reaction or propagation scenarios.

### Tags
Two Pointers(#two-pointers), String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
