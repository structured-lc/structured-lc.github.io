### Leetcode 292 (Easy): Nim Game [Practice](https://leetcode.com/problems/nim-game)

### Description  
You are playing the Nim Game with one heap of stones. There are **n** stones in the heap, and you and your friend take turns to remove 1, 2, or 3 stones from the heap. You play first. The player who removes the last stone wins. Your task: Given n, can you guarantee a win if both play optimally? Return `True` if you can guarantee a win, else `False`.

### Examples  

**Example 1:**  
Input: `n = 4`  
Output: `False`  
*Explanation: No matter how many (1, 2, or 3) stones you take, your friend can always take the last stones and win by removing what's left (since you leave them with 3, 2, or 1).*  

**Example 2:**  
Input: `n = 1`  
Output: `True`  
*Explanation: You take 1 stone and win immediately.*  

**Example 3:**  
Input: `n = 2`  
Output: `True`  
*Explanation: You take both stones and win.*  

**Example 4:**  
Input: `n = 7`  
Output: `True`  
*Explanation: You take 3 stones. 4 remain, your friend is now forced into the losing situation of Example 1.*


### Thought Process (as if you’re the interviewee)  

- **Brute force / simulation:**  
  Try every possible move recursively. For each current heap size, check all three options (removing 1, 2, 3 stones), and see if there’s a way to force a win. But this is inefficient and redundant (exponential time).

- **Pattern observation:**  
  Try small values:
  - n = 1, 2, 3 ⇒ win by taking all stones.
  - n = 4 ⇒ no matter what you take (1/2/3), opponent takes the rest.
  - n = 5, take 1 ⇒ leave 4 (opponent in losing state).
  - n = 6, take 2 ⇒ leave 4.
  - n = 7, take 3 ⇒ leave 4.
  - n = 8, all options leave opponent with 5,6,7 (they win).
  ⇒ **If n is a multiple of 4, you always lose with perfect play. Otherwise, you win.**

- **Why?**  
  Whenever you encounter a multiple of 4, you are forced to leave a non-multiple for your friend. But your friend can always counter your move by restoring the heap to a multiple of 4 for you. This cycle perpetuates until the last turn.

- **Optimal approach:**  
  Simply check if n is a multiple of 4. If yes, you cannot win. Else, you can guarantee a win by always mirroring your opponent’s moves to keep putting them on a multiple of 4.

### Corner cases to consider  
- n = 0 (Invalid input per problem, but worth thinking about: no stones means you can't move.)
- n = 1, 2, 3 (Smallest cases, always winnable.)
- n = 4, 8, 12, … (All must return False.)
- Very large n.
- Only 1 possible move (n = 1, 2, 3).

### Solution

```python
def canWinNim(n: int) -> bool:
    # If n is a multiple of 4, you cannot win
    return n % 4 != 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) — Just checks divisibility.
- **Space Complexity:** O(1) — No extra storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can remove up to k stones each turn, not just 3?  
  *Hint: Generalize the pattern. What does being a losing state look like?*

- What if there are multiple heaps?  
  *Hint: Classic Nim Game — the XOR of heap sizes ("Nim-sum") determines the winner.*

- Could you print out a forced winning move sequence?  
  *Hint: For winning cases, show removing stones to leave a multiple of 4 after your move.*

### Summary
This problem uses **game theory** and **pattern observation** rather than simulation or recursion. The optimal solution is mathematical and checks divisibility by 4. This is a common pattern in combinatorial games, and knowing this approach is helpful for variants like multi-heap Nim and "take-away" games with arbitrary move limits.