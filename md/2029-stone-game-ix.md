### Leetcode 2029 (Medium): Stone Game IX [Practice](https://leetcode.com/problems/stone-game-ix)

### Description  
Alice and Bob play a game with an array of stones, each having an integer value. They take turns removing any stone from the array; Alice starts first. The player who makes the sum of removed stone values divisible by 3 loses. If all stones are removed and sum is not divisible by 3, Bob (the second player) wins by default.  
Assuming both play optimally, return **true** if Alice can win, otherwise **false**.

### Examples  

**Example 1:**  
Input: `stones = [2,1]`  
Output: `true`  
*Explanation: Alice removes 2 or 1. Bob removes the remaining stone. Total sum = 3, which is divisible by 3, so Bob loses and Alice wins.*

**Example 2:**  
Input: `stones = [2]`  
Output: `false`  
*Explanation: Alice removes the only stone. The sum is 2 (not divisible by 3), but since no stones are left, Bob wins by default.*

**Example 3:**  
Input: `stones = [5,1,2,4,3]`  
Output: `false`  
*Explanation: Suppose Alice removes the stone with value 1. Next moves alternate, and eventually the sum of removed stones is 15 (divisible by 3) after Alice’s move, so Alice loses and Bob wins.*

### Thought Process (as if you’re the interviewee)  
To solve this, first realize that only the sum modulo 3 (`% 3`) matters. We can classify the stones based on their value mod 3:
- Count how many stones have remainder 0 (`c0`), 1 (`c1`), or 2 (`c2`) after dividing by 3.

Removing a stone with remainder 0 does not affect the modulo 3 sum, so they can be treated like "free" moves (as long as the game doesn’t end).

Pure brute force is infeasible for large n, but there’s a pattern:
- Alice wins if she can always force Bob into a position where Bob can only make the sum divisible by 3 or empty the stones.
- Simulate possible first moves: Alice starts by removing a stone with mod 1 or mod 2, and then both alternate removing either type.

The core is:
- If neither c1 nor c2 exists, Alice cannot start and loses.
- If both exist, Alice can try starting with either type and analyze if she can sustain a win (given the counts and alternations).
- Care must be taken when one type dominates (c1 large vs c2 large), as parities can flip the winner.

In essence:  
- Calculate c0, c1, c2.
- Alice can win if max(c1, c2) ≥ 2 and min(c1, c2) ≥ 1, or if |c1 - c2| > 2 and min(c1, c2) ≥ 1 (taking c0’s parity into account for extra moves).

### Corner cases to consider  
- All stones are `0 mod 3` – Alice cannot avoid making sum divisible by 3.
- Only one stone in total.
- All stones are same value.
- Very skewed distributions of c1, c2 (only 1 of each, or a big gap).
- After every removal, ensure the sum isn’t already divisible by 3.

### Solution

```python
def stoneGameIX(stones):
    # Count how many stones are 0 mod 3, 1 mod 3, and 2 mod 3
    c = [0, 0, 0]
    for x in stones:
        c[x % 3] += 1

    # If neither c[1] nor c[2] exists, Alice has no valid first move and loses
    if c[1] == 0 and c[2] == 0:
        return False

    # If either c[1] or c[2] is zero, Alice can only take the other type
    if min(c[1], c[2]) == 0:
        # To win, we need at least 3 of that type, and c[0] must be odd
        return max(c[1], c[2]) >= 3 and c[0] % 2 == 1

    # General case: both c[1], c[2] > 0
    # Alice can win if (abs(c[1] - c[2]) > 2) or c[0] is even
    return abs(c[1] - c[2]) > 2 or c[0] % 2 == 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Loop through stones once to count mods.
- **Space Complexity:** O(1)  
  Only three counters and a few variables; input is not modified.

### Potential follow-up questions (as if you’re the interviewer)  

- Could you output the actual sequence of moves for the winning path?  
  *Hint: Consider recursive backtracking to produce a move sequence.*

- What if the sum must not be divisible by another integer k, not just 3?  
  *Hint: Try generalizing the strategy for any modulus.*

- How does the solution change if there are more players?  
  *Hint: Analyze the state transitions with more than two alternating roles.*

### Summary
This is a game simulation problem that reduces to counting residues modulo 3 and playing out possible strategies. The key insight is to realize "0 mod 3" stones do not affect the sum modulo 3, and determining the winner comes down to the parity and distribution of the remaining stones.  
The approach employs mathematical induction and residue analysis—a recurring pattern in many combinatorial and game theory problems, such as Nim and other modular sum games.