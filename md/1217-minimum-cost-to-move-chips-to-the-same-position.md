### Leetcode 1217 (Easy): Minimum Cost to Move Chips to The Same Position [Practice](https://leetcode.com/problems/minimum-cost-to-move-chips-to-the-same-position)

### Description  
Given several **chips** placed at integer positions along a number line, you can move chips to any position, with two types of moves:  
- Move a chip by 2 units (either left or right): **cost = 0**
- Move a chip by 1 unit (left or right): **cost = 1**  
Your goal is to move all the chips to the **same position** while minimizing the total cost.

### Examples  

**Example 1:**  
Input: `position = [1,2,3]`  
Output: `1`  
*Explanation: Move the chip at position 3 to position 1 (cost = 0), and move the chip at position 2 to position 1 (cost = 1). Total cost is 1.*

**Example 2:**  
Input: `position = [2,2,2,3,3]`  
Output: `2`  
*Explanation: Move the two chips at position 3 to position 2 (each costs 1), other chips already at 2. Total cost is 2.*

**Example 3:**  
Input: `position = [1,1000000000]`  
Output: `1`  
*Explanation: Move chip at 1000000000 to 1 (cost = 1), or vice versa. Total cost: 1.*

### Thought Process (as if you’re the interviewee)  
- The brute-force approach would try all possible target positions and sum up the move costs for each chip to that position.
- But key observation: moving **between positions of the same parity** (odd to odd or even to even) is **free**. Move by 2 units any number of times, and you stay within your parity.
- The only cost comes from moving chips **across parity** (odd to even or vice versa), which costs 1 per chip.
- So, count how many chips are on even positions, and how many on odd.  
- The optimal strategy is to move all chips to either any even or any odd position. The cost will be the smaller count, because only the “minority” needs to pay to change parity.

### Corner cases to consider  
- Only one chip: cost is 0.
- All chips are already at the same position: cost is 0.
- All positions even or all positions odd: cost is 0.
- Empty `position` array (edge case, but per problem, assume at least one chip).

### Solution

```python
def minCostToMoveChips(position):
    # Count chips on even and odd positions
    even = 0
    odd = 0
    for chip in position:
        if chip % 2 == 0:
            even += 1
        else:
            odd += 1
    # The minimum of the two is the answer
    return min(even, odd)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of chips (must inspect each position once).
- **Space Complexity:** O(1). Only counters for even and odd are used aside from input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if moving by 2 units costs c > 0 and moving by 1 unit costs d > 0?  
  *Hint: Revisit which moves are free and how cost structure changes overall.*

- How would you handle very large input arrays efficiently?  
  *Hint: Can your approach still run in linear time with respect to input size?*

- If chips could only move a fixed number of times, how would you adapt your strategy?  
  *Hint: Consider which chips you’d prioritize and how to handle limited moves.*

### Summary
This problem exemplifies **parity-based greedy counting**—a very common pattern whenever moves or connections have different costs based on even/odd properties. The insight that only parity jump costs money collapses the brute-force solution into a simple min-odd–even counter. This kind of strategy can show up in board games, puzzles, and problems involving cost-minimizing rearrangements on number lines.

### Tags
Array(#array), Math(#math), Greedy(#greedy)

### Similar Problems
- Minimum Number of Operations to Move All Balls to Each Box(minimum-number-of-operations-to-move-all-balls-to-each-box) (Medium)
- Split With Minimum Sum(split-with-minimum-sum) (Easy)