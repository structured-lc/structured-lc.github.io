### Leetcode 2005 (Hard): Subtree Removal Game with Fibonacci Tree [Practice](https://leetcode.com/problems/subtree-removal-game-with-fibonacci-tree)

### Description  
Given a rooted tree called the **Fibonacci tree** (with size n nodes), two players, Alice and Bob, take turns removing subtrees (including the selected node) from the tree. The player unable to make a move loses. Given **n** (the size of the Fibonacci tree), determine whether **Alice** (who goes first) will win if both play optimally.

- The Fibonacci tree is a special tree constructed recursively:  
  - F(1) is a single node.  
  - F(2) has a root with one child.  
  - For k ≥ 3, F(k) has a root whose two subtrees are F(k-1) and F(k-2).
- n is guaranteed to be a Fibonacci number.

### Examples  

**Example 1:**  
Input: `n = 2`  
Output: `true`  
*Explanation: Alice removes the root and Bob has no moves. Alice wins.*

**Example 2:**  
Input: `n = 6`  
Output: `true`  
*Explanation: Alice always has a winning strategy due to the tree structure for n=6 (see core logic below).*

**Example 3:**  
Input: `n = 7`  
Output: `false`  
*Explanation: For n=7, if both play optimally, Alice loses. The losing positions for Alice are when n mod 6 == 1.*

### Thought Process (as if you’re the interviewee)  
To start, I'd try to simulate the game for small n, observing patterns in win/loss outcomes.  
My brute-force would be to recursively model the game tree, removing subtrees and checking all move sequences, which is infeasible for large n.  
Instead, since the tree structure is recursive and follows the Fibonacci sequence, I’d look for patterns rather than exhaust all configurations.  
Through examples or research, I’d notice a pattern emerges based on the value of n:
- If n mod 6 ≠ 1, Alice wins.
- If n mod 6 == 1, Bob wins.

So, the solution simply checks n % 6 != 1 to determine the winner.  
This is a special case of impartial games, and for this structure, the outcome can be deduced from n's residue mod 6.

### Corner cases to consider  
- n = 1 (smallest tree)  
- n = 2 (minimal with a single branch)  
- Large n where n is a Fibonacci number  
- Confirm n is guaranteed to be Fibonacci, or clarify problem constraints if not

### Solution

```python
def findGameWinner(n: int) -> bool:
    # Alice wins if n mod 6 is not 1, loses otherwise
    return n % 6 != 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1).  
  Only a modulo operation and comparison are performed regardless of n's size.

- **Space Complexity:** O(1).  
  No extra space used beyond a few variables.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you generalize this strategy for subtree-removal games on trees with arbitrary structures?  
  *Hint: Explore Grundy number/Nimber and Sprague-Grundy theorem for impartial games.*

- What if the tree was not always a Fibonacci tree but allowed arbitrary branching?  
  *Hint: Try to model the problem using dynamic programming or game theory.*

- How does the answer change if Bob goes first?  
  *Hint: If the current setup is winner for Alice, then Bob wins if roles are reversed.*

### Summary
This problem is a classic example of **game theory** and **pattern finding**, where analysis of small cases leads to a modular arithmetic solution (mod 6).  
This modular approach often applies in impartial game settings with regular structure and recurrence, such as in **Nim games** or subtree removal games on recursively constructed trees.  
Recognizing these patterns helps reduce hard games to simple O(1) checks, highlighting the importance of mathematical insight in algorithmic game design.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming), Tree(#tree), Binary Tree(#binary-tree), Game Theory(#game-theory)

### Similar Problems
- Game of Nim(game-of-nim) (Medium)