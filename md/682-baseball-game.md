### Leetcode 682 (Easy): Baseball Game [Practice](https://leetcode.com/problems/baseball-game)

### Description  
You’re given a list of operations representing a simplified scoring system for a baseball game.  
Each operation is either an integer (the point value for a round), "+", "D", or "C":
- An integer \(x\): add this as a new score for this round.
- "+" (plus): add a new score which is the sum of the previous two scores.
- "D" (double): add a new score which is double the previous round’s score.
- "C" (cancel): remove the previous round’s score (invalidate it).  
All operations are valid and follow the above rules.  
Return the sum of all values on the record after all operations.

### Examples  

**Example 1:**  
Input: `["5","2","C","D","+"]`  
Output: `30`  
Explanation:  
- "5" → [5]  
- "2" → [5, 2]  
- "C" → [5] (removes 2)
- "D" → [5, 10] (double 5)
- "+" → [5, 10, 15] (5+10)  
Sum is 5 + 10 + 15 = 30

**Example 2:**  
Input: `["5","-2","4","C","D","9","+","+"]`  
Output: `27`  
Explanation:  
- "5" → [5]  
- "-2" → [5, -2]  
- "4" → [5, -2, 4]  
- "C" → [5, -2] (removes 4)  
- "D" → [5, -2, -4] (double -2: -2×2)  
- "9" → [5, -2, -4, 9]  
- "+" → [5, -2, -4, 9, 5] (9+(-4))
- "+" → [5, -2, -4, 9, 5, 14] (5+9)
Sum: 5 + (-2) + (-4) + 9 + 5 + 14 = 27

**Example 3:**  
Input: `["1","C"]`  
Output: `0`  
Explanation:  
- "1" → [1]
- "C" → [] (removes 1)  
Sum: 0

### Thought Process (as if you’re the interviewee)  
- First, I’ll need to **track the score record**, as changes are made sequentially and can refer to previous entries (for "+", "D", "C").
- The **brute-force** idea would be to simulate the operations literally, using an array/list to store scores and modify as we go.
- Every operation can be processed in O(1), since push/pop are O(1) for lists used as stacks in Python.
- For each op:
    - If it’s an integer (string), add it as a number.
    - If it’s "C", pop the last score.
    - If it’s "D", double the last score and add.
    - If it’s "+", sum the last two scores and add the result.
- **Edge handling:** The problem guarantees valid operations, so we don’t have to worry about missing previous elements.
- No major optimizations beyond this basic simulation; all operations work in one pass.

### Corner cases to consider  
- No operations (`[]`) → Output `0`.
- All operations are "C" → Could empty the record.
- Negative integers in operations.
- Multiple consecutive "C" operations.
- The minimum/maximum possible values for integers.
- Summing to zero (add numbers, then cancel all with "C").

### Solution

```python
def calPoints(ops):
    record = []
    for op in ops:
        if op == "C":
            # Remove last score
            if record:
                record.pop()
        elif op == "D":
            # Double last score
            if record:
                record.append(2 * record[-1])
        elif op == "+":
            # Sum last two scores
            if len(record) >= 2:
                record.append(record[-1] + record[-2])
            elif len(record) == 1:
                record.append(record[-1])
        else:
            # Integer, add as new score
            record.append(int(op))
    return sum(record)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Every operation is processed once. Each append/pop/sum is O(1); we only sum at the end.
- **Space Complexity:** O(n)  
  We store a list of up to n scores (in the worst case, every operation is a number).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case if operations can be invalid (e.g., "C" with an empty record)?
  *Hint: Add extra validation for each operation before performing actions on the record.*

- How would you process huge input that doesn't fit in memory?
  *Hint: Can you summarize or stream the total if you don’t need the exact history?*

- If each operation came in a stream with only current and previous value available, could you still compute the sum?
  *Hint: Would require tracking only last two numbers and adjusting logic for "C".*

### Summary
We used the **stack pattern** for history tracking, enabling efficient simulation of operations and undo actions. This technique (tracking history and undo) is common in problems dealing with undo/redo functionality, expression evaluation, or stack-based algorithms. It’s broadly applicable wherever you need to manage a rolling record of actions and handle reversals or compound operations based on immediate history.