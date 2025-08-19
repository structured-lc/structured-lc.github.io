### Leetcode 3360 (Easy): Stone Removal Game [Practice](https://leetcode.com/problems/stone-removal-game)

### Description  
You're given a pile with `n` stones. Two players, Alice and Bob, take turns. Alice always goes first and removes exactly 10 stones on her first turn. On each following turn, the player must remove exactly 1 fewer stone than what the previous player removed. The player who can't move (i.e., can't take the required number of stones) loses.  
Given `n`, return `True` if Alice wins (she makes the last valid move), and `False` otherwise.

### Examples  

**Example 1:**  
Input: `n = 12`  
Output: `True`  
*Explanation: Alice removes 10 → 2 left. Bob would need to remove 9, but only 2 remain. He cannot move, so Alice wins.*

**Example 2:**  
Input: `n = 1`  
Output: `False`  
*Explanation: Alice needs to remove 10 stones but only 1 is available. She cannot move and immediately loses.*

**Example 3:**  
Input: `n = 50`  
Output: `True`  
*Explanation: Step by step:
1. Alice: 10 (50→40)
2. Bob:   9 (40→31)
3. Alice: 8 (31→23)
4. Bob:   7 (23→16)
5. Alice: 6 (16→10)
6. Bob:   5 (10→5)
7. Alice: 4 (5→1)
8. Bob:   3 (Not enough; only 1 left)
So Alice wins.*

### Thought Process (as if you’re the interviewee)  
First, simulate the game: Alice removes 10, then Bob removes 9, then Alice removes 8, then Bob removes 7, and so on, each time removing one fewer than last. At each turn, if there aren't enough stones to remove, the current player loses.

A brute-force approach is to simulate this process:
- Track who is to move,
- Decrement the number of stones with the required amount per turn,
- Count the number of turns.

At the end, the winner is determined by who was supposed to play next (odd/even number of turns: Alice goes on 1st, 3rd, etc.; Bob on 2nd, 4th, etc.).

Optimization: since numbers are small (n ≤ 50), looping works fine. No further optimization needed, and code is simple and clear, which is ideal for interviews.

### Corner cases to consider  
- n < 10: Alice cannot make any move, instantly loses.
- n = 10: Alice takes all stones and wins.
- n = a number just more than 10, where Bob can't play at all (e.g., n = 12).
- n > 10 but less than 19: check sequence specifically; verify turn where run out happens.
- n = maximum (n=50): check if code handles full sequence.

### Solution

```python
def stoneGame(n):
    # Stones to remove on this turn, Alice starts with 10
    take = 10
    # Number of turns taken; Alice starts (turn 0 is Alice)
    turns = 0
    # Loop while enough stones remain for this turn's requirement
    while n >= take:
        n -= take      # Remove stones for this turn
        take -= 1      # Next turn: remove one fewer stone
        turns += 1     # Increment turn count
    # If turns is odd, last was Bob; if even, last was Alice
    return turns % 2 == 1  # Alice wins if she played last
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) — The loop can run at most 10 times (since after taking 10,9,...,1 all stones will be exhausted or the requirement is impossible). No dependency on n above 10.
- **Space Complexity:** O(1) — Only uses a constant amount of variables, no extra storage or recursion.

### Potential follow-up questions (as if you’re the interviewer)  

- What if Alice started by taking k stones instead of 10?  
  *Hint: Adjust the code for arbitrary starting move, and generalize logic.*

- If each player could pick between removing 1–m stones, could Alice guarantee a win?  
  *Hint: Now this is a standard Nim variant; analyze using modulo and winning positions.*

- What if, instead, the number of stones to be removed increased by 1 each round?  
  *Hint: Re-derive the simulation loop; study if a formula can be used rather than brute-force.*

### Summary
This problem uses **turn-based simulation** with a loop until a move is impossible. The logic is based on parity of turns—if Alice's last, she wins. The method is a straightforward **game simulation** often used for simple game theory and greedy move problems. The same pattern appears in other take-away stone games, "Nim game" variants, or questions where each step's action size changes.

### Tags
Math(#math), Simulation(#simulation)

### Similar Problems
- Stone Game IV(stone-game-iv) (Hard)