### Leetcode 810 (Hard): Chalkboard XOR Game [Practice](https://leetcode.com/problems/chalkboard-xor-game)

### Description  
Given an array of integers `nums` written on a chalkboard, Alice and Bob take turns erasing exactly one number from the board. **Alice goes first.** If the bitwise XOR of all numbers *before* a player's turn is zero, they immediately win. However, if *erasing* a number makes the XOR of all remaining numbers become zero, then that player **loses**. The game continues until all numbers are erased. The goal is to determine whether Alice can win, assuming both play optimally.

### Examples  

**Example 1:**  
Input: `nums = [1,1,2]`  
Output: `false`  
*Explanation: Alice can erase 1 or 2. If she erases 1: [1,2] → XOR is 1⊕2=3. Bob removes 1, Alice is forced to remove 2 and loses. If she erases 2: [1,1] → XOR is 1⊕1=0, so Alice loses immediately.*

**Example 2:**  
Input: `nums = [0,1]`  
Output: `true`  
*Explanation: Alice starts with XOR 0⊕1=1. She can erase 0 or 1; either way, Bob is forced to erase the last number, and Alice wins.*

**Example 3:**  
Input: `nums = [1,2,3]`  
Output: `true`  
*Explanation: 1⊕2⊕3=0, so Alice already starts her turn with XOR=0 and wins immediately.*

### Thought Process (as if you’re the interviewee)  
- **Initial thinking:** Try to simulate the game: on each turn, choose a number, check the resulting XOR, repeat. But this gets expensive since the array can be up to length 1000.
- **Brute-force:** Recursively try all possible moves, checking who can force the other to lose. This has exponential time complexity.
- **Optimized analysis:**  
  - If the XOR of all numbers at Alice’s turn is 0, she *immediately wins*.  
  - If the XOR is non-zero, things become interesting:
    - If the length of `nums` is **even**, Alice can always win by "mirror" strategy: whatever Bob picks, Alice picks symmetrically so she never creates a zero XOR for herself.
    - If the length is **odd**, Bob will eventually get the symmetric advantage and Alice loses if XOR at start is non-zero.
  - The result boils down to: **Alice wins if the overall XOR is 0, or if the length of `nums` is even; otherwise she loses**.
- This pattern is similar to variants of Nim games.

### Corner cases to consider  
- Array has length 1: Alice wins only if value is 0.
- All values are equal: Test both even/odd length cases.
- XOR is already 0 at the start.
- All zeros in the array.

### Solution

```python
def xorGame(nums):
    # Compute total xor of all numbers
    xor_sum = 0
    for num in nums:
        xor_sum ^= num

    # Alice wins if xor_sum == 0 or number of elements is even
    return xor_sum == 0 or len(nums) % 2 == 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We traverse the array once to calculate the XOR.
- **Space Complexity:** O(1) — We use only a few integer variables for accumulation.

### Potential follow-up questions (as if you’re the interviewer)  

- What if players can remove more than one number per turn?  
  *Hint: How does the symmetry or parity of choices affect strategy?*

- How would the strategy change if the array can have negative numbers?  
  *Hint: Negative numbers don't affect XOR computation, but does it change intuition?*

- What if a move loses only if the XOR becomes a specific non-zero value k?  
  *Hint: How could you generalize the win condition?*

### Summary  
This problem is a variant of the classic **Nim game** and tests your understanding of XOR properties, parity, and game theory strategies. The key insight is whether the XOR sum is 0 and the parity (even/odd) of the array length. The "mirror" or symmetric strategy is also a classic theme in combinatorial games. This approach is seen in problems related to Nim, Grundy numbers, and other impartial game theory scenarios.


### Flashcard
Alice wins if the XOR of all numbers is 0 at her turn or if the array length is even; otherwise, Bob can force a win.

### Tags
Array(#array), Math(#math), Bit Manipulation(#bit-manipulation), Brainteaser(#brainteaser), Game Theory(#game-theory)

### Similar Problems
