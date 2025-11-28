### Leetcode 3022 (Hard): Minimize OR of Remaining Elements Using Operations [Practice](https://leetcode.com/problems/minimize-or-of-remaining-elements-using-operations)

### Description  
Given an array **nums** of n integers and an integer **k**, you can perform the following operation up to k times:
- Choose any element in nums and replace it with any *non-negative* integer smaller than it (i.e., replace x with y where 0 ≤ y < x).

After performing at most k operations, compute the **minimum possible value** of the bitwise **OR** of all elements in nums.

The goal is to minimize OR(nums) after at most k such operations.

### Examples  

**Example 1:**  
Input: `nums = [3,5,3,2,7], k = 2`  
Output: `1`  
*Explanation: Replace 5 → 0 and 2 → 0 (or 7 → 0 and 5 → 0, etc.), ending up with [3,3,0,0,7].  
The minimal OR is 3 | 3 | 0 | 0 | 7 = 7 (but with optimal picks you can do [0,0,3,3,1] -> 3 | 3 | 1 = 3, or if you pick lowest bits you can reach 1. The optimal way is described step-by-step depending on which elements are chosen to zero out their highest set bits).*

**Example 2:**  
Input: `nums = [1,2,4,8], k = 1`  
Output: `7`  
*Explanation: We can reduce any one element.  
For example, reduce 8 → 0, so OR becomes 1 | 2 | 4 | 0 = 7.*

**Example 3:**  
Input: `nums = [2,2,2], k = 3`  
Output: `0`  
*Explanation: Replace all elements with 0, OR is 0.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:** Try all possible subsets of up to k numbers and minimize OR by replacing those numbers with 0, but that’s exponential and infeasible for large n.
- **Bitwise Greedy:** To minimize the OR, remove as many high-value bit contributions as possible. For each bit position (from high to low), count how many numbers have this bit set. If the count ≤ k, we can reduce all of them to clear this bit by using up `count` operations. Subtract used operations `k`. Repeat for lower bits, always zeroing out the highest bit we can afford.
- For each bit (from 30 to 0), if we can afford to clear all nums with that bit on in k, clear them and deduce k.
- **Trade-offs:** This greedy bitwise approach is fast (O(30 × n)), always optimal, and no subset generation needed.

### Corner cases to consider  
- k ≥ n: Remove all numbers; OR is 0.
- k = 0: No change; OR is just original OR of nums.
- All elements already zero: Result is 0.
- Some elements are already zero: No operation needed for those.
- Elements all powers of two: Each set bit corresponds to an element, so OR after at most k removals is sum of remaining bits.
- Several equal elements: Need to count only unique "set bit" positions.

### Solution

```python
def minimumOr(nums, k):
    n = len(nums)
    cur_or = 0
    for num in nums:
        cur_or |= num

    # Try to greedily unset the highest bit possible using k operations
    for bit in reversed(range(31)):  # 30...0
        mask = 1 << bit
        # Count nums that have this bit set
        count = 0
        for num in nums:
            if num & mask:
                count += 1
        # If count ≤ k, we can make this bit zero (replace all with something < num, i.e. possibly zero)
        if count <= k:
            # Remove this bit from all nums (simulate replacing them with numbers without this bit)
            new_nums = []
            ops_used = 0
            for num in nums:
                if num & mask:
                    new_nums.append(num ^ mask)  # Clear this bit
                    ops_used += 1
                else:
                    new_nums.append(num)
            nums = new_nums
            k -= count
            cur_or = 0
            for num in nums:
                cur_or |= num
    return cur_or
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(30 × n)  
  For each of the 31 bits (from 0–30), we scan the array to count and possibly update numbers.
- **Space Complexity:** O(n) for copying nums on each bit we clear; could be O(1) if done in-place.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle extremely large input arrays?  
  *Hint: Can you update in-place? Are there bits that can “cover” many numbers at once?*

- Suppose you can only reduce elements by exactly 1 each operation?  
  *Hint: Now the operation’s effect is more limited, so model the cost per bit in each number.*

- What if negative numbers are allowed?  
  *Hint: How does the bitwise OR behave with negative numbers? Two's complement can change calculations.*

### Summary
This problem is a classic **bitwise greedy minimization pattern**, scanning from the highest bit to the lowest, always clearing as many high bits as permitted by the operation limit.  
It appears in bitmasking, dynamic programming, and greedy problems where bit contribution to a function (like OR/AND/XOR) must be minimized or maximized by modifying selected numbers.  
Key insight is that the OR only decreases if we zero out all instances of a set bit, so greedily processing high bits first always yields the minimum possible OR.


### Flashcard
Minimize OR of Remaining Elements Using Operations (Hard)

### Tags
Array(#array), Greedy(#greedy), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Maximum XOR After Operations (maximum-xor-after-operations) (Medium)
- Apply Operations on Array to Maximize Sum of Squares(apply-operations-on-array-to-maximize-sum-of-squares) (Hard)