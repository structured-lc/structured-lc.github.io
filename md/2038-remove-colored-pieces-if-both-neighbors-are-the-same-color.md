### Leetcode 2038 (Medium): Remove Colored Pieces if Both Neighbors are the Same Color [Practice](https://leetcode.com/problems/remove-colored-pieces-if-both-neighbors-are-the-same-color)

### Description  
Given a string of colored pieces (only 'A' and 'B'), two players—Alice and Bob—take turns removing a piece from the string if and only if it is not at the ends and both of its neighbors have the same color as the piece itself. Alice can only remove 'A', Bob only 'B'. Alice goes first. Whoever cannot make a move loses. Determine if Alice wins when both play optimally.

### Examples  

**Example 1:**  
Input: `AAABABB`  
Output: `True`  
Explanation: Alice can remove the middle 'A' ("AAA" → remove second A: "AABABB"), and Bob has no valid move, so Alice wins.

**Example 2:**  
Input: `AA`  
Output: `False`  
Explanation: There are no moves possible. Alice cannot make a move, so Alice loses.

**Example 3:**  
Input: `ABBBBBBBAAA`  
Output: `False`  
Explanation:  
- Alice cannot move (no 'A' with 'A' neighbors).  
- Bob can make 5 moves (on internal 'B's):  
  - Each "BBB" allows Bob to remove a middle 'B'.  
- Bob will win.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Simulate each step: for each move, try all possibilities recursively/backtrack. This is exponential since after each move the string changes, and the state can grow quickly.
- **Optimized Insight:**  
  Notice that the only pieces that can ever be removed are those with the same color neighbors—so only runs of 'A's or 'B's of length ≥ 3 matter. For every sequence of consecutive 'A's of length k ≥ 3, Alice can remove (k-2) pieces. Similarly for Bob and 'B'.  
  Just count, for Alice and Bob, the total number of possible removals (`(length of block) - 2` for each block of length ≥ 3).
  Alice wins iff the total possible 'A' moves > total possible 'B' moves (since she goes first).
- **Why is this correct?**  
  Each player can only remove from their own color's internal runs; one player's moves never interfere with the other’s. So whoever has more potential moves will run out of moves last and win.

### Corner cases to consider  
- The string is too short to allow any moves (e.g. `"A"`, `"AB"`, `"BA"`).
- Only one color present (e.g. `"AAAAA"`, `"BB"`).
- No runs of length ≥ 3 (all runs are ≤ 2).
- Input alternates every character (e.g. `"ABABAB"`).

### Solution

```python
def winnerOfGame(colors: str) -> bool:
    # Alice's ('A') and Bob's ('B') internal removal count
    alice_moves = 0
    bob_moves = 0

    # Iterate over the string, count runs of consecutive same color
    i = 0
    n = len(colors)
    while i < n:
        j = i
        # Find the run of same color starting at i
        while j < n and colors[j] == colors[i]:
            j += 1
        length = j - i
        # Only runs of length 3 or more allow removal moves
        if length >= 3:
            if colors[i] == 'A':
                alice_moves += (length - 2)
            else:
                bob_moves += (length - 2)
        i = j

    # Alice wins if she has more possible moves than Bob
    return alice_moves > bob_moves
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — we scan the string once, where n is the length of the input.
- **Space Complexity:** O(1) — we use a fixed number of counters, no extra data structures proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the colors allowed were more than just 'A' and 'B', say 'A', 'B', 'C', etc.?  
  *Hint: Generalize the approach to handle any set of allowed colors.*

- If, instead of string, the pieces are on a circle, does your counting logic change?  
  *Hint: Consider if runs at the end and start should be linked together.*

- What if instead of removing, you can only swap neighboring pieces? Can you still decide who wins optimally?  
  *Hint: Think about game theory and the state changes possible.*

### Summary
We used a **greedy counting approach** that avoids simulation: the winner depends only on the initial counts of potential moves (internal pieces in runs of the same color, for both players). This is a form of "counting blocks/subarrays" — a common string/game pattern, and is directly applicable to any game involving actions on runs/substrings (e.g., maximizing deletions in substrings, Nim variants).

### Tags
Math(#math), String(#string), Greedy(#greedy), Game Theory(#game-theory)

### Similar Problems
- Longest Subarray With Maximum Bitwise AND(longest-subarray-with-maximum-bitwise-and) (Medium)