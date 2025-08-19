### Leetcode 651 (Medium): 4 Keys Keyboard [Practice](https://leetcode.com/problems/4-keys-keyboard)

### Description  
Given a special keyboard with four operations:
- **A**: Prints one 'A' on the screen.
- **Ctrl+A**: Selects all text currently on the screen.
- **Ctrl+C**: Copies the selected text to a buffer.
- **Ctrl+V**: Pastes the buffer content onto the screen (appending immediately).

You are given an integer **n**, the total number of allowed keystrokes.  
Your goal is to compute the *maximum* number of 'A's that can be printed on the screen after **n** keystrokes, by choosing the best sequence of these four operations.

### Examples  

**Example 1:**  
Input: `n = 3`  
Output: `3`  
*Explanation: You can only do 3 'A' presses: A, A, A*

**Example 2:**  
Input: `n = 7`  
Output: `9`  
*Explanation:  
A, A, A, Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+V  
At step 3: "AAA".  
Step 4: select all,  
Step 5: copy,  
Step 6: paste ("AAA" more, total 6),  
Step 7: paste again ("AAA" more, total 9)*

**Example 3:**  
Input: `n = 1`  
Output: `1`  
*Explanation: Only enough keystrokes to type one 'A'.*

### Thought Process (as if you’re the interviewee)  

First, let's try the brute-force idea:  
For each keystroke, you can either press 'A', or (when you have enough keystrokes left) you can start a sequence [Ctrl+A, Ctrl+C, then one or more Ctrl+V]. We need to maximize the number of 'A's, given the fixed total keystrokes.

Naively, pressing 'A' repeatedly gives n 'A's. But when n is bigger, using copy-paste may yield more:  
- Do a batch: After writing some 'A's, select all & copy, then paste as many times as possible with the remaining keystrokes.

Dynamic Programming can solve this:  
- Let **dp[i]** be the max 'A's with **i** keystrokes.
- For each **i**, consider:
  - Just type 'A': dp[i - 1] + 1
  - Try all possible splits: for any earlier position **j** (where at least 3 keystrokes remain: Ctrl+A, Ctrl+C, at least 1 Ctrl+V), the result from doing one copy-paste batch:  
    Number: dp[j] × (i - j - 2), where:
      - j: position before starting select/copy,
      - i - j - 2: number of Ctrl+V's possible after select/copy.
    So, dp[i] = max(dp[i], dp[j] × (i - j - 2)) for 1 ≤ j ≤ i-3

Why this approach: It avoids brute-force enumeration of all possibilities—which is exponential—and leverages sub-problem overlap.

### Corner cases to consider  
- n is very small (n = 1, 2, 3): No way to select/copy/paste, can only press 'A'.
- Starting with n < 4: No point in select/copy, must press 'A' only.
- Multiple ways to split into batches—take the optimal at every step.
- n at constraint limit (n = 50): Should remain efficient.

### Solution

```python
def maxA(n: int) -> int:
    # dp[i]: Max number of 'A's obtainable with i keystrokes
    dp = [0] * (n+1)
    
    for i in range(1, n+1):
        # Option 1: just press 'A'
        dp[i] = dp[i-1] + 1
        
        # Option 2: for each possible earlier point, start a copy-paste batch
        for j in range(1, i-2):
            # At position j, do Ctrl+A, Ctrl+C (use up 2 keystrokes)
            # Remaining: i-j-2 for Ctrl+V
            cur = dp[j] * (i - j - 1)
            if cur > dp[i]:
                dp[i] = cur
    return dp[n]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) — For each i (from 1 to n), we consider all possible split points j (also up to n), so double nested loop.
- **Space Complexity:** O(n) — Only need a dp array of size n+1; no recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- Could we reduce the time complexity further?  
  *Hint: Try to reason about whether it's possible to skip checking every j each time. Is there a pattern or greedy property?*

- How would you handle cases where the number of allowed keystrokes is much larger (e.g., n up to 10⁶)?  
  *Hint: Can the DP table be compressed or replaced with math reasoning?*

- What if the operations allowed were different (e.g., no Ctrl+C, or buffer clears with each paste)?  
  *Hint: How does that affect the batching? Try implementing the new constraints in your DP.*

### Summary
We used **Dynamic Programming**: For each number of keystrokes, we computed the best result by considering all possible moments to start a copy-paste batch ("select-copy-paste" sequence), and compared this with simply pressing 'A'. This "optimal substructure" and reuse of smaller solutions make DP the standard approach for such "maximum output given sequence of operations" problems. The batching/copy-paste pattern here also appears in text editor automation, spreadsheet macros, and related optimization scenarios.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming)

### Similar Problems
- 2 Keys Keyboard(2-keys-keyboard) (Medium)