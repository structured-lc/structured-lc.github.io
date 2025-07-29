### Leetcode 282 (Hard): Expression Add Operators [Practice](https://leetcode.com/problems/expression-add-operators)

### Description  
Given a string `num` containing only digits and an integer `target`, insert the operators `+`, `-`, or `*` between the digits so the resulting mathematical expression evaluates to the `target` value. All digits must be used in order, and you can't reorder or skip any. No multiple-digit numbers in an expression can have leading zeros. Return all valid expressions as a list of strings.

### Examples  

**Example 1:**  
Input: `num = "123", target = 6`  
Output: `["1+2+3", "1*2*3"]`  
*Explanation: Both "1+2+3" and "1*2*3" evaluate to 6 (1+2+3=6, 1\*2\*3=6).*

**Example 2:**  
Input: `num = "232", target = 8`  
Output: `["2*3+2", "2+3*2"]`  
*Explanation: "2\*3+2" = 8, and "2+3\*2" = 8.*

**Example 3:**  
Input: `num = "105", target = 5`  
Output: `["1*0+5", "10-5"]`  
*Explanation: "1\*0+5" = 0+5=5 and "10-5" = 5. "1+0+5" or "1-0+5" are invalid as they don't reach the target. Multi-digit with leading zero (e.g. "05") is invalid.*

### Thought Process (as if you’re the interviewee)  

The naive approach is to try every possible way to insert the operators at every position between digits and evaluate if the resulting string equals the target. Since operator precedence (\*) applies, careful calculation is required: use backtracking to recursively explore all possible combinations, tracking the current value of the expression, the last operand (to properly handle multiplication precedence), and the current string formed.

- At each recursive step, build the next operand by extending it with the next digit (support multi-digit numbers).
- Only allow multi-digit numbers without leading zeros.
- For each operand, try to:
  - Add '+' (result updates: total_sum + curr_operand)
  - Add '-' (result updates: total_sum - curr_operand)
  - Add '*' (result: subtract the last operand (because it was previously added or subtracted) and add last_operand * curr_operand, to account for precedence).
- On reaching the end of the digit string, check if the cumulative value matches the target; if so, add the expression to results.

Trade-offs:  
- Brute force enumerates every combination (time-consuming but ensures correctness) and pruning is done for leading zeros.
- Space is proportional to the number of expressions formed and the call stack.

### Corner cases to consider  
- String of length 1 (e.g., `num="5"`)
- Multi-digit numbers with leading zeros (e.g., `"105"`) — not allowed except the single digit '0'
- Negative targets; large positive/negative values
- No possible expression reaches the target (should return an empty list)
- Only plus/minus produces result (no multiply possible)
- Correct handling of operator precedence for '*' (1+2\*3 should be 7, not 9)

### Solution

```python
from typing import List

class Solution:
    def addOperators(self, num: str, target: int) -> List[str]:
        res = []
        
        def backtrack(index, path, value, last):
            # Base case: reached end of input string
            if index == len(num):
                if value == target:
                    res.append(path)
                return

            for i in range(index, len(num)):
                # Prevent leading zeros
                if i != index and num[index] == '0':
                    break
                curr_str = num[index:i+1]
                curr_num = int(curr_str)
                
                if index == 0:
                    # First num, just add it, don't add operator
                    backtrack(i+1, curr_str, curr_num, curr_num)
                else:
                    # Plus
                    backtrack(i+1, path + "+" + curr_str, value + curr_num, curr_num)
                    # Minus
                    backtrack(i+1, path + "-" + curr_str, value - curr_num, -curr_num)
                    # Multiply
                    backtrack(i+1, path + "*" + curr_str, value - last + last * curr_num, last * curr_num)
        
        backtrack(0, "", 0, 0)
        return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(4ⁿ), where n is the length of `num`. At each position, up to 3 operator choices, not counting substring splits.  
  Realistically, the number is less due to the restriction on leading zeros and input length (≤10).

- **Space Complexity:**  
  O(n) recursion stack depth, plus O(result count × n) for storing all valid expressions (each up to n length).

### Potential follow-up questions (as if you’re the interviewer)  

- What changes if operator precedence was different (e.g., without \*, or adding /)?  
  *Hint: Operator handling logic would need to be adapted—especially for multiplication or division.*

- How would you handle very large numbers in input (string longer than 10 digits)?  
  *Hint: Consider pruning branches early, possibly DP or iterative solution.*

- Can this be done in an iterative fashion, or only recursively?  
  *Hint: A stack-based approach could be used but recursion naturally expresses the branching structure.*

### Summary
This problem uses the **backtracking** pattern to exhaustively search all valid operator insertions between digits. Special attention is paid to operator precedence and handling multi-digit segments without leading zeros. The core principles are similar to other backtracking combinatorial search problems, such as generating all valid equations, all parentheses combinations, or partitioning strings.