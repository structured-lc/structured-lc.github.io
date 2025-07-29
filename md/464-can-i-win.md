### Leetcode 464 (Medium): Can I Win [Practice](https://leetcode.com/problems/can-i-win)

### Description  
In the "100 game" two players take turns adding, to a running total, any integer from 1 to maxChoosableInteger. The player who first causes the running total to reach or exceed desiredTotal wins. Players cannot re-use integers. Given maxChoosableInteger and desiredTotal, return true if the first player can force a win, otherwise return false. Assume both players play optimally.

### Examples  

**Example 1:**  
Input: `maxChoosableInteger = 10, desiredTotal = 11`  
Output: `false`  
*Explanation: No matter which integer the first player chooses, the first player will lose. If the first player chooses 1, the second player can choose 10 and get total = 11. Same with other integers - the second player will always win.*

**Example 2:**  
Input: `maxChoosableInteger = 10, desiredTotal = 0`  
Output: `true`  
*Explanation: The first player wins immediately since the total is already ≥ 0.*

**Example 3:**  
Input: `maxChoosableInteger = 10, desiredTotal = 1`  
Output: `true`  
*Explanation: The first player can choose 1 and win immediately.*


### Thought Process (as if you're the interviewee)  
This is a classic game theory problem that requires minimax thinking with memoization.

**Key Insights:**
1. Both players play optimally - they choose the best move available
2. A player wins if they can make a move that reaches/exceeds the target
3. A player can force a win if there exists at least one move that puts the opponent in a losing position
4. We need to track which numbers have been used (state)

**Approach - Minimax with Memoization:**
1. Use recursion to explore all possible game states
2. For each state, try all available numbers for the current player
3. A player can win if any of their moves leads to a state where the opponent cannot win
4. Use memoization to avoid recalculating the same states
5. Represent the state using a bitmask of used numbers

**State Representation:**
Since maxChoosableInteger ≤ 20, we can use a bitmask (integer) to represent which numbers have been used. Bit i is set if number i+1 has been used.

**Base Cases:**
- If the largest available number ≥ remaining target, current player wins
- If no moves lead to opponent losing, current player loses


### Corner cases to consider  
- desiredTotal ≤ maxChoosableInteger: First player wins immediately  
- Sum of all numbers < desiredTotal: No one can win (though problem guarantees a solution exists)  
- desiredTotal = 0: First player wins immediately  
- All numbers already used: Edge case in recursion  


### Solution

```python
# Just like in interviews, please do not use python libraries to take shortcuts.
# They aren't usually allowed in real interviews.
# Add comments to each step of your logic

def canIWin(maxChoosableInteger, desiredTotal):
    # Quick win check - if largest number can win immediately
    if maxChoosableInteger >= desiredTotal:
        return True
    
    # Check if the game is winnable at all
    total_sum = maxChoosableInteger * (maxChoosableInteger + 1) // 2
    if total_sum < desiredTotal:
        return False
    
    # Memoization cache: state -> can_current_player_win
    memo = {}
    
    def can_win(used_mask, remaining_target):
        # Check if this state has been computed before
        if used_mask in memo:
            return memo[used_mask]
        
        # Try each available number for current player
        for i in range(maxChoosableInteger):
            # If number i+1 is available (not used)
            if not (used_mask & (1 << i)):
                number = i + 1
                
                # If choosing this number wins immediately
                if number >= remaining_target:
                    memo[used_mask] = True
                    return True
                
                # If choosing this number puts opponent in losing position
                new_mask = used_mask | (1 << i)
                new_target = remaining_target - number
                
                if not can_win(new_mask, new_target):
                    memo[used_mask] = True
                    return True
        
        # If no winning move found, current player loses
        memo[used_mask] = False
        return False
    
    # Start with no numbers used and full target
    return can_win(0, desiredTotal)

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(2^n × n) where n = maxChoosableInteger. There are 2^n possible states (subsets of used numbers), and for each state we try up to n numbers. With memoization, each state is computed only once.
- **Space Complexity:** O(2^n) for the memoization cache storing results for all possible states, plus O(n) for recursion stack depth.


### Potential follow-up questions (as if you're the interviewer)  

- How would you modify this if players could reuse numbers?  
  *Hint: The state would only need to track the remaining target, not which numbers are used. Much simpler problem.*

- What if there were more than 2 players?  
  *Hint: The recursive structure becomes more complex as you need to consider all players' optimal strategies, not just win/lose for current player.*

- Can you solve this iteratively instead of recursively?  
  *Hint: Use bottom-up dynamic programming, building up from smaller states to larger ones, but the recursive approach is more intuitive for game theory problems.*

### Summary
This problem exemplifies classic game theory using minimax with memoization. The key insights are representing game state efficiently (bitmask), recognizing that optimal play means choosing moves that put opponents in losing positions, and using memoization to avoid redundant calculations. This pattern appears in many two-player games and competitive scenarios where you need to determine optimal strategies assuming both players play perfectly.
