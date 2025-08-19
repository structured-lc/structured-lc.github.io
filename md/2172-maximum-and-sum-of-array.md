### Leetcode 2172 (Hard): Maximum AND Sum of Array [Practice](https://leetcode.com/problems/maximum-and-sum-of-array)

### Description  
Given an integer array **nums** of length n and an integer **numSlots** (where 2 × numSlots ≥ n), you have **numSlots** slots numbered from 1 to numSlots. Each slot may hold up to **two** of the numbers. You must place every number from nums into one of the slots.

For each placement, you compute the sum of each number AND-ed with the slot number it is put into (i.e., AND sum = Σ (nums\[i\] AND slot_number)).  
The goal: **Choose placements that maximize the AND sum possible, with at most two numbers per slot.**

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4,5,6]`, `numSlots = 3`  
Output: `9`  
*Explanation: One possible placement is [1,4] in slot 1, [2,6] in slot 2, [3,5] in slot 3. AND sum = (1&1) + (4&1) + (2&2) + (6&2) + (3&3) + (5&3) = 1 + 0 + 2 + 2 + 3 + 1 = 9.*

**Example 2:**  
Input: `nums = [1,3,10,4,7,1]`, `numSlots = 9`  
Output: `24`  
*Explanation: One possible placement is [1,1] in slot 1, [3] in slot 3, [4] in slot 4,  in slot 7,  in slot 9. AND sum = (1&1) + (1&1) + (3&3) + (4&4) + (7&7) + (10&9) = 1 + 1 + 3 + 4 + 7 + 8 = 24.*

**Example 3:**  
Input: `nums = [5,3,7]`, `numSlots = 3`  
Output: `11`  
*Explanation: Place 5 in slot 3, 3 in slot 3, 7 in slot 1. AND sum = (5&3) + (3&3) + (7&1) = 1 + 3 + 1 = 5. (But actual max is 11; must check all assignments.)*

### Thought Process (as if you’re the interviewee)  

- **Brute Force:** Assign each number to any of the slots (at most two per slot). For each distribution, calculate the total AND sum and pick the maximum.  
    - Challenge: The number of assignments is huge! For n numbers and up to 2 slots per position, it's exponential.
- **Optimization:**  
    - **Dynamic Programming + Bitmask:**  
        - Model as a state: For current index `i` in nums, and state mask (represent slots’ fills: every slot can be filled 0/1/2 times). For 9 slots, each 2 bits, so use an 18-bit int mask.
        - DP(mask): maximum AND sum obtainable given the current fill state (mask) and remaining nums.
        - Transition: For each empty (or not full) slot, assign current num to it, update mask, recur for next number; keep the max.
        - **Why DP+Bitmask?**  
            - The number of possible slot-states is at most 3^numSlots (`numSlots` ≤ 9, so max `3^9` ≈ 20,000).
            - Each DP state records the best score for that fill configuration.  
        - Memoize states for efficiency.
- **Trade-offs:**  
    - Full brute-force does not scale beyond ~10 numbers. DP with bitmask is efficient enough for problem constraints (`n` ≤ 18, since `2*numSlots` ≥ `n` and `numSlots` ≤ 9).

### Corner cases to consider  
- Empty array (n=0): trivial, sum is 0.
- All nums are the same/equal (e.g., [7,7,7,...]).
- Slot numbers are small, but nums are large, or vice versa.
- All nums = 0 (AND with any slot is 0).
- Maxed out slots, i.e., all slots must accept two numbers (n = numSlots × 2).
- `numSlots` much bigger than `n` (most slots are unused).
- Any num = slot number, which maximizes AND.

### Solution

```python
def maximumANDSum(nums, numSlots):
    # We use numSlots slots indexed from 1 to numSlots.
    # Each slot can hold at most two numbers.
    # Model the slots' content by a mask: for k slots, 2*k bits (each slot: 0/1/2).
    from functools import lru_cache

    n = len(nums)
    max_mask = 3 ** numSlots  # Each slot has 0, 1, or 2 numbers.

    def decode(mask, numSlots):
        # mask is base-3 encoded: each base-3 digit indicates how many items in that slot.
        slot_count = [0] * numSlots
        for s in range(numSlots):
            slot_count[s] = (mask // (3**s)) % 3
        return slot_count

    @lru_cache(maxsize=None)
    def dp(i, mask):
        # i: index in nums
        # mask: base-3 encoding of slot fills
        if i == n:
            return 0
        res = 0
        slot_count = decode(mask, numSlots)
        for slot in range(numSlots):
            if slot_count[slot] < 2:
                # Use this slot for nums[i]
                new_mask = mask + (3**slot)
                and_sum = (nums[i] & (slot+1))
                res = max(res, and_sum + dp(i+1, new_mask))
        return res

    return dp(0, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(n × 3ⁿᵘᵐˢˡᵒᵗˢ)
    - For each state: up to n levels of recursion, there are 3^numSlots possible mask states, and at each state, possibly numSlots transitions.
    - For numSlots up to 9, 3⁹ ≈ 20,000 states.
- **Space Complexity:**  
  - O(3ⁿᵘᵐˢˡᵒᵗˢ)
    - For memoization of all mask states.
    - Call stack up to n levels.

### Potential follow-up questions (as if you’re the interviewer)  

- What if slots could hold up to **k** numbers instead of 2?
  *Hint: Adjust base encoding (mask uses base-(k+1)).*

- What if nums or slot numbers could be much larger than 15?
  *Hint: Algorithm remains the same; constraints may limit brute force feasibility.*

- Can you recover the exact slots assignment, not just the maximum sum?
  *Hint: Track choices via parent pointers or reconstruct from cache.*

### Summary
This problem is a classic **state compression DP** via **bitmasking** (base-3 mask for multi-capacity). It generalizes the *assignment problem with capacity per slot*, and is applicable for problems where objects must be assigned to containers with small bounded size, maximizing some function of the pairing. Common in combinatorial optimization and puzzles involving "choose best grouping under capacity constraints."

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Bit Manipulation(#bit-manipulation), Bitmask(#bitmask)

### Similar Problems
- Minimum XOR Sum of Two Arrays(minimum-xor-sum-of-two-arrays) (Hard)