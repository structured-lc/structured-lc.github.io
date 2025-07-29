### Leetcode 1648 (Medium): Sell Diminishing-Valued Colored Balls [Practice](https://leetcode.com/problems/sell-diminishing-valued-colored-balls)

### Description  
Given an array `inventory` where each element is the count of balls of a specific color, and an integer `orders` representing how many balls a customer wants to buy, you are to sell exactly `orders` balls.  
- Each time you sell a ball of a color, its value is equal to the number of that color's balls currently left (i.e., the highest possible value).
- After selling, the value for the next ball of the same color drops by 1.
- Sell the balls in any order, but your goal is to **maximize revenue** from the sale.
- Return this maximum revenue modulo 10⁹ + 7.

It's essentially a greedy math problem: sell from the largest counts/values first, always taking from the "richest" pile.

### Examples  

**Example 1:**  
Input: `inventory = [2,5]`, `orders = 4`  
Output: `14`  
*Explanation:  
- Sell 1 ball from 5 → 5 (inventory: [2,4])  
- Sell 1 from 4 → 4 (inventory: [2,3])  
- Sell 1 from 3 → 3 (inventory: [2,2])  
- Sell 1 from 2 → 2 (inventory: [2,1])  
Total = 5 + 4 + 3 + 2 = 14*

**Example 2:**  
Input: `inventory = [3,5]`, `orders = 6`  
Output: `19`  
*Explanation:  
- Sell 1 from 5 → 5 (inventory: [3,4])  
- Sell 1 from 4 → 4 (inventory: [3,3])  
- Sell 1 from 3 (max heap, pick any 3) → 3 (inventory: [2,3])  
- Sell another 3 → 3 (inventory: [1,3])  
- Sell last 3 → 3 (inventory: [0,3])  
- Sell 1 from 3 → 3 (inventory: [0,2])  
Total = 5 + 4 + 3 + 3 + 3 + 3 = 19*

**Example 3:**  
Input: `inventory = [1000000000]`, `orders = 1000000000`  
Output: `21`  
*Explanation:  
The answer is extremely large, so only the modulo is considered.*

### Thought Process (as if you’re the interviewee)  

Start with brute force:  
- Sell the highest valued ball each time, decrement count, repeat for orders steps.
- This is too slow if inventory and orders are large.

Realization:  
- Always selling from the heap with the most balls gives the best result.  
- We can optimize by **selling multiple balls in one "level"**:  
    - If several piles are at value X, we can "level down" all piles with that value at once.
    - To do this efficiently:
        1. Sort inventory (or use a max heap).
        2. Each time, pull the highest count; if next-highest pile is Y, try to sell down from X to Y, for all piles tied at X.
        3. Use arithmetic progression sum to find value for multiple balls sold at each level.

- This math idea prevents repeated work and makes the approach efficient.

Tradeoffs:  
- Using a heap gives O(n log n) time, where n is # unique colors.
- We can't brute force or simulate every single sale for large inputs.

### Corner cases to consider  
- inventory with 1 color and orders > count (must only process up to available balls).
- orders much larger than sum(inventory).
- orders much smaller than sum(inventory) (not all colors touched).
- All inventory elements are the same.
- inventory has zeros.
- Large numbers (use modulo at each step).
- orders is zero.

### Solution

```python
def maxProfit(inventory, orders):
    # Modulo as required
    MOD = 10**9 + 7
    
    # Sort inventory descending (so highest value is first)
    inventory.sort(reverse=True)
    n = len(inventory)
    # Add guard zero to avoid bounds check
    inventory.append(0)
    
    ans = 0
    i = 0
    while orders > 0:
        # Find how many colors have the current highest value
        # inventory[i] > inventory[i+1]
        cnt = i + 1
        # If next number is smaller, we can drop these cnt colors from current value to next
        total = cnt * (inventory[i] - inventory[i+1])
        if orders >= total:
            # Sell off all levels down to next
            # Sum: (x - y + 1) × (x + y) // 2
            sum_level = (inventory[i] + inventory[i+1] + 1) * (inventory[i] - inventory[i+1]) // 2
            ans = (ans + cnt * sum_level) % MOD
            orders -= total
        else:
            # Only partially sell down
            full_levels = orders // cnt
            remain = orders % cnt
            next_value = inventory[i] - full_levels
            sum_level = (inventory[i] + next_value + 1) * full_levels // 2
            ans = (ans + cnt * sum_level) % MOD
            ans = (ans + remain * next_value) % MOD
            return ans
        i += 1
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) for sorting, plus O(n) for main loop; n is number of colors.  
- **Space Complexity:** O(1) extra (excluding input and sort, which may be in-place).

### Potential follow-up questions (as if you’re the interviewer)  

- What if balls had different start values not directly tied to count?  
  *Hint: Need tracking per-color value, dynamic updates.*

- How to optimize further if inventory size is huge but values are bounded?  
  *Hint: Use a counting array/bucket for frequency.*

- Could you do this in O(1) extra space?
  *Hint: Sorting/input modification, in-place math.*

### Summary
This problem uses a **greedy with arithmetic series** pattern, batching the sale of balls at each price-tier across all max-valued colors, to maximize sum efficiently. It's common for resource allocation, profit maximization, and heap-based greedy problems; similar batching and arithmetic-progressions ideas apply in scheduling, auction, and priority-queue greedys.